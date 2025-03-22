'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import { Separator } from '@kit/ui/separator';
import { Calendar } from 'lucide-react';
import { DocCard } from './DocCard';
import { GitHubCommits } from './GitHubCommits';
import { getFormattedDay, getYearMonth, isWeekend } from '~/lib/utils/date';
import type { DocType } from '~/types/mdx';

interface JournalListProps {
  docTypes: DocType[];
  emptyMessage?: string;
}

// 年月のセクション（スティッキーヘッダー用）
interface YearMonthSection {
  yearMonth: string;
  entries: DocType[];
}

export function JournalList({
  docTypes,
  emptyMessage = '日記はまだありません。',
}: JournalListProps) {
  // 親エントリ（日付）のみをフィルタリング
  const parentEntries = useMemo(() => {
    return docTypes.filter((doc) => !doc.parentId);
  }, [docTypes]);

  // 子エントリを日付ごとにグループ化
  const entriesByParent = useMemo(() => {
    const result: Record<string, DocType[]> = {};

    for (const doc of docTypes) {
      if (doc.parentId) {
        if (!result[doc.parentId]) {
          result[doc.parentId] = [];
        }
        result[doc.parentId]?.push(doc);
      }
    }

    // 各グループを日付降順でソート
    for (const parentId of Object.keys(result)) {
      const entries = result[parentId];
      if (entries) {
        entries.sort((a, b) => {
          return (b.date || '').localeCompare(a.date || '');
        });
      }
    }

    return result;
  }, [docTypes]);

  // 年月ごとのエントリをグループ化
  const entriesByYearMonth = useMemo(() => {
    const groups: YearMonthSection[] = [];
    const yearMonthMap = new Map<string, DocType[]>();

    // 日付で降順ソート
    const sortedEntries = [...parentEntries].sort((a, b) =>
      (b.date || '').localeCompare(a.date || '')
    );

    // 年月ごとにグループ化
    for (const entry of sortedEntries) {
      if (entry.date) {
        const yearMonth = getYearMonth(entry.date);
        if (!yearMonthMap.has(yearMonth)) {
          yearMonthMap.set(yearMonth, []);
        }
        yearMonthMap.get(yearMonth)?.push(entry);
      }
    }

    // Map を配列に変換
    for (const [yearMonth, entries] of yearMonthMap.entries()) {
      groups.push({ yearMonth, entries });
    }

    return groups;
  }, [parentEntries]);

  // 現在見えている年月セクションを追跡
  const [activeYearMonth, setActiveYearMonth] = useState<string>('');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // スクロール時に現在見えているセクションを判定
  useEffect(() => {
    const handleScroll = () => {
      // すべてのセクションの位置をチェック
      let currentSection = '';
      let minDistance = Number.POSITIVE_INFINITY;

      for (const [yearMonth, ref] of Object.entries(sectionRefs.current)) {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // ヘッダーの高さを考慮（100pxと仮定）
          const distance = Math.abs(rect.top - 100);

          if (distance < minDistance) {
            minDistance = distance;
            currentSection = yearMonth;
          }
        }
      }

      if (currentSection && currentSection !== activeYearMonth) {
        setActiveYearMonth(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期値を設定

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeYearMonth]);

  if (parentEntries.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border bg-muted/50 p-8">
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-0 relative">
      {/* スティッキーヘッダー（現在見えている年月を表示） */}
      <div className="sticky top-20 z-10 bg-background py-3 border-b mb-6">
        <h2 className="text-xl font-bold">{activeYearMonth}</h2>
      </div>

      {/* 年月ごとのセクション */}
      {entriesByYearMonth.map(({ yearMonth, entries }) => (
        <div
          key={yearMonth}
          ref={(el) => {
            sectionRefs.current[yearMonth] = el;
          }}
          className="mb-12"
          data-year-month={yearMonth}
        >
          {/* 年月ヘッダー（visibility:hidden で表示されないがスペースは確保） */}
          <h2 className="text-xl font-bold mb-6 invisible">{yearMonth}</h2>

          {/* 各日付のエントリ */}
          <div className="space-y-8">
            {entries.map((parent) => (
              <div key={parent.id} className="space-y-4">
                {/* 日付ヘッダー（曜日付き） */}
                <h3
                  className={`text-lg font-semibold flex items-center gap-2 ${
                    parent.date && isWeekend(parent.date)
                      ? parent.date.includes('-01-') // 1月1日は特別
                        ? 'text-red-500'
                        : parent.date.endsWith('-01') // 日曜日は赤
                          ? 'text-red-500'
                          : 'text-blue-500' // 土曜日は青
                      : ''
                  }`}
                >
                  <Calendar className="size-5" />
                  {parent.date ? getFormattedDay(parent.date) : parent.title}
                </h3>

                {/* GitHubコミット表示（存在する場合） */}
                {parent.githubCommits && parent.githubCommits.length > 0 && (
                  <GitHubCommits
                    commits={parent.githubCommits}
                    className="mt-3 mb-4"
                  />
                )}

                <Separator className="my-4" />

                {/* この日の記事一覧 */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {entriesByParent[parent.id]?.map((entry) => (
                    <DocCard key={entry.id} docType={entry} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
