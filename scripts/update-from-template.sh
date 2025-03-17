#!/bin/bash

# エラーが発生したら停止
set -e

# 除外するファイルやディレクトリのリスト
# スペース区切りで複数指定可能
EXCLUDED_FILES=(
  "README.md"
  "LICENSE"
  "apps/specific-app"
  "custom-config.json"
  ".cursor"
  "docs"
  "apps"
  "./package.json"  # ルートディレクトリのpackage.jsonのみを除外
)

echo "🔄 テンプレートリポジトリからの更新を確認します..."

# 未コミットの変更があるか確認
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ 未コミットの変更があります。更新前に変更をコミットしてください。"
  echo "📝 git status の結果:"
  git status
  exit 1
fi

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

# 除外ファイルの一時保存
echo "📋 除外ファイルを一時保存しています..."
TEMP_DIR=$(mktemp -d)
for file in "${EXCLUDED_FILES[@]}"; do
  if [ -e "$file" ]; then
    mkdir -p "$TEMP_DIR/$(dirname "$file")"
    cp -r "$file" "$TEMP_DIR/$(dirname "$file")/"
    echo "  - $file を保存しました"
  fi
done

# upstreamの変更をマージ
echo "📥 テンプレートの変更を取り込んでいます..."
git merge upstream/main --allow-unrelated-histories

# 除外ファイルを復元
echo "📋 除外ファイルを復元しています..."
for file in "${EXCLUDED_FILES[@]}"; do
  if [ -e "$TEMP_DIR/$file" ]; then
    cp -r "$TEMP_DIR/$file" "$(dirname "$file")/"
    echo "  - $file を復元しました"
  fi
done

# 一時ディレクトリの削除
rm -rf "$TEMP_DIR"

# パッケージの更新
echo "📦 依存関係を更新しています..."
bun install

# スタッシュを復元
git stash pop || true

echo "✅ 更新が完了しました！"
echo "🔍 変更内容を確認し、必要に応じてコンフリクトを解決してください。"
echo "📝 更新内容を確認したら、変更をコミットしてください。" 