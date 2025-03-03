// 管理画面関連の型定義
export * from "./admin";

// 認証関連の型定義
export * from "./auth";

// ブログ関連の型定義
export * from "./blog";

// コンタクト関連の型定義
import * as ContactTypes from "./contact";
export { ContactTypes };
// コンタクトの型定義から必要なものを選択的にエクスポート
// 注意: Tablesという型名が衝突するため、名前空間を使用

// データテーブル関連の型定義
export * from "./data-table";

// ダッシュボード関連の型定義
export * from "./dashboard";

// エラー関連の型定義
export * from "./error";

// 見積もり関連の型定義
import * as EstimateTypes from "./estimate";
export { EstimateTypes };
// 見積もりの型定義を直接エクスポート（型名の衝突を避けるため選択的にエクスポート）
export type {
	ProjectType,
	Deadline,
	EstimateFormData,
	AIQuestion,
	FeatureProposal,
} from "./estimate";
// 注意: FeatureProposalという型名が衝突するため、名前空間も維持

// フォーカスセッション関連の型定義
import * as FocusTypes from "./focus";
export { FocusTypes };
// フォーカスの型定義から、TaskStatus と TaskPriority 以外をエクスポート
export type {
	FocusStatus,
	IntervalType,
	FocusScore,
	FocusSession,
	FocusInterval,
	CreateFocusSessionInput,
	UpdateFocusSessionInput,
	CreateFocusIntervalInput,
	UpdateFocusIntervalInput,
	TimerState,
	NotificationPayload,
} from "./focus";
export { TIMER_SETTINGS } from "./focus";

// GitHub関連の型定義
export * from "./github";

// Gmail関連の型定義
export * from "./gmail";

// ナレッジベース関連の型定義
export * from "./knowledge";

// メトリクス関連の型定義
export * from "./metrics";

// 通知関連の型定義
export * from "./notification";

// プロフィール関連の型定義
export * from "./profile";

// プロジェクト関連の型定義
export * from "./project";

// スキル関連の型定義
export * from "./skill";

// サイト設定関連の型定義
export * from "./site-settings";

// タスク関連の型定義
import * as TaskTypes from "./tasks";
export { TaskTypes };
// タスクの型定義をエクスポート
export type {
	Task,
	CreateTaskInput,
	UpdateTaskInput,
} from "./tasks";
// TaskStatus と TaskPriority は tasks.ts から優先的にエクスポート
export type { TaskStatus, TaskPriority } from "./tasks";

// UIコンポーネント関連の型定義
export * from "./ui";

// 作業関連の型定義
export * from "./work";

// Supabase関連の型定義
import * as SupabaseTypes from "./supabase-types";
export { SupabaseTypes };
// Supabaseの型定義から必要なものを選択的にエクスポート
export type { Database } from "./supabase-types";
// 注意: Tablesという型名が衝突するため、名前空間を使用

// Scrapbox関連の型定義
export * from "./scrapbox-types";

// プロンプト関連の型定義
import * as PromptTypes from "./prompts";
export { PromptTypes };
// 注意: FeatureProposalという型名が衝突するため、名前空間を使用
