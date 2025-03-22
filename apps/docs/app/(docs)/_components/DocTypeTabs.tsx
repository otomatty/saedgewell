'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kit/ui/tabs';
import { DocTypeGrid } from './DocTypeGrid';
import { TagFilter } from './TagFilter';
import type { DocType, DocCategory } from '~/types/mdx';

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
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeTagType, setActiveTagType] = useState<'type' | 'tech' | null>(
    null
  );

  // 利用可能なタグを収集
  const allTags = new Map<string, { id: string; type: 'type' | 'tech' }>();

  for (const docType of docTypes) {
    if (docType.tags?.type) {
      for (const tag of docType.tags.type) {
        allTags.set(`type:${tag}`, { id: tag, type: 'type' });
      }
    }
    if (docType.tags?.tech) {
      for (const tag of docType.tags.tech) {
        allTags.set(`tech:${tag}`, { id: tag, type: 'tech' });
      }
    }
  }

  // タグでフィルタリングされたドキュメントタイプを取得
  const getFilteredDocTypes = (docs: DocType[]) => {
    if (!activeTag || !activeTagType) return docs;

    return docs.filter((docType) => {
      if (activeTagType === 'type') {
        return docType.tags?.type?.includes(activeTag);
      }
      if (activeTagType === 'tech') {
        return docType.tags?.tech?.includes(activeTag);
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
    setActiveTag(null);
    setActiveTagType(null);
  };

  // タブ変更時にタグもリセット
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetTags();
  };

  // タグ選択時の処理
  const handleTagClick = (tagId: string, tagType: 'type' | 'tech') => {
    if (activeTag === tagId && activeTagType === tagType) {
      resetTags();
    } else {
      setActiveTag(tagId);
      setActiveTagType(tagType);
    }
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
        <TagFilter
          allTags={allTags}
          activeTag={activeTag}
          activeTagType={activeTagType}
          onTagClick={handleTagClick}
          onReset={resetTags}
        />

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
