// AI trip concierge — floating chat widget backed by netlify/functions/agent-chat.js
(function () {
  const GREETING = 'Hi! I can help you pick a trip, answer questions, or start a booking. What are you looking for?';

  let history = [];
  let panelEl, messagesEl, formEl, inputEl, sendBtn;

  function openConcierge() {
    if (!panelEl) buildPanel();
    panelEl.classList.add('open');
    document.getElementById('concierge-launcher').classList.add('hidden');
    inputEl.focus();
  }

  function closeConcierge() {
    panelEl.classList.remove('open');
    document.getElementById('concierge-launcher').classList.remove('hidden');
  }

  function appendMessage(role, text, opts) {
    opts = opts || {};
    const el = document.createElement('div');
    el.className = `concierge-msg ${role}${opts.pending ? ' pending' : ''}${opts.error ? ' error' : ''}`;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  async function sendMessage(text) {
    history.push({ role: 'user', content: text });
    appendMessage('user', text);

    const pendingEl = appendMessage('assistant', 'Thinking…', { pending: true });
    sendBtn.disabled = true;
    inputEl.disabled = true;

    try {
      const res = await fetch('/.netlify/functions/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Request failed');

      history.push({ role: 'assistant', content: data.reply });
      pendingEl.textContent = data.reply;
      pendingEl.classList.remove('pending');
    } catch (err) {
      pendingEl.textContent = "Sorry, I'm having trouble connecting right now. Try the booking form instead.";
      pendingEl.classList.remove('pending');
      pendingEl.classList.add('error');
    } finally {
      sendBtn.disabled = false;
      inputEl.disabled = false;
      inputEl.focus();
    }
  }

  function buildPanel() {
    panelEl = document.createElement('div');
    panelEl.className = 'concierge-panel';
    panelEl.id = 'concierge-panel';
    panelEl.innerHTML = `
      <div class="concierge-header">
        <div>
          <div class="concierge-header-title">Trip Concierge</div>
          <div class="concierge-header-sub">Ask me anything, or book a trip</div>
        </div>
        <button class="concierge-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="concierge-messages"></div>
      <form class="concierge-form">
        <input type="text" placeholder="Type a message…" autocomplete="off" />
        <button type="submit">Send</button>
      </form>
    `;
    document.body.appendChild(panelEl);

    messagesEl = panelEl.querySelector('.concierge-messages');
    formEl = panelEl.querySelector('.concierge-form');
    inputEl = panelEl.querySelector('input');
    sendBtn = panelEl.querySelector('button[type="submit"]');

    panelEl.querySelector('.concierge-close').addEventListener('click', closeConcierge);
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputEl.value.trim();
      if (!text) return;
      inputEl.value = '';
      sendMessage(text);
    });

    appendMessage('assistant', GREETING);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const launcher = document.createElement('button');
    launcher.className = 'concierge-launcher';
    launcher.id = 'concierge-launcher';
    launcher.type = 'button';
    launcher.textContent = '💬 Ask about a trip';
    launcher.addEventListener('click', openConcierge);
    document.body.appendChild(launcher);
  });
})();
