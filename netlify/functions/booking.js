exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name, email, route, message } = data;

  if (!name || !email) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { statusCode: 500, body: 'Telegram is not configured' };
  }

  const text = [
    '🥾 New booking request — Geotripster',
    `Name: ${name}`,
    `Email: ${email}`,
    route ? `Route: ${route}` : null,
    message ? `Message: ${message}` : null,
  ].filter(Boolean).join('\n');

  const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!telegramRes.ok) {
    return { statusCode: 502, body: 'Failed to notify Telegram' };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true }),
  };
};
