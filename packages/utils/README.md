# @saedgewell/utils

共通ユーティリティ関数のコレクションを提供するパッケージです。

## インストール

```bash
bun add @saedgewell/utils
```

## 使用方法

```typescript
import { formatDateToYYYYMMDD, truncate, snakeToCamel } from "@saedgewell/utils";

// 日付フォーマット
const formattedDate = formatDateToYYYYMMDD(new Date()); // "2023-03-03"

// 文字列の切り詰め
const truncatedText = truncate("これは長いテキストです", 10); // "これは長い..."

// ケース変換
const camelCaseData = snakeToCamel({ user_id: 1, user_name: "John" }); 
// { userId: 1, userName: "John" }
```

## 提供する機能

### ケース変換ユーティリティ

- `snakeToCamel`: スネークケースからキャメルケースへの変換
- `camelToSnake`: キャメルケースからスネークケースへの変換

### フォーマットユーティリティ

- `formatNumber`: 数値のフォーマット
- `formatCurrency`: 通貨のフォーマット
- `formatPercent`: パーセントのフォーマット
- `formatFileSize`: ファイルサイズのフォーマット
- `formatDate`: 日付のフォーマット
- `formatDateTime`: 日付と時刻のフォーマット
- `formatTime`: 秒数を時間形式にフォーマット
- `formatTimerDisplay`: 秒数をタイマー表示形式にフォーマット

### 日付操作ユーティリティ

- `formatDateToYYYYMMDD`: 日付をYYYY-MM-DD形式に変換
- `formatDateToJapanese`: 日付を日本語形式に変換
- `getDateBefore`: 指定した日数前の日付を取得
- `getDateAfter`: 指定した日数後の日付を取得
- `getDaysBetween`: 2つの日付の間の日数を計算
- `isWeekend`: 日付が週末かどうかを判定

### 文字列操作ユーティリティ

- `truncate`: 文字列を指定した長さに切り詰め
- `isValidUrl`: 文字列が有効なURLかどうかを検証
- `isValidEmail`: 文字列が有効なメールアドレスかどうかを検証
- `escapeHtml`: 文字列から特殊文字をエスケープ
- `slugify`: 文字列をスラッグ形式に変換

### エラーハンドリングユーティリティ

- `handleSupabaseError`: Supabaseエラーのハンドリング
- `handleUnknownError`: 未知のエラーのハンドリング
- `handleError`: 汎用エラーハンドリング

### フォーカス関連ユーティリティ

- `calculateTotalFocusTime`: セッションの合計フォーカス時間を計算
- `calculateSessionDuration`: セッションの経過時間を計算
- `calculateTodaysFocusTime`: 今日のフォーカス時間を計算

### 絵文字ユーティリティ

- `searchEmojis`: 検索語に一致する絵文字を返す
- `getEmojisByCategory`: 指定したカテゴリの絵文字リストを返す
- `getAllCategories`: すべてのカテゴリ名を返す
- `getAllEmojis`: すべての絵文字を返す

## 開発

```bash
# 開発モードで実行
bun run dev

# ビルド
bun run build

# Lint
bun run lint

# Format
bun run format

# テスト実行
bun run test

# テストカバレッジ確認
bun run test:coverage
```

## テスト実施状況

現在のテストカバレッジは以下の通りです：

- ✅ ケース変換ユーティリティ（`case/`）: 100%
- ✅ 日付操作ユーティリティ（`date/`）: 100%
- ✅ 文字列操作ユーティリティ（`string/`）: 100%
- ✅ 絵文字ユーティリティ（`emoji/`）: 100%
- ✅ エラーハンドリングユーティリティ（`error/`）: 100%
- ✅ フォーマットユーティリティ（`format/`）: 100%
- ✅ フォーカス関連ユーティリティ（`focus/`）: 100%

すべてのユーティリティモジュールに対してテストが実装され、テストカバレッジは100%を達成しています。テストは以下の観点で実施されています：

- 基本機能の正常系テスト
- エッジケースの処理
- 無効な入力に対する処理
- 境界値テスト

## 今後実装予定のユーティリティ

### バリデーションユーティリティ（`validation/`）
- 入力値の検証機能
- フォームバリデーション
- データ型チェック

### 数値操作ユーティリティ（`number/`）
- 数値の丸め処理
- 範囲内の乱数生成
- 数値の範囲チェック

### 配列操作ユーティリティ（`array/`）
- 配列の並べ替え
- 重複要素の削除
- 配列の分割と結合
- 配列のフィルタリング

### オブジェクト操作ユーティリティ（`object/`）
- オブジェクトの深いマージ
- オブジェクトのクローン
- オブジェクトの比較
- オブジェクトのフィルタリング

これらの新機能は、既存のユーティリティと同様に、適切なテストカバレッジを確保しながら実装していく予定です。

## ライセンス

MIT
