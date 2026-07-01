// ============================================================
// faqData.js — PTA連合会 ナレッジベース データ管理
// ============================================================

const CATEGORIES = [
  { id: "form",      label: "Googleフォーム",      icon: "📋", color: "#1a73e8", desc: "作成・配布・回答・集計" },
  { id: "sheet",     label: "スプレッドシート",     icon: "📊", color: "#0f9d58", desc: "表・集計・Excel変換" },
  { id: "document",  label: "ドキュメント",         icon: "📄", color: "#4285f4", desc: "文書作成・PDF化" },
  { id: "slide",     label: "スライド",             icon: "🖼️", color: "#f4b400", desc: "プレゼン・PowerPoint変換" },
  { id: "drive",     label: "ドライブ共有",         icon: "📁", color: "#fbbc04", desc: "ファイル共有・権限設定" },
  { id: "account",   label: "共有Googleアカウント", icon: "🔑", color: "#ea4335", desc: "ログイン・2段階認証・引き継ぎ" },
  { id: "calendar",  label: "共有カレンダー",       icon: "📅", color: "#34a853", desc: "予定の追加・共有・通知" },
  { id: "pdf",       label: "PDF・印刷",            icon: "🖨️", color: "#5f6368", desc: "PDF保存・コンビニ印刷" },
  { id: "handover",  label: "PTA引き継ぎ",          icon: "🤝", color: "#e91e63", desc: "チェックリスト・年度末対応" },
  { id: "general",   label: "総会・会計・広報",     icon: "📢", color: "#9c27b0", desc: "資料作成・イベント運営" },
  { id: "privacy",   label: "個人情報管理",         icon: "🔒", color: "#795548", desc: "名簿・共有範囲・削除ルール" },
  { id: "trouble",   label: "トラブル対応",         icon: "⚠️", color: "#ff5722", desc: "エラー・開けない・ログインできない" },
];

// 特別ビュー定義（絞り込みボタン）
const SPECIAL_VIEWS = [
  { id: "frequent",  label: "よくある質問",           icon: "⭐", desc: "問い合わせが多い質問" },
  { id: "handover",  label: "引き継ぎで確認すること", icon: "🤝", desc: "年度末・年度初めに必須確認" },
  { id: "yearstart", label: "年度初めによくある質問", icon: "🌸", desc: "4月に多く来る問い合わせ" },
  { id: "privacy",   label: "個人情報注意の項目",     icon: "🔒", desc: "個人情報に関わる操作" },
];

// ============================================================
// faqList — PTA ナレッジベース
// スキーマ説明は README.md を参照
// ============================================================
const faqList = [

  // ── Googleフォーム ──────────────────────────────────────────
  {
    id: "form-001",
    category: "form",
    subCategory: "新規作成",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "Googleフォームを新規作成する",
    questionPatterns: ["フォームを作りたい", "アンケートを作りたい", "申込フォームを作りたい"],
    keywords: ["フォーム", "新規", "作成", "アンケート", "申込", "form"],
    simpleSummary: "forms.google.com を開いて「＋」を押すだけで作れます。",
    answer: "Googleフォームは無料で使えるアンケート・申込フォーム作成ツールです。PCでもスマホでも作成でき、回答は自動でクラウドに集まります。",
    pcSteps: [
      "ブラウザで「forms.google.com」を開きます",
      "「＋ 空白のフォーム」をクリックします",
      "「無題のフォーム」をクリックしてタイトルを入力します",
      "「フォームの説明」に目的・締切を入力します（省略可）",
      "「無題の質問」をクリックして最初の質問を入力します",
      "右上「送信」ボタンでリンクを取得して配布します ✅"
    ],
    smartphoneSteps: [
      "「Google フォーム」アプリをインストールします",
      "アプリを開いて「＋」をタップします",
      "タイトルと質問を入力します",
      "右上「⋮」→「送信」でリンクを取得します ✅"
    ],
    cautions: ["スマホでの編集は画面が狭いため、最初の設定はPCで行うのがおすすめです"],
    warnings: [],
    commonMistakes: [
      "編集用URLを回答者に送ってしまう（「送信」ボタンから取得したURLのみ配布してください）",
      "回答受付を終了し忘れる（締切日にフォームを確認しましょう）"
    ],
    doneMessage: "ここまでできたらOKです 🎉 フォームが作成されました！",
    relatedFaqIds: ["form-003", "form-004", "form-005"],
    lastUpdated: "2026-07-01",
    ownerMemo: "年度初め・イベント前に毎年聞かれる",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる", "年度初め"],
  },

  {
    id: "form-002",
    category: "form",
    subCategory: "質問設定",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "質問の種類と使い分け（記述式・ラジオ・チェックボックス等）",
    questionPatterns: ["記述式", "ラジオボタン", "チェックボックス", "プルダウン", "質問の種類"],
    keywords: ["質問", "種類", "記述式", "ラジオボタン", "チェックボックス", "プルダウン", "日付", "選択肢"],
    simpleSummary: "回答を1つだけ選ばせたい→ラジオボタン、複数選ばせたい→チェックボックス、自由記述→記述式。",
    answer: "質問の種類を正しく選ぶと集計が楽になります。目的別の使い分けを確認してください。",
    pcSteps: [
      "【記述式】→ 名前・住所・意見など自由に文章を書かせたい場合",
      "【ラジオボタン（選択式）】→ 1つだけ選ばせたい場合（参加する／しない）",
      "【チェックボックス】→ 複数選んでよい場合（希望曜日を全部選んでください）",
      "【プルダウン】→ 選択肢が多い場合（学年・クラスを選ばせたい）",
      "【日付】→ 生年月日・希望日を入れてもらいたい場合",
      "【時刻】→ 希望時間帯を選ばせたい場合",
      "質問種類は質問カード右側の「▼」から変更できます ✅"
    ],
    smartphoneSteps: [
      "質問カードの「▼」をタップして種類を変更します ✅"
    ],
    cautions: ["名前・クラス・連絡先を集める場合は「記述式」＋「必須」の組み合わせが便利です"],
    warnings: [],
    commonMistakes: ["チェックボックスとラジオボタンを逆に使い、複数回答できなくなる"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-001", "form-003"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "form-003",
    category: "form",
    subCategory: "設定",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "必須回答にする・1人1回に制限する",
    questionPatterns: ["必須にしたい", "1回しか回答させたくない", "重複回答を防ぎたい"],
    keywords: ["必須", "1回", "制限", "重複", "required"],
    simpleSummary: "「必須」はトグルをON、1回制限は設定の「回答を1回に制限する」をONにします。",
    answer: "必須回答はトグル操作のみ。1回制限はGoogleアカウントログインが必須になるため保護者環境に注意が必要です。",
    pcSteps: [
      "【必須にする】質問カード右下の「必須」トグルをONにします",
      "【1回制限】⚙️設定→「回答」タブ→「回答を1回に制限する」をONにします ✅"
    ],
    smartphoneSteps: [
      "【必須】質問をタップして下部「必須」スイッチをONにします",
      "【1回制限】「⋮」→「設定」→「回答を1回に制限する」をONにします ✅"
    ],
    cautions: ["必須にしすぎると回答者が途中でやめてしまいます。本当に必要な項目だけ必須にしましょう"],
    warnings: ["1回制限をONにすると回答者はGoogleアカウントへのログインが必須になります。アカウントを持っていない保護者は回答できなくなる場合があります！"],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-001", "form-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  {
    id: "form-004",
    category: "form",
    subCategory: "配布",
    audience: ["単位PTA役員", "連合会役員", "保護者"],
    year: "共通",
    title: "フォームURLを配布する・QRコードを作る",
    questionPatterns: ["フォームを送りたい", "URLを短くしたい", "QRコードを作りたい"],
    keywords: ["配布", "url", "リンク", "短縮", "qr", "qrコード", "送る"],
    simpleSummary: "「送信」→「🔗リンク」でURLをコピー。QRコードは無料サービスで作れます。",
    answer: "フォームのURLは「送信」ボタンから取得します。短縮URLやQRコードで配布すると便利です。",
    pcSteps: [
      "フォーム右上「送信」をクリックします",
      "「🔗 リンク」タブをクリックします",
      "「短縮URLを使用する」にチェックを入れると短いURLになります",
      "「コピー」してメール・LINEに貼り付けます ✅",
      "【QRコード】ブラウザで「QRコード 作成」と検索して無料サービスを使います",
      "フォームURLを貼り付けてQRコードを生成→画像保存→印刷物に貼り付けます ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「送信」→リンクアイコンをタップしてコピーします ✅"
    ],
    cautions: [
      "フォームを送る前に自分でテスト回答して動作確認しましょう",
      "QRコードは最低2cm×2cm以上のサイズで印刷すると読み取りやすくなります"
    ],
    warnings: [],
    commonMistakes: ["編集画面のURLを配布してしまう（「送信」から取得したURLのみ使用してください）"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-001", "form-005"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "form-005",
    category: "form",
    subCategory: "回答確認",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "回答をスプレッドシートで確認・集計する",
    questionPatterns: ["回答を見たい", "集計したい", "スプレッドシートで見たい"],
    keywords: ["回答", "集計", "スプレッドシート", "確認", "一覧"],
    simpleSummary: "「回答」タブ→緑のスプレッドシートアイコンで連携できます。",
    answer: "フォームの回答はスプレッドシートに自動連携できます。以降の回答もリアルタイムで追加されます。",
    pcSteps: [
      "フォームの「回答」タブをクリックします",
      "右上の緑のスプレッドシートアイコンをクリックします",
      "「新しいスプレッドシートを作成」を選び「作成」をクリックします",
      "スプレッドシートが開き、回答一覧が表示されます ✅",
      "以降の回答も自動で追加されます"
    ],
    smartphoneSteps: [
      "フォームアプリ「回答」タブ→「スプレッドシートで表示」をタップします ✅"
    ],
    cautions: ["スプレッドシートに連携する前に届いた回答も自動で入ります"],
    warnings: [],
    commonMistakes: [
      "「質問」タブを見ている（「回答」タブに切り替えてください）",
      "スプレッドシートを更新しないと最新の回答が表示されない場合があります（F5で再読み込み）"
    ],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-006", "sheet-004"],
    lastUpdated: "2026-07-01",
    ownerMemo: "集計後に別シートにコピーして分析するのがおすすめ",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "form-006",
    category: "form",
    subCategory: "回答管理",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "回答受付を終了する・再開する",
    questionPatterns: ["受付を終了したい", "締め切りたい", "回答を止めたい"],
    keywords: ["受付終了", "締切", "停止", "終了", "閉じる"],
    simpleSummary: "「回答」タブのトグルをOFFにするだけです。",
    answer: "フォームの受付終了は1クリックで完了します。再開も同じ操作で可能です。",
    pcSteps: [
      "フォームの「回答」タブをクリックします",
      "「回答を受け付けています」の緑トグルをクリックしてOFFにします",
      "「オフにする」を選びます ✅",
      "フォームを開いた人には「受け付けを終了しました」と表示されます"
    ],
    smartphoneSteps: [
      "フォームアプリ「回答」タブ→トグルをタップしてOFFにします ✅"
    ],
    cautions: ["再開したい場合は同じトグルをONに戻すだけです"],
    warnings: [],
    commonMistakes: ["終了し忘れて締切後も回答が届いてしまう（カレンダーに終了日リマインダーを入れましょう）"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-005"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "form-007",
    category: "form",
    subCategory: "共同編集",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "フォームを共同編集する・権限を追加する",
    questionPatterns: ["他の人と一緒に編集したい", "共同編集者を追加したい"],
    keywords: ["共同編集", "権限", "追加", "編集者", "コラボ"],
    simpleSummary: "「⋮」→「共同編集者を追加」から相手のGmailアドレスを入力します。",
    answer: "共同編集者はフォームの質問変更・回答確認ができます。回答者（フォームURLを受け取った人）とは別です。",
    pcSteps: [
      "フォーム右上「⋮」→「共同編集者を追加」をクリックします",
      "相手のGoogleアカウントのメールアドレスを入力します",
      "「送信」をクリックします ✅",
      "相手は質問の追加・変更・回答確認ができるようになります"
    ],
    smartphoneSteps: [
      "「⋮」→「共同編集者を追加」をタップします ✅"
    ],
    cautions: [],
    warnings: ["共同編集者は回答データも閲覧できます。役員以外には共有しないようにしましょう"],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-008", "drive-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: true,
    tags: ["引き継ぎ"],
  },

  {
    id: "form-008",
    category: "form",
    subCategory: "コピー・テンプレート",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "前年度フォームをコピーして今年度用に使う",
    questionPatterns: ["前年のフォームを使い回したい", "フォームをコピーしたい"],
    keywords: ["コピー", "前年度", "複製", "使い回し", "テンプレート"],
    simpleSummary: "Googleドライブでフォームを右クリック→「コピーを作成」で複製できます。",
    answer: "前年度のフォームを複製して年度・日付を書き換えるだけで今年度用が完成します。前年度の回答はコピーされません。",
    pcSteps: [
      "Googleドライブで元のフォームを右クリック→「コピーを作成」をクリックします",
      "「コピー：〇〇フォーム」が作成されます",
      "コピーを開いてタイトル・年度・日付を修正します",
      "「回答」タブからスプレッドシートを新しく連携します ✅"
    ],
    smartphoneSteps: [
      "ドライブアプリでフォームを長押し→「⋮」→「コピーを作成」をタップします ✅"
    ],
    cautions: ["回答スプレッドシートは新しく作り直す必要があります（前年度の回答はコピーされません）"],
    warnings: [],
    commonMistakes: ["コピー後に回答スプレッドシートを再連携しないまま配布してしまう"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-001", "form-005"],
    lastUpdated: "2026-07-01",
    ownerMemo: "毎年4月に必ず聞かれる",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["よく聞かれる", "年度初め"],
  },

  {
    id: "form-009",
    category: "form",
    subCategory: "トラブル",
    audience: ["単位PTA役員", "連合会役員", "保護者"],
    year: "共通",
    title: "フォームのトラブル（回答が見えない・反映されない・開けない）",
    questionPatterns: ["回答が見えない", "スプレッドシートに反映されない", "フォームを開けない"],
    keywords: ["トラブル", "回答 見えない", "反映されない", "開けない", "エラー"],
    simpleSummary: "「回答」タブを確認・スプレッドシートをリロード・アプリ再起動の順で確認します。",
    answer: "フォームのトラブルは原因によって対処が異なります。状況を確認して順番に試しましょう。",
    pcSteps: [
      "【回答が見えない】「質問」タブではなく「回答」タブを開いているか確認します",
      "【スプレッドシートに反映されない】スプレッドシートをF5でリロードします",
      "【スプレッドシートとの連携がない】「回答」タブ→緑アイコンで再連携します",
      "【フォームを開けない】ログインしているGoogleアカウントが正しいか確認します",
      "【権限エラー】フォームのオーナーに設定確認を依頼します ✅"
    ],
    smartphoneSteps: [
      "【開けない】LINEの内蔵ブラウザではなくChromeで開き直します",
      "【アプリが落ちる】アプリを完全終了して再起動します ✅"
    ],
    cautions: ["LINEの内蔵ブラウザでは一部のGoogleフォームが開けない場合があります"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-005", "trouble-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  // ── スプレッドシート ────────────────────────────────────────
  {
    id: "sheet-001",
    category: "sheet",
    subCategory: "変換・保存",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "スプレッドシートをExcel形式でダウンロードする",
    questionPatterns: ["Excelで保存したい", ".xlsxにしたい", "Excel形式でダウンロードしたい"],
    keywords: ["excel", "エクセル", "xlsx", "ダウンロード", "変換"],
    simpleSummary: "「ファイル」→「ダウンロード」→「Microsoft Excel（.xlsx）」を選びます。",
    answer: "スプレッドシートはExcel形式でダウンロードして配布や印刷に活用できます。",
    pcSteps: [
      "「ファイル」→「ダウンロード」をクリックします",
      "「Microsoft Excel（.xlsx）」をクリックします",
      "ダウンロードフォルダに保存されます ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「共有とエクスポート」→「名前を付けて保存」→「Excel（.xlsx）」をタップします ✅"
    ],
    cautions: ["グラフや特殊な書式はExcelで見た目が変わる場合があります"],
    warnings: [],
    commonMistakes: [".csv を選ぶと書式がなくなります。書式を保ちたいなら必ず .xlsx を選んでください"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["sheet-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "sheet-002",
    category: "sheet",
    subCategory: "変換・保存",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "スプレッドシートをPDF化・印刷する",
    questionPatterns: ["PDFにしたい", "印刷したい", "A4に収めたい"],
    keywords: ["pdf", "印刷", "a4", "収める", "ダウンロード"],
    simpleSummary: "「ファイル」→「ダウンロード」→「PDF」。列が多い場合は「ページに合わせる」を選びます。",
    answer: "スプレッドシートはPDFとして保存・印刷できます。列が多い場合は印刷設定で1枚に収める設定が必要です。",
    pcSteps: [
      "「ファイル」→「ダウンロード」→「PDF形式（.pdf）」をクリックします",
      "印刷設定画面が開きます",
      "「ページに合わせる」を選ぶと1枚に収まります",
      "「エクスポート」をクリックします ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「共有とエクスポート」→「PDFとして保存」をタップします ✅"
    ],
    cautions: ["列が多いと横に途切れることがあります。「ページに合わせる」設定を使いましょう"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["pdf-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  {
    id: "sheet-003",
    category: "sheet",
    subCategory: "操作",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "フィルタ・並び替えを使う",
    questionPatterns: ["並び替えたい", "絞り込みたい", "フィルタをかけたい"],
    keywords: ["フィルタ", "並び替え", "ソート", "絞り込み", "filter"],
    simpleSummary: "「データ」→「フィルタを作成」で1行目に▼が付き、絞り込みできます。",
    answer: "フィルタ機能を使うと大量のデータをすばやく並び替え・絞り込みできます。",
    pcSteps: [
      "データの表をクリックします",
      "「データ」→「フィルタを作成」をクリックします",
      "1行目に▼マークが付きます",
      "▼をクリックして絞り込みたい条件を選びます",
      "「A→Z順」で昇順、「Z→A順」で降順に並び替えられます ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「データ操作」→「フィルタを作成」をタップします ✅"
    ],
    cautions: ["フィルタをかけたままにすると他の人が見たときに全データが見えません。使用後はフィルタを解除しましょう"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["sheet-004"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  {
    id: "sheet-004",
    category: "sheet",
    subCategory: "関数・集計",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "よく使う関数（合計・件数・条件集計）",
    questionPatterns: ["合計を出したい", "件数を数えたい", "集計したい", "関数が分からない"],
    keywords: ["関数", "sum", "count", "合計", "集計", "countif", "average"],
    simpleSummary: "=SUM(範囲)で合計、=COUNTA(範囲)で件数、=COUNTIF(範囲,条件)で条件集計。",
    answer: "PTA活動でよく使う関数です。セルに「=」を入力すると候補が表示されます。",
    pcSteps: [
      "【合計】=SUM(B2:B10)　→ B2〜B10の合計",
      "【件数】=COUNTA(B2:B10)　→ 文字が入ったセルの数（回答件数の集計に便利）",
      "【条件集計】=COUNTIF(B2:B10,\"参加\")　→「参加」の件数",
      "【平均】=AVERAGE(B2:B10)　→ B2〜B10の平均",
      "セルに「=」を入力すると関数候補が自動表示されます ✅"
    ],
    smartphoneSteps: [
      "スマホでも同様に「=」から入力できます。候補から選んでください ✅"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: ["範囲の指定を間違えて合計がずれる（ドラッグで範囲を確認しましょう）"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-005"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  {
    id: "sheet-005",
    category: "sheet",
    subCategory: "変更履歴",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "変更履歴を確認する・誤変更を元に戻す",
    questionPatterns: ["誰が変更したか確認したい", "元に戻したい", "変更前の状態に戻したい"],
    keywords: ["変更履歴", "元に戻す", "復元", "誰が変更", "バックアップ"],
    simpleSummary: "「ファイル」→「変更履歴」→「変更履歴を表示」で過去の状態に戻せます。",
    answer: "Googleスプレッドシートは自動で変更履歴が保存されます。誤って変更した場合も復元できます。",
    pcSteps: [
      "「ファイル」→「変更履歴」→「変更履歴を表示」をクリックします",
      "右側に変更日時と変更者の一覧が表示されます",
      "戻したい時点をクリックするとその状態がプレビュー表示されます",
      "「この版を復元」をクリックします ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「変更履歴」をタップします ✅"
    ],
    cautions: ["復元すると現在の内容が上書きされます。必要なら現在の内容を別シートにコピーしてから復元してください"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: [],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  // ── Googleドキュメント ──────────────────────────────────────
  {
    id: "doc-001",
    category: "document",
    subCategory: "変換・保存",
    audience: ["単位PTA役員", "連合会役員", "保護者"],
    year: "共通",
    title: "GoogleドキュメントをPDFにする",
    questionPatterns: ["PDFにしたい", "PDF保存したい", "提出用に変換したい"],
    keywords: ["pdf", "ドキュメント", "保存", "変換", "提出"],
    simpleSummary: "「ファイル」→「ダウンロード」→「PDF形式（.pdf）」で変換できます。",
    answer: "Googleドキュメントは簡単にPDFに変換できます。元のドキュメントはそのまま残ります。",
    pcSteps: [
      "「ファイル」→「ダウンロード」→「PDF形式（.pdf）」をクリックします",
      "ダウンロードフォルダに保存されます ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「共有とエクスポート」→「PDFとして保存」をタップします ✅"
    ],
    cautions: ["PDFにすると編集できなくなります。元のドキュメントは変わりません"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["pdf-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "doc-002",
    category: "document",
    subCategory: "コピー・テンプレート",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "ドキュメントをコピーして今年度用に使う",
    questionPatterns: ["前年のドキュメントを使い回したい", "コピーしたい", "テンプレートを使いたい"],
    keywords: ["コピー", "前年度", "複製", "テンプレート", "使い回し"],
    simpleSummary: "「ファイル」→「コピーを作成」で元ファイルを変えずにコピーが作れます。",
    answer: "コピーを作成してタイトルや年度を書き換えるだけで今年度用が完成します。",
    pcSteps: [
      "「ファイル」→「コピーを作成」をクリックします",
      "名前を変えて「OK」を押します",
      "マイドライブに新しいコピーが保存されます ✅"
    ],
    smartphoneSteps: [
      "ドライブアプリでファイルを長押し→「⋮」→「コピーを作成」をタップします ✅"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: ["元のファイルを直接編集してしまう（コピーを作ってから編集しましょう）"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-008"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["年度初め"],
  },

  {
    id: "doc-003",
    category: "document",
    subCategory: "共同作業",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "コメントを入れる・提案モードで修正する",
    questionPatterns: ["コメントしたい", "修正を提案したい", "変更追跡したい"],
    keywords: ["コメント", "提案", "提案モード", "修正", "レビュー"],
    simpleSummary: "文字を選択→右クリック→「コメントを追加」。提案は右上「✏️編集」→「提案」に切替。",
    answer: "コメントや提案モードを使うと、複数人で安全に文書を確認・修正できます。",
    pcSteps: [
      "【コメント】コメントしたい文字を選択→右クリック→「コメントを追加」",
      "コメントを入力して「コメント」をクリックします",
      "【提案モード】右上「✏️ 編集」→「提案」に切り替えます",
      "提案モードで編集すると変更が赤字で表示され、承認・却下できます ✅"
    ],
    smartphoneSteps: [
      "文字を長押しして選択→「コメントを追加」をタップします ✅"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: [],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "low",
    handoverRequired: false,
    tags: [],
  },

  // ── Googleスライド ──────────────────────────────────────────
  {
    id: "slide-001",
    category: "slide",
    subCategory: "変換・保存",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "スライドをPowerPoint形式で保存する",
    questionPatterns: ["PowerPointで保存したい", ".pptxにしたい"],
    keywords: ["スライド", "パワーポイント", "powerpoint", "pptx", "変換"],
    simpleSummary: "「ファイル」→「ダウンロード」→「Microsoft PowerPoint（.pptx）」を選びます。",
    answer: "スライドはPowerPoint形式でダウンロードして他のソフトでも使えます。",
    pcSteps: [
      "「ファイル」→「ダウンロード」→「Microsoft PowerPoint（.pptx）」をクリックします ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「共有とエクスポート」→「PowerPoint（.pptx）」をタップします ✅"
    ],
    cautions: ["フォントや特殊なアニメーションはPowerPointで開くと変わる場合があります"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["slide-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "slide-002",
    category: "slide",
    subCategory: "変換・保存",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "スライドをPDFにする",
    questionPatterns: ["PDFにしたい", "PDF保存したい"],
    keywords: ["スライド", "pdf", "保存"],
    simpleSummary: "「ファイル」→「ダウンロード」→「PDF形式（.pdf）」を選びます。",
    answer: "スライドはPDFとして配布用に保存できます。",
    pcSteps: [
      "「ファイル」→「ダウンロード」→「PDF形式（.pdf）」をクリックします ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「共有とエクスポート」→「PDFとして保存」をタップします ✅"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["slide-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  {
    id: "slide-003",
    category: "slide",
    subCategory: "発表",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "発表者モードで表示する・スクリーンに投影する",
    questionPatterns: ["発表したい", "プレゼンを始めたい", "全画面表示したい"],
    keywords: ["発表", "プレゼン", "全画面", "投影", "発表者モード"],
    simpleSummary: "右上「▶ プレゼンテーションを開始」で全画面になります。",
    answer: "発表者ビューでは手元のPCにメモが表示され、スクリーンにはスライドだけが表示されます。",
    pcSteps: [
      "右上「▶ プレゼンテーションを開始」をクリックします",
      "全画面でスライドが表示されます",
      "「▼」横の矢印→「発表者ビュー」でメモ付き表示になります",
      "Escキーで終了します ✅"
    ],
    smartphoneSteps: [
      "スライドアプリの「▶」ボタンをタップします ✅"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: [],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  // ── Googleドライブ共有 ──────────────────────────────────────
  {
    id: "drive-001",
    category: "drive",
    subCategory: "共有リンク",
    audience: ["単位PTA役員", "連合会役員", "保護者"],
    year: "共通",
    title: "共有リンクを作る・送る",
    questionPatterns: ["共有リンクを作りたい", "ファイルを送りたい", "見てもらいたい"],
    keywords: ["共有", "リンク", "url", "送る", "見てもらう"],
    simpleSummary: "ファイルを右クリック→「共有」→「リンクを知っている全員」→「コピー」。",
    answer: "Googleドライブのファイルはリンクを送るだけで相手が開けます。権限設定に注意しましょう。",
    pcSteps: [
      "ファイルを右クリック→「共有」をクリックします",
      "「リンクを知っている全員」に変更します",
      "「閲覧者」「コメント可」「編集者」のいずれかを選びます",
      "「リンクをコピー」してメール等に貼り付けます ✅"
    ],
    smartphoneSteps: [
      "ドライブアプリでファイルを長押し→「⋮」→「リンクをコピー」をタップします ✅"
    ],
    cautions: ["「制限付き」のままだと相手が開けません"],
    warnings: ["配布用は必ず「閲覧者」を選んでください。「編集者」にすると相手がファイルを変更できます"],
    commonMistakes: ["以前コピーしたリンクを使い回す（設定変更後は新しいリンクを送り直してください）"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["drive-002", "drive-004"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "drive-002",
    category: "drive",
    subCategory: "権限設定",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "閲覧・コメント・編集の権限の違い",
    questionPatterns: ["権限の違いを知りたい", "閲覧だけにしたい", "編集させたい"],
    keywords: ["閲覧", "コメント", "編集", "権限", "違い"],
    simpleSummary: "閲覧=見るだけ、コメント=メモできる、編集=変更できる。配布は閲覧を推奨。",
    answer: "権限は3種類あります。目的に合わせて選ぶことが重要です。",
    pcSteps: [
      "【閲覧者】ファイルを見るだけ。変更・コメント不可。一般配布に最適",
      "【コメント可】ファイルを見てコメントを書ける。内容は変更できない。確認・レビュー用",
      "【編集者】ファイルを変更できる。共同作業用",
      "右クリック→「共有」の権限欄で変更できます ✅"
    ],
    smartphoneSteps: [
      "ドライブアプリで「⋮」→「ユーザーを管理」から権限を変更します ✅"
    ],
    cautions: [],
    warnings: ["保護者への配布は必ず「閲覧者」に設定してください。「編集者」では相手がファイルを書き換えられます"],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["drive-001", "drive-006"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "drive-003",
    category: "drive",
    subCategory: "共有",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "フォルダごと共有する",
    questionPatterns: ["フォルダを共有したい", "まとめて共有したい"],
    keywords: ["フォルダ", "共有", "まとめて"],
    simpleSummary: "フォルダを右クリック→「共有」で、フォルダ内の全ファイルに同じ権限が適用されます。",
    answer: "フォルダを共有すると中のファイル全てに同じ権限が適用されます。個別設定より便利です。",
    pcSteps: [
      "共有したいフォルダを右クリック→「共有」をクリックします",
      "「リンクを知っている全員」またはメールアドレスで共有します",
      "権限を選んで「完了」をクリックします ✅"
    ],
    smartphoneSteps: [
      "ドライブアプリでフォルダを長押し→「⋮」→「共有」をタップします ✅"
    ],
    cautions: [],
    warnings: ["フォルダを「編集可」で共有するとフォルダ内のファイルを削除される可能性があります。通常は「閲覧可」を推奨します"],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["drive-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  {
    id: "drive-004",
    category: "drive",
    subCategory: "トラブル",
    audience: ["単位PTA役員", "連合会役員", "保護者"],
    year: "共通",
    title: "「アクセス権が必要です」と表示される",
    questionPatterns: ["アクセス権が必要", "開けない", "権限エラー"],
    keywords: ["アクセス権", "権限", "エラー", "開けない", "見れない"],
    simpleSummary: "共有設定が「制限付き」になっています。ファイル持ち主に設定変更を依頼しましょう。",
    answer: "アクセス権エラーは共有設定の問題です。自分が持ち主か相手が持ち主かで対処が違います。",
    pcSteps: [
      "【自分が開こうとしてエラーの場合】",
      "「アクセスをリクエスト」ボタンをクリックして持ち主に申請します",
      "【自分が持ち主で相手が開けない場合】",
      "ファイルを右クリック→「共有」をクリックします",
      "「制限付き」→「リンクを知っている全員」に変更して「完了」をクリックします ✅"
    ],
    smartphoneSteps: [
      "「アクセスをリクエスト」をタップして申請します ✅"
    ],
    cautions: ["承認されるまで時間がかかることがあります。持ち主に直接連絡するのが早いです"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["drive-001", "drive-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "drive-005",
    category: "drive",
    subCategory: "引き継ぎ",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "ファイルのオーナーを変更する（引き継ぎ時）",
    questionPatterns: ["オーナーを変えたい", "ファイルを引き継ぎたい", "所有者を変更したい"],
    keywords: ["オーナー", "所有者", "変更", "引き継ぎ"],
    simpleSummary: "「共有」画面でユーザーの権限を「オーナーにする」に変更します。一度変更すると元に戻せません。",
    answer: "ファイルのオーナー変更は役員引き継ぎ時に必要な操作です。慎重に行いましょう。",
    pcSteps: [
      "ファイルを右クリック→「共有」をクリックします",
      "新しいオーナーのメールアドレスを「編集者」で追加します",
      "そのユーザーの権限欄→「オーナーにする」を選びます",
      "確認ダイアログ→「オーナーにする」をクリックします ✅"
    ],
    smartphoneSteps: [
      "オーナー変更はPCで行うことをおすすめします"
    ],
    cautions: [],
    warnings: ["オーナーを変更すると元のオーナーは「編集者」に降格します。一度変更すると自分ではオーナーに戻せません！"],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["handover-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "3月〜4月に毎年聞かれる",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["引き継ぎ", "年度初め"],
  },

  {
    id: "drive-006",
    category: "drive",
    subCategory: "個人情報",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "個人情報を含む資料を共有するときの注意点",
    questionPatterns: ["名簿を共有したい", "個人情報の共有", "安全に共有するには"],
    keywords: ["個人情報", "名簿", "住所", "電話番号", "安全", "注意"],
    simpleSummary: "個人情報は「リンクを知っている全員」ではなく、必ず特定のユーザー限定で共有してください。",
    answer: "個人情報を含むファイルは共有範囲を最小限にする必要があります。",
    pcSteps: [
      "「リンクを知っている全員」の設定は絶対に使わないでください",
      "ファイルを右クリック→「共有」→相手のメールアドレスを直接入力します",
      "権限は「閲覧者」（最小限）に設定します",
      "不要になったら共有を解除します ✅"
    ],
    smartphoneSteps: [
      "同様に特定ユーザーへの直接共有のみ使用します ✅"
    ],
    cautions: [
      "Googleドライブはインターネット上のサービスです。絶対に必要な場合のみデジタルで保管しましょう",
      "不要になったら個人情報を含むファイルを削除するか、データを消してください"
    ],
    warnings: ["名簿・住所録・連絡先一覧を「リンクを知っている全員」で共有すると情報漏洩につながります！"],
    commonMistakes: ["共有範囲を確認しないまま「リンクをコピー」してしまう"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["privacy-001", "privacy-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["個人情報"],
  },

  // ── 共有Googleアカウント ────────────────────────────────────
  {
    id: "account-001",
    category: "account",
    subCategory: "ログイン",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "共有Googleアカウントにログインできない",
    questionPatterns: ["ログインできない", "アカウントに入れない", "パスワードが違う"],
    keywords: ["ログイン", "入れない", "パスワード", "アカウント", "2段階認証"],
    simpleSummary: "パスワード忘れ・2段階認証問題・旧役員端末の問題のどれかです。状況を確認しましょう。",
    answer: "ログインできない原因は主に3つです。状況に合わせた対処を確認してください。",
    pcSteps: [
      "【パスワードが分からない】→「account-002」を参照",
      "【パスワードは分かるが2段階認証で止まる】→「account-003」を参照",
      "【旧役員のスマホに通知が行く】→「account-004」を参照",
      "【復旧用情報が古い】→「account-005」を参照"
    ],
    smartphoneSteps: [
      "スマホからも同じ手順で対処できます"
    ],
    cautions: ["何度もパスワードを試すとアカウントがロックされることがあります。まず原因を確認してから試してください"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["account-002", "account-003", "account-004", "account-005"],
    lastUpdated: "2026-07-01",
    ownerMemo: "引き継ぎ時期に毎年発生",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["よく聞かれる", "年度初め", "引き継ぎ"],
  },

  {
    id: "account-002",
    category: "account",
    subCategory: "パスワード",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "パスワードを忘れた・リセットしたい",
    questionPatterns: ["パスワードが分からない", "パスワードを忘れた", "リセットしたい"],
    keywords: ["パスワード", "忘れた", "リセット", "再設定"],
    simpleSummary: "accounts.google.com/signin/recovery からパスワードを再設定できます。",
    answer: "登録済みの電話番号やメールアドレスにコードが届けばパスワードをリセットできます。",
    pcSteps: [
      "accounts.google.com/signin/recovery を開きます",
      "メールアドレスを入力して「次へ」をクリックします",
      "「パスワードをお忘れの場合」を選びます",
      "登録済みの電話番号かメールアドレスにコードが届きます",
      "コードを入力して新しいパスワードを設定します ✅"
    ],
    smartphoneSteps: [
      "Chromeブラウザで同じURLにアクセスします ✅"
    ],
    cautions: ["復旧用の電話番号・メールアドレスが旧役員のものになっている場合は旧役員に協力を依頼してください"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["account-003", "account-005", "account-006"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "account-003",
    category: "account",
    subCategory: "2段階認証",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "2段階認証で止まる・確認コードを受け取れない",
    questionPatterns: ["2段階認証で止まる", "確認コードが来ない", "認証が突破できない"],
    keywords: ["2段階認証", "確認コード", "認証", "突破できない", "止まる", "バックアップコード"],
    simpleSummary: "バックアップコードがあれば使えます。なければGoogleアカウント復元ページを試します。",
    answer: "2段階認証は「持っている端末」で本人確認する仕組みです。端末が手元にない場合の対処を確認しましょう。",
    pcSteps: [
      "【バックアップコードがある場合】",
      "「別の方法を試す」→「バックアップコードを使用」を選んで入力します ✅",
      "【バックアップコードもない場合】",
      "accounts.google.com/signin/recovery を開きます",
      "以前使ったパスワード・アカウント作成日等を答えます",
      "復元できない場合はGoogleへの申請になります（数日かかる場合があります）"
    ],
    smartphoneSteps: [
      "スマホのChromeブラウザで同様に試します"
    ],
    cautions: ["復元できない可能性もあります。この場合は新しいPTAアカウントを作成することを検討してください"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["account-004", "account-006", "handover-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "バックアップコードを事前に印刷しておくことを強く推奨",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["よく聞かれる", "引き継ぎ"],
  },

  {
    id: "account-004",
    category: "account",
    subCategory: "2段階認証",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "旧役員のスマホに確認通知が行ってしまう",
    questionPatterns: ["旧役員に通知が行く", "前任者のスマホに確認が行く", "前の役員に認証が行く"],
    keywords: ["旧役員", "前任者", "スマホ", "通知", "確認コード", "前の人"],
    simpleSummary: "まず旧役員にコードを教えてもらい、ログイン後すぐに2段階認証の設定を更新します。",
    answer: "2段階認証の確認先が旧役員の端末になったままです。一時的に協力してもらい、設定変更が必要です。",
    pcSteps: [
      "旧役員に連絡してスマホに届いた確認コードを教えてもらいます",
      "ログインします",
      "【ログイン後すぐに行う】右上アカウントアイコン→「Googleアカウントを管理」",
      "「セキュリティ」→「2段階認証プロセス」を開きます",
      "旧役員の電話番号・端末を削除して新しい情報を追加します",
      "「再設定用メールアドレス」「再設定用電話番号」も更新します ✅"
    ],
    smartphoneSteps: [
      "myaccount.google.com をスマホブラウザで開いて同様に変更します ✅"
    ],
    cautions: [],
    warnings: ["ログインできたその日のうちに設定変更してください。旧役員のアクセスが残ったままはセキュリティ上問題です"],
    commonMistakes: ["ログインできたことに安心して設定変更を後回しにする"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["account-005", "account-006", "handover-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "引き継ぎ時期に毎年発生する最重要トラブル",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["よく聞かれる", "引き継ぎ", "年度初め"],
  },

  {
    id: "account-005",
    category: "account",
    subCategory: "復旧情報",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "復旧用メール・電話番号を現役員のものに更新する",
    questionPatterns: ["復旧用情報を変えたい", "再設定メールを更新したい", "電話番号を変えたい"],
    keywords: ["復旧用", "再設定", "メール", "電話番号", "更新", "変更"],
    simpleSummary: "myaccount.google.com の「セキュリティ」から変更できます。",
    answer: "ログインできる状態で復旧用情報を更新します。毎年度初めに必ず確認してください。",
    pcSteps: [
      "accounts.google.com にアクセスします",
      "「セキュリティ」→「再設定用のメールアドレス」をクリックして現役員のアドレスに更新します",
      "「再設定用の電話番号」も現役員の番号に更新します ✅"
    ],
    smartphoneSteps: [
      "myaccount.google.com をスマホブラウザで開いて同様に変更します ✅"
    ],
    cautions: [],
    warnings: ["年度切り替えのタイミングで必ず復旧用情報を更新してください。放置すると毎年同じ問題が発生します"],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["account-006", "handover-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["引き継ぎ", "年度初め"],
  },

  {
    id: "account-006",
    category: "account",
    subCategory: "運用",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "共有アカウントを複数人で安全に運用する",
    questionPatterns: ["共有アカウントの使い方", "安全に使いたい", "管理方法"],
    keywords: ["共有アカウント", "複数人", "運用", "管理", "セキュリティ"],
    simpleSummary: "2段階認証の確認先を個人スマホに依存させず、バックアップコードを紙で保管しましょう。",
    answer: "共有アカウントは正しく管理しないと毎年引き継ぎトラブルが発生します。仕組みで解決しましょう。",
    pcSteps: [
      "2段階認証の確認先は個人スマホではなく共用端末か共用電話番号に設定する",
      "バックアップコードを印刷して金庫・引き出しに保管する",
      "パスワードは年度ごとに変更する",
      "退任した役員の個人端末はすぐに2段階認証から削除する",
      "ログイン履歴を定期確認する（アカウント設定→「最近のアクティビティ」）✅"
    ],
    smartphoneSteps: [
      "同様の管理を行います"
    ],
    cautions: [],
    warnings: ["個人スマホだけに2段階認証を依存させると、その人が退任したときに誰もログインできなくなります"],
    commonMistakes: ["バックアップコードを保管せずに使ってしまう（使ったコードは無効になります）"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["handover-001", "account-003"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["引き継ぎ"],
  },

  // ── 共有カレンダー ──────────────────────────────────────────
  {
    id: "cal-001",
    category: "calendar",
    subCategory: "予定操作",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "共有カレンダーに予定を追加する",
    questionPatterns: ["予定を追加したい", "スケジュールを登録したい"],
    keywords: ["カレンダー", "予定", "追加", "登録", "スケジュール"],
    simpleSummary: "予定作成時に「カレンダー」欄で共有カレンダーを選ぶことが重要です。",
    answer: "共有カレンダーへの追加は、予定を作るときに「カレンダー選択」を正しく行うことがポイントです。",
    pcSteps: [
      "calendar.google.com で追加したい日付をクリックします",
      "タイトルを入力後「その他のオプション」をクリックします",
      "「カレンダー」欄で共有カレンダーを選択します（ここが重要！）",
      "「保存」をクリックします ✅"
    ],
    smartphoneSteps: [
      "カレンダーアプリ右下「＋」→「予定」をタップします",
      "「カレンダー」欄をタップして共有カレンダーを選びます",
      "「保存」をタップします ✅"
    ],
    cautions: [],
    warnings: ["カレンダー欄を選ばないと「自分のカレンダー」に登録され、他の人に見えません！"],
    commonMistakes: ["自分のカレンダーに登録してしまい、他のメンバーに予定が見えない"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["cal-002", "cal-003"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "cal-002",
    category: "calendar",
    subCategory: "予定操作",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "繰り返し予定を作る・通知を設定する",
    questionPatterns: ["毎月の予定を作りたい", "繰り返し設定したい", "通知を設定したい"],
    keywords: ["繰り返し", "毎週", "毎月", "通知", "リマインダー"],
    simpleSummary: "「その他のオプション」→「繰り返さない」を変更。通知は「通知を追加」から設定。",
    answer: "定期的な会議や行事は繰り返し設定にすると管理が楽です。",
    pcSteps: [
      "「その他のオプション」で予定の詳細画面を開きます",
      "「繰り返さない」欄をクリックして頻度を選びます（毎週・毎月・毎年等）",
      "「通知を追加」をクリックしてメール通知またはポップアップを設定します",
      "「保存」をクリックします ✅"
    ],
    smartphoneSteps: [
      "予定作成画面で「繰り返さない」→「通知を追加」をタップします ✅"
    ],
    cautions: ["繰り返し予定を変更するときは「この予定のみ」か「以降全て」か選択が必要です"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["cal-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  {
    id: "cal-003",
    category: "calendar",
    subCategory: "共有設定",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "共有カレンダーにメンバーを追加する・権限を設定する",
    questionPatterns: ["カレンダーを共有したい", "メンバーを追加したい"],
    keywords: ["カレンダー", "共有", "追加", "権限", "メンバー"],
    simpleSummary: "カレンダー名横「⋮」→「設定と共有」→「ユーザーを追加」からメールアドレスで追加できます。",
    answer: "共有カレンダーの管理はPC版Googleカレンダーから行うのが確実です。",
    pcSteps: [
      "左側カレンダー名横「⋮」→「設定と共有」をクリックします",
      "「特定のユーザーまたはグループと共有」の「＋ ユーザーを追加」をクリックします",
      "メールアドレスを入力します",
      "権限（「予定の変更」=編集可、「予定の表示」=閲覧のみ）を選んで「送信」をクリックします ✅"
    ],
    smartphoneSteps: [
      "カレンダーアプリの共有設定はPCで行うことをおすすめします"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["cal-004", "handover-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: true,
    tags: ["引き継ぎ"],
  },

  {
    id: "cal-004",
    category: "calendar",
    subCategory: "トラブル",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "共有カレンダーが表示されない・予定が見えない",
    questionPatterns: ["カレンダーが見えない", "予定が表示されない", "消えた"],
    keywords: ["見えない", "表示されない", "消えた", "カレンダー"],
    simpleSummary: "左側リストで共有カレンダーの■（チェック）がOFFになっていることが多いです。",
    answer: "カレンダーが見えない場合は表示設定をまず確認しましょう。",
    pcSteps: [
      "左側「他のカレンダー」のリストを確認します",
      "共有カレンダーの■（色付き四角）が灰色になっていたらクリックしてONにします",
      "リストにない場合は管理者に再度共有を依頼します ✅"
    ],
    smartphoneSteps: [
      "「≡ メニュー」→「設定」→表示したいカレンダーをONにします ✅"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["cal-003"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  // ── PDF・印刷 ───────────────────────────────────────────────
  {
    id: "pdf-001",
    category: "pdf",
    subCategory: "変換",
    audience: ["単位PTA役員", "連合会役員", "保護者"],
    year: "共通",
    title: "GoogleファイルをPDFに変換する",
    questionPatterns: ["PDFにしたい", "PDF変換したい", "PDF保存したい"],
    keywords: ["pdf", "変換", "保存", "書き出し"],
    simpleSummary: "どのGoogleアプリでも「ファイル」→「ダウンロード」→「PDF形式」で変換できます。",
    answer: "ドキュメント・スプレッドシート・スライドは全てPDF形式でダウンロードできます。",
    pcSteps: [
      "「ファイル」→「ダウンロード」→「PDF形式（.pdf）」をクリックします ✅"
    ],
    smartphoneSteps: [
      "「⋮」→「共有とエクスポート」→「PDFとして保存」をタップします ✅"
    ],
    cautions: ["スプレッドシートは列が多いと途切れることがあります。「ページに合わせる」設定を使いましょう"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["pdf-002", "pdf-003"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "pdf-002",
    category: "pdf",
    subCategory: "印刷",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "コンビニで印刷する（ネットプリント）",
    questionPatterns: ["コンビニで印刷したい", "ネットプリント", "外出先で印刷したい"],
    keywords: ["コンビニ", "印刷", "ネットプリント", "セブン", "ファミマ"],
    simpleSummary: "まずPDFに変換してから、各コンビニのネットプリントサービスにアップロードします。",
    answer: "コンビニのネットプリントを使えばプリンターがなくても印刷できます。",
    pcSteps: [
      "まずファイルをPDF形式でダウンロードします",
      "【セブン-イレブン】「ネットプリント」アプリまたは netprint.jp にアップロードします",
      "【ファミマ・ローソン】「PrintSmash」アプリまたは famima-print.jp を使います",
      "番号またはQRコードをコンビニのプリンターで入力して印刷します ✅"
    ],
    smartphoneSteps: [
      "各コンビニの専用アプリをインストールしてPDFをアップロードします ✅"
    ],
    cautions: [
      "アップロードには期限（1〜3日程度）があります。期限内に印刷してください",
      "個人情報を含む資料の印刷後は取り忘れに注意してください"
    ],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["pdf-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  {
    id: "pdf-003",
    category: "pdf",
    subCategory: "印刷設定",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "A4 1枚に収めて印刷・PDF化する",
    questionPatterns: ["A4に収めたい", "1枚にしたい", "はみ出る", "縮小して印刷"],
    keywords: ["a4", "1枚", "収める", "縮小", "はみ出る"],
    simpleSummary: "印刷設定（Ctrl+P）で「ページに合わせる」または「縮小して印刷」を選びます。",
    answer: "スプレッドシートの列が多い場合などは、印刷設定で1枚に収める設定が必要です。",
    pcSteps: [
      "「ファイル」→「印刷」（Ctrl+P）を開きます",
      "スプレッドシートの場合：「用紙のサイズに合わせる」を選びます",
      "プレビューで確認してから「次へ」→「印刷」をクリックします ✅"
    ],
    smartphoneSteps: [
      "細かい印刷設定はPCで行うことをおすすめします"
    ],
    cautions: ["縮小しすぎると文字が小さくなりすぎます。プレビューで確認してください"],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: [],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: [],
  },

  // ── PTA引き継ぎ ─────────────────────────────────────────────
  {
    id: "handover-001",
    category: "handover",
    subCategory: "チェックリスト",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "役員引き継ぎ チェックリスト（完全版）",
    questionPatterns: ["引き継ぎ", "チェックリスト", "来年度", "次の役員"],
    keywords: ["引き継ぎ", "チェックリスト", "年度末", "年度初め", "来年度", "次の役員"],
    simpleSummary: "毎年3〜4月の役員交代前に、この10項目を必ず確認・更新してください。",
    answer: "毎年同じトラブルを防ぐために、引き継ぎ時に確認すべき項目をまとめました。",
    pcSteps: [
      "✅ Googleアカウントのメールアドレスとパスワードを引き継ぎ書に記録する",
      "✅ 再設定用メールアドレスを現役員のものに更新する",
      "✅ 再設定用電話番号を現役員のものに更新する",
      "✅ 2段階認証の端末を確認し、旧役員の端末を削除する",
      "✅ バックアップコードを印刷して保管する（アカウント設定→セキュリティ→バックアップコード）",
      "✅ Googleドライブの重要フォルダのオーナーを移行する",
      "✅ Googleフォームの共同編集者を確認・更新する",
      "✅ 共有カレンダーの管理権限を確認・更新する",
      "✅ 個人情報を含むデータの削除・保管を確認する",
      "✅ 新役員と一緒にログイン・操作確認を実施する"
    ],
    smartphoneSteps: [
      "スマホからもアカウント設定（myaccount.google.com）で確認できます"
    ],
    cautions: [],
    warnings: [
      "パスワードや個人情報はメールやLINEで送らないでください。対面で引き渡すか暗号化ファイルで保管してください",
      "「自分しか知らない」情報を作らないことが重要です。必ず2人以上で情報を共有してください"
    ],
    commonMistakes: ["引き継ぎ書を作らないまま退任してしまう"],
    doneMessage: "ここまで確認できれば、来年度の役員も困らずに引き継げます！ 🎉",
    relatedFaqIds: ["handover-002", "handover-003", "account-004", "account-005"],
    lastUpdated: "2026-07-01",
    ownerMemo: "毎年3月に全員に配布推奨",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["引き継ぎ", "年度初め", "よく聞かれる"],
  },

  {
    id: "handover-002",
    category: "handover",
    subCategory: "ファイル引き継ぎ",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "Googleドライブのファイル・フォームのオーナーを引き継ぐ",
    questionPatterns: ["ファイルを引き継ぎたい", "オーナーを新役員に変えたい"],
    keywords: ["オーナー", "引き継ぎ", "ファイル", "フォーム", "移管"],
    simpleSummary: "重要ファイルとフォームのオーナーを、退任前に新役員のアカウントへ移行します。",
    answer: "ファイルとフォームのオーナー移行は退任前に必ず実施してください。退任後に連絡が取れなくなると困ります。",
    pcSteps: [
      "【ドライブファイルのオーナー変更】",
      "ファイルを右クリック→「共有」→新役員のメールアドレスを「編集者」で追加",
      "そのユーザー→「オーナーにする」を選択します",
      "【フォームのオーナー変更】",
      "フォームの「⋮」→「共同編集者を追加」→新役員を追加",
      "※フォームのオーナー変更はドライブから行います（ファイル右クリック→共有）✅"
    ],
    smartphoneSteps: [
      "オーナー変更はPCで行うことをおすすめします"
    ],
    cautions: [],
    warnings: ["オーナー変更は一方向です。変更後に元に戻すには新オーナーに依頼が必要です"],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["handover-001", "drive-005"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["引き継ぎ"],
  },

  {
    id: "handover-003",
    category: "handover",
    subCategory: "個人情報",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "引き継ぎ時の個人情報データの取り扱い",
    questionPatterns: ["個人情報を引き継ぎたい", "データを削除したい", "名簿の扱い"],
    keywords: ["個人情報", "引き継ぎ", "削除", "名簿", "取り扱い"],
    simpleSummary: "不要になった個人情報は責任を持って削除または移管します。",
    answer: "個人情報の管理は法的責任もあります。引き継ぎ時に必ず確認・整理してください。",
    pcSteps: [
      "個人情報を含むファイル（名簿・連絡先・アンケート回答）を洗い出します",
      "引き続き必要なデータは新役員のアカウントに移管します",
      "不要になったデータはGoogleドライブから完全削除します（ゴミ箱も空にする）",
      "フォームの回答で個人情報を含むものは、使用後に回答データを削除します ✅"
    ],
    smartphoneSteps: [
      "ドライブアプリからも削除できます（ゴミ箱を空にする操作も忘れずに）"
    ],
    cautions: ["ゴミ箱に入れただけでは削除されません。ゴミ箱を空にするまで完了ではありません"],
    warnings: ["個人情報の漏洩・不適切な保管は法的問題になる場合があります。取り扱いには十分注意してください"],
    commonMistakes: ["ゴミ箱に入れただけで削除したと思い込む"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["privacy-001", "privacy-002", "handover-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["引き継ぎ", "個人情報"],
  },

  {
    id: "handover-004",
    category: "handover",
    subCategory: "年度初め",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "年度初めにやることリスト",
    questionPatterns: ["年度初めに何をすればいい", "4月にやること", "新学期の準備"],
    keywords: ["年度初め", "4月", "新学期", "やること", "準備"],
    simpleSummary: "アカウント確認・ファイルコピー・フォーム作成・カレンダー更新を順番に行います。",
    answer: "年度初めに確認・実施すべきことをまとめました。順番に行うと漏れがありません。",
    pcSteps: [
      "✅ 共有Googleアカウントにログインできることを確認する",
      "✅ 復旧用情報（メール・電話番号）を現役員のものに更新する",
      "✅ バックアップコードを確認・保管する",
      "✅ 昨年度の資料をコピーして今年度用に修正する",
      "✅ 年間スケジュールを共有カレンダーに登録する",
      "✅ 今年度用のアンケートフォームを作成・テストする",
      "✅ 重要フォルダの共有権限が正しいか確認する",
      "✅ 引き継ぎ書を確認し、不明点を前任者に確認する"
    ],
    smartphoneSteps: [
      "スマホからでも各アプリで確認できます"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: [],
    doneMessage: "年度初めの準備が完了です 🎉 困ったときはいつでもこのチャットボットを使ってください！",
    relatedFaqIds: ["handover-001", "account-001", "form-008"],
    lastUpdated: "2026-07-01",
    ownerMemo: "4月第1週に全役員に配布",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["引き継ぎ", "年度初め", "よく聞かれる"],
  },

  // ── 個人情報管理 ────────────────────────────────────────────
  {
    id: "privacy-001",
    category: "privacy",
    subCategory: "管理ルール",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "名簿・連絡先などの個人情報の管理ルール",
    questionPatterns: ["名簿を管理したい", "個人情報の管理", "連絡先の取り扱い"],
    keywords: ["個人情報", "名簿", "連絡先", "管理", "ルール", "保護"],
    simpleSummary: "最小限の人だけが閲覧でき、使い終わったら削除。これが基本ルールです。",
    answer: "PTAが扱う個人情報は保護者・児童の氏名・住所・電話番号など非常にセンシティブです。適切な管理が必要です。",
    pcSteps: [
      "個人情報は「必要最小限の人だけ」がアクセスできる設定にします",
      "Googleドライブに保存する場合は「特定ユーザー限定」の共有に設定します",
      "「リンクを知っている全員」設定は絶対に使いません",
      "使用が終わったら速やかに削除またはアクセス制限をかけます",
      "年度末には不要な個人情報データを確実に削除します ✅"
    ],
    smartphoneSteps: [
      "スマホのカメラロールに名簿の写真を保存することも避けましょう"
    ],
    cautions: [
      "フォームで収集した個人情報（氏名・連絡先）は使用目的の範囲内でのみ使います",
      "Googleドライブにアップロードした個人情報ファイルは共有範囲を必ず確認してください"
    ],
    warnings: ["個人情報の漏洩・紛失は保護者からの信頼を大きく損ないます。取り扱いには最大限の注意を払ってください"],
    commonMistakes: ["利便性のためにフォルダを「全員閲覧可」にしてしまう"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["drive-006", "privacy-002", "handover-003"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: true,
    tags: ["個人情報", "引き継ぎ"],
  },

  {
    id: "privacy-002",
    category: "privacy",
    subCategory: "削除",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "不要になった個人情報データを削除する",
    questionPatterns: ["データを削除したい", "個人情報を消したい", "アンケート回答を削除したい"],
    keywords: ["削除", "個人情報", "ゴミ箱", "完全削除", "フォーム回答"],
    simpleSummary: "ドライブのゴミ箱を空にするまで完全削除になりません。フォーム回答も忘れずに削除。",
    answer: "Googleドライブの削除はゴミ箱を空にするまで完了しません。フォームの回答データも別途削除が必要です。",
    pcSteps: [
      "【ドライブのファイル削除】",
      "ファイルを右クリック→「削除」→左側「ゴミ箱」→「ゴミ箱を空にする」をクリックします",
      "【フォームの回答データ削除】",
      "フォームの「回答」タブ→右上「⋮」→「すべての回答を削除」をクリックします",
      "連携スプレッドシートのデータも別途削除します ✅"
    ],
    smartphoneSteps: [
      "ドライブアプリでも同様にゴミ箱を空にします ✅"
    ],
    cautions: ["ゴミ箱に入れただけでは30日後に自動削除されるまでデータは残ります"],
    warnings: [],
    commonMistakes: ["ゴミ箱に入れた=削除完了と思い込む（ゴミ箱を空にするまでデータは残っています）"],
    doneMessage: "ここまでできたらOKです 🎉 個人情報が完全に削除されました。",
    relatedFaqIds: ["privacy-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "high",
    handoverRequired: false,
    tags: ["個人情報"],
  },

  // ── 総会・会計・広報 ────────────────────────────────────────
  {
    id: "general-001",
    category: "general",
    subCategory: "総会資料",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "総会資料をGoogleドキュメント・スライドで作る",
    questionPatterns: ["総会資料を作りたい", "総会のスライドを作りたい"],
    keywords: ["総会", "資料", "スライド", "ドキュメント", "作成"],
    simpleSummary: "文書資料はドキュメント、プレゼン資料はスライドで作成してPDFで配布するのがおすすめです。",
    answer: "総会資料はGoogleドキュメントとスライドで効率よく作成できます。",
    pcSteps: [
      "【文書型資料（議事録・報告書）】Googleドキュメントで作成",
      "「ファイル」→「ダウンロード」→「PDF形式」で配布用PDFを作成します",
      "【スライド型資料（発表用）】Googleスライドで作成",
      "発表時は「プレゼンテーションを開始」、配布はPDFまたはPowerPoint形式でダウンロード ✅",
      "前年度の資料をコピーして今年度用に修正するのが効率的です"
    ],
    smartphoneSteps: [
      "スマホからも各アプリで確認・編集できますが、最終仕上げはPCで行うのがおすすめです"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["doc-001", "slide-001", "doc-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: ["年度初め"],
  },

  {
    id: "general-002",
    category: "general",
    subCategory: "イベント運営",
    audience: ["単位PTA役員", "連合会役員"],
    year: "共通",
    title: "イベントの参加申込フォームを作って集計する",
    questionPatterns: ["参加申込を集めたい", "イベントの受付フォームを作りたい"],
    keywords: ["イベント", "参加申込", "受付", "フォーム", "集計"],
    simpleSummary: "Googleフォームで申込を受付→スプレッドシートで集計が最も効率的な方法です。",
    answer: "Googleフォーム＋スプレッドシートの連携でイベント申込から集計まで一気通貫でできます。",
    pcSteps: [
      "Googleフォームで申込フォームを作成します（名前・クラス・参加人数など）",
      "締切・注意事項を「フォームの説明」に記入します",
      "URLを取得してメール・LINEで配布します",
      "「回答」タブ→スプレッドシートに連携して集計します",
      "締切後にフォームの受付を終了します ✅"
    ],
    smartphoneSteps: [
      "フォームアプリで作成・管理できます"
    ],
    cautions: ["締切日のリマインダーをカレンダーに設定しておきましょう"],
    warnings: [],
    commonMistakes: ["締切後も受付が続いていることに気づかない"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["form-001", "form-005", "form-006"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  // ── トラブル対応 ────────────────────────────────────────────
  {
    id: "trouble-001",
    category: "trouble",
    subCategory: "スマホ",
    audience: ["単位PTA役員", "連合会役員", "保護者"],
    year: "共通",
    title: "スマホでGoogleサービスが使えない・開けない",
    questionPatterns: ["スマホで開けない", "アプリがうまく動かない", "スマホで使えない"],
    keywords: ["スマホ", "開けない", "使えない", "アプリ", "エラー"],
    simpleSummary: "アプリを再起動・Chromeで開き直す・アカウント再ログインの順で試してください。",
    answer: "スマホでのGoogleサービスのトラブルは順番に確認することで多くの場合解決します。",
    pcSteps: [],
    smartphoneSteps: [
      "①アプリを完全終了して再起動します",
      "②LINEの内蔵ブラウザで開いている場合はChromeで開き直します",
      "③Wi-Fi・モバイルデータ接続を確認します",
      "④アプリを一度アンインストールして再インストールします",
      "⑤Googleアカウントからログアウトして再ログインします ✅"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: ["LINEの内蔵ブラウザでGoogleフォームを開こうとして失敗する"],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["trouble-002"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "medium",
    handoverRequired: false,
    tags: ["よく聞かれる"],
  },

  {
    id: "trouble-002",
    category: "trouble",
    subCategory: "ブラウザ",
    audience: ["単位PTA役員", "連合会役員", "保護者"],
    year: "共通",
    title: "ブラウザで「エラー」「応答なし」が出たとき",
    questionPatterns: ["エラーが出た", "応答なし", "固まった", "読み込まない"],
    keywords: ["エラー", "応答なし", "固まる", "読み込まない", "ブラウザ"],
    simpleSummary: "ブラウザを再読み込み（F5）→別タブで開き直す→ブラウザを再起動の順で試します。",
    answer: "ブラウザのトラブルは多くの場合、再読み込みまたは再起動で解決します。",
    pcSteps: [
      "①F5キーまたはブラウザの更新ボタンでページを再読み込みします",
      "②別のタブで同じURLを開きます",
      "③ブラウザを完全に閉じて再起動します",
      "④別のブラウザ（Chrome・Edge等）で開きます",
      "⑤パソコンを再起動します ✅"
    ],
    smartphoneSteps: [
      "①ブラウザアプリを閉じて再起動します",
      "②別のブラウザアプリで開きます ✅"
    ],
    cautions: [],
    warnings: [],
    commonMistakes: [],
    doneMessage: "ここまでできたらOKです 🎉",
    relatedFaqIds: ["trouble-001"],
    lastUpdated: "2026-07-01",
    ownerMemo: "",
    visibility: "public",
    importance: "low",
    handoverRequired: false,
    tags: [],
  },
];

// ============================================================
// 検索・フィルタ関数
// ============================================================

function searchFAQ(input) {
  const q = input.toLowerCase().replace(/[！-～]/g, s =>
    String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
  const pub = faqList.filter(f => f.visibility === "public");
  const scored = pub.map(faq => {
    let score = 0;
    for (const kw of faq.keywords) {
      if (q.includes(kw.toLowerCase())) score += kw.length * 2;
    }
    for (const p of (faq.questionPatterns || [])) {
      if (q.includes(p.toLowerCase())) score += p.length;
    }
    if (faq.title.toLowerCase().includes(q)) score += 10;
    return { faq, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  return scored.map(x => x.faq);
}

function getFAQByCategory(catId) {
  return faqList.filter(f => f.category === catId && f.visibility === "public");
}

function getFAQById(id) {
  return faqList.find(f => f.id === id);
}

function getFrequentFAQs() {
  return faqList.filter(f =>
    f.visibility === "public" &&
    (f.importance === "high" || (f.tags || []).includes("よく聞かれる"))
  );
}

function getHandoverFAQs() {
  return faqList.filter(f => f.visibility === "public" && f.handoverRequired === true);
}

function getYearStartFAQs() {
  return faqList.filter(f =>
    f.visibility === "public" && (f.tags || []).includes("年度初め")
  );
}

function getPrivacyFAQs() {
  return faqList.filter(f =>
    f.visibility === "public" && (f.tags || []).includes("個人情報")
  );
}

function getRelatedFAQs(faq, n = 3) {
  const ids = faq.relatedFaqIds || [];
  const byId = ids.map(id => getFAQById(id)).filter(Boolean);
  if (byId.length >= n) return byId.slice(0, n);
  const sameCat = faqList.filter(f =>
    f.category === faq.category && f.id !== faq.id &&
    f.visibility === "public" && !ids.includes(f.id)
  ).slice(0, n - byId.length);
  return [...byId, ...sameCat].slice(0, n);
}

function getAllPublicFAQs() {
  return faqList.filter(f => f.visibility === "public");
}

// 管理画面用：全件（非公開含む）
function getAllFAQs() { return faqList; }
