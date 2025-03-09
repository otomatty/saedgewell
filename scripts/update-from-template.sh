#!/bin/bash

# エラーが発生したら停止
set -e

echo "🔄 テンプレートリポジトリからの更新を確認します..."

# upstreamの最新変更を取得
git fetch upstream

# 現在のブランチ名を取得
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 更新があるか確認
UPDATES=$(git log HEAD..upstream/main --oneline)

if [ -z "$UPDATES" ]; then
    echo "✅ 更新はありません。すでに最新の状態です。"
    exit 0
else
    echo "🔔 以下の更新が見つかりました："
    echo "$UPDATES"
    echo ""
    
    # 更新するかどうかの確認
    read -p "🤔 これらの更新を適用しますか？ (yes/no): " ANSWER
    
    if [ "$ANSWER" != "yes" ] && [ "$ANSWER" != "y" ]; then
        echo "❌ 更新をキャンセルしました。"
        exit 0
    fi
fi

echo "🔄 更新を開始します..."

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