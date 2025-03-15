// MDXキーワードリンク機能のデバッグスクリプト
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import matter from 'gray-matter';

// 現在のファイルのディレクトリパスを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MDXファイルを検索する関数
async function findMdxFiles(
  basePath = 'contents',
  extensions = ['.mdx', '.md'],
  ignorePaths = ['**/node_modules/**']
) {
  try {
    const files = await glob(`${basePath}/**/*{${extensions.join(',')}}`, {
      ignore: ignorePaths,
      absolute: false,
    });

    console.log(`${files.length} 件のMDXファイルが見つかりました`);
    return files;
  } catch (error) {
    console.error('MDXファイルの検索中にエラーが発生しました:', error);
    return [];
  }
}

// MDXファイルのメタデータを解析する関数
async function parseMdxFiles(files) {
  const documents = [];

  for (const file of files) {
    try {
      const content = await fs.promises.readFile(file, 'utf-8');
      const { data: frontmatter, content: mdxContent } = matter(content);

      // キーワードリンクのパターンを検出
      const keywordLinkPattern = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
      const keywordLinks = [];
      let match;

      while ((match = keywordLinkPattern.exec(mdxContent)) !== null) {
        const [fullMatch, keyword, docType] = match;
        keywordLinks.push({
          keyword,
          docType: docType || undefined,
          position: match.index,
        });
      }

      documents.push({
        path: file,
        title: frontmatter.title || path.basename(file, path.extname(file)),
        description: frontmatter.description,
        docType: file.split('/')[0],
        keywords: frontmatter.keywords || [],
        keywordLinks,
      });
    } catch (error) {
      console.error(`ファイル ${file} の解析中にエラーが発生しました:`, error);
    }
  }

  return documents;
}

// テスト用ドキュメントを検索する関数
function findTestDocuments(documents) {
  return documents.filter((doc) => doc.path.startsWith('contents/test/'));
}

// キーワードリンクの解決をシミュレートする関数
function simulateKeywordResolution(documents, keyword, docType) {
  // 完全一致
  const exactMatches = documents.filter(
    (doc) =>
      doc.title.toLowerCase() === keyword.toLowerCase() ||
      doc.keywords.some((k) => k.toLowerCase() === keyword.toLowerCase())
  );

  // docTypeによるフィルタリング
  const typeFilteredMatches = docType
    ? exactMatches.filter((doc) => doc.docType === docType)
    : exactMatches;

  if (typeFilteredMatches.length === 1) {
    return {
      keyword,
      docType,
      mapping: typeFilteredMatches[0],
      isAmbiguous: false,
    };
  }

  if (typeFilteredMatches.length > 1) {
    return {
      keyword,
      docType,
      isAmbiguous: true,
      alternatives: typeFilteredMatches,
      error: '複数の完全一致するドキュメントが見つかりました',
    };
  }

  // 部分一致
  const partialMatches = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(keyword.toLowerCase()) ||
      doc.keywords.some((k) => k.toLowerCase().includes(keyword.toLowerCase()))
  );

  if (partialMatches.length > 0) {
    return {
      keyword,
      docType,
      isAmbiguous: true,
      alternatives: partialMatches,
      error: '部分一致するドキュメントが見つかりました',
    };
  }

  return {
    keyword,
    docType,
    isAmbiguous: false,
    error: `キーワード "${keyword}" に一致するドキュメントが見つかりませんでした。`,
  };
}

// メイン処理
async function main() {
  console.log('=== MDXキーワードリンク機能デバッグ ===');

  // 1. MDXファイルの検索
  console.log('\n1. MDXファイルの検索:');
  const files = await findMdxFiles();

  // 2. MDXファイルの解析
  console.log('\n2. MDXファイルの解析:');
  const documents = await parseMdxFiles(files);
  console.log(`${documents.length} 件のドキュメントを解析しました`);

  // 3. テスト用ドキュメントの検索
  console.log('\n3. テスト用ドキュメントの検索:');
  const testDocs = findTestDocuments(documents);
  console.log(
    `テストディレクトリに ${testDocs.length} 件のドキュメントが見つかりました`
  );

  // 4. テスト用ドキュメントの詳細表示
  console.log('\n4. テスト用ドキュメントの詳細:');
  testDocs.forEach((doc, index) => {
    console.log(`\n[${index + 1}] ${doc.title}`);
    console.log(`  - パス: ${doc.path}`);
    console.log(`  - タイプ: ${doc.docType}`);
    console.log(`  - キーワード: ${doc.keywords.join(', ') || 'なし'}`);
    console.log(`  - キーワードリンク: ${doc.keywordLinks.length} 件`);

    if (doc.keywordLinks.length > 0) {
      console.log('    キーワードリンク一覧:');
      doc.keywordLinks.forEach((link, i) => {
        console.log(
          `    ${i + 1}. [[${link.keyword}${link.docType ? `|${link.docType}` : ''}]]`
        );
      });
    }
  });

  // 5. キーワード解決のシミュレーション
  console.log('\n5. キーワード解決のシミュレーション:');
  const testKeywords = [
    'キーワードリンクテスト',
    '相互参照テスト',
    '存在しないページ',
  ];

  for (const keyword of testKeywords) {
    console.log(`\nキーワード "${keyword}" の解決結果:`);
    const result = simulateKeywordResolution(documents, keyword);
    console.log(JSON.stringify(result, null, 2));
  }

  // 6. ドキュメントタイプ指定のシミュレーション
  console.log('\n6. ドキュメントタイプ指定のシミュレーション:');
  const result = simulateKeywordResolution(
    documents,
    'キーワードリンクテスト',
    'test'
  );
  console.log(JSON.stringify(result, null, 2));

  // 7. 結果をファイルに保存
  const debugOutput = {
    documentCount: documents.length,
    testDocuments: testDocs.map((d) => ({
      title: d.title,
      path: d.path,
      docType: d.docType,
      keywords: d.keywords,
      keywordLinks: d.keywordLinks,
    })),
    keywordResolution: {
      basic: simulateKeywordResolution(documents, 'キーワードリンクテスト'),
      withDocType: simulateKeywordResolution(
        documents,
        'キーワードリンクテスト',
        'test'
      ),
      nonExistent: simulateKeywordResolution(documents, '存在しないページ'),
    },
  };

  fs.writeFileSync(
    path.join(__dirname, 'debug-mdx-output.json'),
    JSON.stringify(debugOutput, null, 2)
  );
  console.log('\nデバッグ情報を debug-mdx-output.json に保存しました');
}

// スクリプトの実行
main().catch((err) => {
  console.error('エラーが発生しました:', err);
});
