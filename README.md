# PTA IT ナレッジベース

PTA役員向けの Google Workspace 操作・引き継ぎ・個人情報管理などに関するナレッジベースです。  
**サーバー不要・静的HTMLのみ**で動作し、GitHub Pages で公開できます。

---

## ファイル構成

```
PTA-IT-チャットボット/
  index.html     ← メイン画面（チャット＋ブラウズ）
  admin.html     ← FAQ管理・引き継ぎチェックリスト
  style.css      ← デザイン
  script.js      ← メイン画面のロジック
  admin.js       ← 管理ページのロジック
  faqData.js     ← FAQデータ（ここを編集してFAQを追加）
  README.md      ← このファイル
```

---

## 使い方（ローカル）

`index.html` をブラウザにドラッグ＆ドロップするだけで動作します。

---

## GitHub Pages で公開する手順

1. **GitHubアカウントを用意する**（無料）  
   [https://github.com](https://github.com) でアカウント作成

2. **新しいリポジトリを作成**  
   - Repository name: `pta-it-knowledgebase`（任意）  
   - Public（公開）を選択  
   - 「Create repository」をクリック

3. **ファイルをアップロード**  
   - 「uploading an existing file」をクリック  
   - すべてのファイルをドラッグ＆ドロップ  
   - 「Commit changes」をクリック

4. **GitHub Pages を有効化**  
   - リポジトリの「Settings」タブ → 左メニュー「Pages」  
   - Source: 「Deploy from a branch」  
   - Branch: `main` / `/(root)` を選択 → Save

5. **数分後に公開される**  
   `https://ユーザー名.github.io/pta-it-knowledgebase/`  
   でアクセスできます。

> ⚠️ 個人情報が含まれるFAQは `visibility: "private"` にしてください。  
> GitHub Pagesは公開リポジトリから誰でもアクセスできます。

---

## FAQを追加・編集する方法

### 1. faqData.js を開く

`faqData.js` の `faqList` 配列に新しいエントリを追加します。  
テンプレートは **admin.html の「FAQ追加用テンプレート」** からコピーできます。

### 2. スキーマ（フィールド一覧）

| フィールド | 必須 | 説明 |
|---|---|---|
| `id` | ✅ | 一意のID（例: `form-010`）。他と重複しないこと |
| `category` | ✅ | カテゴリID（下表参照） |
| `title` | ✅ | 質問タイトル（短く具体的に） |
| `simpleSummary` | ✅ | 一言まとめ（回答冒頭に表示） |
| `keywords` | ✅ | 検索キーワード配列 |
| `answer` | ✅ | 回答概要文（1〜3文） |
| `pcSteps` | 推奨 | PC操作手順（配列） |
| `smartphoneSteps` | 推奨 | スマホ操作手順（配列） |
| `cautions` | 任意 | 注意事項（黄ボックス） |
| `warnings` | 任意 | 警告（赤ボックス、権限・セキュリティ系） |
| `commonMistakes` | 任意 | よくある間違い（配列） |
| `doneMessage` | 任意 | 完了メッセージ（緑ボックス） |
| `relatedFaqIds` | 任意 | 関連FAQのID配列 |
| `importance` | ✅ | `"high"` / `"medium"` / `"low"` |
| `visibility` | ✅ | `"public"` / `"private"` |
| `handoverRequired` | ✅ | 引き継ぎ確認項目なら `true` |
| `tags` | 任意 | `"よく聞かれる"` / `"年度初め"` / `"引き継ぎ"` / `"個人情報"` |
| `lastUpdated` | 推奨 | 最終更新日（`"2025-04-01"` 形式） |
| `ownerMemo` | 任意 | 担当者メモ（公開されない） |

### 3. カテゴリID一覧

| id | 表示名 |
|---|---|
| `form` | Googleフォーム |
| `account` | アカウント・ログイン |
| `drive` | ドライブ共有 |
| `sheet` | スプレッドシート |
| `document` | ドキュメント |
| `slide` | スライド |
| `calendar` | 共有カレンダー |
| `pdf` | PDF・印刷 |
| `handover` | PTA引き継ぎ |
| `meeting` | 総会・会計・広報 |
| `privacy` | 個人情報管理 |
| `trouble` | トラブル対応 |

---

## 年度末・年度初めの更新チェックリスト

毎年3〜4月の役員交代時に確認してください。

### 年度末（3月）

- [ ] 引き継ぎFAQの内容が最新か確認する
- [ ] `handoverRequired: true` のFAQをすべて印刷して新役員に渡す
- [ ] Googleアカウントの引き継ぎ情報（メール・パスワード・回復用連絡先）を更新
- [ ] 重要ファイルのオーナーを新役員に移行
- [ ] 2段階認証の端末を新役員のスマホに変更
- [ ] バックアップコードを印刷して保管

### 年度初め（4月）

- [ ] `年度初め` タグのFAQを新役員と一緒に確認
- [ ] Googleフォームのアンケートを新年度用に更新
- [ ] 共有カレンダーの年間行事予定を入力
- [ ] 役員名簿の共有権限を更新（旧役員を削除）
- [ ] `lastUpdated` が古いFAQを見直す（admin.htmlで確認）

---

## セキュリティ・個人情報について

- 画面上部に **「パスワード・個人情報はここに入力しないでください」** という注意バナーを常時表示しています
- `visibility: "private"` のFAQはブラウズモードに表示されません
- `tags: ["個人情報"]` のFAQには 🔒 バッジが表示されます
- GitHub Pagesで公開する場合、リポジトリは **Public** になるためソースコードが全員に見えます。実際の個人情報（名前・電話番号など）は絶対に `faqData.js` に書き込まないでください

---

## 将来の拡張アイデア

| 機能 | 概要 |
|---|---|
| AI連携 | `script.js` の `handleInput()` でキーワード検索の代わりに Claude API を呼び出す |
| Googleスプレッドシート連携 | FAQをスプレッドシートで管理し、GAS でJSファイルを自動生成する |
| 質問ログ収集 | 未解決の質問をGoogleフォームに自動送信して蓄積する |
| PDF出力 | 引き継ぎ情報をPDFにしてダウンロードできるようにする |
