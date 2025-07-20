# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

### 基本コマンド
```bash
# 開発サーバーを起動
pnpm dev

# プロダクションビルド
pnpm build

# テストを実行
pnpm test

# 特定のテストファイルを実行
pnpm vitest run [ファイルパス]

# リント・型チェック・テストを実行（修正あり）
pnpm ready

# リント・型チェック・テストを実行（修正なし）
pnpm ready:check

# リントエラーを修正
pnpm fix

# 型チェック
pnpm type-check

# Storybookを起動
pnpm storybook
```

### 個別ワークスペースのテスト実行
```bash
# coreパッケージのテストを実行
pnpm vitest run packages/core

# reactパッケージのテストを実行
pnpm vitest run packages/react

# webアプリのテストを実行
pnpm vitest run apps/web
```

## アーキテクチャ概要

### コア設計思想
- **関心の分離**: タイピングロジック（core）とUI（react/web）を完全に分離
- **イミュータブル**: 状態変更は新しいオブジェクトを作成
- **型安全性**: TypeScript による厳密な型付け

### パッケージ構成

#### `packages/core` - タイピングエンジン
- **Character**: 単一文字の入力管理（複数の入力パターン対応）
- **Sentence**: 文章単位の管理（文字の連続、進捗管理）
- **Session**: セッション全体の管理（複数文章、統計情報）
- **SentenceFactory**: 日本語からローマ字入力パターンへの変換
- **ContextualInputPatternResolver**: 文脈依存の入力パターン解決（「ん」「っ」など）

#### `packages/react` - React統合
- **useSession**: セッション管理のReactフック
- **useTypingStats**: タイピング統計のReactフック
- **SessionSnapshot**: Reactレンダリング用の不変スナップショット

#### `apps/web` - Webアプリケーション
- **features/typing**: タイピング機能のコンポーネント群
  - SessionInput: メインコントローラー
  - TypingDisplay: 入力表示（視覚的フィードバック付き）
  - TypingStats: 統計表示
- **ui/components**: 汎用UIコンポーネント

### 重要な実装詳細

#### 文脈依存の入力パターン
- 「ん」は次の文字によって入力パターンが変化（母音の前では「nn」必須）
- 「っ」は次の文字の子音を重ねる

#### テスト構造
- `.test.ts`: 単体テスト（Vitest）
- `.dom.test.ts`: DOM環境でのテスト
- `.stories.tsx`: Storybookストーリー

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