'use client';

import { useMemo, Suspense, useState, useEffect, useRef } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';
import dynamic from 'next/dynamic';
import { createRoot } from 'react-dom/client';

import { MermaidWrapper } from './mermaid-wrapper';
import KeywordLink from './KeywordLink';
import { KeywordLinkDebug } from './KeywordLinkDebug';

// MermaidRendererコンポーネントを動的にインポート
const MermaidRenderer = dynamic(
  () => import('./mermaid-renderer').then((mod) => mod.MermaidRenderer),
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
  code: MDXRemoteSerializeResult;
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
 * MDXコンポーネントのカスタマイズ
 * コードブロックやMermaidダイアグラムの表示をカスタマイズします
 */
const MDXComponents = {
  // 見出しコンポーネントをカスタマイズ
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return (
      <h1 id={id} className="text-3xl font-bold mt-12 mb-4" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return (
      <h2 id={id} className="text-2xl font-bold mt-10 mb-3" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return (
      <h3 id={id} className="text-xl font-semibold mt-8 mb-3" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return (
      <h4 id={id} className="text-lg font-semibold mt-6 mb-2" {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return (
      <h5 id={id} className="text-base font-semibold mt-5 mb-2" {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = children
      ?.toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return (
      <h6 id={id} className="text-sm font-semibold mt-4 mb-2" {...props}>
        {children}
      </h6>
    );
  },
  // 段落コンポーネントをカスタマイズ
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-base leading-7 text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  // リストコンポーネントをカスタマイズ
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 ml-6 list-disc space-y-2 text-base leading-7 text-muted-foreground"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 text-base leading-7 text-muted-foreground"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="my-1 text-base leading-7 text-muted-foreground" {...props}>
      {children}
    </li>
  ),
  // 引用コンポーネントをカスタマイズ
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-4 border-l-4 border-primary pl-4 py-1 text-base italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // 強調コンポーネントをカスタマイズ
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  // 斜体コンポーネントをカスタマイズ
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-muted-foreground" {...props}>
      {children}
    </em>
  ),
  // 区切り線コンポーネントをカスタマイズ
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-t border-border" {...props} />
  ),
  // リンクコンポーネントをカスタマイズ
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-primary font-medium hover:underline"
      {...props}
    >
      {children}
    </a>
  ),
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

      // クラス名に 'language-mermaid' が含まれているかチェック
      if (
        !language &&
        codeElement.props.className &&
        typeof codeElement.props.className === 'string' &&
        codeElement.props.className.includes('mermaid')
      ) {
        language = 'mermaid';
      }

      // コンテンツに 'graph' や 'sequenceDiagram' などのMermaid特有のキーワードが含まれているかチェック
      if (!language && codeElement.props.children) {
        const codeContent =
          typeof codeElement.props.children === 'string'
            ? codeElement.props.children
            : Array.isArray(codeElement.props.children)
              ? codeElement.props.children.join('')
              : '';

        if (
          codeContent.includes('graph ') ||
          codeContent.includes('sequenceDiagram') ||
          codeContent.includes('classDiagram') ||
          codeContent.includes('stateDiagram') ||
          codeContent.includes('gantt') ||
          codeContent.includes('pie title') ||
          codeContent.includes('erDiagram')
        ) {
          language = 'mermaid';
        }
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
                    children?: string;
                  };
                  return typeof childProps.children === 'string'
                    ? childProps.children
                    : '';
                }
              }
            }
            return '';
          })
          .join('');
      } else if (typeof codeElement.props.children === 'string') {
        code = codeElement.props.children;
      }
    }

    // Mermaidダイアグラムの場合
    if (language === 'mermaid') {
      // Mermaidのテーマ設定を抽出
      let theme: 'default' | 'forest' | 'dark' | 'neutral' | 'custom' =
        'default';

      // コードブロックにテーマの指定があるか確認
      if (className && typeof className === 'string') {
        if (className.includes('theme-forest')) {
          theme = 'forest';
        } else if (className.includes('theme-dark')) {
          theme = 'dark';
        } else if (className.includes('theme-neutral')) {
          theme = 'neutral';
        } else if (className.includes('theme-custom')) {
          theme = 'custom';
        }
      }

      return (
        <div className="mermaid-container">
          <MermaidWrapper chart={code} theme={theme} />
        </div>
      );
    }

    // highlight.jsによってハイライトされたコードブロックの場合
    // className に 'hljs' が含まれている場合は、そのまま返す
    if (className?.includes('hljs')) {
      return (
        <div className="relative">
          <CopyButton code={code} />
          <pre className={className} {...props}>
            {children}
          </pre>
        </div>
      );
    }

    // 通常のコードブロックの場合
    return (
      <pre
        className={`${className || ''} language-${language || 'text'} relative p-6`}
        {...props}
      >
        {language && (
          <div className="absolute top-0 right-0 bg-gray-700 text-white px-2 py-1 text-xs rounded-bl">
            {language}
          </div>
        )}
        <CopyButton code={code} />
        {children}
      </pre>
    );
  },
  // codeタグをカスタマイズ
  code: ({ className, children, ...props }: CodeElementProps) => {
    // インラインコードの場合
    if (!className || !className.startsWith('language-')) {
      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
          {...props}
        >
          {children}
        </code>
      );
    }

    // highlight.jsによってハイライトされたコードの場合
    if (className?.includes('hljs')) {
      return (
        <code className={`${className} bg-transparent`} {...props}>
          {children}
        </code>
      );
    }

    // 言語の抽出
    const language = className.replace('language-', '');

    // 言語に応じたクラス名を追加
    return (
      <code
        className={`${className} language-${language} bg-transparent`}
        data-language={language}
        {...props}
      >
        {children}
      </code>
    );
  },
  // キーワードリンクコンポーネント
  KeywordLink,
  // キーワードリンクデバッグコンポーネント
  KeywordLinkDebug,
};

/**
 * MDXコンテンツをレンダリングするコンポーネント
 * @param code - シリアライズされたMDXコンテンツ
 */
export function MDXContent({ code }: MDXContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // レンダリング後にDOMを確認
  useEffect(() => {
    if (contentRef.current) {
      const childNodes = contentRef.current.querySelectorAll('*');
      const keywordLinks = contentRef.current.querySelectorAll('.keyword-link');

      // [[キーワード]]パターンを含むテキストノードを探す
      const textNodes = Array.from(contentRef.current.querySelectorAll('*'))
        .flatMap((el) => Array.from(el.childNodes))
        .filter(
          (node) =>
            node.nodeType === Node.TEXT_NODE && node.textContent?.includes('[[')
        );

      if (textNodes.length > 0) {
      }
    }
  }, []);

  if (!code) {
    return (
      <div className="text-red-500">MDXコンテンツが提供されていません</div>
    );
  }

  try {
    return (
      <div
        ref={contentRef}
        className="mdx-content prose prose-stone dark:prose-invert prose-headings:scroll-mt-28 w-full px-4 md:px-6"
      >
        <MDXRemote {...code} components={MDXComponents} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500">
        MDXコンテンツのレンダリング中にエラーが発生しました: {String(error)}
      </div>
    );
  }
}
