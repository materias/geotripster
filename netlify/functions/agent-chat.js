const ROUTES = [
  { label: 'Martvili Canyon — Aug 8–10', desc: 'A limestone canyon carved by the Abasha River in western Georgia — 700m trail with bridges, viewpoints, and boat tours along emerald-green waters. Easy, family-friendly.' },
  { label: 'Tbilisi Sea SUP — Aug 15–16', desc: 'Rent a SUP board, drift across still water, and watch the sun sink behind the Caucasus hills. Easy, no experience needed, near Tbilisi.' },
  { label: 'Vardzia — Aug 22–23', desc: 'A 12th-century cave city carved into Erusheti Mountain — 300+ interconnected chambers across 13 levels, frescoes, and an intact water system. Easy walking, history-focused.' },
  { label: 'Svaneti Traverse — Aug 29–31', desc: 'Classic Mestia–Ushguli route through medieval tower villages and alpine meadows. Moderate-to-hard, multi-day trekking.' },
  { label: 'Tusheti High Road — Sep 6–8', desc: 'Remote wilderness route through the wildest, most remote corner of Georgia. Hard, for experienced hikers.' },
  { label: 'Kakheti Wine Tour — Oct 3–4', desc: "Georgia's wine heartland — ancient qvevri cellars, the 11th-century Alaverdi Cathedral, and Alazani Valley vineyards at harvest. Easy, food & wine focused." },
  { label: 'Mravaltskaro — Oct 17–19', desc: 'Georgia\'s "Martian" landscape — red-and-yellow hills reflected in a still reservoir, deep in the Gareji semi-desert. Easy-to-moderate.' },
  { label: 'Kazbegi Ridge — Nov 7–9', desc: 'High-altitude traverse with views of Gergeti Trinity Church and the Greater Caucasus. Moderate-to-hard, cold-weather gear needed in November.' },
];

const SYSTEM_PROMPT = `You are the trip concierge for Geotripster, a small Georgian adventure-tours company. You chat with visitors on the website.

About Geotripster: small groups of 6–12 people, every route personally scouted by the team before it's offered, safety-first (weather-monitored, first-aid equipped), camp food that's meant to be genuinely good, and a friendly, unpretentious vibe. Founded 2019 by Nino Kalandadze in Tbilisi.

Current trips:
${ROUTES.map((r) => `- ${r.label}: ${r.desc}`).join('\n')}

Your job:
1. Answer questions about the trips, the company, and what to expect — keep it warm, concise, and specific (use real details above, don't invent ones).
2. Help the visitor find the right trip for them based on fitness level, dates, or interests.
3. Once they've decided on a trip and want to book, collect their name and email, confirm the exact trip, then call submit_booking_request. Only call it once you actually have a name, an email, and a confirmed route — don't guess or fill in placeholders.
4. After a successful booking, tell them the team will follow up within 24 hours — don't promise anything else.

Keep replies short (2–4 sentences) — this is a chat widget, not an essay. Never invent trips, dates, or prices that aren't listed above.`;

const TOOLS = [
  {
    name: 'submit_booking_request',
    description:
      "Submit a booking request once you have the visitor's name, email, and confirmed trip route. Call this only after they've explicitly confirmed they want to book — not just expressed interest.",
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: "Visitor's full name" },
        email: { type: 'string', description: "Visitor's email address" },
        route: {
          type: 'string',
          description: 'The exact trip route the visitor is booking',
          enum: ROUTES.map((r) => r.label),
        },
        message: {
          type: 'string',
          description: 'Brief additional context from the conversation worth passing along (optional)',
        },
      },
      required: ['name', 'email', 'route'],
    },
  },
];

async function callClaude(messages) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-5',
      max_tokens: 1024,
      output_config: { effort: 'low' },
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Anthropic API error ${res.status}: ${text}`);
  }

  return res.json();
}

async function notifyTelegram({ name, email, route, message }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text = [
    '🤖 New booking request — via AI concierge',
    `Name: ${name}`,
    `Email: ${email}`,
    `Route: ${route}`,
    message ? `Message: ${message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  return res.ok;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  if (history.length === 0) {
    return { statusCode: 400, body: 'Missing messages' };
  }

  const claudeMessages = history.map((m) => ({ role: m.role, content: m.content }));

  try {
    let response = await callClaude(claudeMessages);
    let booked = false;

    if (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find((b) => b.type === 'tool_use');
      const textBeforeTool = response.content.find((b) => b.type === 'text');

      let toolResultText = 'Booking could not be submitted — notification channel is not configured. Ask the visitor to use the booking form instead.';
      if (toolUseBlock && toolUseBlock.name === 'submit_booking_request') {
        const ok = await notifyTelegram(toolUseBlock.input);
        booked = ok;
        toolResultText = ok
          ? 'Booking request submitted successfully.'
          : 'Booking request failed to send.';
      }

      claudeMessages.push({ role: 'assistant', content: response.content });
      claudeMessages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: toolUseBlock.id,
            content: toolResultText,
          },
        ],
      });

      response = await callClaude(claudeMessages);
      void textBeforeTool;
    }

    const finalText = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: finalText || "Sorry, I didn't catch that — could you rephrase?", booked }),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Agent request failed' }),
    };
  }
};
