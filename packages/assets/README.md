# @saedgewell/assets

静的アセットを提供するパッケージです。

## 概要

このパッケージは、Saedgewellアプリケーションで使用する静的アセット（画像、アイコン、フォントなど）を提供します。
アセットを一元管理し、一貫性のあるデザインを実現します。

## 機能

- 画像（ロゴ、プロフィール画像など）
- アイコン（技術スタックアイコン、マニフェスト用アイコンなど）
- フォント（Noto Sans JPなど）
- アセットパス取得ユーティリティ

## インストール

```bash
bun add @saedgewell/assets
```

## 使用方法

```typescript
// アセットのインポート
import { Images, Icons, Fonts, getAssetPath } from '@saedgewell/assets';

// ロゴの使用
const logoPath = Images.Logo.Light;
console.log(logoPath); // => "/assets/images/saedgewell_logo_light.svg"

// アイコンの使用
const reactIconPath = Icons.TechStack.React;
console.log(reactIconPath); // => "/assets/icons/react.svg"

// フォントの使用
const notoSansJPPath = Fonts.NotoSansJP;
console.log(notoSansJPPath); // => "/assets/fonts/NotoSansJP-VariableFont_wght.ttf"

// アセットパスの取得（CDN使用）
const cdnPath = getAssetPath('images/profile.webp', true);
console.log(cdnPath); // => "https://cdn.saedgewell.com/assets/images/profile.webp"
```

## 開発

```bash
# 開発モード（ウォッチモード）
bun run dev

# ビルド
bun run build

# Lint
bun run lint

# フォーマット
bun run format

# クリーンアップ
bun run clean
```

## 依存関係

- @saedgewell/types
