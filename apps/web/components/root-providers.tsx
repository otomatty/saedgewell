'use client';

import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import { ThemeProvider } from 'next-themes';

import { CaptchaProvider } from '@kit/auth/captcha/client';
import { I18nProvider } from '@kit/i18n/provider';
import { If } from '@kit/ui/if';
import { VersionUpdater } from '@kit/ui/version-updater';

import { AuthProvider } from '~/components/auth-provider';
import appConfig from '~/config/app.config';
import authConfig from '~/config/auth.config';
import featuresFlagConfig from '~/config/feature-flags.config';
import { i18nResolver } from '~/lib/i18n/i18n.resolver';
import { getI18nSettings } from '~/lib/i18n/i18n.settings';

import { ReactQueryProvider } from './react-query-provider';

const captchaSiteKey = authConfig.captchaTokenSiteKey;

/**
 * @description CAPTCHAトークンを設定するための動的にインポートされるコンポーネント
 * @internal
 */
const CaptchaTokenSetter = dynamic(async () => {
  if (!captchaSiteKey) {
    return Promise.resolve(() => null);
  }

  const { CaptchaTokenSetter } = await import('@kit/auth/captcha/client');

  return {
    default: CaptchaTokenSetter,
  };
});

/**
 * @description アプリケーションのルートレベルで必要な各種プロバイダーを提供するコンポーネント
 *
 * @component
 * @example
 * <RootProviders lang="ja" theme="light">
 *   <YourApp />
 * </RootProviders>
 *
 * @param {object} props
 * @param {string} props.lang - 使用する言語コード
 * @param {string} [props.theme] - 使用するテーマ（デフォルト: appConfig.themeの値）
 * @param {React.ReactNode} props.children - ラップする子コンポーネント
 *
 * @details 以下のプロバイダーを統合:
 * - ReactQueryProvider: データフェッチング管理
 * - I18nProvider: 国際化対応
 * - CaptchaProvider: CAPTCHA機能
 * - AuthProvider: 認証状態管理
 * - ThemeProvider: テーマ管理
 * - VersionUpdater: バージョン更新通知（feature flagで制御）
 *
 * @returns {JSX.Element} 複数のプロバイダーでラップされたコンポーネント
 */
export function RootProviders({
  lang,
  theme = appConfig.theme,
  children,
}: React.PropsWithChildren<{
  lang: string;
  theme?: string;
}>) {
  const i18nSettings = useMemo(() => getI18nSettings(lang), [lang]);

  return (
    <ReactQueryProvider>
      <I18nProvider settings={i18nSettings} resolver={i18nResolver}>
        <CaptchaProvider>
          <CaptchaTokenSetter siteKey={captchaSiteKey} />

          <AuthProvider>
            <ThemeProvider
              attribute="class"
              enableSystem
              disableTransitionOnChange
              defaultTheme={theme}
              enableColorScheme={false}
            >
              {children}
            </ThemeProvider>
          </AuthProvider>
        </CaptchaProvider>

        <If condition={featuresFlagConfig.enableVersionUpdater}>
          <VersionUpdater />
        </If>
      </I18nProvider>
    </ReactQueryProvider>
  );
}
