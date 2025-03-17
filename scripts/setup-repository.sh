#!/bin/bash

# ===================================================
# setup-repository.sh
# ===================================================
# 目的: テンプレートリポジトリから新しいプロジェクトを作成する際の
#      初期セットアップを自動化するスクリプト
# 
# 実行タイミング:
# - テンプレートリポジトリをクローンした直後
# - 新しいプロジェクトの初期セットアップ時
#
# 効果:
# - プロジェクト固有の設定を自動化し、開発の即時開始を可能に
# - テンプレート特有の不要ファイルを削除してクリーンな状態を作成
# - 基本的な環境設定を自動化し、セットアップミスを防止
# 
# 主な機能:
# - Git sparse-checkoutの設定
# - 不要なファイル/ディレクトリの削除
# - package.jsonの自動更新
# - 環境変数ファイルの準備
# ===================================================

# エラーが発生したら停止
# set -e コマンドはスクリプト内でコマンドが失敗した場合に
# 即座に実行を停止するよう指示します
set -e

echo "リポジトリのセットアップを開始します..."

# sparse-checkoutの設定
# これにより、リポジトリの一部のみをチェックアウトできます
# --cone オプションはより効率的なsparse-checkoutモードを有効にします
git sparse-checkout init --cone
git sparse-checkout set '*' '!docs' # 除外したいディレクトリを指定（ここではdocsディレクトリを除外）

# 不要なファイルやディレクトリの削除
# テンプレート固有の不要なファイルを削除します
rm -rf .github/template-cleanup
rm -rf docs

# package.jsonの更新
# プロジェクト固有の情報にpackage.jsonを更新します
if [ -f "package.json" ]; then
    # プロジェクト名を取得（カレントディレクトリ名）
    PROJECT_NAME=$(basename $(pwd))
    
    # package.jsonの更新（一時ファイルを使用）
    # jqコマンドを使用してJSONファイルを安全に編集します
    tmp=$(mktemp)
    jq ".name = \"$PROJECT_NAME\" | .version = \"0.1.0\"" package.json > "$tmp" && mv "$tmp" package.json
fi

# 環境変数ファイルの準備
# .env.exampleファイルが存在し、.envファイルがまだ存在しない場合に
# .env.exampleを.envにコピーします
if [ -f ".env.example" ] && [ ! -f ".env" ]; then
    cp .env.example .env
    echo ".envファイルを.env.exampleから作成しました。必要に応じて編集してください。"
fi

echo "セットアップが完了しました。"
echo "次のステップ："
echo "1. .envファイルの設定を確認してください"
echo "2. bun installを実行してください"
echo "3. git remote set-url originで新しいリポジトリのURLを設定してください" 