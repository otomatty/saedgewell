import { getDocTypes } from '~/lib/mdx/docs';
import { DocTypeTabs } from './_components/DocTypeTabs';
import type { DocType } from '~/lib/mdx/types';

export default async function HomePage() {
  const { categories, docTypes } = getDocTypes();

  // カテゴリごとにドキュメントタイプをグループ化
  const docTypesByCategory = docTypes.reduce(
    (acc: Record<string, DocType[]>, docType: DocType) => {
      if (docType.category) {
        const category = docType.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(docType);
      }
      return acc;
    },
    {}
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold">ドキュメント</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          プロジェクトに関する包括的なドキュメント、ガイドライン、ベストプラクティスを提供します。
        </p>
      </div>

      <DocTypeTabs
        categories={categories}
        docTypes={docTypes}
        docTypesByCategory={docTypesByCategory}
      />
    </div>
  );
}
