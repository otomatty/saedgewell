# Multi-architecture対応のBunベースイメージ
FROM oven/bun:1.2.4 AS base

# システム依存パッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    python3 \
    make \
    g++ \
    libc6-compat \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ワークディレクトリの設定
WORKDIR /app

# 環境変数の設定
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TEAM=local
ENV TURBO_REMOTE_ONLY=false
  
# Bunの挙動検証
RUN echo 'console.log("Docker+Bun test")' > test.js && \
    bun build test.js --outdir ./dist && \
    cat ./dist/test.js

# 共通ボリュームのマウントポイント
VOLUME [ "/app/.turbo", "/app/.bun-cache" ] 