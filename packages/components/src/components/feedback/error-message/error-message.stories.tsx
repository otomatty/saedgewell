// @ts-nocheck - Storybookの型定義の問題を回避
import type { Meta, StoryObj } from "@storybook/react";
import { ErrorMessage } from "./index";

/**
 * `ErrorMessage`コンポーネントは、ユーザーにエラー情報を視覚的に伝えるために使用されます。
 *
 * ## 特徴
 * - 目立つデザインでエラーを明確に表示
 * - タイトルと説明文をサポート
 * - アイコンによる視覚的な強調
 *
 * ## 使用例
 * ```tsx
 * <ErrorMessage
 *   title="送信エラー"
 *   description="データの送信中にエラーが発生しました。後でもう一度お試しください。"
 * />
 * ```
 *
 * ## アクセシビリティ
 * - スクリーンリーダー対応
 * - 適切なコントラスト比を維持
 * - 明確なエラーメッセージによる理解のしやすさ
 */
const meta = {
	title: "Feedback/ErrorMessage",
	component: ErrorMessage,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"エラーメッセージコンポーネントは、ユーザーにエラー情報を視覚的に伝えるために使用されます。",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		title: {
			control: "text",
			description: "エラーメッセージのタイトルを指定します。",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "エラーが発生しました" },
			},
		},
		description: {
			control: "text",
			description: "エラーメッセージの詳細説明を指定します。",
			table: {
				type: { summary: "string" },
			},
		},
	},
} as Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なエラーメッセージの例です。
 * デフォルトのタイトルとカスタムの説明文を表示します。
 */
export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"基本的なエラーメッセージの例です。デフォルトのタイトル「エラーが発生しました」と、カスタムの説明文を表示します。",
			},
		},
	},
	args: {
		description: "エラーが発生しました。後でもう一度お試しください。",
	},
};

/**
 * カスタムタイトルを持つエラーメッセージの例です。
 * タイトルと説明文の両方をカスタマイズしています。
 */
export const CustomTitle: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"カスタムタイトルを持つエラーメッセージの例です。タイトルと説明文の両方をカスタマイズしています。",
			},
		},
	},
	args: {
		title: "接続エラー",
		description:
			"サーバーに接続できませんでした。ネットワーク接続を確認してください。",
	},
};

/**
 * 長い説明文を持つエラーメッセージの例です。
 * 複雑なエラー状況を説明する場合に使用します。
 */
export const LongDescription: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"長い説明文を持つエラーメッセージの例です。複雑なエラー状況を説明する場合に使用します。",
			},
		},
	},
	args: {
		title: "データ検証エラー",
		description:
			"入力されたデータに問題があります。以下の点を確認してください：\n1. メールアドレスが正しい形式であること\n2. パスワードが8文字以上であること\n3. 必須項目がすべて入力されていること",
	},
};

/**
 * フォーム送信エラーの例です。
 * フォーム送信時のエラーメッセージとして使用します。
 */
export const FormSubmissionError: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"フォーム送信エラーの例です。フォーム送信時のエラーメッセージとして使用します。",
			},
		},
	},
	args: {
		title: "送信エラー",
		description:
			"フォームの送信中にエラーが発生しました。入力内容を確認して再度お試しください。",
	},
};
