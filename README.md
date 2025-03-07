# Super Next App

Next.js 15 + Supabaseスターターキットで、より速くSaaSの構築を始めましょう。

⭐️ **開発者がSuper Next Appを信頼する理由：**
- 本番環境グレードのアーキテクチャ設計
- 包括的なTypeScript設定
- モダンなスタック：Next.js 15、Supabase、TailwindCSS v4
- 高品質なコードツール：Biome、厳格なTypeScriptなど
- 定期的なアップデートとアクティブなメンテナンス

注：このキットのドキュメントは現在更新中です。詳細は後日ご確認ください。

## 含まれる機能

### コアアーキテクチャ
- 🏗️ Next.js 15 + Turborepoモノレポ設定
- 🎨 TailwindCSS v4を使用したShadcn UIコンポーネント
- 🔐 Supabase認証と基本DB
- 🌐 i18n翻訳（クライアント + サーバー）
- ✨ 完全なTypeScript + Biome設定

### 主要機能
- 👤 ユーザー認証フロー
- ⚙️ ユーザープロフィールと設定
- 📱 レスポンシブなマーケティングページ
- 🔒 保護されたルート
- 🎯 Playwrightによる基本的なテスト設定

### 技術スタック

このスターターキットは以下の基盤を提供します：

🛠️ **主な技術スタック**
- [Next.js 15](https://nextjs.org/)：サーバーサイドレンダリングと静的サイト生成のためのReactベースフレームワーク
- [Tailwind CSS](https://tailwindcss.com/)：カスタムデザインを迅速に構築するためのユーティリティファーストCSSフレームワーク
- [Supabase](https://supabase.com/)：Webとモバイルアプリケーションのためのリアルタイムデータベース
- [i18next](https://www.i18next.com/)：JavaScriptの人気な国際化フレームワーク
- [Turborepo](https://turborepo.org/)：複数のパッケージとアプリケーションを管理するモノレポツール
- [Shadcn UI](https://shadcn.com/)：Tailwind CSSを使用して構築されたコンポーネントコレクション
- [Zod](https://github.com/colinhacks/zod)：TypeScript優先のスキーマバリデーションライブラリ
- [React Query](https://tanstack.com/query/v4)：Reactの強力なデータフェッチングとキャッシュライブラリ
- [Biome](https://biome.com/)：
- [Playwright](https://playwright.dev/)：Webアプリケーションのエンドツーエンドテストフレームワーク

## はじめ方

### 前提条件

- Node.js 20.x以降（最新のLTSバージョンを推奨）
- Docker
- Bun

Supabase CLIを使用するために、マシン上でDockerデーモンが実行されていることを確認してください。

### インストール

#### 1. リポジトリのクローン

```bash
git clone https://github.com/otomatty/super-next-app.git
cd super-next-app
```

#### 2. 依存関係のインストール

```bash
bun install
```

#### 3. Supabaseの起動

マシン上でDockerデーモンが実行されていることを確認してください。

以下のコマンドでSupabaseを起動します：

```bash
bun run supabase:web:start
```

Supabaseサーバーが起動したら、前のコマンドの出力に表示されたポートを使用してSupabaseダッシュボードにアクセスしてください。通常は[http://localhost:54323](http://localhost:54323)で見つかります。

コマンド実行後、ターミナルに全てのSupabaseサービスが表示されます。

##### Supabaseの停止

Supabaseサーバーを停止するには、以下のコマンドを実行します：

```bash
bun run supabase:web:stop
```

##### Supabaseのリセット

Supabaseサーバーをリセットするには、以下のコマンドを実行します：

```bash
bun run supabase:web:reset
```

##### その他のSupabaseコマンド

その他のSupabaseコマンドについては、[Supabase CLIドキュメント](https://supabase.com/docs/guides/cli)を参照してください。

```bash
# 新しいマイグレーションの作成
bun --filter web supabase migration new <migration-name>

# Supabaseプロジェクトとのリンク
bun --filter web supabase db link

# マイグレーションのプッシュ
bun --filter web supabase db push
```

#### 4. Next.jsアプリケーションの起動

```bash
bun run dev
```

アプリケーションは http://localhost:3000 で利用可能になります。

#### 5. コードの品質管理（フォーマット等）

コードをフォーマットするには：

```bash
bun run format
```

コードをチェックするには：

```bash
bun run check
```

TypeScriptコードを検証するには：

```bash
bun run typecheck
```

Turborepoはこれらのコマンドの結果をキャッシュするため、パフォーマンスに影響を与えることなく何度でも実行できます。

## プロジェクト構造

プロジェクトは以下のフォルダで構成されています：

```
apps/
├── web/                  # Next.jsアプリケーション
│   ├── app/             # Appルーターページ
│   │   ├── (marketing)/ # 公開マーケティングページ
│   │   ├── auth/        # 認証ページ
│   │   └── home/        # 保護されたアプリページ
│   ├── supabase/        # データベース & マイグレーション
│   └── config/          # アプリ設定
│
packages/
├── ui/                  # 共有UIコンポーネント
└── features/           # コア機能パッケージ
    ├── auth/           # 認証ロジック
    └── ...
```

このプロジェクト構造の詳細については、[Super Next App: プロジェクト構造](https://docs.saedgewell.net/sna-project-structure)の記事を参照してください。

### 環境変数

`.env.local`ファイルで環境変数を設定してアプリケーションを設定できます。

利用可能な変数：

| 変数名 | 説明 | デフォルト値 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | SaaSアプリケーションのURL | `http://localhost:3000` |
| `NEXT_PUBLIC_PRODUCT_NAME` | SaaS製品の名前 | `Makerkit` |
| `NEXT_PUBLIC_SITE_TITLE` | SaaS製品のタイトル | `Makerkit - SaaSの構築と管理を最も簡単に` |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | SaaS製品の説明 | `Makerkitは、SaaSの構築と管理を最も簡単にします。一からの構築の手間なく、必要なツールを提供します。` |
| `NEXT_PUBLIC_DEFAULT_THEME_MODE` | SaaS製品のデフォルトテーマモード | `light` |
| `NEXT_PUBLIC_THEME_COLOR` | SaaS製品のデフォルトテーマカラー | `#ffffff` |
| `NEXT_PUBLIC_THEME_COLOR_DARK` | ダークモードでのSaaS製品のデフォルトテーマカラー | `#0a0a0a` |
| `NEXT_PUBLIC_SUPABASE_URL` | SupabaseプロジェクトのURL | `http://127.0.0.1:54321` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabaseプロジェクトの匿名キー | '' |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabaseプロジェクトのサービスロールキー | '' |

## アーキテクチャ

このスターターキットはモノレポアーキテクチャを使用しています。

1. `apps/web`ディレクトリはNext.jsアプリケーションです。
2. `packages`ディレクトリにはアプリケーションで使用される全てのパッケージが含まれています。
3. `packages/features`ディレクトリにはアプリケーションの全ての機能が含まれています。
4. `packages/ui`ディレクトリには全てのUIコンポーネントが含まれています。

アーキテクチャの詳細については、`apps/dev-docs` ディレクトリにあるドキュメントを確認してください。

### マーケティングページ

マーケティングページは`apps/web/app/(marketing)`ディレクトリにあります。これらのページはSaaSの機能を紹介し、製品に関する情報を提供するために使用されます。

### 認証

認証はSupabaseによってバックアップされています。`apps/web/app/auth`ディレクトリには認証ページが含まれていますが、ロジックは`packages/features/auth`にある独自のパッケージ`@kit/auth`に含まれています。

このパッケージは複数のアプリケーションで使用できます。

### 保護されたページ

保護されたページは`apps/web/app/home`ディレクトリにあります。ここで認証によって保護されたSaaSページを構築できます。

### データベース

Supabaseデータベースは`apps/web/supabase`ディレクトリにあります。このディレクトリにはデータベーススキーマ、マイグレーション、シードデータが含まれています。

#### 新しいマイグレーションの作成
新しいマイグレーションを作成するには、以下のコマンドを実行します：

```bash
bun --filter web supabase migration new --name <migration-name>
```

このコマンドは`apps/web/supabase/migrations`ディレクトリに新しいマイグレーションファイルを作成します。

#### マイグレーションの適用

マイグレーションを作成したら、以下のコマンドを実行してデータベースに適用できます：

```bash
bun run supabase:web:reset
```

このコマンドはマイグレーションをデータベースに適用し、スキーマを更新します。また、提供されたシードデータを使用してデータベースをリセットします。

#### Supabaseデータベースのリンク

ローカルのSupabaseデータベースをSupabaseプロジェクトにリンクするには、以下のコマンドを実行します：

```bash
bun --filter web supabase db link
```

このコマンドはローカルのSupabaseデータベースをSupabaseプロジェクトにリンクします。

#### マイグレーションのSupabaseプロジェクトへのプッシュ

マイグレーションを変更した後、以下のコマンドを実行してSupabaseプロジェクトにプッシュできます：

```bash
bun --filter web supabase db push
```

このコマンドはマイグレーションをSupabaseプロジェクトにプッシュします。これでSupabaseデータベースにマイグレーションを適用できます。

## 本番環境への移行

#### 1. Supabaseプロジェクトの作成

アプリケーションを本番環境にデプロイするには、Supabaseプロジェクトを作成する必要があります。

#### 2. マイグレーションのSupabaseプロジェクトへのプッシュ

マイグレーションを変更した後、以下のコマンドを実行してSupabaseプロジェクトにプッシュできます：

```bash
bun --filter web supabase db push
```

このコマンドはマイグレーションをSupabaseプロジェクトにプッシュします。

#### 3. SupabaseコールバックURLの設定

リモートのSupabaseプロジェクトで作業する場合、SupabaseコールバックURLを設定する必要があります。

Supabaseプロジェクトの設定で、コールバックURLを以下のように設定してください：

`<url>/auth/callback`

ここで`<url>`はアプリケーションのURLです。

#### 4. Vercelまたはその他のホスティングプロバイダーへのデプロイ

Next.jsをサポートする任意のホスティングプロバイダーにアプリケーションをデプロイできます。

#### 5. Cloudflareへのデプロイ

設定はそのまま動作しますが、ルートレイアウトファイル（`apps/web/app/layout.tsx`）でランタイムを`edge`に設定する必要があります。

```tsx
export const runtime = 'edge';
```

CloudflareダッシュボードでNode.js互換性を有効にすることを忘れないでください。

## コントリビューション

バグ修正のコントリビューションを歓迎します！ただし、プルリクエストを作成する前に、まずissueを開いてアイデアについて議論してください。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細については[LICENSE](LICENSE)ファイルを参照してください。

## サポート

このキットにはサポートは提供されません。質問やヘルプが必要な場合はissueを開いていただけますが、応答時間や修正の保証はありません。

## 謝辞

このプロジェクトは多くの素晴らしいオープンソースプロジェクトの影響を受けています。詳細な謝辞は[ACKNOWLEDGMENTS.md](ACKNOWLEDGMENTS.md)をご覧ください。

主な参考プロジェクト：
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Turborepo](https://turborepo.org/)

より詳細な情報は[credits](docs/credits)ディレクトリをご確認ください。
