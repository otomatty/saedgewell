'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import {
  Sidebar as SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@kit/ui/sidebar';
import { DocTree } from '../navigation/DocTree';
import { DocTypeSelector } from '../navigation/DocTypeSelector';
import type { DocNode } from '~/lib/mdx/docs';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [docTree, setDocTree] = useState<DocNode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // パスから現在のドキュメントタイプを取得
  const currentDocType = pathname.split('/')[1] || 'docs';

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/docs/${currentDocType}`);
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
  }, [currentDocType]);

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <SidebarRoot>
      <SidebarHeader className="border-b p-4">
        <DocTypeSelector />
      </SidebarHeader>

      <SidebarContent>
        {error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : isLoading ? (
          <div className="p-4">Loading...</div>
        ) : (
          <div className="p-4">
            <DocTree items={docTree} docType={currentDocType} />
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={handleHomeClick}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Home className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">ホームに戻る</span>
                <span className="text-xs text-muted-foreground">
                  コンテンツを選択する
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarRoot>
  );
}
