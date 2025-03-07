'use client';

import type { User } from '@supabase/supabase-js';

import { PersonalAccountDropdown } from '@kit/accounts/personal-account-dropdown';
import { useSignOut } from '@kit/supabase/hooks/use-sign-out';
import { useUser } from '@kit/supabase/hooks/use-user';

import featuresFlagConfig from '~/config/feature-flags.config';
import pathsConfig from '~/config/paths.config';

const paths = {
  home: pathsConfig.app.home,
};

const features = {
  enableThemeToggle: featuresFlagConfig.enableThemeToggle,
};

/**
 * @description ユーザーアカウント関連のドロップダウンメニューを提供するコンポーネント
 *
 * @component
 * @example
 * // 基本的な使用方法
 * <PersonalAccountDropdownContainer />
 *
 * // カスタムクラス付きで使用
 * <PersonalAccountDropdownContainer className="custom-dropdown" />
 *
 * @param {object} props
 * @param {string} [props.className] - カスタムCSSクラス名
 *
 * @details
 * - ユーザープロフィール情報の表示
 * - アカウント関連の各種操作（設定、ログアウトなど）
 * - ドロップダウン形式のUIを提供
 * - 認証状態に応じて適切なメニュー項目を表示
 *
 * @returns {JSX.Element} アカウントドロップダウンメニューコンポーネント
 */
export function ProfileAccountDropdownContainer(props: {
  user?: User;
  showProfileName?: boolean;

  account?: {
    id: string | null;
    name: string | null;
    picture_url: string | null;
  };
}) {
  const signOut = useSignOut();
  const user = useUser(props.user);
  const userData = user.data;

  if (!userData) {
    return null;
  }

  return (
    <PersonalAccountDropdown
      className={'w-full'}
      paths={paths}
      features={features}
      user={userData}
      account={props.account}
      signOutRequested={() => signOut.mutateAsync()}
      showProfileName={props.showProfileName}
    />
  );
}
