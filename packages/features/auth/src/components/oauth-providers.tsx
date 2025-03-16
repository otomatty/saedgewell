'use client';

import { useCallback } from 'react';

import type { Provider } from '@supabase/supabase-js';

import { useSignInWithProvider } from '@kit/supabase/hooks/use-sign-in-with-provider';
import { If } from '@kit/ui/if';
import { LoadingOverlay } from '@kit/ui/loading-overlay';

import { AuthErrorAlert } from './auth-error-alert';
import { AuthProviderButton } from './auth-provider-button';

/**
 * @name OAUTH_SCOPES
 * @description
 * OAuth認証で使用するスコープ（権限）を定義するオブジェクト。
 * アプリケーションがユーザーに要求する権限を指定するために使用される。
 *
 * 必要なOAuthプロバイダーとそのスコープをここに追加する。
 *
 * @type {Partial<Record<Provider, string>>}
 * @example
 * ```
 * const OAUTH_SCOPES = {
 *   google: 'email profile',
 *   github: 'user:email',
 * };
 * ```
 *
 * @see https://supabase.com/docs/guides/auth/social-login
 */
const OAUTH_SCOPES: Partial<Record<Provider, string>> = {
  azure: 'email',
  // add your OAuth providers here
};

/**
 * @name OauthProviders
 * @description
 * ソーシャルログイン（OAuth認証）のプロバイダーボタンを表示するコンポーネント。
 * 有効化されたプロバイダー（Google、Facebook、Twitterなど）のボタンを表示し、
 * クリック時にSupabaseのOAuth認証フローを開始する。
 *
 * @features
 * - 複数のOAuthプロバイダー対応
 * - ローディング状態の表示
 * - エラー表示
 * - リダイレクトURL設定
 * - 新規ユーザー作成オプション
 *
 * @dependencies
 * - @supabase/supabase-js: Supabase認証ライブラリ
 * - @kit/supabase/hooks/use-sign-in-with-provider: プロバイダーサインインフック
 *
 * @childComponents
 * - AuthProviderButton: 各プロバイダーのボタンコンポーネント
 * - AuthErrorAlert: エラー表示コンポーネント
 * - LoadingOverlay: ローディングオーバーレイ
 *
 * @param {Object} props
 * @param {boolean} props.shouldCreateUser - 新規ユーザーを作成するかどうか
 * @param {Provider[]} props.enabledProviders - 有効化するプロバイダーの配列
 * @param {Object} props.paths - リダイレクトパス設定
 * @param {string} props.paths.callback - コールバックURL
 * @param {string} props.paths.returnPath - 認証後のリダイレクトパス
 *
 * @example
 * ```tsx
 * <OauthProviders
 *   enabledProviders={['google', 'github']}
 *   shouldCreateUser={true}
 *   paths={{
 *     callback: '/auth/callback',
 *     returnPath: '/dashboard',
 *   }}
 * />
 * ```
 */
export function OauthProviders(props: {
  shouldCreateUser: boolean;
  enabledProviders: Provider[];

  paths: {
    callback: string;
    returnPath: string;
  };
}) {
  const signInWithProviderMutation = useSignInWithProvider();

  // we make the UI "busy" until the next page is fully loaded
  const loading = signInWithProviderMutation.isPending;

  const onSignInWithProvider = useCallback(
    async (signInRequest: () => Promise<unknown>) => {
      const credential = await signInRequest();

      if (!credential) {
        return Promise.reject(new Error('Failed to sign in with provider'));
      }
    },
    []
  );

  const enabledProviders = props.enabledProviders;

  if (!enabledProviders?.length) {
    return null;
  }

  return (
    <>
      <If condition={loading}>
        <LoadingOverlay />
      </If>

      <div className={'flex w-full flex-1 flex-col space-y-3'}>
        <div className={'flex-col space-y-2'}>
          {enabledProviders.map((provider) => {
            return (
              <AuthProviderButton
                key={provider}
                providerId={provider}
                onClick={() => {
                  const origin = window.location.origin;
                  const queryParams = new URLSearchParams();

                  if (props.paths.returnPath) {
                    queryParams.set('next', props.paths.returnPath);
                  }

                  const redirectPath = [
                    props.paths.callback,
                    queryParams.toString(),
                  ].join('?');

                  const redirectTo = [origin, redirectPath].join('');
                  const scopesOpts = OAUTH_SCOPES[provider] ?? {};

                  const credentials = {
                    provider,
                    options: {
                      shouldCreateUser: props.shouldCreateUser,
                      redirectTo,
                      ...scopesOpts,
                    },
                  };

                  return onSignInWithProvider(() =>
                    signInWithProviderMutation.mutateAsync(credentials)
                  );
                }}
              >
                {provider}でログイン
              </AuthProviderButton>
            );
          })}
        </div>

        <AuthErrorAlert error={signInWithProviderMutation.error} />
      </div>
    </>
  );
}

function getProviderName(providerId: string) {
  const capitalize = (value: string) =>
    value.slice(0, 1).toUpperCase() + value.slice(1);

  if (providerId.endsWith('.com')) {
    const [providerName = providerId] = providerId.split('.com');
    return capitalize(providerName);
  }

  return capitalize(providerId);
}
