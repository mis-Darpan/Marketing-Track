// ── CONFIG ─────────────────────────────────────────────
const GAS_URL = "https://script.google.com/macros/s/AKfycbwuWAZ1WLRAP-1JPVGuw2A9b1t5yzt4lZwiz9xAabZImlUUHxZNUgz4TkmqB72bvKWZ2A/exec";

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
  return `<span class="badge ${map[status] || 'badge-created'}">${status || '—'}</span>`;
}

function priorityHtml(p) {
  const cls = p === 'High' ? 'priority-high' : p === 'Medium' ? 'priority-medium' : 'priority-low';
  return `<span class="${cls}">${p || '—'}</span>`;
}

// ── DATE HELPERS ────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.getDate().toString().padStart(2,'0') + '-' + MONTHS[date.getMonth()] + '-' + date.getFullYear();
}

function formatDateTime(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  const hh = date.getHours().toString().padStart(2,'0');
  const mm = date.getMinutes().toString().padStart(2,'0');
  return date.getDate().toString().padStart(2,'0') + '-' + MONTHS[date.getMonth()] + '-' + date.getFullYear() + ' ' + hh + ':' + mm;
}

function isDue(d) {
  if (!d) return false;
  return new Date(d) < new Date();
}

// ── USER CHIP INIT ──────────────────────────────────────
function initUserChip(user) {
  const avatarEl = document.getElementById('userAvatar');
  const nameEl   = document.getElementById('userName');
  if (avatarEl) avatarEl.textContent = user.name[0].toUpperCase();
  if (nameEl)   nameEl.textContent   = user.name;
}
