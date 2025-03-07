#!/bin/bash

# エラーが発生したら停止
set -e

echo "リポジトリのセットアップを開始します..."

# sparse-checkoutの設定
git sparse-checkout init --cone
git sparse-checkout set '*' '!docs' # 除外したいディレクトリを指定

# 不要なファイルやディレクトリの削除
rm -rf .github/template-cleanup
rm -rf docs

# package.jsonの更新
if [ -f "package.json" ]; then
    # プロジェクト名を取得（カレントディレクトリ名）
    PROJECT_NAME=$(basename $(pwd))
    
    # package.jsonの更新（一時ファイルを使用）
    tmp=$(mktemp)
    jq ".name = \"$PROJECT_NAME\" | .version = \"0.1.0\"" package.json > "$tmp" && mv "$tmp" package.json
fi

# 環境変数ファイルの準備
if [ -f ".env.example" ] && [ ! -f ".env" ]; then
    cp .env.example .env
    echo ".envファイルを.env.exampleから作成しました。必要に応じて編集してください。"
fi

echo "セットアップが完了しました。"
echo "次のステップ："
echo "1. .envファイルの設定を確認してください"
echo "2. bun installを実行してください"
echo "3. git remote set-url originで新しいリポジトリのURLを設定してください" 