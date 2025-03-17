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
import type { DocType } from '~/lib/mdx/types';

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
  // 全体の読み込み状態
  const [isLoading, setIsLoading] = useState(true);

  // 画像URLを最適化する
  useEffect(() => {
    const optimizeUrls = async () => {
      setIsLoading(true);
      const newOptimizedUrls: Record<string, string> = {};
      const newLoadingStates: Record<string, boolean> = {};

      // 各ドキュメントの初期読み込み状態を設定
      for (const docType of docTypes) {
        newLoadingStates[docType.id] = true;
      }
      setLoadingStates(newLoadingStates);

      // 各ドキュメントのサムネイルURLを最適化
      for (const docType of docTypes) {
        if (docType.thumbnail) {
          try {
            // 初期値として同期的に最適化したURLを設定
            newOptimizedUrls[docType.id] = optimizeImageUrlSync(
              docType.thumbnail
            );

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
                newOptimizedUrls[docType.id] = data.url;
              }
            }
          } catch (error) {
            console.error(`Error optimizing image for ${docType.id}:`, error);
            // エラーが発生した場合はデフォルト画像を使用
            newOptimizedUrls[docType.id] = DEFAULT_THUMBNAIL_PATH;
          }
        } else {
          // サムネイルがない場合はデフォルト画像を使用
          newOptimizedUrls[docType.id] = DEFAULT_THUMBNAIL_PATH;
        }
      }

      setOptimizedUrls(newOptimizedUrls);
      setIsLoading(false);
    };

    optimizeUrls();
  }, [docTypes]);

  // 画像の読み込み完了時の処理
  const handleImageLoad = (docTypeId: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [docTypeId]: false,
    }));
  };

  // 画像の読み込みエラー時の処理
  const handleImageError = (docTypeId: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [docTypeId]: false,
    }));
    // エラー時はデフォルト画像を使用
    setOptimizedUrls((prev) => ({
      ...prev,
      [docTypeId]: DEFAULT_THUMBNAIL_PATH,
    }));
  };

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
              {/* スケルトンローディング */}
              {(isLoading || loadingStates[docType.id]) && (
                <div className="absolute inset-0 z-10">
                  <Skeleton className="h-full w-full" />
                </div>
              )}

              <Image
                src={
                  optimizedUrls[docType.id] ||
                  optimizeImageUrlSync(docType.thumbnail || '') ||
                  DEFAULT_THUMBNAIL_PATH
                }
                alt={docType.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-2"
                quality={80}
                priority={false}
                loading="lazy"
                blurDataURL={DEFAULT_PLACEHOLDER}
                placeholder="blur"
                onLoad={() => handleImageLoad(docType.id)}
                onError={() => handleImageError(docType.id)}
                style={{
                  opacity: loadingStates[docType.id] ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
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
