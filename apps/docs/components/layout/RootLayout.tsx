import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { SidebarInset, SidebarProvider } from '@kit/ui/sidebar';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
