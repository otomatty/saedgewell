#!/bin/bash
set -e

echo "=== Docker環境テスト ==="

# 最初に既存のSupabaseプロセスをチェック
echo "0/5: 既存のSupabaseプロセスをチェック..."
if [ -f "./scripts/dev/check-local-supabase.sh" ]; then
  ./scripts/dev/check-local-supabase.sh || {
    echo "❌ 既存のSupabaseプロセスが検出されました。"
    echo "   Docker環境のテストを開始する前に、既存のプロセスを停止してください。"
    exit 1
  }
else
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
echo "✅ 既存のSupabaseプロセスは検出されませんでした"

# Supabaseユーティリティをインポート（存在する場合）
if [ -f "./scripts/test/supabase-auth-utils.sh" ]; then
  source ./scripts/test/supabase-auth-utils.sh
  # ユーティリティで提供される関数を使用
  check_docker_containers
else
  # Dockerコンテナをチェック（基本的な方法）
  # 基本接続テスト
  echo "1/5: 基本サービステスト..."
  docker compose ps --format "{{.Name}} {{.Status}}" | grep -v "Up" && {
    echo "❌ 一部のサービスが正常に起動していません"
    exit 1
  }
  echo "✅ すべてのサービスが正常に起動しています"
fi

# アプリケーションテスト
echo "2/5: アプリケーション接続テスト..."
for APP in web docs admin; do
  curl -s -o /dev/null -w "%{http_code}\n" http://$APP.localhost | grep -q "200" || {
    echo "❌ ${APP}アプリケーションに接続できません"
    exit 1
  }
  echo "✅ ${APP}アプリケーションに正常に接続できました"
done

# Supabase APIテスト
echo "3/5: Supabase APIテスト..."
if [ -f "./scripts/test/supabase-auth-utils.sh" ]; then
  check_supabase_api
else
  # 基本的なヘルスチェック
  curl -s http://localhost:54321/health > /dev/null || {
    echo "❌ Supabase APIに接続できません"
    exit 1
  }
  echo "✅ Supabase APIは正常に動作しています"
fi

# ホットリロードテスト
echo "4/5: ホットリロードテスト..."
echo "// テスト変更 $(date)" >> apps/web/app/page.tsx
echo "ホットリロードをテスト中です。ブラウザで変更が反映されることを確認してください。"
sleep 5

# リソース使用量テスト
echo "5/5: リソース使用量テスト..."
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

echo "=== テスト完了 ===" 