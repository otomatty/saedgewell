import { ProfileAccountDropdownContainer } from '../personal-account-dropdown-container';
import { SidebarTrigger } from '@kit/ui/sidebar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4">
          <SidebarTrigger />
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
