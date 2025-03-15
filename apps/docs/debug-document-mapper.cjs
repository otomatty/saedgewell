// ドキュメントマッパーのデバッグスクリプト
const { documentMapper } = require('./lib/mdx/document-mapper.js');
const fs = require('node:fs');
const path = require('node:path');

async function debugDocumentMapper() {
  console.log('=== ドキュメントマッパーデバッグ ===');

  // 1. インデックスの更新
  console.log('\n1. インデックスの更新を実行...');
  try {
    await documentMapper.updateIndex();
    console.log('インデックスの更新が完了しました');
  } catch (error) {
    console.error('インデックスの更新中にエラーが発生しました:', error);
    return;
  }

  // 2. マッピング情報の取得
  console.log('\n2. 収集されたドキュメント一覧:');
  // DocumentMapperのプライベートプロパティにはアクセスできないため、
  // 代わりにキーワード解決を使用してドキュメントを収集
  const testKeywords = [
    'キーワードリンクテスト',
    '相互参照テスト',
    'インデックス',
  ];

  const documents = [];
  for (const keyword of testKeywords) {
    try {
      console.log(`キーワード "${keyword}" の解決を試みます...`);
      const result = await documentMapper.resolveKeyword(keyword);
      console.log(`解決結果: ${result.mapping ? '成功' : '失敗'}`);

      if (result.mapping) {
        documents.push(result.mapping);
      }
      if (result.alternatives) {
        documents.push(...result.alternatives);
      }
    } catch (error) {
      console.error(
        `キーワード "${keyword}" の解決中にエラーが発生しました:`,
        error
      );
    }
  }

  // 重複を除去
  const uniqueDocs = Array.from(
    new Map(documents.map((doc) => [doc.path, doc])).values()
  );

  console.log(`合計 ${uniqueDocs.length} 件のドキュメントが見つかりました`);

  // 3. ドキュメントの詳細表示
  console.log('\n3. ドキュメントの詳細:');
  uniqueDocs.forEach((doc, index) => {
    console.log(`\n[${index + 1}] ${doc.metadata.title}`);
    console.log(`  - パス: ${doc.path}`);
    console.log(`  - タイプ: ${doc.docType}`);
    console.log(`  - キーワード: ${doc.keywords?.join(', ') || 'なし'}`);
  });

  // 4. テスト用ドキュメントの検索
  console.log('\n4. テスト用ドキュメントの検索:');
  const testDocs = uniqueDocs.filter((m) => m.path.startsWith('test/'));
  console.log(
    `テストディレクトリに ${testDocs.length} 件のドキュメントが見つかりました`
  );
  testDocs.forEach((doc, index) => {
    console.log(`\n[${index + 1}] ${doc.metadata.title}`);
    console.log(`  - パス: ${doc.path}`);
  });

  // 5. キーワード解決のテスト
  console.log('\n5. キーワード解決のテスト:');
  for (const keyword of testKeywords) {
    console.log(`\nキーワード "${keyword}" の解決結果:`);
    try {
      const result = await documentMapper.resolveKeyword(keyword);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(
        `キーワード "${keyword}" の解決中にエラーが発生しました:`,
        error
      );
    }
  }

  // 6. ドキュメントタイプ指定のテスト
  console.log('\n6. ドキュメントタイプ指定のテスト:');
  try {
    const result = await documentMapper.resolveKeyword(
      'キーワードリンクテスト',
      'test'
    );
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(
      'ドキュメントタイプ指定のテスト中にエラーが発生しました:',
      error
    );
  }

  // 7. 結果をファイルに保存
  try {
    const debugOutput = {
      documentCount: uniqueDocs.length,
      testDocuments: testDocs.map((d) => ({
        title: d.metadata.title,
        path: d.path,
        docType: d.docType,
        keywords: d.keywords,
      })),
      keywordResolution: {
        basic: await documentMapper.resolveKeyword('キーワードリンクテスト'),
        withDocType: await documentMapper.resolveKeyword(
          'キーワードリンクテスト',
          'test'
        ),
        nonExistent: await documentMapper.resolveKeyword('存在しないページ'),
      },
    };

    fs.writeFileSync(
      path.join(__dirname, 'debug-output.json'),
      JSON.stringify(debugOutput, null, 2)
    );
    console.log('\nデバッグ情報を debug-output.json に保存しました');
  } catch (error) {
    console.error('デバッグ情報の保存中にエラーが発生しました:', error);
  }
}

// スクリプトの実行
debugDocumentMapper().catch((err) => {
  console.error('エラーが発生しました:', err);
});
