import type { ReactNode } from 'react';
import Sidebar from '~/components/layout/Sidebar';

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* メインコンテンツ */}
      <main className="flex-1 px-8 py-6">{children}</main>
    </div>
  );
}
