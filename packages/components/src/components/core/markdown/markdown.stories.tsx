import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Markdown } from "./index";

/**
 * `Markdown`コンポーネントは、Markdownテキストを安全にレンダリングするためのコンポーネントです。
 *
 * ## 特徴
 * - GitHub Flavored Markdown (GFM) のサポート
 * - シンタックスハイライト
 * - XSS対策
 * - カスタマイズ可能なスタイル
 *
 * ## 使用例
 * ```tsx
 * <Markdown content="# Hello, world!" />
 * ```
 *
 * ## アクセシビリティ
 * - 適切なHTML要素へのマッピング
 * - リンクには適切な属性が設定される
 */
const meta = {
	title: "Core/Markdown",
	component: Markdown,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Markdownコンポーネントは、Markdownテキストを安全にレンダリングするためのコンポーネントです。",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		content: {
			control: "text",
			description: "Markdownコンテンツ",
		},
		className: {
			control: "text",
			description: "追加のクラス名",
		},
	},
} as Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof Markdown>;

/**
 * 基本的なMarkdownの例です。
 */
export const Basic: Story = {
	args: {
		content:
			"# Markdownの例\n\nこれは**太字**と*イタリック*のテキストです。\n\n[リンク](https://example.com)もサポートされています。",
	},
	parameters: {
		docs: {
			description: {
				story:
					"基本的なMarkdownの例です。見出し、強調、リンクなどの基本的な要素を含んでいます。",
			},
		},
	},
};

/**
 * 見出しを含むMarkdownの例です。
 */
export const Headings: Story = {
	args: {
		content: `# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6`,
	},
	parameters: {
		docs: {
			description: {
				story: "様々なレベルの見出しを含むMarkdownの例です。",
			},
		},
	},
};

/**
 * リストを含むMarkdownの例です。
 */
export const Lists: Story = {
	args: {
		content: `## 箇条書きリスト

* アイテム1
* アイテム2
  * ネストされたアイテム2.1
  * ネストされたアイテム2.2
* アイテム3

## 番号付きリスト

1. 最初のアイテム
2. 2番目のアイテム
3. 3番目のアイテム

## チェックリスト

- [x] 完了したタスク
- [ ] 未完了のタスク
- [ ] もう一つのタスク`,
	},
	parameters: {
		docs: {
			description: {
				story:
					"箇条書きリスト、番号付きリスト、チェックリストを含むMarkdownの例です。",
			},
		},
	},
};

/**
 * コードブロックを含むMarkdownの例です。
 */
export const CodeBlocks: Story = {
	args: {
		content: `## インラインコード

これは \`インラインコード\` の例です。

## コードブロック

\`\`\`typescript
// TypeScriptのコード例
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);
\`\`\`

\`\`\`css
/* CSSの例 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

\`\`\`html
<!-- HTMLの例 -->
<div class="container">
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
</div>
\`\`\``,
	},
	parameters: {
		docs: {
			description: {
				story:
					"インラインコードとコードブロックを含むMarkdownの例です。シンタックスハイライトが適用されます。",
			},
		},
	},
};

/**
 * 引用とテーブルを含むMarkdownの例です。
 */
export const QuotesAndTables: Story = {
	args: {
		content: `## 引用

> これは引用文です。
> 複数行にまたがることもできます。
>
> > ネストされた引用も可能です。

## テーブル

| 名前 | 年齢 | 職業 |
|------|------|------|
| 山田 | 28 | エンジニア |
| 佐藤 | 32 | デザイナー |
| 鈴木 | 24 | マーケター |`,
	},
	parameters: {
		docs: {
			description: {
				story: "引用とテーブルを含むMarkdownの例です。",
			},
		},
	},
};

/**
 * 水平線と画像を含むMarkdownの例です。
 */
export const HorizontalRulesAndImages: Story = {
	args: {
		content: `## 水平線

上のテキスト

---

下のテキスト

## 画像

![プレースホルダー画像](https://via.placeholder.com/300x200)

*画像の説明*`,
	},
	parameters: {
		docs: {
			description: {
				story: "水平線と画像を含むMarkdownの例です。",
			},
		},
	},
};

/**
 * 複合的な例です。
 */
export const ComplexExample: Story = {
	args: {
		content: `# プロジェクト概要

## 目的

このプロジェクトは、**ユーザーフレンドリーな**インターフェースを提供することを目的としています。

## 主な機能

* ユーザー認証
  * ソーシャルログイン
  * 二要素認証
* データ管理
* レポート生成

## 技術スタック

\`\`\`json
{
  "frontend": ["React", "TypeScript", "Tailwind CSS"],
  "backend": ["Node.js", "Express", "PostgreSQL"],
  "deployment": ["Docker", "Kubernetes", "AWS"]
}
\`\`\`

## プロジェクトの状態

| 機能 | 状態 | 担当者 |
|------|------|------|
| 認証 | 完了 | 山田 |
| UI設計 | 進行中 | 佐藤 |
| API開発 | 計画中 | 鈴木 |

> **注意**: このプロジェクトは現在開発中であり、仕様が変更される可能性があります。

---

詳細については[プロジェクトWiki](https://example.com)を参照してください。`,
	},
	parameters: {
		docs: {
			description: {
				story: "様々なMarkdown要素を組み合わせた複合的な例です。",
			},
		},
	},
};

/**
 * カスタムスタイルを適用したMarkdownの例です。
 */
export const CustomStyling: Story = {
	render: () => (
		<div className="p-6 bg-gray-50 rounded-lg">
			<Markdown
				content="# カスタムスタイルの例\n\nこれは**カスタムスタイル**が適用されたMarkdownです。\n\n* リストアイテム1\n* リストアイテム2\n* リストアイテム3"
				className="prose-lg prose-blue"
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"カスタムクラス名を使用してスタイルをカスタマイズしたMarkdownの例です。",
			},
		},
	},
};

/**
 * 実際のユースケースでのMarkdownの例です。
 */
export const UseCases: Story = {
	render: () => (
		<div className="space-y-8">
			<div className="rounded-lg border p-6 shadow-sm">
				<h3 className="text-lg font-medium mb-2">製品説明</h3>
				<Markdown content="## 高性能ノートパソコン\n\n* **プロセッサ**: Intel Core i7\n* **メモリ**: 16GB RAM\n* **ストレージ**: 512GB SSD\n* **ディスプレイ**: 15.6インチ 4K\n\n詳細は[製品ページ](https://example.com)をご覧ください。" />
			</div>

			<div className="rounded-lg border p-6 shadow-sm">
				<h3 className="text-lg font-medium mb-2">ヘルプドキュメント</h3>
				<Markdown content="# アプリケーションの使い方\n\n1. アカウントを作成する\n2. プロジェクトを作成する\n3. タスクを追加する\n\n> **ヒント**: ショートカットキー `Ctrl+N` で新しいタスクを素早く追加できます。" />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"実際のユースケースでのMarkdownの使用例です。製品説明やヘルプドキュメントなどに適しています。",
			},
		},
	},
};
