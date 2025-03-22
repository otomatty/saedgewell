'use client';

import { LoginDialog } from '~/components/auth/login-dialog';
import { UserMenu } from './UserMenu';
import type { ProfileWithRole } from '@kit/types/profile';
import { Skeleton } from '@kit/ui/skeleton';

interface HeaderProps {
  profile: ProfileWithRole | null;
}

export const Header = ({ profile }: HeaderProps) => {
  const isAuthenticated = !!profile;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          {/* TODO: ロゴやナビゲーションメニューを追加 */}
        </div>
        <div className="flex items-center gap-2">
          {profile ? (
            <UserMenu profile={profile} />
          ) : isAuthenticated ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <LoginDialog />
          )}
        </div>
      </div>
    </header>
  );
};
