<div align="center">
  <h1>⌨️ 打鍵人（だけんちゅ）</h1>
  <p>
    <strong>シンプルに、ただタイピングを楽しむために。</strong>
  </p>
  <p>
    打鍵人は、余計なものを削ぎ落とした日本語タイピング練習サービスです。<br>
    ゲーム要素がないため、タイピングそのものに集中できます。
  </p>
  <p>
    <a href="https://github.com/aku11i/dakenjin/actions/workflows/ci.yml">
      <img src="https://github.com/aku11i/dakenjin/actions/workflows/ci.yml/badge.svg" alt="CI" />
    </a>
    <a href="https://github.com/aku11i/dakenjin/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/aku11i/dakenjin" alt="License" />
    </a>
    <a href="https://github.com/aku11i/dakenjin/stargazers">
      <img src="https://img.shields.io/github/stars/aku11i/dakenjin" alt="Stars" />
    </a>
  </p>
  <p>
    <a href="#-特徴">特徴</a> •
    <a href="#-なぜ打鍵人">なぜ打鍵人？</a> •
    <a href="#-はじめ方">はじめ方</a> •
    <a href="#-コントリビューション">コントリビューション</a> •
    <a href="#-ライセンス">ライセンス</a>
  </p>
</div>

---

## ✨ 特徴

🎯 **純粋なタイピング体験**
- ゲーム要素なし、邪魔なし - あなたとキーボードだけ
- 集中できるクリーンでミニマルなインターフェース
- タイピングの感触を高める滑らかなアニメーション

📊 **詳細な分析機能**
- KPS（秒間打鍵数）測定
- 正確率とエラー分析
- 詳細な分析のためのセッションログダウンロード機能

🇯🇵 **日本語ファーストの設計**
- 日本語タイピング練習に特化した設計
- ひらがな、カタカナ、漢字をサポート
- 複数の入力方式（ローマ字、かな入力）

🚀 **モダンな技術スタック**
- Next.js 15とReact 19で構築
- TypeScriptによる型安全性
- Turborepoによる効率的なモノレポ管理

## 🤔 なぜ打鍵人？

ゲーム化されたタイピングアプリが溢れる中、**打鍵人**は異なるアプローチを取ります。時には、思考と指とキーボードの純粋なつながりを感じたいときがあるはずです。

こんな方におすすめ：
- 🎹 新しいキーボードや配列を試したい
- 📈 タイピングの上達を記録したい
- 🏃‍♂️ コーディング前のウォームアップに
- 🎯 邪魔されずに集中して練習したい

## 🚀 はじめ方

### 必要な環境

- Node.js 24以上
- pnpm 10.6.3以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/aku11i/dakenjin.git
cd dakenjin

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

`http://localhost:3000`にアクセスしてタイピングを始めましょう！

## 🛠️ 開発

### プロジェクト構成

```
dakenjin/
├── apps/
│   └── web/          # Next.js Webアプリケーション
├── packages/
│   ├── core/         # コアタイピングロジック
│   └── react/        # ReactフックとComponent
└── turbo.json        # Turborepo設定
```

### 利用可能なコマンド

```bash
# 開発
pnpm dev              # 開発サーバーを起動
pnpm build            # プロダクションビルド
pnpm preview          # プロダクションビルドのプレビュー

# コード品質
pnpm lint             # ESLintを実行
pnpm fix              # Lintエラーを修正
pnpm type-check       # TypeScriptの型チェック
pnpm test             # テストを実行

# コミット前
pnpm ready            # すべてのチェックを実行（修正あり）
pnpm ready:check      # すべてのチェックを実行（修正なし）
```

## 🤝 コントリビューション

コミュニティからの貢献を歓迎します！バグ修正、新機能、ドキュメントの改善など、どんな貢献も打鍵人をより良くします。

### 貢献方法

1. リポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

詳細は[コントリビューションガイドライン](CONTRIBUTING.md)をご覧ください。

### 開発哲学

- **シンプルさ優先**: 機能はタイピング体験を向上させるものであり、複雑にしないこと
- **パフォーマンス重視**: タイピングのフィードバックではミリ秒単位が重要
- **アクセシビリティ**: 誰もが快適に打鍵人を使えること

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。

## 🙏 謝辞

- 打鍵人コミュニティによって❤️を込めて開発
- 日本の職人技のミニマリスト哲学にインスパイア
- タイピング体験の向上に貢献してくださるすべての方々に感謝

---

<div align="center">
  <p>
    <strong>タイピングスキルを向上させる準備はできましたか？</strong>
  </p>
  <p>
    <a href="https://dakenjin.com">
      🚀 今すぐ打鍵人を試す
    </a>
  </p>
</div>

