# GitHub Actionsのセキュリティ対策

## 概要

リポジトリ公開に向けて、GitHub Actionsの実行権限を制限し、セキュリティリスクを最小化するための対策を実施しました。

## 実装内容

### 1. claude.ymlワークフローの制限

Claude botのワークフローに対して、実行権限を@aku11iのみに限定しました。

**変更内容:**
```yaml
jobs:
  claude:
    if: |
      github.actor == 'aku11i' && (
        (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
        (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
        (github.event_name == 'pull_request_review' && contains(github.event.review.body, '@claude')) ||
        (github.event_name == 'issues' && (contains(github.event.issue.body, '@claude') || contains(github.event.issue.title, '@claude')))
      )
```

この変更により、`@claude`メンションがあっても、`github.actor`が`aku11i`でない場合はワークフローが実行されません。

### 2. ci.ymlワークフローについて

CI/CDワークフロー（型チェック、リント、テスト）については、一般的なオープンソースプロジェクトとして、コントリビューターのPRでも実行される必要があるため、特定のユーザーへの制限は行いませんでした。

ただし、GitHubのデフォルト設定により、フォークからの初回PRについては承認が必要となります。

## セキュリティ考慮事項

### 実装した対策

1. **ユーザー制限**: claude.ymlワークフローは@aku11iのみが実行可能
2. **シークレットの保護**: ANTHROPIC_API_KEYなどのシークレットは、制限されたワークフローでのみ使用

### 追加で推奨される設定（リポジトリ設定）

1. **Settings > Actions > General**
   - "Fork pull request workflows from outside collaborators" を "Require approval for first-time contributors" に設定
   - これにより、初回コントリビューターからのPRでのAction実行に承認が必要となります

2. **環境保護ルール**
   - 本番環境へのデプロイなど、重要なワークフローには環境保護ルールを設定
   - 特定のレビュアーの承認を必須とすることが可能

## 今後の課題

- ワークフローの実行履歴を定期的に監視
- 必要に応じて、より詳細な権限設定の実装
- セキュリティアラートへの迅速な対応体制の構築