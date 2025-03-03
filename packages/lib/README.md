# @saedgewell/lib

外部クライアントと共通ライブラリを提供するパッケージです。

## 機能

- Supabaseクライアント（クライアントサイド用）
- Supabase管理者クライアント（サーバーサイド用）
- 共通ユーティリティ関数

## 使用方法

### クライアントサイドでの使用

```typescript
import { supabaseClient } from '@saedgewell/lib';

// Supabaseクライアントを使用する
const { data, error } = await supabaseClient
  .from('users')
  .select('*');
```

### サーバーサイドでの使用

```typescript
import { supabaseAdmin } from '@saedgewell/lib/server';

// Supabase管理者クライアントを使用する
const { data, error } = await supabaseAdmin
  .from('users')
  .select('*');
```

### 共通ユーティリティの使用

```typescript
import { getEnv } from '@saedgewell/lib';

// 環境変数を取得する
const apiKey = getEnv('NEXT_PUBLIC_API_KEY', 'default-key');
```

## 開発

```bash
# 開発モードで実行
bun run dev

# ビルド
bun run build

# クリーンアップ
bun run clean
```
