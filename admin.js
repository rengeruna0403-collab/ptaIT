// ============================================================
// admin.js — PTA ナレッジベース 管理ページロジック
// ============================================================

const TEMPLATE_TEXT = `{
  id: "カテゴリ-xxx",           // 例: form-001, account-005
  category: "カテゴリID",       // CATEGORIES の id を参照
  subCategory: "",               // サブカテゴリ（省略可）
  audience: "役員",              // "役員" | "保護者" | "全員"
  year: 2025,                    // 対象年度

  title: "質問タイトル（短く具体的に）",
  simpleSummary: "一言まとめ（回答の冒頭に表示）",
  questionPatterns: [
    "ユーザーが実際に使いそうな言い方1",
    "ユーザーが実際に使いそうな言い方2"
  ],
  keywords: ["キーワード1", "キーワード2", "キーワード3"],

  answer: "回答の概要文（1〜3文）",
  pcSteps: [
    "PC手順1",
    "PC手順2",
    "PC手順3"
  ],
  smartphoneSteps: [
    "スマホ手順1",
    "スマホ手順2"
  ],

  cautions: [
    "黄色ボックスで表示される注意事項（省略可）"
  ],
  warnings: [
    "赤ボックスで表示される警告（権限・セキュリティ）（省略可）"
  ],
  commonMistakes: [
    "よくある間違い（省略可）"
  ],
  doneMessage: "完了メッセージ（緑ボックス）（省略可）",

  relatedFaqIds: ["関連FAQ-id-1", "関連FAQ-id-2"],

  lastUpdated: "2025-04-01",
  ownerMemo: "担当者メモ（公開されません）",
  visibility: "public",          // "public" | "private"
  importance: "medium",          // "high" | "medium" | "low"
  handoverRequired: false,       // 引き継ぎ必須なら true
  tags: []                       // "よく聞かれる" | "年度初め" | "引き継ぎ" | "個人情報"
},`;

// ── ソート状態 ────────────────────────────────────────────────
let sortKey = 'category';
let sortDir = 'asc';
let filteredList = [];

// ── 初期化 ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // カテゴリセレクト生成
  const sel = document.getElementById('filter-cat');
  CATEGORIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.icon + ' ' + c.label;
    sel.appendChild(opt);
  });

  document.getElementById('count-total').textContent = getAllFAQs().length;
  document.getElementById('template-code').textContent = TEMPLATE_TEXT;
  applyFilters();
  buildChecklist();
});

// ── フィルタ＆ソート ─────────────────────────────────────────
function applyFilters() {
  const cat  = document.getElementById('filter-cat').value;
  const imp  = document.getElementById('filter-imp').value;
  const vis  = document.getElementById('filter-vis').value;
  const tag  = document.getElementById('filter-tag').value;
  const text = document.getElementById('filter-text').value.trim().toLowerCase();

  let list = getAllFAQs();

  if (cat)  list = list.filter(f => f.category === cat);
  if (imp)  list = list.filter(f => f.importance === imp);
  if (vis)  list = list.filter(f => f.visibility === vis);
  if (tag)  list = list.filter(f => (f.tags||[]).includes(tag));
  if (text) list = list.filter(f =>
    f.title.toLowerCase().includes(text) ||
    f.id.toLowerCase().includes(text) ||
    (f.keywords||[]).some(k => k.toLowerCase().includes(text))
  );

  // ソート
  list.sort((a, b) => {
    const va = String(a[sortKey] ?? '');
    const vb = String(b[sortKey] ?? '');
    return sortDir === 'asc' ? va.localeCompare(vb, 'ja') : vb.localeCompare(va, 'ja');
  });

  filteredList = list;
  renderTable(list);
}

function sortTable(key) {
  if (sortKey === key) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey = key;
    sortDir = 'asc';
  }
  // ヘッダーにクラス付与
  document.querySelectorAll('.admin-table th').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (th.getAttribute('onclick') === `sortTable('${key}')`) {
      th.classList.add('sort-' + sortDir);
    }
  });
  applyFilters();
}

// ── テーブルレンダリング ──────────────────────────────────────
function renderTable(list) {
  document.getElementById('count-display').textContent = list.length;
  const tbody = document.getElementById('admin-tbody');
  tbody.innerHTML = '';

  list.forEach(f => {
    const cat = CATEGORIES.find(c => c.id === f.category);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-id">${esc(f.id)}</td>
      <td class="col-cat">${cat ? cat.icon + ' ' + cat.label : esc(f.category)}</td>
      <td class="col-title">${esc(f.title)}</td>
      <td class="col-imp"><span class="importance-dot imp-${f.importance||'low'}" title="${f.importance||''}"></span></td>
      <td class="col-vis"><span class="${f.visibility==='public'?'vis-public':'vis-private'}">${f.visibility==='public'?'●':'○'}</span></td>
      <td><div class="badge-cell">${makeBadgesAdmin(f)}</div></td>
      <td style="text-align:center">${f.handoverRequired ? '✅' : ''}</td>
      <td style="color:#999;font-size:.75rem">${esc(f.lastUpdated||'')}</td>`;
    tbody.appendChild(tr);
  });
}

function makeBadgesAdmin(faq) {
  const parts = [];
  if ((faq.tags||[]).includes('よく聞かれる') || faq.importance==='high') parts.push(`<span class="badge badge-frequent" style="font-size:.7rem">⭐</span>`);
  if (faq.handoverRequired) parts.push(`<span class="badge badge-handover" style="font-size:.7rem">🤝</span>`);
  if ((faq.tags||[]).includes('個人情報')) parts.push(`<span class="badge badge-privacy" style="font-size:.7rem">🔒</span>`);
  if ((faq.tags||[]).includes('年度初め')) parts.push(`<span class="badge badge-yearstart" style="font-size:.7rem">🌸</span>`);
  return parts.join('');
}

function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── テンプレートコピー ────────────────────────────────────────
function copyTemplate() {
  navigator.clipboard.writeText(TEMPLATE_TEXT).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✅ コピーしました！';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '📋 テンプレートをコピー'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    // フォールバック
    const ta = document.createElement('textarea');
    ta.value = TEMPLATE_TEXT;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('コピーしました');
  });
}

// ── 引き継ぎチェックリスト ────────────────────────────────────
const CHECKLIST_KEY = 'pta_handover_checklist';

function buildChecklist() {
  const items = getHandoverFAQs();
  const saved = JSON.parse(localStorage.getItem(CHECKLIST_KEY) || '{}');
  const grid = document.getElementById('checklist-grid');
  grid.innerHTML = '';

  items.forEach(faq => {
    const cat = CATEGORIES.find(c => c.id === faq.category);
    const div = document.createElement('div');
    div.className = 'checklist-item';
    const checked = saved[faq.id] ? 'checked' : '';
    div.innerHTML = `<label>
      <input type="checkbox" id="chk_${faq.id}" ${checked} onchange="saveChecklist()">
      <span><span class="ci-cat">${cat ? cat.icon + ' ' + cat.label : faq.category}</span>${esc(faq.title)}</span>
    </label>`;
    grid.appendChild(div);
  });
}

function saveChecklist() {
  const items = getHandoverFAQs();
  const state = {};
  items.forEach(f => {
    const el = document.getElementById('chk_' + f.id);
    if (el) state[f.id] = el.checked;
  });
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
}

function resetChecklist() {
  if (!confirm('チェックをすべてリセットしますか？')) return;
  localStorage.removeItem(CHECKLIST_KEY);
  buildChecklist();
}
