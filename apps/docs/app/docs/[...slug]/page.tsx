import { notFound } from 'next/navigation';
import { getDocFromParams } from '~/lib/docs';
import { MDXContent } from '~/components/mdx-content';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function DocContent({
  doc,
}: { doc: Awaited<ReturnType<typeof getDocFromParams>> }) {
  if (!doc) return null;

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          {doc.frontmatter.title}
        </h1>
        {doc.frontmatter.description && (
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {doc.frontmatter.description}
          </p>
        )}
      </div>
      <Suspense fallback={<div>Loading content...</div>}>
        <MDXContent code={doc.content} />
      </Suspense>
    </article>
  );
}

export default async function DocPage(props: PageProps) {
  const params = await props.params;

  try {
    const doc = await getDocFromParams(params.slug);

    if (!doc) {
      return notFound();
    }

    return <DocContent doc={doc} />;
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
