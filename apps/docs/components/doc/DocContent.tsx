'use client';

import {
  Suspense,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { MDXContent } from '~/components/mdx';
import {
  TableOfContents,
  type TOCItem,
} from '~/components/toc/TableOfContents';
import { TableOfContentsSkeleton } from '~/components/toc/TableOfContentsSkeleton';
import { TextToSpeechControls } from '~/components/doc/TextToSpeechControls';
import { GeminiSpeechControls } from '~/components/doc/GeminiSpeechControls';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { PageHeader } from '../../../../packages/ui/src/custom/page-header';
import { DocNavigation } from '~/components/doc/DocNavigation';
import { BreadcrumbNavigation } from '~/components/doc/navigation';

interface DocContentProps {
  code: MDXRemoteSerializeResult;
  frontmatter: {
    title?: string;
    description?: string;
    order?: number;
  };
  adjacentDocs?: {
    prev: { title: string; slug: string[] } | null;
    next: { title: string; slug: string[] } | null;
  };
  slug?: string[];
}

export function DocContent({
  code,
  frontmatter,
  adjacentDocs,
  slug = [],
}: DocContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [docText, setDocText] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // フロントマターのタイトルから初期見出しを生成
  const initialHeadings = useMemo(() => {
    if (!frontmatter.title) {
      return [];
    }

    const slug = frontmatter.title.toLowerCase().replace(/\s+/g, '-');
    const heading = {
      id: slug,
      text: frontmatter.title,
      level: 1,
    };

    return [heading];
  }, [frontmatter.title]);

  // ドキュメントのテキストコンテンツを取得する関数
  const getDocumentText = useCallback(() => {
    if (!contentRef.current) return '';

    const textContent = contentRef.current.textContent || '';

    // タイトルとディスクリプションを追加
    let fullText = '';
    if (frontmatter.title) {
      fullText += `${frontmatter.title}。 `;
    }
    if (frontmatter.description) {
      fullText += `${frontmatter.description}。 `;
    }

    fullText += textContent;
    console.log('Generated document text, length:', fullText.length);
    return fullText;
  }, [frontmatter.title, frontmatter.description]);

  // 見出しをクリックしたときのハンドラー
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // レンダリング後にDOM要素から見出しを抽出する
  useEffect(() => {
    const extractHeadingsFromDOM = () => {
      if (!contentRef.current) return;

      // h2〜h6要素を取得（h1はPageHeaderで使用するため除外）
      const headingElements =
        contentRef.current.querySelectorAll('h2, h3, h4, h5, h6');

      // 見出し要素から目次アイテムを生成
      const extractedHeadings: TOCItem[] = Array.from(headingElements).map(
        (element) => {
          const level = Number.parseInt(element.tagName.substring(1), 10);
          const text = element.textContent || '';
          const id =
            element.id ||
            text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');

          // IDがない場合は追加
          if (!element.id) {
            element.id = id;
          }

          return {
            id,
            text,
            level,
          };
        }
      );

      console.log('Extracted headings from DOM:', extractedHeadings);

      // フロントマターのタイトルが見出しに含まれていない場合は追加
      if (
        frontmatter.title &&
        !extractedHeadings.some((h) => h.text === frontmatter.title)
      ) {
        setHeadings([...initialHeadings, ...extractedHeadings]);
      } else {
        setHeadings(extractedHeadings);
      }
    };

    // コンテンツがレンダリングされた後に見出しを抽出
    const timer = setTimeout(() => {
      extractHeadingsFromDOM();
      const text = getDocumentText();
      console.log('Document text extracted, length:', text.length);
      setDocText(text);
    }, 1000); // コンテンツがレンダリングされるのを待つ

    return () => clearTimeout(timer);
  }, [getDocumentText, initialHeadings, frontmatter.title]);

  // 見出しの可視性を監視
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 画面内に入った見出しのうち、最も上にあるものをアクティブにする
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // 複数の見出しが表示されている場合は、最も上にあるものを選択
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top > current.boundingClientRect.top
              ? current
              : prev;
          });
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0.1, // 少しでも見えたらトリガー
      }
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  return (
    <div className="relative flex flex-col lg:flex-row justify-center">
      {/* メインコンテンツエリア */}
      <div className="w-full lg:w-3/4 flex flex-col justify-center">
        {/* パンくずナビゲーション */}
        {slug.length > 0 && <BreadcrumbNavigation slug={slug} />}

        {/* PageHeaderコンポーネントを使用 */}
        <PageHeader
          title={frontmatter.title || 'Untitled Document'}
          description={frontmatter.description}
          variant="gradient"
          pattern="waves"
          className="mb-8 w-full max-w-[1000px] mx-auto"
        />

        <article
          ref={contentRef}
          className="prose prose-slate dark:prose-invert w-full max-w-[1000px] mx-auto transition-all duration-300"
        >
          <Suspense fallback={<div>Loading content...</div>}>
            <MDXContent code={code} />
          </Suspense>
        </article>

        {/* 前後のドキュメントへのナビゲーション */}
        <DocNavigation adjacentDocs={adjacentDocs} />
      </div>

      {/* セパレーター */}
      <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-800 mx-4" />

      {/* 目次エリア - デスクトップのみ表示 */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/5 shrink-0">
        {headings.length > 0 ? (
          <TableOfContents headings={headings} />
        ) : (
          <TableOfContentsSkeleton />
        )}
      </div>

      {/* モバイル用目次は完全に非表示 */}
      {/* <div className="lg:hidden w-full mt-8 border-t border-gray-200 dark:border-gray-800 pt-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 px-4 mb-2">
          目次
        </h2>
        <TableOfContents headings={headings} />
      </div> */}

      {/* Web Speech API による読み上げコントロール */}
      <TextToSpeechControls text={docText} />

      {/* Gemini API による読み上げコントロール */}
      <GeminiSpeechControls text={docText} />
    </div>
  );
}
