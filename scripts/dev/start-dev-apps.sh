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

echo "アプリケーションが正常に起動しました！"
echo ""
echo "アクセスURL:"
echo "- Web: http://web.localhost"
echo "- Docs: http://docs.localhost"
echo "- Admin: http://admin.localhost"
echo ""
echo "ログを確認するには: docker compose logs -f [app_name]" 