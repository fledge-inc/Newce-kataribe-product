# Kataribe

Next.js 15 で構築された、多言語対応の商品ストーリー／ストアマップアプリです。

## 必要な環境

- Node.js 22（LTS 推奨）
- npm 10 以上

`nvm` を使用する場合は、リポジトリ内の `.nvmrc` からバージョンを選択できます。

```bash
nvm install
nvm use
```

## ローカル起動

```bash
npm install
npm run dev
```

起動後、[http://localhost:3000](http://localhost:3000) を開いてください。環境変数や外部データベースの設定は不要です。

`npm run dev` は、Desktop配下で大量の依存ファイル読み込みがタイムアウトする
macOS環境でも安定して起動できるよう、実行用コピーをOSの一時領域へ作成します。
アプリのソースコードやGit管理対象はこのリポジトリ内に残ります。

## 確認コマンド

```bash
npm run lint
npm run typecheck
npm run build
```

E2E テストを初めて実行する場合は、Playwright の Chromium を導入してください。

```bash
npx playwright install chromium
npm run test:e2e
```
