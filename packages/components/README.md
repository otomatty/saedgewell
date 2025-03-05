# @saedgewell/components

モダンでアクセシブルなUIコンポーネントライブラリ。shadcn/uiをベースに、Tailwind CSSによるスタイリングを採用し、
再利用可能なコンポーネントを提供します。

## 特徴

- 🎨 shadcn/uiベースの美しいデザインシステム
- 📱 レスポンシブデザイン対応
- ♿️ アクセシビリティ対応（ARIA準拠）
- 🎯 TypeScript完全対応
- 📚 Storybookによるインタラクティブなドキュメント
- 🔍 Vitestによるテスト

## インストール

```bash
bun install
```

## 開発

開発サーバーの起動（Storybook）:

```bash
bun storybook
```

ビルド:

```bash
bun build
```

## 使用方法

```tsx
import { Button } from '@saedgewell/components'

export default function MyComponent() {
  return (
    <Button variant="primary">
      クリック
    </Button>
  )
}
```

## ディレクトリ構成

```
src/
├── components/     # UIコンポーネント
├── providers/     # Reactコンテキストプロバイダー
├── lib/          # ユーティリティ関数
└── globals.css   # グローバルスタイル
```

## ライセンス

Private - All Rights Reserved

---

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
