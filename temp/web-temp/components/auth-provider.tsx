'use client';

import { useAuthChangeListener } from '@kit/supabase/hooks/use-auth-change-listener';

import pathsConfig from '~/config/paths.config';

/**
 * @description 認証状態を管理し、アプリケーション全体で認証情報を提供するコンポーネント
 *
 * @component
 * @example
 * <AuthProvider>
 *   <AuthProtectedComponent />
 * </AuthProvider>
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - ラップする子コンポーネント
 *
 * @details
 * - ユーザーの認証状態をグローバルに管理
 * - 認証関連の機能をアプリケーション全体で利用可能に
 * - 認証状態の変更を監視し、適切に状態を更新
 *
 * @returns {JSX.Element} 認証プロバイダーでラップされたコンポーネント
 */
export function AuthProvider(props: React.PropsWithChildren) {
  useAuthChangeListener({
    appHomePath: pathsConfig.app.home,
  });

  return props.children;
}
