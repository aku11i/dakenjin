# 開発ガイドライン

## プロジェクト概要

- プロジェクトの概要・セットアップや基本的な開発フローは [README.md](./README.md) を参考にしてください。

## ディレクトリ構造

- モノレポ構成を採用しています。
- `apps/web` - Webアプリケーション
  - Next.js を使用した Web アプリケーションです。
  - `src`
    - `app` - Next.js の App Router に関するコード。ルーティングやページに関するコードを管理します。
    - `features` - 個別の機能に関するコードを管理します。
      - `actions` - Server Actions
      - `components` - 機能に依存したコンポーネント
      - `utils` - 機能に関係する便利関数や hooks
      - `schemas` - 機能に関するデータモデルの Zod スキーマ・その型定義
    - `ui` - 汎用的な UI コンポーネント
      - ボタンやモーダルなど、個別の機能に依存しない純粋な UI コンポーネントを管理します。
      - `components` - 汎用的な UI コンポーネント
      - `utils` - 汎用的な UI コンポーネントに関する便利関数や hooks
- `packages/core` - コアライブラリ
  - タイピングに関するコードを管理します。
- `packages/libs` - 汎用コード
  - 汎用的な関数やライブラリを管理します。

### ファイル名の命名規則

- 全て param-case で命名してください。
- 例：
  - `post-list.tsx`
  - `get-posts.ts`

## ドキュメント管理

- ドキュメントは `docs` フォルダに Markdown 形式で保存してください。
- ファイル名は `yyyy-MM-dd-{タイトル}.md` のフォーマットで保存してください。

保存すべき情報は下記の通りです。

- 意思決定
  - 仕様や技術設計に関する決定事項
- 知見
  - 開発中に気づいたことや、学んだこと

ドキュメントは開発を進める中で随時更新してください。

## コーディングルール

### TypeScript

- 別のファイルを import する時は必ず相対パスで import してください。パスエイリアスの使用は禁止されています。
  - 別のワークスペースからの import は例外です。
    - 例： `@dakenjin/core` や `@dakenjin/ui` など
- `interface` を使うことは禁止されています。 `type` を使ってください。

## コミットルール

- コミットメッセージは、[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/) に従ってください。
- コミットメッセージは、`feat` や `fix` などのプレフィックスを付けてください。
- コミットメッセージは、英語で記載してください。

## プルリクエストの作成ルール

- プルリクエストを作成する際は、`create_pull_request` を使ってください。
- プルリクエストは、実装内容ごとに細かい粒度に分けて作成してください。
- プルリクエストのタイトルは、Conventional Commits の規則に従って記載してください。
- プルリクエストのフォーマットは `.github/pull_request_template.md` を参考にしてください。

## Issue の作成ルール

- Issue を作成する際は、Issue テンプレートを使用してください。
  - Feature request: `.github/ISSUE_TEMPLATE/feature_request.md`
    - 機能追加や改善に関する提案
  - Bug report: `.github/ISSUE_TEMPLATE/bug_report.md`
    - バグ報告
  - Question: `.github/ISSUE_TEMPLATE/question.md`
    - 質問や相談・問い合わせ

## テストについて

- テストは、ファイル名の末尾に `.test.{ts,tsx}` を付けて、同じディレクトリに作成してください。
- テストは、Vitest を使用して実行してください。
  - `pnpm vitest run [ファイル名]`

## 開発フロー

- コミットする前に pnpm ready を実行することを徹底して下さい。