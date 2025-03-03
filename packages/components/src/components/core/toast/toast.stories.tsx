import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
	Toast,
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "./index";

/**
 * `Toast`コンポーネントは、一時的な通知メッセージを表示するためのコンポーネントを提供します。
 *
 * ## 特徴
 * - 一時的な通知表示
 * - アクションボタンのサポート
 * - カスタマイズ可能なスタイル
 * - アクセシビリティ対応
 *
 * ## 使用例
 * ```tsx
 * <ToastProvider>
 *   <Toast>
 *     <ToastTitle>通知タイトル</ToastTitle>
 *     <ToastDescription>通知の説明文</ToastDescription>
 *     <ToastAction>アクション</ToastAction>
 *     <ToastClose />
 *   </Toast>
 *   <ToastViewport />
 * </ToastProvider>
 * ```
 *
 * ## アクセシビリティ
 * - WAI-ARIA準拠
 * - キーボード操作対応
 * - スクリーンリーダーで適切に読み上げられる
 */
const meta = {
	title: "Core/Toast",
	component: Toast,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Toastコンポーネントは、一時的な通知メッセージを表示するためのコンポーネントを提供します。",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "destructive"],
			description: "トーストのバリアント",
		},
		className: {
			control: "text",
			description: "追加のCSSクラス",
		},
	},
} as Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なToastの例です。
 */
export const Basic: Story = {
	render: () => (
		<ToastProvider>
			<Toast>
				<ToastTitle>保存しました</ToastTitle>
				<ToastDescription>変更内容が正常に保存されました。</ToastDescription>
				<ToastClose />
			</Toast>
			<ToastViewport />
		</ToastProvider>
	),
	parameters: {
		docs: {
			description: {
				story:
					"基本的なToastの例です。タイトル、説明文、閉じるボタンを含む通知を示しています。",
			},
		},
	},
};

/**
 * アクションボタン付きのToastの例です。
 */
export const WithAction: Story = {
	render: () => (
		<ToastProvider>
			<Toast>
				<ToastTitle>更新が利用可能です</ToastTitle>
				<ToastDescription>
					新しいバージョンが利用可能です。今すぐ更新しますか？
				</ToastDescription>
				<ToastAction altText="更新する">更新する</ToastAction>
				<ToastClose />
			</Toast>
			<ToastViewport />
		</ToastProvider>
	),
	parameters: {
		docs: {
			description: {
				story:
					"アクションボタン付きのToastの例です。ユーザーがアクションを実行できる通知を示しています。",
			},
		},
	},
};

/**
 * 警告用のToastの例です。
 */
export const Destructive: Story = {
	render: () => (
		<ToastProvider>
			<Toast variant="destructive">
				<ToastTitle>エラーが発生しました</ToastTitle>
				<ToastDescription>
					データの保存中にエラーが発生しました。もう一度お試しください。
				</ToastDescription>
				<ToastAction altText="再試行">再試行</ToastAction>
				<ToastClose />
			</Toast>
			<ToastViewport />
		</ToastProvider>
	),
	parameters: {
		docs: {
			description: {
				story:
					"警告用のToastの例です。エラーメッセージを表示する通知を示しています。",
			},
		},
	},
};

/**
 * カスタムスタイルを適用したToastの例です。
 */
export const CustomStyling: Story = {
	render: () => (
		<ToastProvider>
			{/* 青色のトースト */}
			<Toast className="bg-blue-50 border-blue-200">
				<ToastTitle className="text-blue-900">情報</ToastTitle>
				<ToastDescription className="text-blue-800">
					新しい機能が追加されました。
				</ToastDescription>
				<ToastAction
					altText="詳細を見る"
					className="bg-blue-500 text-white hover:bg-blue-600"
				>
					詳細を見る
				</ToastAction>
				<ToastClose className="text-blue-500" />
			</Toast>

			{/* 緑色のトースト */}
			<Toast className="bg-green-50 border-green-200">
				<ToastTitle className="text-green-900">成功</ToastTitle>
				<ToastDescription className="text-green-800">
					処理が正常に完了しました。
				</ToastDescription>
				<ToastAction
					altText="確認する"
					className="bg-green-500 text-white hover:bg-green-600"
				>
					確認する
				</ToastAction>
				<ToastClose className="text-green-500" />
			</Toast>

			<ToastViewport />
		</ToastProvider>
	),
	parameters: {
		docs: {
			description: {
				story:
					"カスタムスタイルを適用したToastの例です。className プロパティを使用して色やスタイルをカスタマイズしています。",
			},
		},
	},
};

/**
 * 実際のユースケースでのToastの例です。
 */
export const UseCases: Story = {
	render: () => (
		<ToastProvider>
			{/* ファイルアップロードの例 */}
			<Toast>
				<ToastTitle>ファイルをアップロード中</ToastTitle>
				<ToastDescription>
					プロジェクトファイルのアップロードが完了しました。
				</ToastDescription>
				<ToastAction altText="開く">開く</ToastAction>
				<ToastClose />
			</Toast>

			{/* 設定変更の例 */}
			<Toast>
				<ToastTitle>設定を更新しました</ToastTitle>
				<ToastDescription>表示設定が正常に更新されました。</ToastDescription>
				<ToastClose />
			</Toast>

			{/* エラー通知の例 */}
			<Toast variant="destructive">
				<ToastTitle>接続エラー</ToastTitle>
				<ToastDescription>
					サーバーとの接続が切断されました。再接続を試みています。
				</ToastDescription>
				<ToastAction altText="手動で再接続">手動で再接続</ToastAction>
				<ToastClose />
			</Toast>

			<ToastViewport />
		</ToastProvider>
	),
	parameters: {
		docs: {
			description: {
				story:
					"実際のユースケースでのToastの例です。ファイルアップロード、設定変更、エラー通知の例を示しています。",
			},
		},
	},
};
