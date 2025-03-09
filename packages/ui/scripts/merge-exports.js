const fs = require('node:fs');
const path = require('node:path');

// パッケージのルートディレクトリを取得
const packageRoot = path.resolve(__dirname, '..');

// package.jsonを読み込む
const packageJsonPath = path.join(packageRoot, 'package.json');
const packageJson = require(packageJsonPath);

// exportsディレクトリ内のすべてのJSONファイルを読み込む
const exportsDir = path.join(packageRoot, 'config/exports');
const exportFiles = fs
  .readdirSync(exportsDir)
  .filter((file) => file.endsWith('.json'));

// すべてのexportsをマージ
const mergedExports = {};
for (const file of exportFiles) {
  const exports = require(path.join(exportsDir, file));
  Object.assign(mergedExports, exports.exports);
}

// package.jsonのexportsを更新
packageJson.exports = mergedExports;

// 更新したpackage.jsonを書き込む
fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

console.log('Exports successfully merged!');
