'use client';

import React, { useEffect, useState } from 'react';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
  onToggle?: (isOpen: boolean) => void;
}

export function TableOfContents({ headings, onToggle }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 1.0,
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
    <nav
      className={`toc fixed right-4 top-20 flex flex-col w-64 max-h-[calc(100vh-6rem)] bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-all duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-3rem)]'
      }`}
    >
      <div className="sticky top-0 z-10 flex items-center bg-white dark:bg-gray-900 p-4">
        <button
          type="button"
          onClick={handleToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          aria-label={isOpen ? '目次を閉じる' : '目次を開く'}
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {isOpen && (
          <h2 className="text-lg font-semibold ml-4 text-gray-900 dark:text-gray-100">
            目次
          </h2>
        )}
      </div>
      <div
        className={`overflow-y-auto transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 hidden'
        }`}
      >
        <div className="p-4">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{
                  paddingLeft: `${(heading.level - 1) * 1}rem`,
                }}
              >
                <button
                  type="button"
                  onClick={() => handleClick(heading.id)}
                  className={`text-sm hover:text-blue-500 transition-colors duration-200 ${
                    activeId === heading.id
                      ? 'text-blue-500 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  } text-left w-full`}
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
