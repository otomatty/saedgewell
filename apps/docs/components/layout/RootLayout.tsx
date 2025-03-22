import type { ReactNode } from 'react';
import { Header } from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { SidebarInset, SidebarProvider } from '@kit/ui/sidebar';
import type { ProfileWithRole } from '@kit/types/profile';

interface RootLayoutProps {
  children: ReactNode;
  profile: ProfileWithRole | null;
}

export default function RootLayout({ children, profile }: RootLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header profile={profile} />
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
