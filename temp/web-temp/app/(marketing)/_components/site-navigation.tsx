import Link from 'next/link';

import { Menu } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuList } from '@kit/ui/navigation-menu';

import { SiteNavigationItem } from './site-navigation-item';

/**
 * Add your navigation links here
 *
 * @example
 *
 * {
 *   FAQ: {
 *     label: 'marketing:faq',
 *     path: '/faq',
 *   },
 *   Pricing: {
 *     label: 'marketing:pricing',
 *     path: '/pricing',
 *   },
 * }
 */

const links: Record<
  string,
  {
    label: string;
    path: string;
  }
> = {
  FAQ: {
    label: 'よくある質問',
    path: '/faq',
  },
  Contact: {
    label: 'お問い合わせ',
    path: '/contact',
  },
};

export function SiteNavigation() {
  const NavItems = Object.values(links).map((item) => {
    return (
      <SiteNavigationItem key={item.path} path={item.path}>
        {item.label}
      </SiteNavigationItem>
    );
  });

  return (
    <>
      <div className={'hidden items-center justify-center md:flex'}>
        <NavigationMenu className={'px-4 py-2'}>
          <NavigationMenuList className={'space-x-5'}>
            {NavItems}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className={'flex justify-start sm:items-center md:hidden'}>
        <MobileDropdown />
      </div>
    </>
  );
}

function MobileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={'メニューを開く'}>
        <Menu className={'h-8 w-8'} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className={'w-full'}>
        {Object.values(links).map((item) => {
          const className = 'flex w-full h-full items-center';

          return (
            <DropdownMenuItem key={item.path} asChild>
              <Link className={className} href={item.path}>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
