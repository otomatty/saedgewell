#!/bin/bash
set -e

echo "アプリケーション開発環境を起動しています..."

# 必要なサービスを指定する
if [ -z "$1" ]; then
  # 引数がない場合は全てのアプリを起動
  APPS="web docs admin"
else
  # 指定されたアプリのみ起動
  APPS="$1"
fi

# 既存のSupabaseがないことを確認（最重要ステップ）
echo "既存のローカルSupabaseプロセスをチェックしています..."
if [ -f "./scripts/dev/check-local-supabase.sh" ]; then
  ./scripts/dev/check-local-supabase.sh || {
    echo "❌ エラー: 既存のSupabaseプロセスのチェックに失敗しました。"
    echo "   既存のプロセスを適切に停止してから再試行してください。"
    exit 1
  }
else
  echo "⚠️ 警告: check-local-supabase.shスクリプトが見つかりません"
  # 基本的なポートチェック
  for PORT in 54321 54322 54323 54324; do
    if lsof -i :$PORT > /dev/null 2>&1; then
      echo "❌ エラー: ポート $PORT が既に使用されています"
      echo "   既存のSupabaseプロセスが実行中の可能性があります"
      echo "   先に停止してから再試行してください"
      exit 1
    fi
  done
fi

# Supabaseが起動していることを確認
if ! docker compose ps | grep -q "supabase.*Up"; then
  echo "Supabaseが起動していません。先にSupabaseを起動します..."
  
  if [ -f "./scripts/dev/start-supabase.sh" ]; then
    ./scripts/dev/start-supabase.sh
  else
    echo "start-supabase.shスクリプトが見つかりません。手動でSupabaseを起動してください。"
    echo "コマンド: docker compose up -d supabase"
    read -p "Supabaseを手動で起動しましたか？(y/n): " STARTED_MANUALLY
    if [ "$STARTED_MANUALLY" != "y" ]; then
      echo "Supabaseが起動されていません。処理を中止します。"
      exit 1
    fi
  fi
fi

# アプリの起動
for APP in $APPS; do
  echo "$APP アプリケーションを起動しています..."
  docker compose up -d $APP
done

# ヘルスチェック
echo "サービスの起動を確認しています..."
sleep 5

# サービスの稼働状態を確認
ALL_UP=true
for APP in $APPS; do
  if curl -s -o /dev/null -w "%{http_code}" http://$APP.saedgewell.test | grep -q "200"; then
    echo "✅ $APP.saedgewell.test は正常に起動しています"
  else
    echo "❌ $APP.saedgewell.test の起動に問題があります"
    ALL_UP=false
  fi
done

echo "アプリケーションが正常に起動しました！"
echo ""
echo "アクセスURL:"
echo "- Web: http://web.saedgewell.test"
echo "- Docs: http://docs.saedgewell.test"
echo "- Admin: http://admin.saedgewell.test"
echo "- Supabase Studio: http://localhost:54323"
echo ""
echo "ログを確認するには: docker compose logs -f [app_name]"

# ブラウザを自動的に起動
if [ "$ALL_UP" = true ]; then
  echo "ブラウザを自動的に起動しています..."
  
  # オペレーティングシステムを検出
  OS=$(uname)
  
  # webアプリを起動対象に含める
  if [[ "$APPS" == *"web"* ]]; then
    OPEN_WEB=true
  else
    OPEN_WEB=false
  fi
  
  if [ "$OS" = "Darwin" ]; then  # macOS
    # Supabase Studioを開く
    open http://localhost:54323
    
    # Webアプリを開く（起動している場合）
    if [ "$OPEN_WEB" = true ]; then
      open http://web.saedgewell.test
    fi
  elif [ "$OS" = "Linux" ]; then
    # Linux用ブラウザ起動コマンド
    if command -v xdg-open > /dev/null; then
      xdg-open http://localhost:54323
      
      if [ "$OPEN_WEB" = true ]; then
        xdg-open http://web.saedgewell.test
      fi
    else
      echo "⚠️ xdg-openコマンドが見つかりません。手動でブラウザを開いてください。"
    fi
  elif [[ "$OS" =~ "MINGW" ]] || [[ "$OS" =~ "MSYS" ]]; then  # Windows Git Bash
    # Windows用ブラウザ起動コマンド
    start http://localhost:54323
    
    if [ "$OPEN_WEB" = true ]; then
      start http://web.saedgewell.test
    fi
  else
    echo "⚠️ 未知のOS: $OS。手動でブラウザを開いてください。"
  fi
  
  echo "✅ ブラウザを自動起動しました"
else
  echo "⚠️ 一部のサービスが起動していないため、ブラウザの自動起動をスキップします"
  echo "   問題を解決した後、手動でアクセスしてください"
fi 