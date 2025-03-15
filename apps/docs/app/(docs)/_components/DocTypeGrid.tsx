'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@kit/ui/card';
import type { DocType } from '~/lib/mdx/types';

interface DocTypeGridProps {
  docTypes: DocType[];
  emptyMessage?: string;
}

// Gyazo URLを画像直接リンクに変換する関数
function getImageUrl(url: string): string {
  // すでに i.gyazo.com 形式の場合はそのまま返す
  if (url.includes('i.gyazo.com')) {
    return url;
  }

  // 通常の gyazo.com/ID 形式を i.gyazo.com/ID.png に変換
  if (url.includes('gyazo.com/')) {
    const id = url.split('gyazo.com/')[1];
    return `https://i.gyazo.com/${id}.png`;
  }

  // その他のURLはそのまま返す
  return url;
}

export function DocTypeGrid({
  docTypes,
  emptyMessage = 'ドキュメントはまだありません。',
}: DocTypeGridProps) {
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
        <Link key={docType.id} href={`/${docType.id}`}>
          <Card className="h-full transition-colors hover:bg-muted/50">
            {docType.thumbnail ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image
                  src={getImageUrl(docType.thumbnail)}
                  alt={docType.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <CardHeader className="flex flex-row items-center gap-4">
              {!docType.thumbnail && (
                <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  {docType.icon ? (
                    <Image
                      src={docType.icon}
                      alt={docType.title}
                      width={24}
                      height={24}
                      className="size-6"
                    />
                  ) : (
                    <BookOpen className="size-6" />
                  )}
                </div>
              )}
              <div>
                <h3 className="font-semibold">{docType.title}</h3>
                {docType.category && (
                  <p className="text-sm text-muted-foreground">
                    {docType.category}
                  </p>
                )}
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
