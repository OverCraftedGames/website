// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

// Copy server IP
const SERVER_IP = document.getElementById('server-ip').textContent.trim();
const copyBtn = document.getElementById('copy-ip');

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(SERVER_IP);
    copyBtn.textContent = 'Copied!';
  } catch {
    copyBtn.textContent = 'Copy failed';
  }
  setTimeout(() => { copyBtn.textContent = 'Copy IP'; }, 1800);
});

// Live player count from the public mcsrvstat.us API. Stays hidden if the
// lookup fails, so the page never shows a wrong "offline".
(async () => {
  const status = document.getElementById('server-status');
  const text = document.getElementById('status-text');
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.online) {
      const n = data.players?.online ?? 0;
      text.textContent = `Online now · ${n} player${n === 1 ? '' : 's'} playing`;
      status.classList.add('online');
    } else {
      text.textContent = 'Server is offline right now';
    }
    status.hidden = false;
  } catch {
    // Network or CORS failure: leave the status line hidden.
  }
})();
