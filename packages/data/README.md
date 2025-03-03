# @saedgewell/data

サンプルデータと定数を提供するパッケージです。

## 概要

このパッケージは、Saedgewellアプリケーションで使用するサンプルデータや定数を提供します。
フロントエンドの開発やテストに必要なデータを一元管理し、一貫性のあるデータを提供します。

## 機能

- コンタクト関連のデータ（カテゴリー、FAQ）
- サービス関連のデータ（提供サービス一覧）
- 技術スタック関連のデータ（使用技術一覧）
- 料金関連のデータ（成果物、FAQ）
- プロセス関連のデータ（開発プロセスステップ）
- サンプルデータ（ダッシュボード用）

## インストール

```bash
bun add @saedgewell/data
```

## 使用方法

```typescript
import { CATEGORIES, FAQS } from '@saedgewell/data';

// カテゴリー一覧を取得
console.log(CATEGORIES);

// サービス一覧を取得
import { services } from '@saedgewell/data';
console.log(services);

// 技術スタック情報を取得
import { techStacks } from '@saedgewell/data';
console.log(techStacks);
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
- @saedgewell/utils
