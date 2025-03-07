import { memo } from 'react';

/**
 * @description JSON-LDスキーマをページに追加するためのコンポーネント
 *
 * @component
 * @example
 * <JsonLd
 *   data={{
 *     "@context": "https://schema.org",
 *     "@type": "WebPage",
 *     "name": "ページタイトル"
 *   }}
 * />
 *
 * @param {object} props
 * @param {object} props.data - JSON-LDとして出力するデータ
 *
 * @details
 * - 構造化データをページのheadセクションに追加
 * - SEO対策として使用
 * - 検索エンジンへの詳細情報提供
 *
 * @returns {JSX.Element} script要素でラップされたJSON-LDデータ
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(data)}
    </script>
  );
}
