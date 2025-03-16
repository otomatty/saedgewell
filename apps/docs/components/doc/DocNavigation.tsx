'use client';

import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DocNavigationProps {
  adjacentDocs?: {
    prev: { title: string; slug: string[] } | null;
    next: { title: string; slug: string[] } | null;
  };
}

// ナビゲーションボタンの共通スタイル
const navButtonStyles = {
  button:
    'flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer',
  icon: 'h-5 w-5 text-muted-foreground transition-transform duration-200',
  label: 'text-sm text-muted-foreground',
  title: 'text-md font-medium line-clamp-1 max-w-[200px]',
};

export function DocNavigation({ adjacentDocs }: DocNavigationProps) {
  if (!adjacentDocs) return null;

  return (
    <div className="flex justify-between items-center mt-12 mb-8 w-full max-w-[800px] mx-auto border-t border-gray-200 dark:border-gray-800 pt-6">
      <div>
        {adjacentDocs.prev && (
          <Link href={`/${adjacentDocs.prev.slug.join('/')}`} passHref>
            <button type="button" className={navButtonStyles.button}>
              <ChevronLeft
                className={`${navButtonStyles.icon} group-hover:-translate-x-1`}
              />
              <div className="flex flex-col items-start">
                <span className={navButtonStyles.label}>前のページ</span>
                <span className={navButtonStyles.title}>
                  {adjacentDocs.prev.title}
                </span>
              </div>
            </button>
          </Link>
        )}
      </div>
      <div>
        {adjacentDocs.next && (
          <Link href={`/${adjacentDocs.next.slug.join('/')}`} passHref>
            <button type="button" className={navButtonStyles.button}>
              <div className="flex flex-col items-end">
                <span className={navButtonStyles.label}>次のページ</span>
                <span className={navButtonStyles.title}>
                  {adjacentDocs.next.title}
                </span>
              </div>
              <ChevronRight
                className={`${navButtonStyles.icon} group-hover:translate-x-1`}
              />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
