'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@kit/ui/utils';
import type { DocNode } from '~/lib/docs';

interface DocTreeProps {
  items: DocNode[];
  className?: string;
}

export function DocTree({ items, className }: DocTreeProps) {
  const pathname = usePathname();

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <div key={item.slug} className="space-y-1">
          {item.slug ? (
            <Link
              href={`/docs/${item.slug}`}
              className={cn(
                'block w-full rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                pathname === `/docs/${item.slug}`
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground/60'
              )}
            >
              {item.title}
            </Link>
          ) : (
            <div className="px-2 py-1.5 text-sm font-semibold">
              {item.title}
            </div>
          )}
          {item.children?.length > 0 && (
            <div className="ml-4">
              <DocTree items={item.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
