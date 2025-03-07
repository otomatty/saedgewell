'use client';

import dynamic from 'next/dynamic';

import { LoadingOverlay } from '@kit/ui/loading-overlay';

export const DashboardDemo = dynamic(() => import('./dashboard-demo-charts'), {
  ssr: false,
  loading: () => (
    <LoadingOverlay>
      <span className={'text-muted-foreground'}>読み込み中...</span>
    </LoadingOverlay>
  ),
});
