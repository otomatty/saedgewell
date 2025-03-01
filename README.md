# saedgewell

ポートフォリオサイトと管理画面をモノレポで管理するプロジェクト

## 技術スタック

### フレームワーク・ライブラリ
- Next.js (App Router)
- Bun
- TypeScript

### UI
- shadcn/ui
- MagicUI
- Tailwind CSS

### バックエンド
- Supabase (データベース)
- Supabase Auth (認証)

### 状態管理
- Jotai

### ビルドツール
- tsup (パッケージビルド)
- Turbopack (Next.jsアプリケーション)

### Linter
- Biome

### デプロイ
- Vercel

## プロジェクト構成

```
.
├── apps/
│   ├── portfolio/        # ポートフォリオサイト
│   └── admin/           # 管理画面
└── packages/
    ├── types/           # 型定義（Supabase自動生成の型を含む）
    ├── hooks/           # カスタムフック
    ├── ui/              # UIコンポーネント
    │   ├── shadcn/     # shadcn/uiコンポーネント
    │   ├── magic/      # MagicUIコンポーネント
    │   └── custom/     # 独自UIコンポーネント
    ├── store/           # Jotaiストア
    ├── actions/         # サーバーアクション
    ├── lib/            # ユーティリティ関数
    ├── config/         # 設定ファイル
    │   ├── biome/     # Biome設定
    │   ├── tsup/      # tsup設定
    │   └── turbo/     # Turborepo設定
    └── database/       # データベース関連
```

## Server/Client Components分類

### Server Components
- packages/actions/
- packages/database/
- packages/auth/

### Client Components
- packages/ui/
- packages/store/
- packages/hooks/

### 両方で使用可能
- packages/types/
- packages/lib/
- packages/config/

## 開発コマンド

```bash
# 開発サーバー起動
bun run dev

# パッケージビルド
bun run build

# Supabase型定義の生成と同期
bun run types:sync

# クリーンアップ
bun run clean
```

## 環境変数

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_PROJECT_ID=your_project_id
```

## パッケージの依存関係

- すべてのパッケージは `@saedgewell/types` に依存
- UI関連のパッケージは `@saedgewell/hooks` に依存
- サーバーアクションは `@saedgewell/database` に依存

## 今後の検討事項

- CI/CDパイプラインの設定
- 型生成の自動化
- テスト戦略
- パフォーマンス最適化
- バックアップ戦略
- モニタリング設定
# saedgewell
