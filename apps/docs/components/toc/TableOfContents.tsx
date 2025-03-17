'use client';

import React, { useEffect, useState } from 'react';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

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

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="toc sticky top-20 flex flex-col w-full max-h-[calc(100vh-6rem)]">
      <div className="sticky top-0 z-10 flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          目次
        </h2>
      </div>
      <div className="overflow-y-auto">
        <div className="p-4">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{
                  paddingLeft: `${(heading.level - 1) * 0.75}rem`,
                }}
                className="relative"
              >
                {activeId === heading.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-500 rounded-full" />
                )}
                <button
                  type="button"
                  onClick={() => handleClick(heading.id)}
                  onKeyDown={(e) =>
                    e.key === 'Entefr' && handleClick(heading.id)
                  }
                  className={`text-sm transition-all duration-200 text-left w-full py-1.5 px-2 rounded ${
                    activeId === heading.id
                      ? 'text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
