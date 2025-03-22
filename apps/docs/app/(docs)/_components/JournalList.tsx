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
  activeTag?: string | null;
}

// 年月のセクション（スティッキーヘッダー用）
interface YearMonthSection {
  yearMonth: string;
  entries: DocType[];
}

export function JournalList({
  docTypes,
  emptyMessage = '日記はまだありません。',
  activeTag = null,
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
        // タグフィルタリングが適用されている場合、タグが一致する子エントリのみを表示
        if (activeTag) {
          const tags = doc.tags || [];
          const hasTag = Array.isArray(tags)
            ? tags.includes(activeTag)
            : Object.values(tags).some(
                (tagList) =>
                  Array.isArray(tagList) && tagList.includes(activeTag)
              );

          if (!hasTag) continue;
        }

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
  }, [docTypes, activeTag]);

  // 親エントリがあり、かつ対応する子エントリがある場合のみ表示
  const validParentEntries = useMemo(() => {
    if (!activeTag) return parentEntries;

    return parentEntries.filter((parent) => {
      const entries = entriesByParent[parent.id];
      return entries !== undefined && entries.length > 0;
    });
  }, [parentEntries, entriesByParent, activeTag]);

  // 年月ごとのエントリをグループ化
  const entriesByYearMonth = useMemo(() => {
    const groups: YearMonthSection[] = [];
    const yearMonthMap = new Map<string, DocType[]>();

    // 日付で降順ソート
    const sortedEntries = [...validParentEntries].sort((a, b) =>
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
  }, [validParentEntries]);

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

  // タグフィルタリングが適用されていて、表示する子エントリがない場合
  const allFilteredChildrenEmpty =
    activeTag &&
    Object.values(entriesByParent).every((entries) => entries.length === 0);

  if (validParentEntries.length === 0 || allFilteredChildrenEmpty) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border bg-muted/50 p-8">
        <p className="text-center text-muted-foreground">
          {activeTag
            ? `「${activeTag}」のタグが付いた日記はありません。`
            : emptyMessage}
        </p>
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
            {entries.map((parent) => {
              // この親エントリに対応する子エントリがあるか確認
              const childEntries = entriesByParent[parent.id] || [];
              const hasChildren = childEntries.length > 0;

              // タグフィルタリングが適用されていて子エントリがない場合はスキップ
              if (activeTag && !hasChildren) {
                return null;
              }

              return (
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

                  {/* この日の記事一覧 - タグでフィルタリングされている場合は一致する記事のみ表示 */}
                  {hasChildren && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {childEntries.map((entry) => (
                        <DocCard key={entry.id} docType={entry} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
