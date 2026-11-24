// REVENGE 4 YOU — main app
const KEY = 'revenge4u.v1';
const PEOPLE_KEY = 'revenge4u.people';

/* revenge = { id, people:[names], photo:dataURL|null, plan, createdAt,
               completedAt|null, canceledAt|null, note, favorite } */
let revenges = load(KEY, []);
let people = load(PEOPLE_KEY, []);   // remembered names, for suggestions

function load(k, def) {
  try { return JSON.parse(localStorage.getItem(k)) || def; } catch { return def; }
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(revenges));
    localStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
  } catch (e) {
    alert(t('storage_full'));
    return false;
  }
  updateBadges();
  return true;
}

const status = r => r.canceledAt ? 'canceled' : r.completedAt ? 'done' : 'active';
const endedAt = r => r.completedAt || r.canceledAt;
const names = r => (r.people && r.people.length ? r.people : [r.target || r.title || '?']);

/* ---------- navigation ---------- */
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  if (id === 'create') resetForm();
  if (id === 'active') renderActive();
  if (id === 'favorites') renderFavorites();
  if (id === 'archive') renderArchive();
  if (id === 'settings') renderSettings();
  boom.running = id === 'menu' && theme !== 'office';
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-go]');
  if (b) go(b.dataset.go);
});

/* ---------- helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dayKey = ts => { const d = new Date(ts); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; };
const fmtDay = ts => new Date(ts).toLocaleDateString(LANGS[lang].locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const fmtFull = ts => new Date(ts).toLocaleString(LANGS[lang].locale, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

function card(r) {
  const st = status(r);
  let sub = t('started', { d: fmtDay(r.createdAt) });
  if (st === 'done') sub += ' · ' + t('completed', { d: fmtDay(r.completedAt) });
  if (st === 'canceled') sub += ' · ' + t('canceled', { d: fmtDay(r.canceledAt) });
  const thumb = r.photo ? `<img class="thumb" src="${r.photo}" alt="">` : `<span class="dot"></span>`;
  return `<div class="card ${st}" data-open="${r.id}" role="button" tabindex="0">
    ${thumb}
    <div class="main">
      <div class="title">${esc(names(r).join(', '))}</div>
      ${r.plan ? `<div class="plan">${esc(r.plan)}</div>` : ''}
      <div class="sub">${sub}</div>
    </div>
    ${st === 'canceled' ? `<span class="sticker">${t('sticker')}</span>` : ''}
    <button class="star ${r.favorite ? 'on' : ''}" data-fav="${r.id}" aria-label="Favorite">⭐</button>
  </div>`;
}
const empty = (icon, text) => `<div class="empty"><div class="big">${icon}</div>${text}</div>`;
const newestFirst = (a, b) => b.createdAt - a.createdAt;

/* ---------- lists ---------- */
function renderActive() {
  const list = revenges.filter(r => status(r) === 'active').sort(newestFirst);
  document.getElementById('list-active').innerHTML =
    list.length ? list.map(card).join('') : empty('😇', t('empty_active'));
}
function renderFavorites() {
  const list = revenges.filter(r => r.favorite).sort(newestFirst);
  document.getElementById('list-favorites').innerHTML =
    list.length ? list.map(card).join('') : empty('⭐', t('empty_fav'));
}
function renderArchive() {
  // closed + canceled revenges, grouped by the day they ended, newest day on top
  const list = revenges.filter(r => status(r) !== 'active').sort((a, b) => endedAt(b) - endedAt(a));
  if (!list.length) {
    document.getElementById('list-archive').innerHTML = empty('🗂️', t('empty_archive'));
    return;
  }
  let html = '', last = null;
  for (const r of list) {
    const k = dayKey(endedAt(r));
    if (k !== last) { html += `<div class="day">${fmtDay(endedAt(r))}</div>`; last = k; }
    html += card(r);
  }
  document.getElementById('list-archive').innerHTML = html;
}
function rerender() {
  const cur = document.querySelector('.screen.active')?.id;
  if (cur === 'active') renderActive();
  if (cur === 'favorites') renderFavorites();
  if (cur === 'archive') renderArchive();
}

document.addEventListener('click', e => {
  const fav = e.target.closest('[data-fav]');
  if (fav) { e.stopPropagation(); toggleFav(fav.dataset.fav); return; }
  const open = e.target.closest('[data-open]');
  if (open) openSheet(open.dataset.open);
});

function toggleFav(id) {
  const r = revenges.find(x => x.id === id); if (!r) return;
  r.favorite = !r.favorite; save(); rerender();
  if (sheetId === id) openSheet(id);
}

/* ---------- NEW REVENGE form ---------- */
const form = document.getElementById('create-form');
const pInput = document.getElementById('person-input');
const chipsEl = document.getElementById('chips');
const suggestEl = document.getElementById('suggest');
const errEl = document.getElementById('form-err');
let chosen = [], photoData = null, sugIndex = -1;

function resetForm() {
  chosen = []; photoData = null; sugIndex = -1;
  pInput.value = ''; document.getElementById('plan-input').value = '';
  errEl.textContent = '';
  renderChips(); renderSuggest(); showPhoto();
}
function renderChips() {
  chipsEl.innerHTML = chosen.map((n, i) =>
    `<span class="chip">${esc(n)}<button type="button" data-unchip="${i}" aria-label="${esc(t('remove', { n }))}">✕</button></span>`).join('');
  pInput.placeholder = t(chosen.length ? 'add_another' : 'type_name');
}
function addPerson(name) {
  name = name.trim().replace(/\s+/g, ' ');
  if (!name) return;
  const known = people.find(p => sameName(p, name));
  if (known) name = known;
  if (!chosen.some(c => sameName(c, name))) chosen.push(name);
  pInput.value = ''; errEl.textContent = '';
  renderChips(); renderSuggest(); pInput.focus();
}
function matches() {
  const q = pInput.value.trim().toLowerCase();
  if (!q) return [];
  return people
    .filter(p => !chosen.some(c => sameName(c, p)) && p.toLowerCase().includes(q))
    .sort((a, b) => (b.toLowerCase().startsWith(q) - a.toLowerCase().startsWith(q)) || a.localeCompare(b))
    .slice(0, 6);
}
function renderSuggest() {
  const q = pInput.value.trim();
  const list = matches();
  const exact = list.some(p => sameName(p, q)) || chosen.some(c => sameName(c, q));
  const items = list.map(p => ({ name: p, label: highlight(p, q) }));
  if (q && !exact) items.push({ name: q, label: '➕ ' + esc(t('add_new', { n: q })), isNew: true });
  if (sugIndex >= items.length) sugIndex = items.length - 1;
  suggestEl.innerHTML = items.map((it, i) =>
    `<button type="button" class="sug ${it.isNew ? 'new' : ''} ${i === sugIndex ? 'sel' : ''}" data-pick="${esc(it.name)}">${it.isNew ? '' : '👤 '}${it.label}</button>`).join('');
  suggestEl.classList.toggle('open', items.length > 0);
}
function highlight(name, q) {
  const i = name.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return esc(name);
  return esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + q.length)) + '</mark>' + esc(name.slice(i + q.length));
}

pInput.addEventListener('input', () => { sugIndex = 0; renderSuggest(); });
pInput.addEventListener('keydown', e => {
  const btns = [...suggestEl.querySelectorAll('.sug')];
  if (e.key === 'ArrowDown' && btns.length) { e.preventDefault(); sugIndex = (sugIndex + 1) % btns.length; renderSuggest(); }
  else if (e.key === 'ArrowUp' && btns.length) { e.preventDefault(); sugIndex = (sugIndex - 1 + btns.length) % btns.length; renderSuggest(); }
  else if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    if (btns[sugIndex]) addPerson(btns[sugIndex].dataset.pick); else addPerson(pInput.value);
  }
  else if (e.key === 'Backspace' && !pInput.value && chosen.length) { chosen.pop(); renderChips(); }
});
pInput.addEventListener('blur', () => setTimeout(() => suggestEl.classList.remove('open'), 150));
pInput.addEventListener('focus', renderSuggest);
document.getElementById('people-box').addEventListener('click', () => pInput.focus());
suggestEl.addEventListener('mousedown', e => e.preventDefault()); // keep focus in the input
suggestEl.addEventListener('click', e => {
  const b = e.target.closest('[data-pick]'); if (b) addPerson(b.dataset.pick);
});
chipsEl.addEventListener('click', e => {
  const b = e.target.closest('[data-unchip]'); if (!b) return;
  e.stopPropagation(); chosen.splice(+b.dataset.unchip, 1); renderChips();
});

// picture: shrink it so it fits in storage
document.getElementById('photo-input').addEventListener('change', e => {
  const file = e.target.files[0]; e.target.value = '';
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    const max = 900, s = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    photoData = c.toDataURL('image/jpeg', 0.8);
    URL.revokeObjectURL(img.src); showPhoto();
  };
  img.onerror = () => { errEl.textContent = t('err_not_pic'); };
  img.src = URL.createObjectURL(file);
});
document.getElementById('photo-remove').onclick = () => { photoData = null; showPhoto(); };
function showPhoto() {
  document.getElementById('photo-pick').hidden = !!photoData;
  document.getElementById('photo-preview').hidden = !photoData;
  if (photoData) document.getElementById('photo-img').src = photoData;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (pInput.value.trim()) addPerson(pInput.value);
  const plan = document.getElementById('plan-input').value.trim();
  if (!chosen.length) { errEl.textContent = t('err_person'); pInput.focus(); return; }
  if (!plan) { errEl.textContent = t('err_plan'); document.getElementById('plan-input').focus(); return; }
  for (const n of chosen) if (!people.some(p => sameName(p, n))) people.push(n);
  const r = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    people: [...chosen], photo: photoData, plan, createdAt: Date.now(),
    completedAt: null, canceledAt: null, note: '', favorite: false };
  revenges.push(r);
  if (!save()) { revenges.pop(); return; }
  go('active');
  const el = document.querySelector(`#list-active [data-open="${r.id}"]`);
  if (el) el.classList.add('fresh');
});

/* ---------- details sheet ---------- */
const sheet = document.getElementById('sheet');
let sheetId = null;
function openSheet(id, mode) {
  const r = revenges.find(x => x.id === id); if (!r) return;
  sheetId = id;
  const st = status(r);
  const badge = t({ active: 'st_active', done: 'st_done', canceled: 'st_canceled' }[st]);
  let actions;
  if (mode === 'close') {
    actions = `
      <label class="field"><span class="lbl">${t('how_q')}</span>
        <textarea id="note-input" rows="4" placeholder="${esc(t('tell_story'))}"></textarea></label>
      <div class="actions">
        <button class="act go" data-act="confirm-close">${t('save_close')}</button>
        <button class="act" data-act="back">${t('back')}</button>
      </div>`;
  } else {
    actions = `<div class="actions">
      ${st === 'active' ? `<button class="act go" data-act="close">${t('close_btn')}</button>` : ''}
      <button class="act" data-act="fav">${t(r.favorite ? 'unfav' : 'fav')}</button>
      ${st === 'active' ? `<button class="act del" data-act="cancel">${t('delete_btn')}</button>` : ''}
    </div>`;
  }
  document.getElementById('sheet-body').innerHTML = `
    ${st === 'canceled' ? `<div class="stamp">${t('sticker')}</div>` : ''}
    <h2>${esc(names(r).join(', '))}</h2>
    <span class="status ${st}">${badge}</span>
    ${r.photo ? `<img class="sheet-photo" src="${r.photo}" alt="">` : ''}
    <div class="info">
      <div><b>${t(names(r).length > 1 ? 'targets' : 'target')}</b>${names(r).map(n => `<span class="chip sm">${esc(n)}</span>`).join(' ')}</div>
      ${r.plan ? `<div><b>${t('plan')}</b>${esc(r.plan).replace(/\n/g, '<br>')}</div>` : ''}
      <div><b>${t('started_lbl')}</b>${fmtFull(r.createdAt)}</div>
      ${r.completedAt ? `<div><b>${t('completed_lbl')}</b>${fmtFull(r.completedAt)}</div>` : ''}
      ${r.canceledAt ? `<div><b>${t('canceled_lbl')}</b>${fmtFull(r.canceledAt)}</div>` : ''}
      ${r.note ? `<div><b>${t('how_went')}</b>${esc(r.note).replace(/\n/g, '<br>')}</div>` : ''}
    </div>
    ${actions}`;
  sheet.classList.add('open');
  if (mode === 'close') setTimeout(() => document.getElementById('note-input')?.focus(), 250);
}
function closeSheet() { sheet.classList.remove('open'); sheetId = null; }
document.getElementById('sheet-close').onclick = closeSheet;
sheet.addEventListener('click', e => {
  if (e.target === sheet) return closeSheet();
  const a = e.target.closest('[data-act]'); if (!a) return;
  const r = revenges.find(x => x.id === sheetId); if (!r) return;
  switch (a.dataset.act) {
    case 'close': return openSheet(r.id, 'close');
    case 'back': return openSheet(r.id);
    case 'confirm-close':
      r.completedAt = Date.now();
      r.note = document.getElementById('note-input').value.trim();
      save(); closeSheet(); rerender(); return;
    case 'cancel':
      if (!confirm(t('confirm_cancel'))) return;
      r.canceledAt = Date.now();
      save(); closeSheet(); rerender(); return;
    case 'fav':
      r.favorite = !r.favorite; save(); rerender(); return openSheet(r.id);
  }
});

function updateBadges() {
  const a = revenges.filter(r => status(r) === 'active').length;
  const f = revenges.filter(r => r.favorite).length;
  document.getElementById('badge-active').textContent = a || '';
  document.getElementById('badge-fav').textContent = f || '';
}

/* ---------- explosion effect ---------- */
const boom = (() => {
  const cv = document.getElementById('boom'), ctx = cv.getContext('2d');
  let W, H, parts = [], flash = 0, t = 0;
  const state = { running: true };
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = [];
  }
  function burst() {
    flash = 1;
    const cx = W / 2, cy = H / 2;
    for (let i = 0; i < 140; i++) {
      const a = Math.random() * Math.PI * 2, s = 1.5 + Math.random() * 7;
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s * .8,
        life: 1, decay: .008 + Math.random() * .02, r: 1 + Math.random() * 3.5,
        hue: 10 + Math.random() * 45, smoke: Math.random() < .25 });
    }
  }
  function frame() {
    requestAnimationFrame(frame);
    if (!state.running) return;
    t++;
    if (t % 160 === 1) burst();
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * .55);
    g.addColorStop(0, `rgba(255,200,80,${.35 + flash * .5})`);
    g.addColorStop(.25, `rgba(255,90,20,${.25 + flash * .3})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .003);
    for (let i = 0; i < 16; i++) {
      ctx.rotate(Math.PI * 2 / 16);
      ctx.fillStyle = `rgba(255,${120 + (i % 2) * 60},40,${.06 + flash * .08})`;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-18, -Math.max(W, H)); ctx.lineTo(18, -Math.max(W, H)); ctx.fill();
    }
    ctx.restore();
    ctx.globalCompositeOperation = 'lighter';
    parts = parts.filter(p => p.life > 0);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vx *= .985; p.vy = p.vy * .985 + .03; p.life -= p.decay;
      ctx.fillStyle = p.smoke ? `rgba(90,60,50,${p.life * .25})` : `hsla(${p.hue},100%,${50 + p.life * 30}%,${p.life})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.smoke ? p.r * 4 * (2 - p.life) : p.r, 0, 7); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    flash *= .93;
  }
  addEventListener('resize', size);
  addEventListener('resize-canvas', () => requestAnimationFrame(size));
  size(); frame();
  return state;
})();

/* ---------- settings ---------- */
const VIEW_KEY = 'revenge4u.view';
let viewMode = 'auto';
try { viewMode = localStorage.getItem(VIEW_KEY) || 'auto'; } catch {}

function applyView() {
  const pc = viewMode === 'pc' || (viewMode === 'auto' && innerWidth >= 900);
  document.body.classList.toggle('pc', pc);
  document.querySelectorAll('#seg-view [data-view]').forEach(b => b.classList.toggle('on', b.dataset.view === viewMode));
  dispatchEvent(new Event('resize-canvas'));
}
document.getElementById('seg-view').addEventListener('click', e => {
  const b = e.target.closest('[data-view]'); if (!b) return;
  viewMode = b.dataset.view;
  try { localStorage.setItem(VIEW_KEY, viewMode); } catch {}
  applyView();
});
addEventListener('resize', applyView);

function renderSettings() {
  const n = revenges.length;
  document.getElementById('set-count').textContent =
    (n ? t('count', n) : t('none_saved')) + (people.length ? ' ' + t('people', people.length) : '');
  document.getElementById('wipe').disabled = !n && !people.length;
}
document.getElementById('wipe').onclick = () => {
  if (!confirm(t('confirm_wipe'))) return;
  revenges = []; people = []; save(); renderSettings();
};

/* ---------- design (original / office) ---------- */
let theme = 'original';
try { if (localStorage.getItem('revenge4u.theme') === 'office') theme = 'office'; } catch {}
function applyTheme() {
  document.body.classList.toggle('office', theme === 'office');
  document.querySelector('meta[name=theme-color]').content = theme === 'office' ? '#ffffff' : '#0a0507';
  document.querySelectorAll('#seg-theme [data-theme]').forEach(b => b.classList.toggle('on', b.dataset.theme === theme));
  boom.running = theme !== 'office' && document.getElementById('menu').classList.contains('active');
}
document.getElementById('seg-theme').addEventListener('click', e => {
  const b = e.target.closest('[data-theme]'); if (!b) return;
  theme = b.dataset.theme;
  try { localStorage.setItem('revenge4u.theme', theme); } catch {}
  applyTheme();
});
applyTheme();

/* ---------- language ---------- */
const langSeg = document.getElementById('seg-lang');
langSeg.innerHTML = Object.entries(LANGS).map(([k, v]) => `<button data-lang="${k}" lang="${k}">${v.name}</button>`).join('');
langSeg.addEventListener('click', e => {
  const b = e.target.closest('[data-lang]'); if (!b) return;
  setLang(b.dataset.lang);
});
function setLang(l) {
  lang = l;
  try { localStorage.setItem('revenge4u.lang', l); } catch {}
  applyLang();
  langSeg.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  renderChips(); renderSettings(); renderInstall(); rerender();
  if (sheetId) openSheet(sheetId);
}

/* ---------- install as an app ---------- */
let installEvt = null;
const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function renderInstall() {
  const group = document.getElementById('install-group');
  group.hidden = standalone();
  if (group.hidden) return;
  document.getElementById('install-btn').hidden = !installEvt;
  document.getElementById('install-hint').textContent =
    installEvt ? t('install_hint') : isIOS ? t('install_ios') : t('install_hint') + ' ' + t('install_other');
}
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; renderInstall(); });
addEventListener('appinstalled', () => { installEvt = null; renderInstall(); });
document.getElementById('install-btn').onclick = async () => {
  if (!installEvt) return;
  installEvt.prompt();
  await installEvt.userChoice;
  installEvt = null; renderInstall();
};
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

setLang(lang);
applyView();
updateBadges();
