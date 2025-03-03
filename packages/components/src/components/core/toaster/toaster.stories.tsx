import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Toaster } from "./index";
import { ToastAction } from "../toast";
import { useToast } from "@saedgewell/hooks";

/**
 * `Toaster`コンポーネントは、複数のトースト通知を管理するためのコンポーネントを提供します。
 *
 * ## 特徴
 * - 複数のトースト通知の管理
 * - 自動的な表示/非表示
 * - カスタマイズ可能なスタイル
 * - アクセシビリティ対応
 *
 * ## 使用例
 * ```tsx
 * <Toaster />
 * ```
 *
 * ## アクセシビリティ
 * - WAI-ARIA準拠
 * - キーボード操作対応
 * - スクリーンリーダーで適切に読み上げられる
 */
const meta = {
	title: "Core/Toaster",
	component: Toaster,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Toasterコンポーネントは、複数のトースト通知を管理するためのコンポーネントを提供します。",
			},
		},
	},
	tags: ["autodocs"],
} as Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なToasterの例です。
 */
export const Basic: Story = {
	render: () => {
		const { toast } = useToast();

		return (
			<>
				<button
					type="button"
					onClick={() => {
						toast({
							title: "通知",
							description: "これは基本的なトースト通知です。",
						});
					}}
					className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
				>
					トーストを表示
				</button>
				<Toaster />
			</>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"基本的なToasterの例です。ボタンをクリックしてトースト通知を表示できます。",
			},
		},
	},
};

/**
 * アクションボタン付きのToasterの例です。
 */
export const WithAction: Story = {
	render: () => {
		const { toast } = useToast();

		return (
			<>
				<button
					type="button"
					onClick={() => {
						toast({
							title: "更新が利用可能です",
							description:
								"新しいバージョンが利用可能です。今すぐ更新しますか？",
							action: <ToastAction altText="更新する">更新する</ToastAction>,
						});
					}}
					className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
				>
					アクション付きトーストを表示
				</button>
				<Toaster />
			</>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"アクションボタン付きのToasterの例です。ユーザーがアクションを実行できるトースト通知を示しています。",
			},
		},
	},
};

/**
 * 警告用のToasterの例です。
 */
export const Destructive: Story = {
	render: () => {
		const { toast } = useToast();

		return (
			<>
				<button
					type="button"
					onClick={() => {
						toast({
							variant: "destructive",
							title: "エラーが発生しました",
							description:
								"データの保存中にエラーが発生しました。もう一度お試しください。",
							action: <ToastAction altText="再試行">再試行</ToastAction>,
						});
					}}
					className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md"
				>
					エラートーストを表示
				</button>
				<Toaster />
			</>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"警告用のToasterの例です。エラーメッセージを表示するトースト通知を示しています。",
			},
		},
	},
};

/**
 * 実際のユースケースでのToasterの例です。
 */
export const UseCases: Story = {
	render: () => {
		const { toast } = useToast();

		return (
			<div className="space-y-4">
				{/* ファイルアップロードの例 */}
				<button
					type="button"
					onClick={() => {
						toast({
							title: "ファイルをアップロード中",
							description: "プロジェクトファイルのアップロードが完了しました。",
							action: <ToastAction altText="開く">開く</ToastAction>,
						});
					}}
					className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
				>
					アップロード完了通知
				</button>

				{/* 設定変更の例 */}
				<button
					type="button"
					onClick={() => {
						toast({
							title: "設定を更新しました",
							description: "表示設定が正常に更新されました。",
						});
					}}
					className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
				>
					設定更新通知
				</button>

				{/* エラー通知の例 */}
				<button
					type="button"
					onClick={() => {
						toast({
							variant: "destructive",
							title: "接続エラー",
							description:
								"サーバーとの接続が切断されました。再接続を試みています。",
							action: (
								<ToastAction altText="手動で再接続">手動で再接続</ToastAction>
							),
						});
					}}
					className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md"
				>
					接続エラー通知
				</button>

				<Toaster />
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"実際のユースケースでのToasterの例です。ファイルアップロード、設定変更、エラー通知の例を示しています。",
			},
		},
	},
};
