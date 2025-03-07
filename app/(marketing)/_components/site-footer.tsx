import { Footer } from '@kit/ui/marketing';

import { AppLogo } from '~/components/app-logo';
import appConfig from '~/config/app.config';

export function SiteFooter() {
  return (
    <Footer
      logo={<AppLogo className="w-[85px] md:w-[95px]" />}
      description={'次世代のSaaS開発をより速く、より簡単に。'}
      copyright={`© ${new Date().getFullYear()} ${appConfig.name}. All rights reserved.`}
      sections={[
        {
          heading: 'はじめる',
          links: [
            {
              href: '/auth/sign-in',
              label: 'ログイン',
            },
            {
              href: '/auth/sign-up',
              label: '新規登録',
            },
          ],
        },
        {
          heading: '法的情報',
          links: [
            {
              href: '/terms-of-service',
              label: '利用規約',
            },
            {
              href: '/privacy-policy',
              label: 'プライバシーポリシー',
            },
            {
              href: '/cookie-policy',
              label: 'Cookieポリシー',
            },
          ],
        },
      ]}
    />
  );
}
