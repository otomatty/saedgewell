// @ts-nocheck - Storybookの型定義の問題を回避
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ErrorBoundary } from "./index";
import { Button } from "../../core/button";
import { ErrorMessage } from "../error-message";

/**
 * `ErrorBoundary`コンポーネントは、子コンポーネントで発生したエラーをキャッチし、
 * フォールバックUIを表示するためのコンポーネントです。
 *
 * ## 特徴
 * - 子コンポーネントのエラーをキャッチ
 * - カスタマイズ可能なフォールバックUI
 * - エラーログの記録
 *
 * ## 使用例
 * ```tsx
 * <ErrorBoundary fallback={<ErrorMessage description="エラーが発生しました" />}>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 * ```
 *
 * ## 注意点
 * - イベントハンドラ内のエラーはキャッチできません
 * - 非同期コードのエラーはキャッチできません
 * - サーバーサイドレンダリング時のエラーはキャッチできません
 */
const meta = {
	title: "Feedback/ErrorBoundary",
	component: ErrorBoundary,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"エラーバウンダリーコンポーネントは、子コンポーネントで発生したエラーをキャッチし、フォールバックUIを表示するためのコンポーネントです。",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		children: {
			description: "エラーバウンダリーで囲む子コンポーネント",
			control: {
				type: null,
			},
		},
		fallback: {
			description: "エラー発生時に表示するフォールバックUI",
			control: {
				type: null,
			},
		},
	},
} as Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// エラーを発生させるコンポーネント
const ErrorComponent = () => {
	throw new Error("テスト用のエラーが発生しました");
	// 注: このコードは到達不能ですが、エラーを発生させる目的のためのものです
};

// ボタンクリックでエラーを発生させるコンポーネント
const ErrorTriggerComponent = () => {
	const [shouldError, setShouldError] = useState(false);

	if (shouldError) {
		throw new Error("ボタンクリックによるエラーが発生しました");
	}

	return (
		<div className="p-4 border rounded">
			<p className="mb-4">ボタンをクリックするとエラーが発生します</p>
			<Button onClick={() => setShouldError(true)}>エラーを発生させる</Button>
		</div>
	);
};

/**
 * 基本的なエラーバウンダリーの例です。
 * エラーが発生した場合にフォールバックUIを表示します。
 */
export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"基本的なエラーバウンダリーの例です。子コンポーネントでエラーが発生した場合に、フォールバックUIとしてErrorMessageコンポーネントを表示します。",
			},
		},
	},
	render: () => (
		<ErrorBoundary
			fallback={
				<ErrorMessage description="コンポーネントでエラーが発生しました。" />
			}
		>
			<ErrorComponent />
		</ErrorBoundary>
	),
};

/**
 * ボタンクリックでエラーを発生させる例です。
 * ユーザーのアクションによってエラーが発生した場合の動作を示します。
 */
export const WithErrorTrigger: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"ボタンクリックでエラーを発生させる例です。ユーザーのアクションによってエラーが発生した場合の動作を示します。",
			},
		},
	},
	render: () => (
		<ErrorBoundary
			fallback={
				<div className="p-4 border border-destructive rounded bg-destructive/10">
					<h3 className="text-lg font-semibold text-destructive mb-2">
						エラーが発生しました
					</h3>
					<p className="text-destructive-foreground">
						ボタンクリックによるエラーが発生しました。ページを再読み込みしてください。
					</p>
					<Button
						className="mt-4"
						variant="outline"
						onClick={() => window.location.reload()}
					>
						ページを再読み込み
					</Button>
				</div>
			}
		>
			<ErrorTriggerComponent />
		</ErrorBoundary>
	),
};

/**
 * カスタムフォールバックUIの例です。
 * エラー発生時に表示するUIをカスタマイズできます。
 */
export const CustomFallback: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"カスタムフォールバックUIの例です。エラー発生時に表示するUIをカスタマイズできます。",
			},
		},
	},
	render: () => (
		<ErrorBoundary
			fallback={
				<div className="p-6 border rounded-lg shadow-md bg-background">
					<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-destructive"
							aria-labelledby="error-icon-title"
							role="img"
						>
							<title id="error-icon-title">エラーアイコン</title>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
					</div>
					<h3 className="mb-2 text-xl font-bold text-center">
						問題が発生しました
					</h3>
					<p className="mb-4 text-center text-muted-foreground">
						申し訳ありませんが、コンポーネントの読み込み中にエラーが発生しました。
						開発チームに問題が報告されました。
					</p>
					<div className="flex justify-center">
						<Button onClick={() => window.location.reload()}>
							ページを再読み込み
						</Button>
					</div>
				</div>
			}
		>
			<ErrorComponent />
		</ErrorBoundary>
	),
};
