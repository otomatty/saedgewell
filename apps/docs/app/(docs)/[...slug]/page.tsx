import { notFound } from 'next/navigation';
import { getAdjacentDocs } from '~/lib/mdx/docs';
import { getDocFromParams } from '~/actions/mdx/mdx-processor';
import { DocContent } from '~/components/doc/DocContent';
import { ErrorBoundary } from '~/components/error/ErrorBoundary';
import { existsSync } from 'node:fs';
import { getContentPath } from '~/config/paths';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocPage(props: PageProps) {
  const params = await props.params;

  // デバッグ情報
  console.log('DocPage: Received slug params:', params.slug);

  // APIパスの場合は404を返す
  if (params.slug[0] === 'api') {
    console.log('DocPage: API path detected, returning 404');
    return notFound();
  }

  // 静的アセットファイルの場合は404を返す
  const staticAssetExtensions = [
    '.svg',
    '.ico',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.webp',
  ];
  if (
    params.slug.some((segment) =>
      staticAssetExtensions.some((ext) => segment.endsWith(ext))
    )
  ) {
    console.log('DocPage: Static asset requested, returning 404');
    return notFound();
  }

  try {
    // パスの検証
    if (params.slug.length < 2) {
      console.error(
        'DocPage: Invalid path - need at least category and docType'
      );
      return notFound();
    }

    const [category, docType, ...restPath] = params.slug;
    console.log(
      `DocPage: Processing document for category=${category}, docType=${docType}`
    );

    // 許可されたカテゴリのみ処理
    const allowedCategories = ['documents', 'wiki', 'development'];
    if (!category || !docType || !allowedCategories.includes(category)) {
      console.error(
        `DocPage: Invalid category or docType: ${category}/${docType}`
      );
      return notFound();
    }

    // ディレクトリの存在確認
    const contentDir = getContentPath(category, docType);
    if (!existsSync(contentDir)) {
      console.error(`DocPage: Content directory not found: ${contentDir}`);
      return notFound();
    }

    // ドキュメントの取得
    const doc = await getDocFromParams(params.slug);

    if (!doc) {
      console.error('DocPage: Document not found after processing');
      return notFound();
    }

    // 前後のドキュメントを取得
    const adjacentDocs = await getAdjacentDocs(params.slug);

    return (
      <ErrorBoundary>
        <DocContent
          code={doc.code}
          frontmatter={doc.frontmatter}
          adjacentDocs={adjacentDocs}
          slug={params.slug}
        />
      </ErrorBoundary>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in DocPage:', {
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error('Unknown error in DocPage:', error);
    }
    throw error;
  }
}
