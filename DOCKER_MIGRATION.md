# モノレポアプリケーションのDocker移行マイルストーン

## 前提条件と目標

### プロジェクトの現状
- **開発環境**
  - OS: macOS 24.3.0
  - Docker Desktop: インストール済み
  - パッケージマネージャ: Bun 1.2.4
  - Node.js: v20.10.0以上

- **アプリケーション構成**
  ```
  saedgewell/
  ├── apps/
  │   ├── web/     # メインアプリ (Next.js, Port: 7510)
  │   ├── docs/    # ドキュメントサイト (Next.js, Port: 7511)
  │   └── admin/   # 管理パネル (Next.js, Port: 7512)
  ├── packages/
  │   ├── supabase/  # Supabase関連の共通コード
  │   ├── ui/        # 共通UIコンポーネント
  │   └── [その他共通パッケージ]
  └── supabase/    # Supabaseの設定とマイグレーション
  ```

- **使用技術**
  - フレームワーク: Next.js 15.2.3
  - データベース: Supabase (PostgreSQL)
  - 認証: Supabase Auth
  - UI: Shadcn UI
  - スタイリング: Tailwind CSS
  - モノレポ管理: Turborepo

- **現在の開発フロー**
  - Turboを使用した並列開発
  - Supabase CLIによるローカルDB管理
  - 環境変数は`.env.local`で管理
  - ポート構成:
    - Web: 7510
    - Docs: 7511
    - Admin: 7512
    - Supabase API: 54321
    - Supabase Studio: 54323
    - PostgreSQL: 54322

### 目標
- 開発環境のDocker化による一貫性の確保
- サブドメインを使用した複数アプリケーションの統合
  - web.localhost
  - docs.localhost
  - admin.localhost
- 単一のSupabaseインスタンスによる認証管理
- 効率的な開発フローの実現
  - ホットリロードの維持
  - 高速なビルド
  - 簡単な環境構築

## フェーズ1: 準備と検証

### 1.1 開発環境の準備
- [ ] Dockerの動作確認
  - `docker --version`で動作確認（最低バージョン: 24.0.0）
  - `docker compose version`で動作確認（最低バージョン: 2.20.0）
  - Docker Desktopの設定
    ```
    Resources > Advanced:
    - CPUs: 4以上
    - Memory: 8GB以上
    - Swap: 2GB以上
    ```

- [ ] バックアップディレクトリの作成（移行完了後に削除予定）
  ```bash
  # バックアップディレクトリを作成
  mkdir -p ./backup/{env,config}
  mkdir -p ./supabase/backup
  ```

- [ ] 現在の環境のバックアップ
  ```bash
  # データベースのダンプを作成
  bun run supabase:db:dump:local > ./supabase/backup/$(date +%Y%m%d)_db_dump.sql

  # 環境変数のバックアップ
  cp apps/web/.env.local ./backup/env/web.env.local
  cp apps/docs/.env.local ./backup/env/docs.env.local
  cp apps/admin/.env.local ./backup/env/admin.env.local

  # 設定ファイルのバックアップ
  cp supabase/config.toml ./backup/config/
  cp package.json ./backup/config/
  ```

### 1.2 基本設定ファイルの作成
- [ ] プロジェクト構造の整理
  ```bash
  mkdir -p docker/{web,docs,admin,nginx}
  touch docker-compose.yml
  touch .env.docker
  touch .dockerignore
  ```

- [ ] `.dockerignore`ファイルの作成
  ```plaintext
  # 開発環境の一時ファイル
  **/.git
  **/.gitignore
  **/.env*
  **/.next
  **/node_modules
  **/dist
  **/.turbo
  **/.cache

  # ログとデバッグファイル
  **/*.log
  **/npm-debug.log*
  **/yarn-debug.log*
  **/yarn-error.log*

  # テストとドキュメント
  **/coverage
  **/docs
  **/*.test.ts
  **/*.spec.ts

  # OS固有のファイル
  .DS_Store
  Thumbs.db
  ```

- [ ] 開発用の環境変数ファイル`.env.docker`の作成
  ```plaintext
  # Docker環境設定
  COMPOSE_PROJECT_NAME=saedgewell
  DOCKER_BUILDKIT=1
  
  # アプリケーションポート
  WEB_PORT=7510
  DOCS_PORT=7511
  ADMIN_PORT=7512
  
  # Supabase設定
  SUPABASE_PROJECT_ID=saedgewell-app
  POSTGRES_PASSWORD=your-secure-password
  SUPABASE_AUTH_JWT_SECRET=your-jwt-secret
  
  # Node環境設定
  NODE_ENV=development
  NEXT_TELEMETRY_DISABLED=1
  
  # ホットリロード最適化
  CHOKIDAR_USEPOLLING=true
  WATCHPACK_POLLING=true
  ```

- [ ] 基本的な`docker-compose.yml`を作成
  ```yaml
  version: '3.8'
  
  services:
    # 基本設定（後で各サービスを追加）
    
  networks:
    saedgewell_net:
      driver: bridge
  
  volumes:
    node_modules:
    supabase_data:
    postgres_data:
  ```

## フェーズ2: Supabaseの移行

### 2.1 Supabase Dockerコンテナの設定
- [ ] `docker-compose.yml`にSupabaseサービスを追加
  ```yaml
  services:
    supabase:
      image: supabase/supabase-local:latest  # 最新バージョンを使用
      ports:
        - "${SUPABASE_PORT:-54321}:54321"  # API
        - "${SUPABASE_STUDIO_PORT:-54323}:54323"  # Studio
        - "${POSTGRES_PORT:-54322}:5432"  # Database
      environment:
        POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
        JWT_SECRET: ${SUPABASE_AUTH_JWT_SECRET}
        STUDIO_PORT: ${SUPABASE_STUDIO_PORT:-54323}
        API_EXTERNAL_URL: ${API_EXTERNAL_URL:-http://localhost:54321}
        SUPABASE_PUBLIC_URL: ${SUPABASE_PUBLIC_URL:-http://localhost:54321}
      volumes:
        - ./supabase:/supabase
        - postgres_data:/var/lib/postgresql/data
      networks:
        - saedgewell_net
      healthcheck:
        test: ["CMD", "pg_isready", "-U", "postgres"]
        interval: 10s
        timeout: 5s
        retries: 5
  ```

- [ ] Supabaseの設定ファイル調整（config.toml）
  ```toml
  # Dockerコンテナ内からのアクセスを許可
  [api]
  port = 54321
  schemas = ["public", "web", "docs", "admin", "storage", "graphql_public"]
  extra_search_path = ["public", "web", "docs", "admin", "extensions"]
  max_rows = 1000

  [auth]
  site_url = "http://web.localhost"
  additional_redirect_urls = [
    "http://web.localhost",
    "http://docs.localhost",
    "http://admin.localhost",
    "http://web.localhost/auth/callback",
    "http://docs.localhost/auth/callback",
    "http://admin.localhost/auth/callback"
  ]
  ```

### 2.2 Supabase単体での動作確認
- [ ] 起動スクリプトの作成（scripts/start-supabase.sh）
  ```bash
  #!/bin/bash
  set -e

  echo "Starting Supabase containers..."
  docker compose up supabase -d

  echo "Waiting for Supabase to be ready..."
  until curl -s http://localhost:54321/health > /dev/null; do
    echo "Waiting for Supabase API..."
    sleep 5
  done

  echo "Running migrations..."
  docker compose exec supabase supabase db reset

  echo "Supabase is ready!"
  ```

- [ ] 動作確認手順
  ```bash
  # 権限付与と実行
  chmod +x scripts/start-supabase.sh
  ./scripts/start-supabase.sh

  # ログの確認
  docker compose logs -f supabase

  # データベース接続テスト
  docker compose exec supabase psql -U postgres -c "\l"
  ```

## フェーズ3: アプリケーションの移行

### 3.1 共通のDockerfile作成
- [ ] ベースイメージの作成（docker/base.Dockerfile）
  ```dockerfile
  FROM node:20-alpine AS base

  # Bunのインストール（1.2.4を使用）
  RUN npm install -g bun@1.2.4

  # 必要なパッケージのインストール
  RUN apk add --no-cache \
      git \
      python3 \
      make \
      g++ \
      libc6-compat

  # ワークディレクトリの設定
  WORKDIR /app

  # 環境変数の設定
  ENV NODE_ENV=development
  ENV NEXT_TELEMETRY_DISABLED=1

  # TypeScriptの設定
  ENV TS_NODE_PROJECT=tsconfig.json
  ```

### 3.2 Webアプリケーションの設定
- [ ] Webアプリ用Dockerfile（docker/web/Dockerfile）
  ```dockerfile
  FROM base AS deps
  COPY package.json bun.lockb ./
  COPY apps/web/package.json ./apps/web/
  COPY packages ./packages/
  RUN bun install

  FROM deps AS dev
  WORKDIR /app
  COPY . .
  EXPOSE 7510
  CMD ["bun", "run", "dev:web"]

  FROM deps AS builder
  COPY . .
  RUN bun run build --filter=web

  FROM base AS runner
  COPY --from=builder /app/apps/web/.next/standalone ./
  COPY --from=builder /app/apps/web/public ./apps/web/public
  COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

  ENV PORT 7510
  EXPOSE 7510

  CMD ["node", "server.js"]
  ```

- [ ] docker-compose.ymlにwebサービスを追加
  ```yaml
  web:
    build:
      context: .
      dockerfile: docker/web/Dockerfile
      target: dev
    ports:
      - "${WEB_PORT:-7510}:7510"
    volumes:
      - ./:/app
      - node_modules:/app/node_modules
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=http://supabase:54321
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    depends_on:
      supabase:
        condition: service_healthy
    networks:
      - saedgewell_net
    develop:
      watch:
        - action: sync
          path: ./apps/web
          target: /app/apps/web
        - action: sync
          path: ./packages
          target: /app/packages
        - action: rebuild
          path: package.json
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:7510/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
  ```

- [ ] Docs・Admin用の設定も同様に作成
  ```yaml
  docs:
    build:
      context: .
      dockerfile: docker/docs/Dockerfile
      target: dev
    ports:
      - "${DOCS_PORT:-7511}:7511"
    volumes:
      - ./:/app
      - node_modules:/app/node_modules
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=http://supabase:54321
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    depends_on:
      supabase:
        condition: service_healthy
    networks:
      - saedgewell_net
    develop:
      watch:
        - action: sync
          path: ./apps/docs
          target: /app/apps/docs
        - action: sync
          path: ./packages
          target: /app/packages
        - action: rebuild
          path: package.json
  
  admin:
    # [同様の設定...]
  ```

## フェーズ4: Nginx設定

### 4.1 Nginxの基本設定
- [ ] Nginx設定ファイル（docker/nginx/default.conf）
  ```nginx
  # レート制限の設定
  limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

  # アップストリームの定義
  upstream web_upstream {
    server web:7510;
    keepalive 32;
  }

  upstream docs_upstream {
    server docs:7511;
    keepalive 32;
  }

  upstream admin_upstream {
    server admin:7512;
    keepalive 32;
  }

  # 共通のセキュリティヘッダー
  map $sent_http_content_type $security_headers {
    default "frame-ancestors 'none'; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;";
  }

  # Webアプリケーション
  server {
    listen 80;
    server_name web.localhost;
    
    # セキュリティヘッダー
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Content-Security-Policy $security_headers;
    
    # プロキシ設定
    location / {
      limit_req zone=mylimit burst=20 nodelay;
      proxy_pass http://web_upstream;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      
      # WebSocket設定
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }
  }

  # [... 同様の設定をdocsとadminにも追加 ...]
  ```

- [ ] docker-compose.ymlにNginxサービスを追加
  ```yaml
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - web
      - docs
      - admin
    networks:
      - saedgewell_net
  ```

### 4.2 システム全体の起動・停止スクリプト
- [ ] 起動スクリプト（scripts/start-dev.sh）
  ```bash
  #!/bin/bash
  set -e

  echo "Starting development environment..."
  
  # /etc/hostsファイルにエントリがあるか確認
  if ! grep -q "web.localhost" /etc/hosts; then
    echo "Adding localhost entries to /etc/hosts..."
    echo "Please enter your password to modify /etc/hosts file"
    sudo sh -c "echo '127.0.0.1 web.localhost docs.localhost admin.localhost' >> /etc/hosts"
  fi

  # Docker環境を起動（Compose Watchを使用）
  docker compose watch
  ```

## フェーズ5: 最適化とテスト

### 5.1 パフォーマンス最適化
- [ ] ビルドキャッシュの最適化
  ```yaml
  # docker-compose.yml
  services:
    web:
      build:
        context: .
        dockerfile: docker/web/Dockerfile
        target: dev
        cache_from:
          - saedgewell/web:dev
      # [...]
  ```

### 5.2 総合テスト
- [ ] 全サービスの起動テスト
  ```bash
  # 全サービスを起動
  docker compose watch
  
  # ブラウザでの動作確認
  # - http://web.localhost
  # - http://docs.localhost
  # - http://admin.localhost
  ```

- [ ] ホットリロードのテスト
  ```bash
  # ファイルを編集してブラウザで変更が反映されるか確認
  echo "// テスト変更" >> apps/web/app/page.tsx
  ```

## 注意点と解決策

### 1. 環境変数の管理

**課題**: `.env.docker`と既存の`.env.local`ファイルの関係をどのように整理するか。

**解決策**: 階層型環境変数構造を採用する

```bash
# 環境変数ファイルの階層構造を作成
mkdir -p config/env
touch config/env/base.env config/env/dev.env config/env/docker.env
```

**実装手順**:
1. 基本構造を以下のように整理:
   - `config/env/base.env`: すべての環境で共通の値
   - `config/env/dev.env`: 開発環境用（Docker内外共通）
   - `config/env/docker.env`: Docker特有の設定
   - `.env.local`: 各開発者の個人設定（gitignoreに追加）

2. docker-compose.ymlでの環境変数の読み込み:
```yaml
services:
  web:
    env_file:
      - config/env/base.env
      - config/env/dev.env
      - config/env/docker.env
      - .env.local  # 個人設定（存在する場合）
```

3. 開発者向けセットアップスクリプトを作成:
```bash
#!/bin/bash
# scripts/setup-env.sh

if [ ! -f .env.local ]; then
  cp config/env/example.local.env .env.local
  echo "個人設定用の.env.localを作成しました。必要に応じて編集してください。"
fi
```

### 2. シークレット値の管理

**課題**: 環境変数のシークレット値（パスワードやJWTシークレット）の安全な共有方法を決定する必要がある。

**解決策**: Docker Secretsを活用した安全な管理システムを構築

**実装手順**:
1. Docker Secretsの設定:
```yaml
# docker-compose.yml
secrets:
  db_password:
    file: ./secrets/db_password.txt
  jwt_secret:
    file: ./secrets/jwt_secret.txt

services:
  supabase:
    secrets:
      - db_password
      - jwt_secret
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
      JWT_SECRET_FILE: /run/secrets/jwt_secret
```

2. シークレット初期化用Makefileの作成:
```makefile
# Makefile
init-secrets:
  @mkdir -p ./secrets
  @if [ ! -f ./secrets/db_password.txt ]; then \
    echo "Generating secure database password..."; \
    openssl rand -base64 32 > ./secrets/db_password.txt; \
  fi
  @if [ ! -f ./secrets/jwt_secret.txt ]; then \
    echo "Generating JWT secret..."; \
    openssl rand -base64 64 > ./secrets/jwt_secret.txt; \
  fi
  @echo "Secrets generated. Add them to your password manager or secure storage."
```

3. チーム内での安全な共有:
   - パスワードマネージャー（1Password Teams、LastPassなど）を使用
   - もしくは暗号化されたメッセージングアプリで必要なシークレットのみを共有
   - `.gitignore`に`/secrets/`ディレクトリを追加

### 3. 既存データの移行

**課題**: Supabaseの既存データ（特に認証情報）をDockerコンテナへ移行する具体的な手順の作成。

**解決策**: エクスポート・インポートスクリプトを用意し、移行プロセスを自動化

**実装手順**:
1. エクスポートスクリプトの作成:
```bash
#!/bin/bash
# scripts/export-supabase-data.sh

echo "既存のSupabaseからデータをエクスポートします..."

# 既存の環境変数を読み込み
source .env.local

# 認証情報などを含む完全なダンプを作成
bun supabase db dump \
  --db-url postgresql://postgres:${SUPABASE_DB_PASSWORD}@localhost:54322/postgres \
  > ./supabase/migrations/backup-$(date +%Y%m%d).sql

echo "エクスポート完了：./supabase/migrations/backup-$(date +%Y%m%d).sql"
```

2. Docker用のインポートスクリプト:
```bash
#!/bin/bash
# scripts/import-to-docker-supabase.sh

echo "Docker環境のSupabaseにデータをインポートします..."

# 最新のバックアップファイルを探す
LATEST_BACKUP=$(ls -t ./supabase/migrations/backup-*.sql | head -1)

# Dockerのデータベースにインポート
docker compose exec supabase psql -U postgres -d postgres -f /supabase/migrations/$(basename $LATEST_BACKUP)

echo "インポート完了！"
```

3. 移行手順の文書化:
```markdown
# Supabaseデータ移行手順

## 前提条件
- 既存のSupabaseが実行中であること
- Docker環境が構築済みであること

## 手順
1. 既存データのバックアップ: `./scripts/export-supabase-data.sh`
2. Docker環境の起動: `docker compose up -d supabase`
3. データのインポート: `./scripts/import-to-docker-supabase.sh`
4. 動作確認: `docker compose exec supabase supabase db reset`

## 注意事項
- 認証データを含むため、バックアップファイルの取り扱いには注意
- 移行後は必ずログインテストを実施
```

### 4. 開発効率の維持

**課題**: Docker内でのビルド時間の長さがTurboレポの恩恵（キャッシュなど）を損なわないか検証が必要。

**解決策**: Docker Volumeを活用したキャッシュの永続化とビルド最適化

**実装手順**:
1. Docker Volumeの設定:
```yaml
# docker-compose.yml
volumes:
  turbo-cache:
  node_modules:

services:
  web:
    volumes:
      - ./:/app
      - node_modules:/app/node_modules
      - turbo-cache:/app/.turbo
```

2. ビルド最適化設定:
```dockerfile
# docker/web/Dockerfile

# キャッシュディレクトリを設定
ENV TURBO_TEAM="local"
ENV TURBO_REMOTE_ONLY=false

# ビルドキャッシュの永続化
VOLUME [ "/app/.turbo" ]
```

3. ホットリロード最適化:
```yaml
# docker-compose.yml
services:
  web:
    develop:
      watch:
        - action: sync+restart
          path: ./apps/web/package.json
          target: /app/apps/web/package.json
        - action: sync
          path: ./apps/web/src
          target: /app/apps/web/src
    environment:
      # ホットリロード最適化
      WATCHPACK_POLLING: "true"
      CHOKIDAR_USEPOLLING: "true"
```

4. パフォーマンス計測ツール:
```bash
#!/bin/bash
# scripts/dev-metrics.sh

echo "開発効率メトリクスを計測します..."

# ビルド時間の計測
time docker compose exec web bun run build

# ホットリロード応答時間の計測
echo "ホットリロードのレイテンシを計測..."
START=$(date +%s.%N)
touch apps/web/app/page.tsx
curl -s --head --retry 10 --retry-connrefused --retry-delay 1 http://web.localhost | grep -q "200 OK"
END=$(date +%s.%N)
DIFF=$(echo "$END - $START" | bc)
echo "ホットリロード応答時間: ${DIFF}秒"
```

### 5. テスト計画

**課題**: アプリケーションのテスト項目やSupabase認証が全アプリで共通して動作することの検証方法の作成。

**解決策**: 構造化されたテスト計画と自動テストスクリプトの導入

**実装手順**:
1. テスト計画の作成:
```markdown
# Docker環境テスト計画

## 基本テスト項目
- [ ] 各アプリケーションの起動確認
- [ ] 各サブドメインからのアクセス確認
- [ ] 認証フロー（新規登録、ログイン、ログアウト）
- [ ] クロスアプリケーション認証（一度ログインで全てにアクセス）

## 詳細テスト項目
### 認証テスト
- [ ] メール認証
- [ ] Googleログイン
- [ ] GitHubログイン
- [ ] パスワードリセット

### パフォーマンステスト
- [ ] 初回ビルド時間
- [ ] ホットリロード反応時間
- [ ] Turboキャッシュ効果検証
```

2. 自動テストスクリプト:
```bash
#!/bin/bash
# scripts/test-docker-env.sh

echo "Docker環境のテストを実行します..."

# 基本的な接続テスト
echo "基本接続テスト..."
curl -s -o /dev/null -w "%{http_code}\n" http://web.localhost
curl -s -o /dev/null -w "%{http_code}\n" http://docs.localhost
curl -s -o /dev/null -w "%{http_code}\n" http://admin.localhost

# Supabase APIテスト
echo "Supabase APIテスト..."
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:54321/health

# その他のテストは必要に応じて追加
```

3. E2Eテストの導入:
```javascript
// tests/e2e/auth.spec.js
describe('クロスアプリケーション認証テスト', () => {
  it('Webサイトでログイン後、他のアプリにもログイン状態が反映される', async () => {
    // Webサイトにアクセス
    await page.goto('http://web.localhost');
    
    // ログイン処理
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Docsサイトにアクセス
    await page.goto('http://docs.localhost');
    
    // ログイン状態の確認
    const loggedIn = await page.isVisible('[data-testid="user-profile"]');
    expect(loggedIn).toBe(true);
  });
});
```

## フェーズ6: 環境構築の自動化

上記の解決策を統合し、開発フローを効率化するための追加フェーズとして、環境構築の自動化を導入します。

### 6.1 セットアップスクリプトの作成
- [ ] 総合的なセットアップスクリプトの作成
```bash
#!/bin/bash
# scripts/setup-docker-env.sh

echo "Docker開発環境のセットアップを開始します..."

# 必要なディレクトリの作成
mkdir -p config/env secrets

# 環境変数ファイルの作成
cp .env.example config/env/base.env

# シークレットの生成
openssl rand -base64 32 > ./secrets/db_password.txt
openssl rand -base64 64 > ./secrets/jwt_secret.txt

# 現在の.env.localからDockerで必要な値を抽出
grep "SUPABASE_" .env.local > config/env/supabase.env

# hostsファイルの設定
if ! grep -q "web.localhost" /etc/hosts; then
  echo "hostsファイルに必要なエントリを追加します..."
  echo "127.0.0.1 web.localhost docs.localhost admin.localhost" | sudo tee -a /etc/hosts
fi

echo "セットアップ完了！docker compose upで環境を起動できます。"
```

### 6.2 開発者向けドキュメント
- [ ] Docker開発環境ガイドの作成
```markdown
# Docker開発環境ガイド

## 初回セットアップ
1. `./scripts/setup-docker-env.sh`を実行
2. 必要に応じて`config/env/base.env`を編集
3. 機密情報は`./secrets/`ディレクトリで管理

## 開発の流れ
1. `docker compose up`で環境を起動
2. 以下のURLでアクセス:
   - Web: http://web.localhost
   - Docs: http://docs.localhost
   - Admin: http://admin.localhost
3. コード変更はホットリロードされます

## トラブルシューティング
- ホットリロードが遅い場合: `docker compose restart web`
- DBリセットが必要な場合: `docker compose exec supabase supabase db reset`
- キャッシュクリア: `docker compose down -v && docker compose up`
```

### 6.3 CI/CD統合
- [ ] GitHub Actionsワークフローの作成
```yaml
# .github/workflows/docker-test.yml
name: Docker環境テスト

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Dockerビルド
        run: docker compose build
        
      - name: Docker環境起動
        run: docker compose up -d
        
      - name: 基本テスト実行
        run: ./scripts/test-docker-env.sh
        
      - name: E2Eテスト実行
        run: docker compose exec web bun run test:e2e
```

## 参考リンク

- Docker Compose Watch: https://docs.docker.com/compose/file-watch/
- マルチステージビルド: https://docs.docker.com/build/building/multi-stage/
- バインドマウント: https://docs.docker.com/storage/bind-mounts/
- ヘルスチェック: https://docs.docker.com/compose/compose-file/05-services/#healthcheck
- Docker Secrets: https://docs.docker.com/engine/swarm/secrets/
- Turbo Repo: https://turbo.build/repo/docs
- Next.js with Docker: https://nextjs.org/docs/app/building-your-application/deploying