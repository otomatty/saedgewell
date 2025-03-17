'use client';

// import { ProfileAccountDropdownContainer } from '../personal-account-dropdown-container';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@kit/ui/sidebar';
import { SearchInput } from '../search/SearchInput';
import { Separator } from '@kit/ui/separator';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import { Badge } from '@kit/ui/badge';

export default function Header() {
  const pathname = usePathname();
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // トップページと検索ページではサイドバーを表示しない
  const isHomePage = pathname === '/' || pathname === '/docs';
  const isSearchPage = pathname.startsWith('/search');
  const showSidebar = !isHomePage && !isSearchPage;

  // ヒーローセクションの表示状態を監視
  useEffect(() => {
    const handleHeroVisibility = (event: Event) => {
      const customEvent = event as CustomEvent<{ visible: boolean }>;
      setIsHeroVisible(customEvent.detail.visible);
    };

    // スクロール状態の監視
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // イベントリスナーの登録
    window.addEventListener('hero-visible', handleHeroVisibility);
    window.addEventListener('scroll', handleScroll);

    // 初期状態の設定
    handleScroll();

    // クリーンアップ
    return () => {
      window.removeEventListener('hero-visible', handleHeroVisibility);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ヒーローが表示されていて、トップページの場合はヘッダーを非表示
  const hideHeader = isHeroVisible && isHomePage;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        hideHeader ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      } ${isScrolled ? 'shadow-sm' : ''}`}
    >
      <div className="flex h-20 items-center p-2">
        {showSidebar && (
          <>
            <div className="mx-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <SidebarTrigger />
                      <Badge
                        variant="secondary"
                        className="hidden md:inline-flex text-xs font-normal py-0 h-5"
                      >
                        ⌘ B
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    サイドバーの表示/非表示を切り替え
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Separator orientation="vertical" className="py-2" />
          </>
        )}
        <div className="hidden md:flex md:flex-1 md:mx-4">
          <SearchInput />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            {/* 一時的にコメントアウト */}
            {/* <ProfileAccountDropdownContainer /> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
