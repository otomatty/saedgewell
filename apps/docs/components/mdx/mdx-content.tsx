'use client';

import { useMemo, Suspense, useState, useEffect } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import React from 'react';
import dynamic from 'next/dynamic';

// Mermaidコンポーネントを動的にインポート（クライアントサイドのみで実行）
const MermaidDiagram = dynamic(
  () => import('./mermaid-diagram').then((mod) => mod.MermaidDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-gray-500">図を読み込み中...</p>
      </div>
    ),
  }
);

/**
 * MDXコンテンツのプロパティ
 * @param code - MDXバンドラーによって生成されたコード
 */
interface MDXContentProps {
  code: string;
}

/**
 * コードブロックのコピーボタンコンポーネント
 * @param code - コピーするコード
 */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className="copy-button"
      onClick={handleCopy}
      aria-label="コードをコピー"
    >
      {copied ? 'コピーしました！' : 'コピー'}
    </button>
  );
}

/**
 * コードエレメントのprops型定義
 */
interface CodeElementProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface CodeProps {
  'data-language'?: string;
  'data-theme'?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

/**
 * Mermaidダイアグラムをラップするコンポーネント
 * クライアントサイドでのみレンダリングされるようにします
 */
function MermaidWrapper({ chart }: { chart: string }) {
  const [isClient, setIsClient] = useState(false);

  // 一意のキーを生成して、再レンダリング時に新しいコンポーネントとして扱われるようにする
  const [componentKey] = useState(
    () =>
      `mermaid-wrapper-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // サーバーサイドレンダリング時
  if (!isClient) {
    return (
      <div
        className="flex justify-center items-center p-4 border border-gray-200 rounded-md bg-gray-50"
        suppressHydrationWarning
      >
        <p className="text-gray-500">図を読み込み中...</p>
      </div>
    );
  }

  // クライアントサイドレンダリング時
  return <MermaidDiagram key={componentKey} chart={chart} />;
}

/**
 * MDXコンポーネントのカスタマイズ
 * コードブロックやMermaidダイアグラムの表示をカスタマイズします
 */
const MDXComponents = {
  // preタグをカスタマイズ
  pre: ({ className, children, ...props }: CodeElementProps) => {
    // codeElementの取得
    const codeElement = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === 'code'
    ) as React.ReactElement<CodeProps>;

    // 言語の抽出
    let language = '';
    if (codeElement?.props) {
      // className から言語を抽出する試み
      if (codeElement.props.className) {
        const match = /language-(\w+)/.exec(
          codeElement.props.className as string
        );
        if (match) {
          language = match[1] || '';
        }
      }

      // data-language から言語を抽出する試み
      if (!language && codeElement.props['data-language']) {
        language = codeElement.props['data-language'] as string;
      }
    }

    // コードの取得
    let code = '';
    if (codeElement?.props?.children) {
      if (Array.isArray(codeElement.props.children)) {
        code = codeElement.props.children
          .map((child) => {
            if (typeof child === 'string') return child;
            if (child && typeof child === 'object') {
              // オブジェクト型の子要素からテキストを抽出する試み
              if (React.isValidElement(child)) {
                // 型アサーションを使用して型エラーを回避
                const props = child.props as { children?: React.ReactNode };

                // 子要素がテキストの場合
                if (typeof props.children === 'string') {
                  return props.children;
                }

                // 子要素が配列の場合
                if (Array.isArray(props.children)) {
                  // 再帰的に子要素からテキストを抽出
                  const extractedText = props.children
                    .map((grandChild: React.ReactNode) => {
                      if (typeof grandChild === 'string') return grandChild;
                      // さらに再帰的に抽出を試みる
                      if (React.isValidElement(grandChild)) {
                        const grandProps = grandChild.props as {
                          children?: React.ReactNode;
                        };
                        if (typeof grandProps.children === 'string') {
                          return grandProps.children;
                        }
                      }
                      return '';
                    })
                    .join('');

                  return extractedText;
                }

                // 子要素がオブジェクトの場合（例：React要素）
                if (props.children && React.isValidElement(props.children)) {
                  const childProps = props.children.props as {
                    children?: React.ReactNode;
                  };
                  if (typeof childProps.children === 'string') {
                    return childProps.children;
                  }
                }
              }
              return '';
            }
            return String(child);
          })
          .join('');
      } else {
        code = String(codeElement.props.children);
      }
    }

    // Mermaidコードブロックの場合
    if (language === 'mermaid') {
      // コードが空白のみの場合はサンプルダイアグラムを使用
      if (code.trim() === '') {
        code = `graph TD
    A[開始] --> B[処理]
    B --> C[終了]`;
      }

      // 各Mermaidダイアグラムに一意のキーを割り当てて、再レンダリング時に新しいコンポーネントとして扱われるようにする
      const diagramKey = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      return (
        <div
          className="mermaid-container max-w-[800px] w-full"
          key={diagramKey}
          suppressHydrationWarning
        >
          <MermaidWrapper chart={code} />
        </div>
      );
    }

    // 通常のコードブロックの場合
    return (
      <pre
        {...props}
        data-language={language}
        className={`max-w-[800px] w-full whitespace-pre-wrap break-words ${className || ''}`}
      >
        {children}
        <CopyButton code={code} />
      </pre>
    );
  },
};

/**
 * MDXレンダラーコンポーネント
 * MDXコードをReactコンポーネントに変換して表示します
 */
function MDXRenderer({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const components = useMemo(() => MDXComponents, []);

  return (
    <div className="markdoc">
      <Component components={components} />
    </div>
  );
}

/**
 * MDXコンテンツコンポーネント
 * Suspenseを使用して非同期読み込みをサポートします
 */
export function MDXContent({ code }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <Suspense
        fallback={
          <div className="p-4 text-center">コンテンツを読み込み中...</div>
        }
      >
        <MDXRenderer code={code} />
      </Suspense>
    </div>
  );
}
