import { notFound } from 'next/navigation';
import { getDocFromParams } from '~/lib/mdx/docs';
import { DocContent } from '~/components/doc/DocContent';
import { ErrorBoundary } from '~/components/error/ErrorBoundary';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocPage(props: PageProps) {
  const params = await props.params;

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
    return notFound();
  }

  try {
    const doc = await getDocFromParams(params.slug);

    if (!doc) {
      return notFound();
    }

    return (
      <ErrorBoundary>
        <DocContent code={doc.code} frontmatter={doc.frontmatter} />
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
