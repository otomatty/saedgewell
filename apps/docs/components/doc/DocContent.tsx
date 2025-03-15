'use client';

import {
  Suspense,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { MDXContent } from '~/components/mdx/mdx-content';
import { TableOfContents } from '~/components/toc/TableOfContents';
import { TextToSpeechControls } from '~/components/doc/TextToSpeechControls';
import { GeminiSpeechControls } from '~/components/doc/GeminiSpeechControls';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface DocContentProps {
  code: MDXRemoteSerializeResult;
  frontmatter: {
    title?: string;
    description?: string;
    order?: number;
  };
}

export function DocContent({ code, frontmatter }: DocContentProps) {
  const [isTocOpen, setIsTocOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [docText, setDocText] = useState<string>('');

  const headings = useMemo(() => {
    if (!frontmatter.title) {
      return [];
    }

    const slug = frontmatter.title.toLowerCase().replace(/\s+/g, '-');
    const heading = {
      level: 1,
      text: frontmatter.title,
      slug,
      id: slug,
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

  // コンテンツがレンダリングされた後にテキストを取得
  useEffect(() => {
    // レンダリング後の次のフレームでテキストを取得
    const timer = setTimeout(() => {
      const text = getDocumentText();
      console.log('Document text extracted, length:', text.length);
      setDocText(text);
    }, 1000); // コンテンツがレンダリングされるのを待つ

    return () => clearTimeout(timer);
  }, [getDocumentText]);

  return (
    <div className="relative flex justify-center">
      <article
        ref={contentRef}
        className={`prose prose-slate dark:prose-invert w-full max-w-[1000px] transition-all duration-300 ${
          isTocOpen ? 'mr-72' : 'mr-8'
        }`}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            {frontmatter.title || 'Untitled Document'}
          </h1>
          {frontmatter.description && (
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {frontmatter.description}
            </p>
          )}
        </div>
        <Suspense fallback={<div>Loading content...</div>}>
          <MDXContent code={code} />
        </Suspense>
      </article>
      <TableOfContents headings={headings} onToggle={setIsTocOpen} />

      {/* Web Speech API による読み上げコントロール */}
      <TextToSpeechControls text={docText} />

      {/* Gemini API による読み上げコントロール */}
      <GeminiSpeechControls text={docText} />
    </div>
  );
}
