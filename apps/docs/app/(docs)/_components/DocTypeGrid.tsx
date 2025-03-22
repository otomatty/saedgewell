'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@kit/ui/card';
import { Skeleton } from '@kit/ui/skeleton';
import {
  optimizeImageUrlSync,
  generatePlaceholderImage,
  DEFAULT_THUMBNAIL_PATH,
} from '~/lib/utils/image';
import {
  getCategoryIcon,
  getCategoryDisplayName,
  getCategoryColor,
} from '~/lib/utils/category';
import { getDocTypePath } from '~/lib/utils/path';
import type { DocType } from '~/types/mdx';

interface DocTypeGridProps {
  docTypes: DocType[];
  emptyMessage?: string;
}

// 標準的なプレースホルダー画像
const DEFAULT_PLACEHOLDER = generatePlaceholderImage();

export function DocTypeGrid({
  docTypes,
  emptyMessage = 'ドキュメントはまだありません。',
}: DocTypeGridProps) {
  // 最適化された画像URLを保持するstate
  const [optimizedUrls, setOptimizedUrls] = useState<Record<string, string>>(
    {}
  );
  // 画像の読み込み状態を保持するstate
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  // 画像の表示準備完了状態
  const [readyStates, setReadyStates] = useState<Record<string, boolean>>({});
  // 全体の読み込み状態
  const [isLoading, setIsLoading] = useState(true);

  // 画像URLを最適化する
  useEffect(() => {
    // すべてのステートをリセット（マウント/再マウント時）
    const initialLoadingStates: Record<string, boolean> = {};
    const initialReadyStates: Record<string, boolean> = {};

    // すべてのドキュメントを初期状態では読み込み中に設定
    for (const docType of docTypes) {
      initialLoadingStates[docType.id] = true;
      initialReadyStates[docType.id] = false;
    }

    setLoadingStates(initialLoadingStates);
    setReadyStates(initialReadyStates);
    setIsLoading(true);

    const optimizeUrls = async () => {
      // 各ドキュメントのサムネイルURLを最適化
      const newOptimizedUrls: Record<string, string> = {};

      for (const docType of docTypes) {
        if (docType.thumbnail) {
          try {
            // 非同期で最適化したURLを取得（OGP画像の取得など）
            const encodedUrl = encodeURIComponent(docType.thumbnail);
            const apiUrl = `/api/optimize-image?url=${encodedUrl}`;

            // 相対パスを絶対パスに変換
            const baseUrl = window.location.origin;
            const absoluteApiUrl = new URL(apiUrl, baseUrl).toString();

            const response = await fetch(absoluteApiUrl);
            if (response.ok) {
              const data = await response.json();
              if (data.url) {
                // URLを状態にまだ設定しない（画像のプリロード完了後に設定）
                // 画像URLが準備できたらプリロード開始
                if (typeof window !== 'undefined') {
                  const img = new window.Image();

                  // 画像のロード完了時にのみ表示状態を更新
                  img.onload = () => {
                    // 画像ロード完了時に表示用のステートを更新
                    setOptimizedUrls((prev) => ({
                      ...prev,
                      [docType.id]: data.url,
                    }));
                    setLoadingStates((prev) => ({
                      ...prev,
                      [docType.id]: false,
                    }));
                    setReadyStates((prev) => ({
                      ...prev,
                      [docType.id]: true,
                    }));
                  };

                  img.onerror = () => {
                    // エラー時のみデフォルト画像を設定
                    setOptimizedUrls((prev) => ({
                      ...prev,
                      [docType.id]: DEFAULT_THUMBNAIL_PATH,
                    }));
                    setLoadingStates((prev) => ({
                      ...prev,
                      [docType.id]: false,
                    }));
                    setReadyStates((prev) => ({
                      ...prev,
                      [docType.id]: true,
                    }));
                  };

                  // プリロード開始
                  img.src = data.url;
                }
              } else {
                // データにURLがない場合はデフォルト画像を使用
                // 状態をすぐに更新（プリロードする必要がないため）
                setOptimizedUrls((prev) => ({
                  ...prev,
                  [docType.id]: DEFAULT_THUMBNAIL_PATH,
                }));
                setLoadingStates((prev) => ({
                  ...prev,
                  [docType.id]: false,
                }));
                setReadyStates((prev) => ({
                  ...prev,
                  [docType.id]: true,
                }));
              }
            } else {
              // APIエラー時はデフォルト画像を使用
              setOptimizedUrls((prev) => ({
                ...prev,
                [docType.id]: DEFAULT_THUMBNAIL_PATH,
              }));
              setLoadingStates((prev) => ({
                ...prev,
                [docType.id]: false,
              }));
              setReadyStates((prev) => ({
                ...prev,
                [docType.id]: true,
              }));
            }
          } catch (error) {
            console.error(`Error optimizing image for ${docType.id}:`, error);
            // 例外発生時はデフォルト画像を使用
            setOptimizedUrls((prev) => ({
              ...prev,
              [docType.id]: DEFAULT_THUMBNAIL_PATH,
            }));
            setLoadingStates((prev) => ({
              ...prev,
              [docType.id]: false,
            }));
            setReadyStates((prev) => ({
              ...prev,
              [docType.id]: true,
            }));
          }
        } else {
          // サムネイルがない場合はデフォルト画像を使用
          setOptimizedUrls((prev) => ({
            ...prev,
            [docType.id]: DEFAULT_THUMBNAIL_PATH,
          }));
          setLoadingStates((prev) => ({
            ...prev,
            [docType.id]: false,
          }));
          setReadyStates((prev) => ({
            ...prev,
            [docType.id]: true,
          }));
        }
      }

      // 全体の読み込み状態を更新
      setIsLoading(false);
    };

    optimizeUrls();
  }, [docTypes]);

  if (docTypes.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border bg-muted/50 p-8">
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {docTypes.map((docType) => (
        <Link key={docType.id} href={getDocTypePath(docType)}>
          <Card className="h-full transition-colors hover:bg-muted/50">
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted/30">
              {/* スケルトンローディング - 画像読み込み中のみ表示 */}
              {loadingStates[docType.id] && (
                <div className="absolute inset-0 z-10">
                  <Skeleton className="h-full w-full" />
                </div>
              )}

              {/* 画像は準備完了状態のときのみ表示 */}
              {readyStates[docType.id] && (
                <Image
                  src={optimizedUrls[docType.id] || DEFAULT_THUMBNAIL_PATH}
                  alt={docType.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-2"
                  quality={80}
                  priority={false}
                  loading="lazy"
                  blurDataURL={DEFAULT_PLACEHOLDER}
                  placeholder="blur"
                />
              )}
            </div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-md border-2 bg-transparent ${getCategoryColor(docType.category)} border-current`}
                >
                  {getCategoryIcon(docType.category, 'size-5')}
                </div>
                <div>
                  <h3 className="font-semibold">{docType.title}</h3>
                  {docType.category && (
                    <p className="text-sm text-muted-foreground">
                      {getCategoryDisplayName(docType.category)}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            {docType.description && (
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {docType.description}
                </p>
              </CardContent>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
