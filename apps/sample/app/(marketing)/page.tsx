import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon, LayoutDashboard } from 'lucide-react';

import {
  CtaButton,
  FeatureCard,
  FeatureGrid,
  FeatureShowcase,
  FeatureShowcaseIconContainer,
  Hero,
  Pill,
} from '@kit/ui/marketing';

import { withI18n } from '~/lib/i18n/with-i18n';

function Home() {
  return (
    <div className={'mt-4 flex flex-col space-y-24 py-14'}>
      <div className={'container mx-auto'}>
        <Hero
          pill={
            <Pill label={'新着'}>
              <span>野心的な開発者のための最高のSaaS スターターキット</span>
            </Pill>
          }
          title={
            <>
              <span>究極のSaaS スターター</span>
              <span>次のプロジェクトのために</span>
            </>
          }
          subtitle={
            <span>
              次世代のSaaS
              スターターキットで、これまでにないスピードでSaaSを構築・リリース。
              数ヶ月ではなく数日でSaaSをリリースできます。
            </span>
          }
          cta={<MainCallToActionButton />}
          image={
            <Image
              priority
              className={
                'dark:border-primary/10 rounded-2xl border border-gray-200'
              }
              width={3558}
              height={2222}
              src={'/images/dashboard.webp'}
              alt={'アプリケーションイメージ'}
            />
          }
        />
      </div>

      <div className={'container mx-auto'}>
        <div
          className={'flex flex-col space-y-16 xl:space-y-32 2xl:space-y-36'}
        >
          <FeatureShowcase
            heading={
              <>
                <b className="font-semibold dark:text-white">
                  究極のSaaS スターターキット
                </b>
                .{' '}
                <span className="text-muted-foreground font-normal">
                  Makerkitで創造性を解き放ち、これまでにないスピードでSaaSを構築しましょう。
                </span>
              </>
            }
            icon={
              <FeatureShowcaseIconContainer>
                <LayoutDashboard className="h-5" />
                <span>オールインワンソリューション</span>
              </FeatureShowcaseIconContainer>
            }
          >
            <FeatureGrid>
              <FeatureCard
                className={'relative col-span-2 overflow-hidden'}
                label={'美しいダッシュボード'}
                description={
                  'MakerkitはSaaSビジネスを管理するための美しいダッシュボードを提供します。'
                }
              />

              <FeatureCard
                className={
                  'relative col-span-2 w-full overflow-hidden lg:col-span-1'
                }
                label={'認証機能'}
                description={
                  'Makerkitは、ユーザーがサインインするための様々なプロバイダーを提供します。'
                }
              />

              <FeatureCard
                className={'relative col-span-2 overflow-hidden lg:col-span-1'}
                label={'マルチテナント'}
                description={
                  'SaaSビジネスのためのマルチテナントメンバーシップ。'
                }
              />

              <FeatureCard
                className={'relative col-span-2 overflow-hidden'}
                label={'課金システム'}
                description={
                  'Makerkitは顧客に課金するための複数の決済ゲートウェイをサポートしています。'
                }
              />
            </FeatureGrid>
          </FeatureShowcase>
        </div>
      </div>
    </div>
  );
}

export default withI18n(Home);

function MainCallToActionButton() {
  return (
    <div className={'flex space-x-4'}>
      <CtaButton>
        <Link href={'/auth/sign-up'}>
          <span className={'flex items-center space-x-0.5'}>
            <span>新規登録</span>

            <ArrowRightIcon
              className={
                'animate-in fade-in slide-in-from-left-8 h-4' +
                ' zoom-in fill-mode-both delay-1000 duration-1000'
              }
            />
          </span>
        </Link>
      </CtaButton>

      <CtaButton variant={'link'}>
        <Link href={'/contact'}>お問い合わせ</Link>
      </CtaButton>
    </div>
  );
}
