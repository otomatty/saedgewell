#!/bin/bash
set -e

echo "既存のSupabase環境をチェックしています..."

# lsofを使用してポートをチェック
SUPABASE_PORTS=(54321 54322 54323)
RUNNING_PORTS=()

for PORT in "${SUPABASE_PORTS[@]}"; do
  if lsof -i :$PORT > /dev/null 2>&1; then
    PROCESS=$(lsof -i :$PORT | grep LISTEN | awk '{print $1}')
    PID=$(lsof -i :$PORT | grep LISTEN | awk '{print $2}')
    RUNNING_PORTS+=("$PORT ($PROCESS, PID: $PID)")
  fi
done

if [ ${#RUNNING_PORTS[@]} -gt 0 ]; then
  echo "⚠️ 警告: 既存のSupabaseプロセスが実行中です"
  echo "以下のポートがすでに使用されています:"
  for PORT_INFO in "${RUNNING_PORTS[@]}"; do
    echo " - $PORT_INFO"
  done
  
  echo ""
  echo "Docker環境に移行する前に、既存のSupabaseを安全に停止する必要があります。"
  read -p "既存のSupabaseを停止しますか？(y/n): " STOP_SUPABASE
  
  if [ "$STOP_SUPABASE" = "y" ]; then
    echo "既存のSupabaseを停止しています..."
    if which supabase > /dev/null 2>&1; then
      echo "Supabase CLIを使用して停止を試みます..."
      supabase stop || true
    fi
    
    echo "残っているSupabaseプロセスを確認しています..."
    for PORT in "${SUPABASE_PORTS[@]}"; do
      if lsof -i :$PORT > /dev/null 2>&1; then
        PID=$(lsof -i :$PORT | grep LISTEN | awk '{print $2}')
        echo "ポート $PORT のプロセス (PID: $PID) を停止しています..."
        kill -15 $PID 2>/dev/null || true
      fi
    done
    
    # 停止を確認
    sleep 3
    STILL_RUNNING=false
    for PORT in "${SUPABASE_PORTS[@]}"; do
      if lsof -i :$PORT > /dev/null 2>&1; then
        STILL_RUNNING=true
        break
      fi
    done
    
    if [ "$STILL_RUNNING" = true ]; then
      echo "❌ 一部のSupabaseプロセスがまだ実行中です。手動で停止するか、以下のコマンドを試してください:"
      echo "supabase stop"
      exit 1
    else
      echo "✅ 既存のSupabaseは正常に停止しました。新しい設定を進められます。"
    fi
  else
    echo "❌ 既存のSupabaseが実行中のままです。設定を進める前に停止してください。"
    exit 1
  fi
else
  echo "✅ 実行中のSupabaseは検出されませんでした。新しい設定を進められます。"
fi

# 既存のsupabaseディレクトリのバックアップ
if [ -d "./supabase" ]; then
  echo "既存のsupabaseディレクトリが検出されました"
  BACKUP_CONFIRM="n"
  read -p "セットアップ前にバックアップを作成しますか？(y/n): " BACKUP_CONFIRM
  
  if [ "$BACKUP_CONFIRM" = "y" ]; then
    BACKUP_DIR="./backup/supabase_$(date +%Y%m%d_%H%M%S)"
    mkdir -p $BACKUP_DIR
    cp -r ./supabase/* $BACKUP_DIR/
    echo "✅ バックアップ完了: $BACKUP_DIR"
  fi
fi

# 正常終了
exit 0 