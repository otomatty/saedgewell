import { describe, it, expect, vi, beforeEach } from 'vitest';
import { KeywordResolver } from '../keyword-resolver';
import type {
  DocumentMapping,
  DocumentMetadata,
  ResolvedKeyword,
} from '../types';
import { DocumentMapper } from '../document-mapper';

// モックデータ
const mockDocuments: DocumentMapping[] = [
  {
    path: '/docs/guide/getting-started.mdx',
    slug: 'getting-started',
    docType: 'guide',
    metadata: {
      title: 'はじめに',
      description: 'プロジェクトのセットアップガイド',
      path: '/docs/guide/getting-started.mdx',
      slug: 'getting-started',
      docType: 'guide',
      keywords: ['セットアップ', 'インストール'],
      lastModified: '2024-01-01',
    },
    keywords: ['セットアップ', 'インストール'],
  },
  {
    path: '/docs/api/setup.mdx',
    slug: 'setup',
    docType: 'api',
    metadata: {
      title: 'セットアップAPI',
      description: 'APIのセットアップ方法',
      path: '/docs/api/setup.mdx',
      slug: 'setup',
      docType: 'api',
      keywords: ['セットアップ', 'API'],
      lastModified: '2024-01-01',
    },
    keywords: ['セットアップ', 'API'],
  },
];

// DocumentMapperのモック
vi.mock('../document-mapper', () => ({
  DocumentMapper: vi.fn().mockImplementation(() => ({
    resolveKeyword: vi
      .fn()
      .mockImplementation(async (keyword: string, docType?: string) => {
        const matches = mockDocuments.filter(
          (doc) =>
            doc.keywords.includes(keyword) &&
            (!docType || doc.docType === docType)
        );

        if (matches.length === 0) {
          return {
            keyword,
            docType,
            isAmbiguous: false,
            error: `キーワード "${keyword}" に一致するドキュメントが見つかりませんでした。`,
          };
        }

        if (matches.length === 1) {
          return {
            keyword,
            docType,
            mapping: matches[0],
            isAmbiguous: false,
          };
        }

        return {
          keyword,
          docType,
          mapping: matches[0],
          isAmbiguous: true,
          alternatives: matches.slice(1),
        };
      }),
  })),
}));

describe('KeywordResolver', () => {
  let resolver: KeywordResolver;
  let documentMapper: DocumentMapper;

  beforeEach(() => {
    documentMapper = new DocumentMapper();
    resolver = new KeywordResolver(documentMapper, {
      basePath: '/docs',
      enableContextMatching: true,
      enablePriorityMatching: true,
    });
  });

  describe('resolveKeyword', () => {
    it('キーワードを解決できること', async () => {
      const result = await resolver.resolveKeyword('セットアップ');
      expect(result.mapping).toBeDefined();
      expect(result.mapping?.docType).toBe('guide');
      expect(result.isAmbiguous).toBe(true); // 複数のマッチが存在するため
      expect(result.alternatives).toBeDefined();
      expect(result.alternatives?.length).toBe(1);
    });

    it('ドキュメントタイプを指定して一意に解決できること', async () => {
      const result = await resolver.resolveKeyword('セットアップ', 'api');
      expect(result.isAmbiguous).toBe(false);
      expect(result.mapping).toBeDefined();
      expect(result.mapping?.docType).toBe('api');
      expect(result.alternatives).toBeUndefined();
    });

    it('存在しないキーワードに対してエラーを返すこと', async () => {
      const result = await resolver.resolveKeyword('存在しないキーワード');
      expect(result.error).toBeDefined();
      expect(result.mapping).toBeUndefined();
      expect(result.isAmbiguous).toBe(false);
    });

    it('コンテキストを考慮してドキュメントを並び替えること', async () => {
      const context = 'APIの設定方法について説明します。';
      const result = await resolver.resolveKeyword(
        'セットアップ',
        undefined,
        context
      );
      expect(result.mapping?.docType).toBe('api');
      expect(result.isAmbiguous).toBe(true);
      expect(result.alternatives).toBeDefined();
      expect(result.alternatives?.length).toBe(1);
    });
  });

  describe('setPriority', () => {
    it('ドキュメントタイプの優先度を設定できること', async () => {
      resolver.setPriority('api', 2);
      resolver.setPriority('guide', 1);

      const result = await resolver.resolveKeyword('セットアップ');
      expect(result.mapping?.docType).toBe('api');
      expect(result.isAmbiguous).toBe(true);
      expect(result.alternatives).toBeDefined();
      expect(result.alternatives?.length).toBe(1);
    });
  });
});
