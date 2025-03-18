import Link from 'next/link';

import { ArrowRight, ChevronDown } from 'lucide-react';

import { Button } from '@kit/ui/button';

import { SitePageHeader } from '~/(marketing)/_components/site-page-header';
import { JsonLd } from '~/components/json-ld';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

export const generateMetadata = async () => {
  const { t } = await createI18nServerInstance();

  return {
    title: t('marketing:faq'),
  };
};

async function FAQPage() {
  // replace this content with translations
  const faqItems = [
    {
      question: '無料トライアルはありますか？',
      answer:
        '14日間の無料トライアルをご提供しています。トライアル期間中はいつでもキャンセル可能で、料金は発生しません。',
    },
    {
      question: 'サブスクリプションをキャンセルできますか？',
      answer:
        'はい、いつでもサブスクリプションをキャンセルできます。アカウント設定からキャンセルの手続きが可能です。',
    },
    {
      question: '請求書はどこで確認できますか？',
      answer: 'アカウント設定から請求書をご確認いただけます。',
    },
    {
      question: 'どのような支払い方法に対応していますか？',
      answer: '主要なクレジットカードとPayPalに対応しています。',
    },
    {
      question: 'プランのアップグレードやダウングレードは可能ですか？',
      answer:
        'はい、いつでもプランのアップグレードやダウングレードが可能です。アカウント設定から変更できます。',
    },
    {
      question: '非営利団体向けの割引はありますか？',
      answer:
        'はい、非営利団体向けに50%の割引を提供しています。詳細については、お問い合わせください。',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => {
      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      };
    }),
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <div className={'flex flex-col space-y-4 xl:space-y-8'}>
        <SitePageHeader
          title={'よくある質問'}
          subtitle={'お客様からよくいただくご質問とその回答をまとめました。'}
        />

        <div className={'container flex flex-col space-y-8 pb-16'}>
          <div className="flex w-full max-w-xl flex-col">
            {faqItems.map((item) => {
              return <FaqItem key={crypto.randomUUID()} item={item} />;
            })}
          </div>

          <div>
            <Button asChild variant={'outline'}>
              <Link href={'/contact'}>
                <span>お問い合わせはこちら</span>

                <ArrowRight className={'ml-2 w-4'} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withI18n(FAQPage);

function FaqItem({
  item,
}: React.PropsWithChildren<{
  item: {
    question: string;
    answer: string;
  };
}>) {
  return (
    <details className={'group border-b px-2 py-4 last:border-b-transparent'}>
      <summary
        className={
          'flex items-center justify-between hover:cursor-pointer hover:underline'
        }
      >
        <h2
          className={
            'hover:underline-none cursor-pointer font-sans font-medium'
          }
        >
          {item.question}
        </h2>

        <div>
          <ChevronDown
            className={'h-5 transition duration-300 group-open:-rotate-180'}
          />
        </div>
      </summary>

      <div className={'text-muted-foreground flex flex-col space-y-2 py-1'}>
        {item.answer}
      </div>
    </details>
  );
}
