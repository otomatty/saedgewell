# @saedgewell/types

このパッケージは、saedgewellプロジェクトで使用される型定義を提供します。

## インストール

モノレポ内の他のパッケージから参照する場合は、package.jsonに以下を追加します：

```json
{
  "dependencies": {
    "@saedgewell/types": "workspace:*"
  }
}
```

## 使用方法

### 直接エクスポートされている型のインポート

```typescript
import { TaskStatus, TaskPriority, Task } from '@saedgewell/types';

const task: Task = {
  id: '1',
  projectId: 'project-1',
  title: 'タスク1',
  status: 'todo',
  priority: 1,
  isArchived: false,
  createdAt: new Date(),
  updatedAt: new Date()
};
```

### 名前空間を使用した型のインポート

名前の衝突を避けるために、一部の型は名前空間を使用してエクスポートされています。

```typescript
import { FocusTypes, TaskTypes, PromptTypes, SupabaseTypes } from '@saedgewell/types';

const focusSession: FocusTypes.FocusSession = {
  id: '1',
  user_id: 'user-1',
  started_at: new Date().toISOString(),
  status: 'in_progress',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};
```

## 開発

### ビルド

```bash
cd packages/types
bun run build
```

### 開発モード（変更を監視）

```bash
cd packages/types
bun run dev
```

### Supabase型定義の生成

```bash
cd packages/types
bun run generate:types
```

## 型定義の追加

新しい型定義を追加する場合は、以下の手順に従ってください：

1. `src`ディレクトリに新しい型定義ファイルを作成します。
2. `src/index.ts`ファイルで新しい型定義をエクスポートします。
3. 名前の衝突がある場合は、名前空間を使用してエクスポートします。

## 注意事項

- 型定義の変更は他のパッケージに影響を与える可能性があるため、慎重に行ってください。
- 型定義の変更後は必ずビルドを実行し、他のパッケージでの使用をテストしてください。
