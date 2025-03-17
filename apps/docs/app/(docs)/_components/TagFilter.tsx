'use client';

import { Badge } from '@kit/ui/badge';
import { getTagDisplayName } from '~/lib/mdx/tag-mappings';

interface TagFilterProps {
  allTags: Map<string, { id: string; type: 'type' | 'tech' }>;
  activeTag: string | null;
  activeTagType: 'type' | 'tech' | null;
  onTagClick: (tagId: string, tagType: 'type' | 'tech') => void;
  onReset: () => void;
}

export function TagFilter({
  allTags,
  activeTag,
  activeTagType,
  onTagClick,
  onReset,
}: TagFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          {Array.from(allTags.values()).map((tag) => (
            <Badge
              key={`${tag.type}:${tag.id}`}
              variant={
                activeTag === tag.id && activeTagType === tag.type
                  ? 'default'
                  : 'outline'
              }
              className="cursor-pointer"
              onClick={() => onTagClick(tag.id, tag.type)}
            >
              #{getTagDisplayName(tag.id, tag.type)}
            </Badge>
          ))}
        </div>

        {activeTag && (
          <button
            type="button"
            onClick={onReset}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground"
          >
            フィルターをリセット
          </button>
        )}
      </div>
    </div>
  );
}
