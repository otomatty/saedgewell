#!/bin/bash

# エラーが発生したら停止
set -e

echo "🔄 テンプレートリポジトリからの更新を開始します..."

# upstreamの最新変更を取得
git fetch upstream

# 現在のブランチ名を取得
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# マージ前の状態を保存
git stash

# upstreamの変更をマージ
echo "📥 テンプレートの変更を取り込んでいます..."
git merge upstream/main --allow-unrelated-histories

# パッケージの更新
echo "📦 依存関係を更新しています..."
bun install

# スタッシュを復元
git stash pop || true

echo "✅ 更新が完了しました！"
echo "🔍 変更内容を確認し、必要に応じてコンフリクトを解決してください。" 