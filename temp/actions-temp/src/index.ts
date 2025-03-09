"use server";

/**
 * actionsパッケージのエントリーポイント
 * 各機能カテゴリごとのアクションをエクスポートします
 */

// 認証関連のアクション
export * from "./auth/auth";

// ユーザー関連のアクション
export * from "./user";

// プロフィール関連のアクション
export * from "./profile";

// スキル関連のアクション
export * from "./skill";

// 技術関連のアクション
export * from "./technology";

// 作品関連のアクション
export * from "./work";

// ロール関連のアクション
export * from "./role";

// サイト設定関連のアクション
export * from "./site";

// プロジェクト関連のアクション
export * from "./project";

// メトリクス関連のアクション
export * from "./metric";

// 通知関連のアクション
export * from "./notification/notification";

// 外部連携関連のアクション
export * from "./integration";

// ナレッジ関連のアクション
export * from "./knowledge";

// 見積もり関連のアクション
export * from "./estimate";

// フォーカス関連のアクション
export * from "./focus";

// コンタクト関連のアクション
export * from "./contact";

// ブログ関連のアクション
export * from "./blog";

// AI関連のアクション
export * from "./ai";

// 新しく追加したGmail認証関連のエクスポートを追加します
export * from "./integration/gmail";
