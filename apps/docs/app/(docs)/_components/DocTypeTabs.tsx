'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kit/ui/tabs';
import { Badge } from '@kit/ui/badge';
import { DocTypeGrid } from './DocTypeGrid';
import type { DocType, DocCategory } from '~/lib/mdx/types';

interface DocTypeTabsProps {
  categories: DocCategory[];
  docTypes: DocType[];
  docTypesByCategory: Record<string, DocType[]>;
}

export function DocTypeTabs({
  categories,
  docTypes,
  docTypesByCategory,
}: DocTypeTabsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeTypeTag, setActiveTypeTag] = useState<string | null>(null);
  const [activeTechTag, setActiveTechTag] = useState<string | null>(null);

  // 利用可能なタグを収集
  const typeTags = new Set<string>();
  const techTags = new Set<string>();

  for (const docType of docTypes) {
    if (docType.tags?.type) {
      for (const tag of docType.tags.type) {
        typeTags.add(tag);
      }
    }
    if (docType.tags?.tech) {
      for (const tag of docType.tags.tech) {
        techTags.add(tag);
      }
    }
  }

  // タグでフィルタリングされたドキュメントタイプを取得
  const getFilteredDocTypes = (docs: DocType[]) => {
    return docs.filter((docType) => {
      // タイプタグでフィルタリング
      if (
        activeTypeTag &&
        (!docType.tags?.type || !docType.tags.type.includes(activeTypeTag))
      ) {
        return false;
      }
      // 技術タグでフィルタリング
      if (
        activeTechTag &&
        (!docType.tags?.tech || !docType.tags.tech.includes(activeTechTag))
      ) {
        return false;
      }
      return true;
    });
  };

  // 現在のタブに基づいてドキュメントを取得
  const getCurrentDocTypes = () => {
    if (activeTab === 'all') {
      return getFilteredDocTypes(docTypes);
    }
    return getFilteredDocTypes(docTypesByCategory[activeTab] || []);
  };

  // タグをリセット
  const resetTags = () => {
    setActiveTypeTag(null);
    setActiveTechTag(null);
  };

  // タブ変更時にタグもリセット
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetTags();
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={handleTabChange}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-8 flex justify-center">
          <TabsList>
            <TabsTrigger value="all" className="min-w-32">
              全て
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="min-w-32"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* タグフィルター */}
        <div className="mb-6 flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">タイプ:</span>
            <div className="flex flex-wrap gap-1">
              {Array.from(typeTags).map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTypeTag === tag ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() =>
                    setActiveTypeTag(activeTypeTag === tag ? null : tag)
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm font-medium">技術:</span>
            <div className="flex flex-wrap gap-1">
              {Array.from(techTags).map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTechTag === tag ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() =>
                    setActiveTechTag(activeTechTag === tag ? null : tag)
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {(activeTypeTag || activeTechTag) && (
            <button
              type="button"
              onClick={resetTags}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground"
            >
              フィルターをリセット
            </button>
          )}
        </div>

        <TabsContent value="all">
          <DocTypeGrid
            docTypes={getCurrentDocTypes()}
            emptyMessage="条件に一致するドキュメントはありません。"
          />
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">{category.title}</h2>
              {category.description && (
                <p className="mb-6 text-muted-foreground">
                  {category.description}
                </p>
              )}
              <DocTypeGrid
                docTypes={getCurrentDocTypes()}
                emptyMessage={`条件に一致する${category.title}はありません。`}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
