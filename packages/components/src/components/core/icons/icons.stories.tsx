import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { GoogleIcon, GitHubIcon } from "./index";

/**
 * `Icons`コンポーネントは、アプリケーションで使用する共通アイコンを提供します。
 *
 * ## 特徴
 * - SVGベースのアイコン
 * - サイズのカスタマイズ
 * - カラーのカスタマイズ（GitHubアイコンのみ）
 *
 * ## 使用例
 * ```tsx
 * <GoogleIcon size={24} />
 * <GitHubIcon size={24} />
 * ```
 *
 * ## アクセシビリティ
 * - aria-label属性を持つ
 * - role="img"属性を持つ
 */
const meta = {
	title: "Core/Icons",
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Iconsコンポーネントは、アプリケーションで使用する共通アイコンを提供します。",
			},
		},
	},
	tags: ["autodocs"],
} as Meta;

export default meta;

/**
 * GoogleIconの基本的な使用例です。
 */
export const GoogleIconBasic: StoryObj = {
	render: () => <GoogleIcon />,
	name: "GoogleIcon - 基本",
	parameters: {
		docs: {
			description: {
				story: "GoogleIconの基本的な使用例です。デフォルトサイズは16pxです。",
			},
		},
	},
};

/**
 * GoogleIconのサイズ変更例です。
 */
export const GoogleIconSizes: StoryObj = {
	render: () => (
		<div className="flex items-center gap-4">
			<div className="flex flex-col items-center">
				<GoogleIcon size={16} />
				<span className="text-xs mt-1">16px</span>
			</div>
			<div className="flex flex-col items-center">
				<GoogleIcon size={24} />
				<span className="text-xs mt-1">24px</span>
			</div>
			<div className="flex flex-col items-center">
				<GoogleIcon size={32} />
				<span className="text-xs mt-1">32px</span>
			</div>
			<div className="flex flex-col items-center">
				<GoogleIcon size={48} />
				<span className="text-xs mt-1">48px</span>
			</div>
		</div>
	),
	name: "GoogleIcon - サイズ",
	parameters: {
		docs: {
			description: {
				story: "GoogleIconのサイズを変更する例です。size属性で指定できます。",
			},
		},
	},
};

/**
 * GitHubIconの基本的な使用例です。
 */
export const GitHubIconBasic: StoryObj = {
	render: () => <GitHubIcon />,
	name: "GitHubIcon - 基本",
	parameters: {
		docs: {
			description: {
				story: "GitHubIconの基本的な使用例です。デフォルトサイズは16pxです。",
			},
		},
	},
};

/**
 * GitHubIconのサイズ変更例です。
 */
export const GitHubIconSizes: StoryObj = {
	render: () => (
		<div className="flex items-center gap-4">
			<div className="flex flex-col items-center">
				<GitHubIcon size={16} />
				<span className="text-xs mt-1">16px</span>
			</div>
			<div className="flex flex-col items-center">
				<GitHubIcon size={24} />
				<span className="text-xs mt-1">24px</span>
			</div>
			<div className="flex flex-col items-center">
				<GitHubIcon size={32} />
				<span className="text-xs mt-1">32px</span>
			</div>
			<div className="flex flex-col items-center">
				<GitHubIcon size={48} />
				<span className="text-xs mt-1">48px</span>
			</div>
		</div>
	),
	name: "GitHubIcon - サイズ",
	parameters: {
		docs: {
			description: {
				story: "GitHubIconのサイズを変更する例です。size属性で指定できます。",
			},
		},
	},
};

/**
 * GitHubIconのカラー変更例です。
 */
export const GitHubIconColors: StoryObj = {
	render: () => (
		<div className="flex items-center gap-4">
			<div className="flex flex-col items-center">
				<GitHubIcon size={24} />
				<span className="text-xs mt-1">デフォルト</span>
			</div>
			<div className="flex flex-col items-center">
				<GitHubIcon size={24} className="text-blue-500" />
				<span className="text-xs mt-1">青</span>
			</div>
			<div className="flex flex-col items-center">
				<GitHubIcon size={24} className="text-green-500" />
				<span className="text-xs mt-1">緑</span>
			</div>
			<div className="flex flex-col items-center">
				<GitHubIcon size={24} className="text-red-500" />
				<span className="text-xs mt-1">赤</span>
			</div>
		</div>
	),
	name: "GitHubIcon - カラー",
	parameters: {
		docs: {
			description: {
				story:
					"GitHubIconのカラーを変更する例です。className属性でTailwind CSSのテキストカラークラスを指定できます。",
			},
		},
	},
};

/**
 * アイコンを使用したボタンの例です。
 */
export const IconsInButtons: StoryObj = {
	render: () => (
		<div className="flex gap-4">
			<button
				type="button"
				className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50"
			>
				<GoogleIcon size={18} />
				<span>Googleでログイン</span>
			</button>
			<button
				type="button"
				className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
			>
				<GitHubIcon size={18} />
				<span>GitHubでログイン</span>
			</button>
		</div>
	),
	name: "アイコン付きボタン",
	parameters: {
		docs: {
			description: {
				story:
					"アイコンをボタン内で使用する例です。ソーシャルログインボタンなどに適しています。",
			},
		},
	},
};

/**
 * 両方のアイコンを並べて表示する例です。
 */
export const AllIcons: StoryObj = {
	render: () => (
		<div className="grid grid-cols-2 gap-8">
			<div className="flex flex-col items-center">
				<GoogleIcon size={48} />
				<span className="mt-2">GoogleIcon</span>
			</div>
			<div className="flex flex-col items-center">
				<GitHubIcon size={48} />
				<span className="mt-2">GitHubIcon</span>
			</div>
		</div>
	),
	name: "全アイコン一覧",
	parameters: {
		docs: {
			description: {
				story: "利用可能なすべてのアイコンを一覧表示します。",
			},
		},
	},
};
