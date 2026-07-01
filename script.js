// ============================================================
// script.js — PTA ナレッジベース メインロジック
// ============================================================

// ── ユーティリティ ────────────────────────────────────────────
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const $ = id => document.getElementById(id);

// ── モード切替 ────────────────────────────────────────────────
function switchMode(mode, btn) {
  document.querySelectorAll('.mode-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  $('panel-' + mode).classList.add('active');
  if (mode === 'browse') initBrowse();
}

// ════════════════════════════════════════════════════════════
// チャットモード
// ════════════════════════════════════════════════════════════
const chatArea = $('chat-area');
const userInput = $('user-input');
const sendBtn = $('send-btn');

function addBot(html) {
  const el = document.createElement('div');
  el.className = 'msg bot';
  el.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-body"><div class="bubble">${html}</div></div>`;
  chatArea.appendChild(el);
  chatArea.scrollTop = chatArea.scrollHeight;
  return el;
}
function addUser(text) {
  const el = document.createElement('div');
  el.className = 'msg user';
  el.innerHTML = `<div class="msg-avatar">👤</div><div class="msg-body"><div class="bubble">${esc(text)}</div></div>`;
  chatArea.appendChild(el);
  chatArea.scrollTop = chatArea.scrollHeight;
}
function withTyping(ms, cb) {
  const el = document.createElement('div');
  el.className = 'msg bot';
  el.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-body"><div class="bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div></div>`;
  chatArea.appendChild(el);
  chatArea.scrollTop = chatArea.scrollHeight;
  setTimeout(() => { el.remove(); cb(); }, ms);
}
function disableChoices() {
  chatArea.querySelectorAll('.choice-btn:not(.disabled),.faq-item:not(.disabled),.cat-btn:not(.disabled)')
    .forEach(b => { b.classList.add('disabled'); b.disabled = true; });
}

// ── ウェルカム ────────────────────────────────────────────────
function showWelcome() {
  const grid = CATEGORIES.map(c =>
    `<button class="cat-btn" onclick="onCatClick('${c.id}')">
      <span class="cat-icon">${c.icon}</span>
      <span class="cat-label">${c.label}</span>
    </button>`).join('');
  addBot(`こんにちは！ PTA IT ナレッジベースです 😊<br>
    <strong>何についてお困りですか？</strong><br>カテゴリを選ぶか、お困りのことをそのまま入力してください。
    <div class="category-grid">${grid}</div>
    <div class="choice-group" style="margin-top:10px">
      <button class="choice-btn" onclick="showSpecial('handover')">🤝 引き継ぎチェックリスト</button>
      <button class="choice-btn" onclick="showSpecial('yearstart')">🌸 年度初めにやること</button>
    </div>`);
}

// ── 特別ビュー（チャットから） ──────────────────────────────
function showSpecial(type) {
  disableChoices();
  const labels = { handover: '🤝 引き継ぎで確認すること', yearstart: '🌸 年度初めにやること' };
  addUser(labels[type] || type);
  withTyping(400, () => {
    const list = type === 'handover' ? getHandoverFAQs() : getYearStartFAQs();
    renderFaqListMsg(list, labels[type]);
  });
}

// ── カテゴリ選択 ──────────────────────────────────────────────
function onCatClick(catId) {
  disableChoices();
  const cat = CATEGORIES.find(c => c.id === catId);
  addUser(cat.icon + ' ' + cat.label);
  withTyping(380, () => {
    const list = getFAQByCategory(catId);
    if (!list.length) { addBot('このカテゴリのFAQは準備中です。'); showRestartBtn(); return; }
    renderFaqListMsg(list, cat.icon + ' ' + cat.label);
  });
}

function renderFaqListMsg(list, heading) {
  const items = list.map(f =>
    `<button class="faq-item" onclick="onFaqClick('${f.id}')">${esc(f.title)}</button>`
  ).join('');
  addBot(`<strong>${esc(heading)}</strong><div class="faq-list" style="margin-top:8px">${items}</div>`);
}

// ── FAQ選択→回答 ─────────────────────────────────────────────
function onFaqClick(id) {
  disableChoices();
  const faq = getFAQById(id);
  if (!faq) return;
  addUser(faq.title);
  withTyping(550, () => renderAnswer(faq));
}

// ── 回答カードレンダリング ────────────────────────────────────
function renderAnswer(faq) {
  const a = faq;
  let html = `<div class="answer-card">`;

  // バッジ行
  html += `<div class="answer-summary">${esc(a.simpleSummary || a.title)}</div>`;
  const badges = makeBadges(faq);
  if (badges) html += `<div class="answer-meta">${badges}</div>`;

  // 詳細説明
  if (a.answer) html += `<div style="padding:10px 15px 0;font-size:.84rem;color:var(--gray-600)">${esc(a.answer)}</div>`;

  // ステップタブ
  const hasPC = a.pcSteps && a.pcSteps.length;
  const hasSP = a.smartphoneSteps && a.smartphoneSteps.length;
  const tid = 'tab_' + a.id.replace(/-/g,'_');
  if (hasPC || hasSP) {
    if (hasPC && hasSP) {
      html += `<div class="steps-tab-bar">
        <button class="tab-btn active" onclick="switchTab('${tid}','pc',this)">💻 パソコン</button>
        <button class="tab-btn" onclick="switchTab('${tid}','sp',this)">📱 スマホ</button>
      </div>`;
    }
    if (hasPC) html += `<div class="steps-panel active" id="${tid}_pc"><ol class="step-list">${buildSteps(a.pcSteps)}</ol></div>`;
    if (hasSP) html += `<div class="steps-panel ${hasPC ? '' : 'active'}" id="${tid}_sp"><ol class="step-list">${buildSteps(a.smartphoneSteps)}</ol></div>`;
  }

  // ボックス
  let boxes = '';
  (a.warnings || []).forEach(w => boxes += `<div class="box box-warning">${esc(w)}</div>`);
  (a.cautions || []).forEach(c => boxes += `<div class="box box-caution">${esc(c)}</div>`);
  if (a.commonMistakes && a.commonMistakes.length) {
    const li = a.commonMistakes.map(m => `<li>${esc(m)}</li>`).join('');
    boxes += `<div class="mistakes"><div class="mistakes-title">📝 よくある間違い</div><ul>${li}</ul></div>`;
  }
  if (boxes) html += `<div class="boxes-wrap">${boxes}</div>`;

  if (a.doneMessage) html += `<div style="padding:8px 15px 14px"><div class="box box-ok">${esc(a.doneMessage)}</div></div>`;
  html += `</div>`;

  // 関連FAQ
  const related = getRelatedFAQs(faq, 3);
  if (related.length) {
    const relItems = related.map(r =>
      `<button class="faq-item" onclick="onFaqClick('${r.id}')" style="font-size:.81rem">${esc(r.title)}</button>`
    ).join('');
    html += `<div style="margin-top:10px;font-size:.8rem;color:var(--gray-600)"><strong>📎 関連するFAQ</strong><div class="faq-list" style="margin-top:5px">${relItems}</div></div>`;
  }

  // アクションボタン
  html += `<div class="choice-group" style="margin-top:11px">
    <button class="choice-btn" onclick="showNotSolved()">まだ解決しない場合</button>
    <button class="choice-btn" onclick="onCatClick('${faq.category}')">同じカテゴリを見る</button>
    <button class="choice-btn" onclick="restartChat()">最初に戻る</button>
  </div>`;

  addBot(html);
  setTimeout(() => {
    document.querySelectorAll('.step-item').forEach((el, i) => { el.style.animationDelay = (i * .05) + 's'; });
  }, 40);
}

function buildSteps(steps) {
  return steps.map((s, i) => `<li class="step-item"><div class="step-num">${i+1}</div><div class="step-text">${esc(s)}</div></li>`).join('');
}
function switchTab(tid, mode, btn) {
  const pc = $(tid+'_pc'), sp = $(tid+'_sp');
  if (pc) pc.classList.toggle('active', mode==='pc');
  if (sp) sp.classList.toggle('active', mode==='sp');
  btn.closest('.steps-tab-bar').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// バッジHTML生成
function makeBadges(faq) {
  const parts = [];
  if ((faq.tags||[]).includes('よく聞かれる') || faq.importance==='high') parts.push(`<span class="badge badge-frequent">⭐ 毎年多い</span>`);
  if (faq.handoverRequired) parts.push(`<span class="badge badge-handover">🤝 引き継ぎ必須</span>`);
  if ((faq.tags||[]).includes('個人情報')) parts.push(`<span class="badge badge-privacy">🔒 個人情報注意</span>`);
  if ((faq.tags||[]).includes('年度初め')) parts.push(`<span class="badge badge-yearstart">🌸 年度初め</span>`);
  return parts.join('');
}

// ── 検索 ─────────────────────────────────────────────────────
function handleInput(text) {
  const q = text.trim();
  if (!q) return;
  addUser(q);
  userInput.value = '';
  autoResize();
  withTyping(580, () => {
    const results = searchFAQ(q);
    if (!results.length) {
      addBot(`「${esc(q)}」に関するFAQが見つかりませんでした 😓<br>別のキーワードで試すか、カテゴリから探してください。
        <div class="choice-group" style="margin-top:10px"><button class="choice-btn" onclick="restartChat()">カテゴリから探す</button></div>`);
      return;
    }
    if (results.length === 1) { renderAnswer(results[0]); return; }
    renderFaqListMsg(results.slice(0, 6), '以下のどれについてのご質問ですか？');
  });
}

function showNotSolved() {
  disableChoices();
  addUser('まだ解決しない場合');
  withTyping(380, () => addBot(`大丈夫です、一緒に確認しましょう 😊<br>
    <ol style="padding-left:18px;margin-top:8px;font-size:.87rem;line-height:1.9">
      <li>ブラウザを閉じて再度開く（または F5 で再読み込み）</li>
      <li>別のブラウザ（Chrome・Edge など）で試す</li>
      <li>スマホはアプリを完全終了して再起動する</li>
      <li>Googleアカウントからログアウトして再ログインする</li>
    </ol>
    <div class="box box-caution" style="margin-top:10px">
      それでも解決しない場合は、エラー画面のスクリーンショットを撮って PTA IT 担当者にお知らせください。
    </div>
    <div class="choice-group" style="margin-top:10px">
      <button class="choice-btn" onclick="restartChat()">最初に戻る</button>
    </div>`));
}
function restartChat() {
  disableChoices();
  addUser('最初に戻る');
  withTyping(280, showWelcome);
}
function showRestartBtn() {
  addBot(`<div class="choice-group"><button class="choice-btn" onclick="restartChat()">最初に戻る</button></div>`);
}

sendBtn.addEventListener('click', () => handleInput(userInput.value));
userInput.addEventListener('keydown', e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); handleInput(userInput.value); } });
userInput.addEventListener('input', autoResize);
function autoResize() { userInput.style.height='auto'; userInput.style.height=Math.min(userInput.scrollHeight,100)+'px'; }

// ════════════════════════════════════════════════════════════
// ブラウズモード
// ════════════════════════════════════════════════════════════
let browseState = { view: 'all', cat: '', query: '', initialized: false };

function initBrowse() {
  if (browseState.initialized) return;
  browseState.initialized = true;

  // カテゴリフィルタ生成
  const bar = $('cat-filter-bar');
  CATEGORIES.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'cf-btn';
    btn.textContent = c.icon + ' ' + c.label;
    btn.onclick = () => applyCatFilter(c.id, btn);
    bar.appendChild(btn);
  });
  renderBrowse();
}

function applySpecialView(view, btn) {
  document.querySelectorAll('.sv-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  browseState.view = view;
  browseState.cat = '';
  browseState.query = '';
  $('browse-input').value = '';
  document.querySelectorAll('.cf-btn').forEach(b => b.classList.remove('active'));
  $('cat-filter-bar').querySelector('.cf-btn').classList.add('active');
  renderBrowse();
}

function applyCatFilter(catId, btn) {
  document.querySelectorAll('.cf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  browseState.cat = catId;
  browseState.view = 'all';
  browseState.query = '';
  $('browse-input').value = '';
  document.querySelectorAll('.sv-btn').forEach(b => b.classList.remove('active'));
  renderBrowse();
}

let browseTimer;
function onBrowseSearch(val) {
  clearTimeout(browseTimer);
  browseTimer = setTimeout(() => {
    browseState.query = val.trim();
    browseState.view = 'all';
    browseState.cat = '';
    document.querySelectorAll('.sv-btn,.cf-btn').forEach(b => b.classList.remove('active'));
    $('cat-filter-bar').querySelector('.cf-btn').classList.add('active');
    renderBrowse();
  }, 280);
}

function renderBrowse() {
  let list;
  if (browseState.query) {
    list = searchFAQ(browseState.query);
  } else if (browseState.view === 'frequent') {
    list = getFrequentFAQs();
  } else if (browseState.view === 'handover') {
    list = getHandoverFAQs();
  } else if (browseState.view === 'yearstart') {
    list = getYearStartFAQs();
  } else if (browseState.view === 'privacy') {
    list = getPrivacyFAQs();
  } else {
    list = browseState.cat ? getFAQByCategory(browseState.cat) : getAllPublicFAQs();
  }

  const header = $('results-header');
  const grid = $('faq-card-grid');
  header.textContent = `${list.length} 件表示中`;
  grid.innerHTML = '';

  if (!list.length) {
    grid.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray-600)">該当するFAQが見つかりませんでした</div>';
    return;
  }

  list.forEach(faq => grid.appendChild(makeFaqCard(faq)));
}

function makeFaqCard(faq) {
  const cat = CATEGORIES.find(c => c.id === faq.category);
  const div = document.createElement('div');
  div.className = 'faq-card';

  const badges = makeBadges(faq);
  div.innerHTML = `
    <div class="faq-card-header">
      <span class="faq-card-cat">${cat ? cat.icon + ' ' + cat.label : faq.category}</span>
      <span class="faq-card-title">${esc(faq.title)}</span>
      <span class="toggle-icon">▼</span>
    </div>
    ${badges ? `<div class="faq-card-badges">${badges}</div>` : ''}
    <div class="faq-card-summary">${esc(faq.simpleSummary || '')}</div>
    <div class="faq-card-expand" id="expand_${faq.id.replace(/-/g,'_')}">
      ${buildExpandContent(faq)}
    </div>`;

  div.addEventListener('click', () => toggleCard(div, faq.id));
  return div;
}

function toggleCard(card, faqId) {
  const expandId = 'expand_' + faqId.replace(/-/g,'_');
  const expand = $(expandId);
  if (!expand) return;
  const isOpen = expand.classList.toggle('open');
  card.classList.toggle('expanded', isOpen);
}

function buildExpandContent(faq) {
  let html = '';
  if (faq.answer) html += `<p style="font-size:.84rem;color:var(--gray-600);margin-bottom:10px">${esc(faq.answer)}</p>`;

  const hasPC = faq.pcSteps && faq.pcSteps.length;
  const hasSP = faq.smartphoneSteps && faq.smartphoneSteps.length;
  const tid = 'btab_' + faq.id.replace(/-/g,'_');

  if (hasPC || hasSP) {
    if (hasPC && hasSP) {
      html += `<div class="steps-tab-bar" style="margin-bottom:0">
        <button class="tab-btn active" onclick="event.stopPropagation();switchTab('${tid}','pc',this)">💻 パソコン</button>
        <button class="tab-btn" onclick="event.stopPropagation();switchTab('${tid}','sp',this)">📱 スマホ</button>
      </div>`;
    }
    if (hasPC) html += `<div class="steps-panel active" id="${tid}_pc"><ol class="step-list">${buildSteps(faq.pcSteps)}</ol></div>`;
    if (hasSP) html += `<div class="steps-panel ${hasPC?'':'active'}" id="${tid}_sp"><ol class="step-list">${buildSteps(faq.smartphoneSteps)}</ol></div>`;
  }

  let boxes = '';
  (faq.warnings||[]).forEach(w => boxes += `<div class="box box-warning">${esc(w)}</div>`);
  (faq.cautions||[]).forEach(c => boxes += `<div class="box box-caution">${esc(c)}</div>`);
  if (boxes) html += `<div style="margin-top:4px">${boxes}</div>`;
  if (faq.doneMessage) html += `<div class="box box-ok" style="margin-top:8px">${esc(faq.doneMessage)}</div>`;

  if (faq.relatedFaqIds && faq.relatedFaqIds.length) {
    const rels = faq.relatedFaqIds.map(id => getFAQById(id)).filter(Boolean);
    if (rels.length) {
      const relLinks = rels.map(r =>
        `<button onclick="event.stopPropagation();jumpToFaqInBrowse('${r.id}')" style="background:none;border:none;color:var(--primary);font-size:.79rem;cursor:pointer;text-decoration:underline;font-family:var(--font)">${esc(r.title)}</button>`
      ).join(' / ');
      html += `<div style="margin-top:8px;font-size:.79rem;color:var(--gray-600)">📎 関連: ${relLinks}</div>`;
    }
  }
  return html;
}

function jumpToFaqInBrowse(faqId) {
  const faq = getFAQById(faqId);
  if (!faq) return;
  browseState.cat = faq.category;
  browseState.view = 'all';
  browseState.query = '';
  $('browse-input').value = '';
  renderBrowse();
  setTimeout(() => {
    const card = $('faq-card-grid').querySelector(`[data-id="${faqId}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// ════════════════════════════════════════════════════════════
// 管理者オーバーレイ（index.html 内）
// ════════════════════════════════════════════════════════════
$('admin-toggle').addEventListener('click', () => {
  renderModalList();
  $('admin-overlay').classList.add('open');
});
function closeAdmin() { $('admin-overlay').classList.remove('open'); }

function renderModalList() {
  const container = $('modal-faq-list');
  container.innerHTML = faqList.map(f => {
    const cat = CATEGORIES.find(c => c.id === f.category);
    return `<div class="admin-faq-row">
      <span class="faq-cat">${cat ? cat.icon+cat.label : f.category}</span>
      <span class="faq-title">${esc(f.title)}</span>
      <button class="admin-edit-btn" onclick="openEdit('${f.id}')">編集</button>
    </div>`;
  }).join('');
}
function openEdit(id) {
  const faq = getFAQById(id);
  if (!faq) return;
  $('modal-edit-form').style.display = 'block';
  $('edit-id').value = id;
  $('edit-title').value = faq.title;
  $('edit-summary').value = faq.simpleSummary || '';
  $('edit-keywords').value = (faq.keywords||[]).join(', ');
  $('modal-edit-form').scrollIntoView({ behavior: 'smooth' });
}
function saveEdit() {
  const faq = getFAQById($('edit-id').value);
  if (!faq) return;
  faq.title = $('edit-title').value.trim();
  faq.simpleSummary = $('edit-summary').value.trim();
  faq.keywords = $('edit-keywords').value.split(',').map(s=>s.trim()).filter(Boolean);
  renderModalList();
  $('modal-edit-form').style.display = 'none';
  alert('保存しました（このセッション中のみ有効）');
}

// ── 初期化 ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', showWelcome);
