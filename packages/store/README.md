# @saedgewell/store

Jotaiを使用した状態管理パッケージです。

## 概要

このパッケージは、Saedgewellアプリケーションで使用する状態管理機能を提供します。
Jotaiを使用して、アプリケーション全体で一貫した状態管理を実現します。

## 機能

- 認証状態の管理
- 見積もりフォームの状態管理
- Gmail連携の状態管理
- 通知の状態管理
- サイト設定の状態管理
- サイドバーの状態管理
- 管理画面の状態管理

## インストール

```bash
bun add @saedgewell/store
```

## 使用方法

```typescript
// アトムのインポート
import { currentStepAtom, formDataAtom } from '@saedgewell/store';
import { useAtom } from 'jotai';

// コンポーネント内での使用
function EstimateForm() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [formData, setFormData] = useAtom(formDataAtom);
  
  // ステップを進める
  const nextStep = () => setCurrentStep(currentStep + 1);
  
  // フォームデータを更新
  const updateDescription = (description: string) => {
    setFormData({
      ...formData,
      description
    });
  };
  
  return (
    // コンポーネントの実装
  );
}
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
- jotai
