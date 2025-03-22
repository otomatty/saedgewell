#!/bin/bash
set -e

# アーキテクチャの検出
ARCH=$(uname -m)

echo "検出されたアーキテクチャ: $ARCH"

# Supabaseが起動しているか確認し、起動していなければ起動する
echo "Supabaseの状態を確認しています..."
if ! curl -s http://localhost:54321/health > /dev/null; then
  echo "Supabaseを起動しています..."
  if command -v supabase &> /dev/null; then
    supabase start
    echo "✅ Supabaseが起動しました"
  else
    echo "❌ エラー: supabaseコマンドが見つかりません"
    echo "   Supabaseをインストールするか、手動で起動してください"
    exit 1
  fi
else
  echo "✅ Supabaseはすでに起動しています"
fi

# ホスト側のSupabaseを使用するため、チェックをスキップ
# if [ -f "./scripts/dev/check-local-supabase.sh" ]; then
#   ./scripts/dev/check-local-supabase.sh
# fi

echo "ホスト側のSupabaseを使用します（ポート54321）"

# アーキテクチャ別の設定ファイルを選択
if [ "$ARCH" = "arm64" ]; then
  echo "Apple Silicon (M1/M2) 最適化を使用します"
  
  # Buildkitを有効化
  export DOCKER_BUILDKIT=1
  export COMPOSE_DOCKER_CLI_BUILD=1
  
  # Apple Silicon向け設定でコンテナを起動
  docker compose -f docker-compose.yml -f docker-compose.apple-silicon.yml up -d
else
  echo "標準構成を使用します"
  docker compose up -d
fi

# ヘルスチェック
echo "サービスの起動を確認しています..."
sleep 5

# サービスの稼働状態を確認
ALL_UP=true
for APP in web docs admin; do
  if curl -s -o /dev/null -w "%{http_code}" http://$APP.saedgewell.test | grep -q "200"; then
    echo "✅ $APP.saedgewell.test は正常に起動しています"
  else
    echo "❌ $APP.saedgewell.test の起動に問題があります"
    ALL_UP=false
  fi
done

echo "$ARCH アーキテクチャ用の開発環境を起動しました"
echo ""
echo "アクセスURL:"
echo "- Web: http://web.saedgewell.test"
echo "- Docs: http://docs.saedgewell.test"
echo "- Admin: http://admin.saedgewell.test"
echo "- Supabase Studio: http://localhost:54323"
echo ""
echo "ログを確認するには:"
echo "  ./scripts/dev/logs.sh web      # Webアプリのログをリアルタイムで表示"
echo "  ./scripts/dev/logs.sh -a       # すべてのサービスのログを表示"
echo "  ./scripts/dev/logs.sh --help   # その他のオプション"
echo ""

# ブラウザを自動的に起動
if [ "$ALL_UP" = true ]; then
  echo "ブラウザを自動的に起動しています..."
  
  # オペレーティングシステムを検出
  OS=$(uname)
  
  if [ "$OS" = "Darwin" ]; then  # macOS
    # WebアプリとSupabase Studioを開く
    open http://web.saedgewell.test
    open http://localhost:54323
  elif [ "$OS" = "Linux" ]; then
    # Linux用ブラウザ起動コマンド
    if command -v xdg-open > /dev/null; then
      xdg-open http://web.saedgewell.test
      xdg-open http://localhost:54323
    else
      echo "⚠️ xdg-openコマンドが見つかりません。手動でブラウザを開いてください。"
    fi
  elif [[ "$OS" =~ "MINGW" ]] || [[ "$OS" =~ "MSYS" ]]; then  # Windows Git Bash
    # Windows用ブラウザ起動コマンド
    start http://web.saedgewell.test
    start http://localhost:54323
  else
    echo "⚠️ 未知のOS: $OS。手動でブラウザを開いてください。"
  fi
  
  echo "✅ ブラウザを自動起動しました"
else
  echo "⚠️ 一部のサービスが起動していないため、ブラウザの自動起動をスキップします"
  echo "   問題を解決した後、手動でアクセスしてください"
fi 