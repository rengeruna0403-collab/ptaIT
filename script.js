// ============================================================
// script.js — PTA IT サポートチャットボット メインロジック
// ============================================================

const state = {
  mode: "welcome",
  currentCategory: null,
  activeTab: "pc",
};

const chatArea  = document.getElementById("chat-area");
const userInput = document.getElementById("user-input");
const sendBtn   = document.getElementById("send-btn");

// ── ユーティリティ ────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function scrollToBottom() { chatArea.scrollTop = chatArea.scrollHeight; }

// ── メッセージ追加 ────────────────────────────────────────────
function addBotMessage(html) {
  const el = document.createElement("div");
  el.className = "msg bot";
  el.innerHTML = `<div class="msg-avatar">🤖</div>
    <div class="msg-body"><div class="bubble">${html}</div></div>`;
  chatArea.appendChild(el);
  scrollToBottom();
  return el;
}

function addUserMessage(text) {
  const el = document.createElement("div");
  el.className = "msg user";
  el.innerHTML = `<div class="msg-avatar">👤</div>
    <div class="msg-body"><div class="bubble">${escHtml(text)}</div></div>`;
  chatArea.appendChild(el);
  scrollToBottom();
}

function withTyping(ms, cb) {
  const el = document.createElement("div");
  el.className = "msg bot";
  el.innerHTML = `<div class="msg-avatar">🤖</div>
    <div class="msg-body"><div class="bubble">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div></div>`;
  chatArea.appendChild(el);
  scrollToBottom();
  setTimeout(() => { el.remove(); cb(); }, ms);
}

// 直前の選択肢を無効化（押し直し防止）
function disableLastChoices() {
  chatArea.querySelectorAll(".choice-btn:not(.disabled),.faq-item:not(.disabled),.cat-btn:not(.disabled)")
    .forEach(b => { b.classList.add("disabled"); b.disabled = true; });
}

// ── ウェルカム ────────────────────────────────────────────────
function showWelcome() {
  state.mode = "welcome";
  const grid = CATEGORIES.map(c => `
    <button class="cat-btn" onclick="onCategoryClick('${c.id}')">
      <span class="cat-icon">${c.icon}</span>
      <span class="cat-label">${c.label}</span>
      <span class="cat-desc">${c.desc}</span>
    </button>`).join("");
  addBotMessage(`
    こんにちは！ PTA IT サポートチャットボットです 😊<br>
    <strong>何についてお困りですか？</strong><br>
    カテゴリを選ぶか、お困りのことをそのまま入力してください。
    <div class="category-grid">${grid}</div>`);
}

// ── カテゴリ選択 ──────────────────────────────────────────────
function onCategoryClick(catId) {
  disableLastChoices();
  const cat = CATEGORIES.find(c => c.id === catId);
  addUserMessage(cat.icon + " " + cat.label);
  state.currentCategory = catId;

  withTyping(400, () => {
    // カテゴリトップのambiguous FAQがあればそちらを優先
    const topFaq = getCategoryTopFAQ(catId);
    if (topFaq) { showClarifyOptions(topFaq); return; }

    // なければFAQ一覧を表示
    showFaqList(catId, cat);
  });
}

function showFaqList(catId, cat) {
  const faqs = getFAQByCategory(catId);
  if (!faqs.length) {
    addBotMessage("このカテゴリのFAQは準備中です。別のキーワードで検索してみてください。");
    showRestartBtn();
    return;
  }
  const items = faqs.map(f =>
    `<button class="faq-item" onclick="onFAQClick('${f.id}')">${escHtml(f.title)}</button>`
  ).join("");
  addBotMessage(`
    <strong>${cat ? cat.icon + " " + cat.label : ""}</strong> についてのよくある質問です。<br>
    当てはまるものを選んでください。
    <div class="faq-list">${items}</div>`);
  userInput.placeholder = "キーワードで検索することもできます（例：PDF にしたい）";
}

// ── FAQ 選択 ──────────────────────────────────────────────────
function onFAQClick(faqId) {
  disableLastChoices();
  const faq = getFAQById(faqId);
  if (!faq) return;
  addUserMessage(faq.title);
  if (faq.ambiguous && faq.clarifyOptions) {
    withTyping(500, () => showClarifyOptions(faq));
  } else {
    withTyping(600, () => showAnswer(faq));
  }
}

// ── 曖昧質問 → 選択肢 ────────────────────────────────────────
function showClarifyOptions(faq) {
  state.mode = "ambiguous";
  const btns = faq.clarifyOptions.map(opt =>
    `<button class="choice-btn" onclick="onFAQClick('${opt.faqId}')">${escHtml(opt.label)}</button>`
  ).join("");
  addBotMessage(`
    もう少し詳しく教えてください。どちらに近いですか？
    <div class="choice-group">${btns}</div>`);
}

// ── 回答カード ────────────────────────────────────────────────
function showAnswer(faq) {
  state.mode = "answer";
  const a = faq.answer;
  let html = `<div class="answer-card">
    <div class="answer-summary">💬 ${escHtml(a.summary)}</div>`;

  if (a.cause) {
    html += `<div style="padding:10px 16px 0;font-size:.84rem;color:var(--gray-600)">
      <strong>📌 原因として考えられること：</strong><br>${escHtml(a.cause)}</div>`;
  }

  const hasPC = a.steps_pc && a.steps_pc.length;
  const hasSP = a.steps_sp && a.steps_sp.length;
  const tabId = "tab_" + faq.id;

  if (hasPC || hasSP) {
    if (hasPC && hasSP) {
      html += `<div class="steps-tab-bar">
        <button class="tab-btn active" onclick="switchTab('${tabId}','pc',this)">💻 パソコン</button>
        <button class="tab-btn" onclick="switchTab('${tabId}','sp',this)">📱 スマホ</button>
      </div>`;
    }
    if (hasPC) html += `<div class="steps-panel ${hasSP ? 'active' : 'active'}" id="${tabId}_pc">
      <ol class="step-list">${buildSteps(a.steps_pc)}</ol></div>`;
    if (hasSP) html += `<div class="steps-panel ${hasPC ? '' : 'active'}" id="${tabId}_sp">
      <ol class="step-list">${buildSteps(a.steps_sp)}</ol></div>`;
  }

  // ボックス類
  let boxes = "";
  if (a.warning) boxes += `<div class="box box-warning">${escHtml(a.warning)}</div>`;
  if (a.caution) boxes += `<div class="box box-caution">${escHtml(a.caution)}</div>`;
  if (a.next)    boxes += `<div class="box box-next"><strong>うまくいかない場合：</strong><br>${escHtml(a.next)}</div>`;
  if (a.mistakes && a.mistakes.length) {
    const li = a.mistakes.map(m => `<li>${escHtml(m)}</li>`).join("");
    boxes += `<div class="mistakes"><div class="mistakes-title">📝 よくある間違い</div><ul>${li}</ul></div>`;
  }
  if (boxes) html += `<div style="padding:0 16px 4px">${boxes}</div>`;

  if (a.done) {
    html += `<div style="padding:8px 16px 14px">
      <div class="box box-ok">${escHtml(a.done)}</div></div>`;
  }
  html += `</div>`;

  // 関連FAQ
  const related = getRelatedFAQs(faq, 3);
  if (related.length) {
    const relBtns = related.map(r =>
      `<button class="faq-item" onclick="onFAQClick('${r.id}')" style="font-size:.82rem">${escHtml(r.title)}</button>`
    ).join("");
    html += `<div style="margin-top:10px;font-size:.82rem;color:var(--gray-600)">
      <strong>📎 関連するFAQ</strong>
      <div class="faq-list" style="margin-top:6px">${relBtns}</div></div>`;
  }

  // アクションボタン
  html += `<div class="choice-group" style="margin-top:12px">
    <button class="choice-btn" onclick="showStillNotSolved()">まだ解決しない場合</button>
    <button class="choice-btn" onclick="showCategoryFAQs('${faq.category}')">同じカテゴリを見る</button>
    <button class="choice-btn" onclick="restartChat()">最初に戻る</button>
  </div>`;

  addBotMessage(html);
  setTimeout(() => {
    document.querySelectorAll(".step-item").forEach((el, i) => {
      el.style.animationDelay = (i * 0.06) + "s";
    });
  }, 50);
}

function buildSteps(steps) {
  return steps.map((s, i) => `
    <li class="step-item">
      <div class="step-num">${i + 1}</div>
      <div class="step-text">${escHtml(s)}</div>
    </li>`).join("");
}

function switchTab(tabId, mode, btn) {
  const pc = document.getElementById(tabId + "_pc");
  const sp = document.getElementById(tabId + "_sp");
  if (pc) pc.classList.toggle("active", mode === "pc");
  if (sp) sp.classList.toggle("active", mode === "sp");
  btn.closest(".steps-tab-bar").querySelectorAll(".tab-btn")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// 同カテゴリで関連FAQ（同じカテゴリ・非ambiguous・自分以外）を最大n件返す
function getRelatedFAQs(faq, n) {
  return faqList.filter(f =>
    f.category === faq.category && f.id !== faq.id && !f.ambiguous
  ).slice(0, n);
}

// ── 同カテゴリFAQ一覧を再表示 ────────────────────────────────
function showCategoryFAQs(catId) {
  disableLastChoices();
  const cat = CATEGORIES.find(c => c.id === catId);
  addUserMessage(cat ? cat.icon + " " + cat.label + " の一覧" : "カテゴリ一覧");
  withTyping(300, () => showFaqList(catId, cat));
}

// ── 解決しない場合 ────────────────────────────────────────────
function showStillNotSolved() {
  disableLastChoices();
  addUserMessage("まだ解決しない場合");
  withTyping(400, () => {
    addBotMessage(`
      大丈夫です、一緒に確認しましょう 😊<br><br>
      以下をお試しください：
      <ol style="padding-left:18px;margin-top:8px;font-size:.88rem;line-height:1.9">
        <li>ブラウザを一度閉じて再度開く</li>
        <li>別のブラウザ（Chrome や Edge）で試す</li>
        <li>スマホの場合はアプリを終了して再起動する</li>
        <li>Googleアカウントからログアウトして再ログインする</li>
        <li>インターネット接続が安定しているか確認する</li>
      </ol>
      <div class="box box-caution" style="margin-top:10px">
        それでも解決しない場合は、エラー画面のスクリーンショットを撮って、PTA IT担当者へお知らせください。
      </div>
      <div class="choice-group" style="margin-top:10px">
        <button class="choice-btn" onclick="restartChat()">最初に戻る</button>
      </div>`);
  });
}

// ── フリーテキスト検索 ────────────────────────────────────────
function handleUserInput(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  addUserMessage(trimmed);
  userInput.value = "";
  autoResize();

  withTyping(600, () => {
    const results = searchFAQ(trimmed);

    if (!results.length) {
      addBotMessage(`
        「${escHtml(trimmed)}」に関するFAQが見つかりませんでした 😓<br>
        別のキーワードで試すか、カテゴリから探してみてください。
        <div class="choice-group" style="margin-top:10px">
          <button class="choice-btn" onclick="restartChat()">カテゴリから探す</button>
        </div>`);
      return;
    }

    // 完全一致に近い1件だけ → 直接回答
    if (results.length === 1) {
      results[0].ambiguous ? showClarifyOptions(results[0]) : showAnswer(results[0]);
      return;
    }

    // 複数候補 → 最大5件提案
    const items = results.slice(0, 5).map(f =>
      `<button class="faq-item" onclick="onFAQClick('${f.id}')">${escHtml(f.title)}</button>`
    ).join("");
    addBotMessage(`
      以下のどれについてのご質問ですか？
      <div class="faq-list">${items}</div>
      <div class="choice-group" style="margin-top:8px">
        <button class="choice-btn" onclick="restartChat()">カテゴリから探す</button>
      </div>`);
  });
}

// ── 最初に戻る ────────────────────────────────────────────────
function restartChat() {
  disableLastChoices();
  addUserMessage("最初に戻る");
  withTyping(300, () => showWelcome());
}

function showRestartBtn() {
  addBotMessage(`<div class="choice-group">
    <button class="choice-btn" onclick="restartChat()">最初に戻る</button>
  </div>`);
}

// ── テキストエリア自動リサイズ ────────────────────────────────
function autoResize() {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 100) + "px";
}

// ── 管理者パネル ──────────────────────────────────────────────
const adminPanel  = document.getElementById("admin-panel");
const adminToggle = document.getElementById("admin-toggle");
const adminClose  = document.getElementById("admin-close");

function openAdmin()  { renderAdminList(); adminPanel.classList.add("open"); }
function closeAdmin() {
  adminPanel.classList.remove("open");
  document.getElementById("admin-edit-form").style.display = "none";
}

adminToggle.addEventListener("click", openAdmin);
adminClose.addEventListener("click",  closeAdmin);
adminPanel.addEventListener("click",  e => { if (e.target === adminPanel) closeAdmin(); });

function renderAdminList() {
  const container = document.getElementById("admin-faq-container");
  container.innerHTML = faqList.map(f => {
    const cat = CATEGORIES.find(c => c.id === f.category);
    return `<div class="admin-faq-row">
      <span class="faq-cat">${cat ? cat.icon + cat.label : f.category}</span>
      <span class="faq-title">${escHtml(f.title)}</span>
      <button class="admin-edit-btn" onclick="adminEdit('${f.id}')">編集</button>
    </div>`;
  }).join("");
}

function adminEdit(faqId) {
  const faq = getFAQById(faqId);
  if (!faq) return;
  const form = document.getElementById("admin-edit-form");
  form.style.display = "block";
  document.getElementById("edit-id").value      = faq.id;
  document.getElementById("edit-title").value   = faq.title;
  document.getElementById("edit-summary").value = faq.answer ? faq.answer.summary : "";
  document.getElementById("edit-keywords").value = faq.keywords.join(", ");
  form.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("admin-save-btn").addEventListener("click", () => {
  const faq = getFAQById(document.getElementById("edit-id").value);
  if (!faq) return;
  faq.title = document.getElementById("edit-title").value.trim();
  if (faq.answer) faq.answer.summary = document.getElementById("edit-summary").value.trim();
  faq.keywords = document.getElementById("edit-keywords").value
    .split(",").map(s => s.trim()).filter(Boolean);
  renderAdminList();
  document.getElementById("admin-edit-form").style.display = "none";
  alert("保存しました（このセッション中のみ有効です）");
});

document.getElementById("admin-cancel-btn").addEventListener("click", () => {
  document.getElementById("admin-edit-form").style.display = "none";
});

// ── 送信イベント ──────────────────────────────────────────────
sendBtn.addEventListener("click", () => handleUserInput(userInput.value));
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleUserInput(userInput.value); }
});
userInput.addEventListener("input", autoResize);

// ── 初期化 ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => showWelcome());
