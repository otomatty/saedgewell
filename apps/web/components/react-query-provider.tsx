'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * @description React Queryの設定とプロバイダーを提供するコンポーネント
 *
 * @component
 * @example
 * <ReactQueryProvider>
 *   <YourApp />
 * </ReactQueryProvider>
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - ラップする子コンポーネント
 *
 * @details
 * - クライアントサイドでのデータフェッチングを管理
 * - デフォルトで60秒のstaleTimeを設定し、不要な再フェッチを防止
 * - SSRと組み合わせて使用することを想定した設定
 *
 * @returns {JSX.Element} React Queryプロバイダーでラップされたコンポーネント
 */
export function ReactQueryProvider(props: React.PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
