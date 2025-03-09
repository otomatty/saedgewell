'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '@kit/ui/scroll-area';
import { DocTree } from '../navigation/DocTree';
import type { DocNode } from '~/lib/docs';

export default function Sidebar() {
  const [docTree, setDocTree] = useState<DocNode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/docs');
        if (!res.ok) {
          throw new Error(`Failed to fetch docs: ${res.status}`);
        }
        const data = await res.json();
        setDocTree(data);
      } catch (err) {
        console.error('Error fetching docs:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load documentation'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocs();
  }, []);

  if (error) {
    return (
      <div className="hidden border-r bg-background lg:block lg:w-64">
        <div className="p-4 text-red-500">{error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="hidden border-r bg-background lg:block lg:w-64">
        <div className="p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="hidden border-r bg-background lg:block lg:w-64">
      <ScrollArea className="h-[calc(100vh-3.5rem)] py-6">
        <div className="space-y-4 px-4">
          <div className="py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              ドキュメント
            </h2>
            <DocTree items={docTree} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
