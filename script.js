// ── CONFIG ─────────────────────────────────────────────
const GAS_URL = "https://script.google.com/macros/s/AKfycby6-6K7VZhdr7HbPpEFp_pF3rQ5yd68fN1pCkcm4dMNXailoQhdpMDvQhh4nhg3xWq3xQ/exec";

// ── API CALL ────────────────────────────────────────────
async function api(body) {
  const res = await fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return res.json();
}

// ── AUTH ────────────────────────────────────────────────
function getUser() {
  const u = sessionStorage.getItem('lmh_user');
  if (!u) { window.location.href = 'index.html'; return null; }
  return JSON.parse(u);
}

function logout() {
  sessionStorage.clear();
  window.location.href = 'index.html';
}

// ── SECTION TOGGLE ──────────────────────────────────────
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
}

// ── TOAST ───────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── MODAL ───────────────────────────────────────────────
function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

// ── BADGE HELPERS ───────────────────────────────────────
function badgeHtml(status) {
  const map = {
    'Created':     'badge-created',
    'Assigned':    'badge-assigned',
    'In Progress': 'badge-inprogress',
    'Review':      'badge-review',
    'Approved':    'badge-approved',
    'Rejected':    'badge-rejected'
  };
  return `<span class="badge ${map[status] || 'badge-created'}">${status}</span>`;
}

function priorityHtml(p) {
  const cls = p === 'High' ? 'priority-high' : p === 'Medium' ? 'priority-medium' : 'priority-low';
  return `<span class="${cls}">${p || '—'}</span>`;
}

function isDue(d) {
  return d ? new Date(d) < new Date() : false;
}

// ── USER CHIP INIT ──────────────────────────────────────
function initUserChip(user) {
  const avatarEl = document.getElementById('userAvatar');
  const nameEl   = document.getElementById('userName');
  if (avatarEl) avatarEl.textContent = user.name[0].toUpperCase();
  if (nameEl)   nameEl.textContent   = user.name;
}
