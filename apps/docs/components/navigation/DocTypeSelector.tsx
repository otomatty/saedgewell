'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Check, ChevronsUpDown, BookOpen, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@kit/ui/sidebar';
import type { DocType, DocCategory } from '~/lib/mdx/types';

export function DocTypeSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [docTypes, setDocTypes] = useState<DocType[]>([]);
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [currentType, setCurrentType] = useState<DocType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocTypes = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/doc-types?includeCategories=true');
        if (!res.ok) {
          throw new Error(`Failed to fetch doc types: ${res.status}`);
        }
        const data = await res.json();

        // カテゴリとドキュメントタイプを設定
        if (data.categories && data.docTypes) {
          setCategories(data.categories);
          setDocTypes(data.docTypes);
        } else {
          // 後方互換性のため、配列の場合はドキュメントタイプとして扱う
          setDocTypes(Array.isArray(data) ? data : []);
        }

        // パスから現在のドキュメントタイプを特定
        const pathParts = pathname.split('/');
        const currentDocTypeId =
          pathParts[1] ||
          (Array.isArray(data) ? data[0]?.id : data.docTypes[0]?.id) ||
          '';

        // 現在のドキュメントタイプを検索
        const allDocTypes = Array.isArray(data) ? data : data.docTypes || [];
        const currentDocType =
          allDocTypes.find((type: DocType) => type.id === currentDocTypeId) ||
          allDocTypes[0];

        setCurrentType(currentDocType);
      } catch (err) {
        console.error('Error fetching doc types:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocTypes();
  }, [pathname]);

  const handleTypeChange = (type: DocType) => {
    setCurrentType(type);
    router.push(`/${type.id}`);
  };

  if (isLoading) {
    return null;
  }

  // カテゴリごとにドキュメントタイプをグループ化
  const docTypesByCategory: Record<string, DocType[]> = {};
  const uncategorizedDocTypes: DocType[] = [];

  for (const docType of docTypes) {
    if (docType.category) {
      if (!docTypesByCategory[docType.category]) {
        docTypesByCategory[docType.category] = [];
      }
      docTypesByCategory[docType.category]?.push(docType);
    } else {
      uncategorizedDocTypes.push(docType);
    }
  }

  return (
    <SidebarMenu>
      {currentType && (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {currentType.icon ? (
                    <Image
                      src={currentType.icon}
                      alt={currentType.title}
                      width={16}
                      height={16}
                      className="size-4"
                    />
                  ) : (
                    <BookOpen className="size-4" />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{currentType.title}</span>
                  {currentType.category && (
                    <span className="text-xs text-muted-foreground">
                      {categories.find((c) => c.id === currentType.category)
                        ?.title || currentType.category}
                    </span>
                  )}
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width]"
              align="start"
            >
              {/* カテゴリがある場合は、カテゴリごとにサブメニューを表示 */}
              {categories.length > 0 &&
                Object.keys(docTypesByCategory).length > 0 && (
                  <>
                    {categories.map((category) => {
                      const categoryDocTypes =
                        docTypesByCategory[category.id] || [];
                      if (categoryDocTypes.length === 0) return null;

                      return (
                        <DropdownMenuSub key={category.id}>
                          <DropdownMenuSubTrigger className="flex items-center gap-2">
                            {category.icon ? (
                              <Image
                                src={category.icon}
                                alt={category.title}
                                width={16}
                                height={16}
                                className="size-4"
                              />
                            ) : (
                              <BookOpen className="size-4" />
                            )}
                            <span>{category.title}</span>
                            <ChevronRight className="ml-auto size-4" />
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {categoryDocTypes.map((type) => (
                              <DropdownMenuItem
                                key={type.id}
                                onSelect={() => handleTypeChange(type)}
                                className="flex flex-col items-start gap-1 py-2"
                              >
                                <div className="flex w-full items-center gap-2">
                                  {type.icon ? (
                                    <Image
                                      src={type.icon}
                                      alt={type.title}
                                      width={16}
                                      height={16}
                                      className="size-4"
                                    />
                                  ) : (
                                    <BookOpen className="size-4" />
                                  )}
                                  <span className="font-medium">
                                    {type.title}
                                  </span>
                                  {type.id === currentType.id && (
                                    <Check className="ml-auto size-4" />
                                  )}
                                </div>
                                {type.description && (
                                  <span className="text-xs text-muted-foreground pl-6">
                                    {type.description}
                                  </span>
                                )}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      );
                    })}

                    {/* カテゴリなしのドキュメントタイプがある場合は区切り線を表示 */}
                    {uncategorizedDocTypes.length > 0 && (
                      <DropdownMenuSeparator />
                    )}
                  </>
                )}

              {/* カテゴリなしのドキュメントタイプを表示 */}
              {uncategorizedDocTypes.map((type) => (
                <DropdownMenuItem
                  key={type.id}
                  onSelect={() => handleTypeChange(type)}
                  className="flex flex-col items-start gap-1 py-2"
                >
                  <div className="flex w-full items-center gap-2">
                    {type.icon ? (
                      <Image
                        src={type.icon}
                        alt={type.title}
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    ) : (
                      <BookOpen className="size-4" />
                    )}
                    <span className="font-medium">{type.title}</span>
                    {type.id === currentType.id && (
                      <Check className="ml-auto size-4" />
                    )}
                  </div>
                  {type.description && (
                    <span className="text-xs text-muted-foreground pl-6">
                      {type.description}
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
