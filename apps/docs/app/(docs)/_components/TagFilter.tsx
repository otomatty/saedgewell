'use client';

import { Badge } from '@kit/ui/badge';
import { getTagDisplayName } from '~/lib/mdx/tag-mappings';

interface TagFilterProps {
  allTags: Map<string, { id: string; count?: number }>;
  activeTag: string | null;
  onTagClick: (tagId: string) => void;
  onReset: () => void;
}

export function TagFilter({
  allTags,
  activeTag,
  onTagClick,
  onReset,
}: TagFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          {Array.from(allTags.values()).map((tag) => (
            <Badge
              key={tag.id}
              variant={activeTag === tag.id ? 'default' : 'outline'}
              className="cursor-pointer flex items-center gap-1.5"
              onClick={() => onTagClick(tag.id)}
            >
              <span># {getTagDisplayName(tag.id)}</span>
              {tag.count && (
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-medium">
                  {tag.count}
                </span>
              )}
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
