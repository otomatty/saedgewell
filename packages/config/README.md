# @saedgewell/config

このパッケージは、SA Edge Wellプロジェクトの共通設定ファイルを管理します。

## ディレクトリ構造

```
packages/config/
├── src/
│   ├── typescript/     # TypeScript設定
│   ├── styling/       # スタイリング設定
│   ├── build/         # ビルド設定
│   ├── lint/          # Lint/Formatter設定
│   └── runtime/       # ランタイム設定
```

## 設定ファイルの説明

### TypeScript設定 (`typescript/`)

- `base.json`: 基本的なTypeScript設定
- `nextjs.json`: Next.jsプロジェクト用の設定
- `react.json`: Reactプロジェクト用の設定

#### 使用方法

```json
{
  "extends": "@saedgewell/config/typescript/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### スタイリング設定 (`styling/`)

- `tailwind.ts`: Tailwind CSSの基本設定
- `postcss.js`: PostCSSの設定
- `shadcn.json`: shadcn/uiの設定

#### 使用方法

```typescript
// tailwind.config.ts
import { baseConfig } from "@saedgewell/config/styling/tailwind";

export default {
  ...baseConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/components/src/**/*.{js,ts,jsx,tsx}"
  ]
};
```

### ビルド設定 (`build/`)

- `next.config.ts`: Next.jsのビルド設定
- `vitest.config.ts`: Vitestの設定
- `build.ts`: 共通のビルド設定

#### 使用方法

```typescript
// next.config.ts
import { baseConfig } from "@saedgewell/config/build/next.config";

export default {
  ...baseConfig,
  // パッケージ固有の設定
};
```

### Lint/Formatter設定 (`lint/`)

- `biome.json`: Biomeの設定

#### 使用方法

```json
{
  "extends": "@saedgewell/config/lint/biome.json"
}
```

### ランタイム設定 (`runtime/`)

- `bun/bunfig.toml`: Bunの設定

#### 使用方法

```toml
extends = "@saedgewell/config/runtime/bun/bunfig.toml"
```

## 開発

### ビルド

```bash
bun run build
```

### 開発モード

```bash
bun run dev
```

### Lint

```bash
bun run lint
```

### フォーマット

```bash
bun run format
```

## 注意事項

1. 設定ファイルは必要に応じて拡張可能です
2. パッケージ固有の設定は、共通設定を継承して上書きしてください
3. 新しい設定ファイルを追加する場合は、README.mdも更新してください
