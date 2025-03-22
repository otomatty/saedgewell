#!/usr/bin/env ts-node

/**
 * このスクリプトは以下の機能を実行します:
 * 1. Journalsカテゴリのディレクトリを検索
 * 2. 各日付ディレクトリにあるindex.jsonファイルを読み込む
 * 3. 指定されたリポジトリまたはユーザーのGitHubコミット情報を取得
 * 4. コミット情報をindex.jsonに追加して保存
 *
 * 使用方法:
 * リポジトリ指定: $ npx ts-node scripts/update-journal-commits.ts --owner <GitHubユーザー名> --repo <リポジトリ名>
 * ユーザー指定: $ npx ts-node scripts/update-journal-commits.ts --user <GitHubユーザー名>
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { promisify } from 'node:util';
import axios from 'axios';
import { fileURLToPath } from 'node:url';

// インターフェース定義
interface IndexData {
  title: string;
  description: string;
  commits?: CommitData[];
  [key: string]: unknown;
}

interface CommitData {
  message: string;
  sha: string;
  date: string;
  authorName: string;
  authorLogin: string | null;
  authorAvatar: string | null;
  commitUrl: string;
  repoName: string;
  repoOwner: string;
  repoUrl: string;
  additions?: number; // 追加行数
  deletions?: number; // 削除行数
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
  files?: Array<{
    filename: string;
    additions: number;
    deletions: number;
    changes: number;
    status: string;
  }>;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubOrg {
  login: string;
}

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// コマンドライン引数のパース
const args = process.argv.slice(2);
let owner = '';
let repo = '';
let username = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--owner' && i + 1 < args.length) {
    owner = args[i + 1] || '';
    i++;
  } else if (args[i] === '--repo' && i + 1 < args.length) {
    repo = args[i + 1] || '';
    i++;
  } else if (args[i] === '--user' && i + 1 < args.length) {
    username = args[i + 1] || '';
    i++;
  }
}

if ((!owner || !repo) && !username) {
  console.error(
    '使用方法: \n' +
      '  リポジトリ指定: npx ts-node scripts/update-journal-commits.ts --owner <GitHubユーザー名> --repo <リポジトリ名>\n' +
      '  ユーザー指定: npx ts-node scripts/update-journal-commits.ts --user <GitHubユーザー名>'
  );
  process.exit(1);
}

// ユーザーの所属リポジトリを取得する関数
async function getUserRepositories(username: string): Promise<GitHubRepo[]> {
  try {
    // GitHubトークンの取得（環境変数から）
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};

    // APIリクエスト - ユーザーのリポジトリを取得
    const response = await axios.get<GitHubRepo[]>(
      `https://api.github.com/users/${username}/repos`,
      {
        headers,
        params: {
          per_page: 100,
          sort: 'updated',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      `ユーザー${username}のリポジトリ取得中にエラーが発生しました:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

// ユーザーの所属組織を取得する関数
async function getUserOrganizations(username: string): Promise<GitHubOrg[]> {
  try {
    // GitHubトークンの取得（環境変数から）
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};

    // APIリクエスト - ユーザーの所属組織を取得
    const response = await axios.get<GitHubOrg[]>(
      `https://api.github.com/users/${username}/orgs`,
      {
        headers,
        params: {
          per_page: 100,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      `ユーザー${username}の所属組織取得中にエラーが発生しました:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

// 組織のリポジトリを取得する関数
async function getOrganizationRepositories(
  orgName: string
): Promise<GitHubRepo[]> {
  try {
    // GitHubトークンの取得（環境変数から）
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};

    // APIリクエスト - 組織のリポジトリを取得
    const response = await axios.get<GitHubRepo[]>(
      `https://api.github.com/orgs/${orgName}/repos`,
      {
        headers,
        params: {
          per_page: 100,
          sort: 'updated',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      `組織${orgName}のリポジトリ取得中にエラーが発生しました:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

// 特定のリポジトリの特定日のコミットを取得する関数
async function getCommitsForDate(
  date: string,
  owner: string,
  repo: string
): Promise<CommitData[]> {
  try {
    // 日付範囲の設定（UTC）
    const startDate = new Date(`${date}T00:00:00Z`);
    const endDate = new Date(`${date}T23:59:59Z`);

    // GitHubトークンの取得（環境変数から）
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};

    // APIリクエスト
    const response = await axios.get<GitHubCommit[]>(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        headers,
        params: {
          since: startDate.toISOString(),
          until: endDate.toISOString(),
          per_page: 100,
        },
      }
    );

    // コミット詳細を取得するためのリクエスト
    const commitsWithDetails = await Promise.all(
      response.data.map(async (commit) => {
        try {
          // 各コミットの詳細情報を取得
          const detailResponse = await axios.get<GitHubCommit>(
            `https://api.github.com/repos/${owner}/${repo}/commits/${commit.sha}`,
            { headers }
          );
          return detailResponse.data;
        } catch (detailError) {
          console.error(
            `コミット詳細取得エラー - ${commit.sha}:`,
            detailError instanceof Error ? detailError.message : detailError
          );
          return commit; // 詳細が取得できない場合は元のコミット情報を返す
        }
      })
    );

    // 必要な情報のみを抽出
    return commitsWithDetails.map((commit) => ({
      message: commit.commit.message,
      sha: commit.sha,
      date: commit.commit.author.date,
      authorName: commit.commit.author.name,
      authorLogin: commit.author ? commit.author.login : null,
      authorAvatar: commit.author ? commit.author.avatar_url : null,
      commitUrl: commit.html_url,
      repoName: repo,
      repoOwner: owner,
      repoUrl: `https://github.com/${owner}/${repo}`,
      additions: commit.stats?.additions,
      deletions: commit.stats?.deletions,
    }));
  } catch (error) {
    console.error(
      `${date}の${owner}/${repo}のコミット取得中にエラーが発生しました:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

// ユーザーのすべてのリポジトリから特定日のコミットを取得する関数
async function getAllUserCommitsForDate(
  date: string,
  username: string
): Promise<CommitData[]> {
  try {
    console.log(`${username}のリポジトリ情報を取得中...`);

    // ユーザーの個人リポジトリを取得
    const userRepos = await getUserRepositories(username);
    console.log(`${userRepos.length}個の個人リポジトリを発見しました。`);

    // ユーザーの所属組織を取得
    const orgs = await getUserOrganizations(username);
    console.log(`${orgs.length}個の所属組織を発見しました。`);

    // 各組織のリポジトリを取得
    let orgRepos: GitHubRepo[] = [];
    for (const org of orgs) {
      const repos = await getOrganizationRepositories(org.login);
      console.log(
        `組織${org.login}から${repos.length}個のリポジトリを発見しました。`
      );
      orgRepos = [...orgRepos, ...repos];
    }

    // すべてのリポジトリを結合（重複を排除）
    const allRepos = [...userRepos, ...orgRepos];
    const uniqueRepos: GitHubRepo[] = [];
    const repoMap = new Map<string, boolean>();

    for (const repo of allRepos) {
      const key = `${repo.owner.login}/${repo.name}`;
      if (!repoMap.has(key)) {
        repoMap.set(key, true);
        uniqueRepos.push(repo);
      }
    }

    console.log(
      `合計${uniqueRepos.length}個のユニークなリポジトリを発見しました。`
    );

    // 各リポジトリから指定日のコミットを取得
    let allCommits: CommitData[] = [];
    let processedCount = 0;

    for (const repo of uniqueRepos) {
      processedCount++;
      console.log(
        `[${processedCount}/${uniqueRepos.length}] ${repo.owner.login}/${repo.name}のコミットを取得中...`
      );

      const commits = await getCommitsForDate(
        date,
        repo.owner.login,
        repo.name
      );

      // ユーザーが作成したコミットのみをフィルタリング
      const userCommits = commits.filter(
        (commit) =>
          (commit.authorLogin &&
            commit.authorLogin.toLowerCase() === username.toLowerCase()) ||
          commit.authorName.toLowerCase().includes(username.toLowerCase())
      );

      if (userCommits.length > 0) {
        console.log(`  ${userCommits.length}件のコミットを発見しました`);
        allCommits = [...allCommits, ...userCommits];
      }
    }

    // コミットを日時でソート（新しい順）
    allCommits.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return allCommits;
  } catch (error) {
    console.error(
      `${username}のコミット取得中にエラーが発生しました:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

// コンテンツディレクトリを再帰的に探索する関数
async function findJournalDirs(
  dir: string,
  journalsPath: string
): Promise<string[]> {
  const entries = await readdir(dir);
  const dateDirs: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry);
    const entryStat = await stat(entryPath);

    if (entryStat.isDirectory()) {
      // 日付形式のディレクトリかチェック (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(entry)) {
        dateDirs.push(entryPath);
      } else {
        // 再帰的に検索
        const subDirs = await findJournalDirs(entryPath, journalsPath);
        dateDirs.push(...subDirs);
      }
    }
  }

  return dateDirs;
}

// メイン処理
async function main(): Promise<void> {
  try {
    console.log('環境情報:');
    console.log(
      `- GitHub Actions: ${process.env.GITHUB_ACTIONS ? 'はい' : 'いいえ'}`
    );
    console.log(`- ユーザー名: ${username || '指定なし'}`);
    console.log(`- 特定リポジトリ: ${owner ? `${owner}/${repo}` : '指定なし'}`);
    console.log(
      `- GITHUB_TOKEN: ${process.env.GITHUB_TOKEN ? '設定済み' : '未設定'}`
    );
    console.log(
      `- リポジトリオーナー: ${process.env.GITHUB_REPOSITORY_OWNER || '不明'}`
    );
    console.log(`- リポジトリ: ${process.env.GITHUB_REPOSITORY || '不明'}`);

    // Journalsカテゴリのパス
    // プロジェクトルートを取得
    const projectRoot = path.resolve(
      process.cwd(),
      process.env.GITHUB_ACTIONS ? '' : '..',
      process.env.GITHUB_ACTIONS ? '' : '..',
      process.env.GITHUB_ACTIONS ? '' : '..'
    );
    const journalsPath = path.join(projectRoot, '.docs', 'journals');

    // パス確認のログ
    console.log(`検索パス: ${journalsPath}`);
    console.log(`カレントディレクトリ: ${process.cwd()}`);
    console.log(`プロジェクトルート: ${projectRoot}`);

    // 日付ディレクトリを探索
    console.log('日付ディレクトリを探索中...');
    const dateDirs = await findJournalDirs(journalsPath, journalsPath);
    console.log(`${dateDirs.length}個の日付ディレクトリを発見しました。`);

    // 各日付ディレクトリを処理
    for (const dateDir of dateDirs) {
      const dirName = path.basename(dateDir);
      const indexPath = path.join(dateDir, 'index.json');

      // 日付形式のディレクトリでない場合はスキップ
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dirName)) {
        continue;
      }

      try {
        // ファイルの存在確認
        if (!fs.existsSync(indexPath)) {
          console.log(
            `${dirName}: index.jsonが見つかりません。新規作成します。`
          );
          await writeFile(
            indexPath,
            JSON.stringify(
              {
                title: dirName,
                description: `${dirName}の活動記録`,
              } as IndexData,
              null,
              2
            )
          );
        }

        // index.jsonを読み込み
        const indexContent = await readFile(indexPath, 'utf8');
        const indexData = JSON.parse(indexContent) as IndexData;

        // コミット情報を取得
        console.log(`${dirName}: GitHubコミット情報を取得中...`);

        let commits: CommitData[] = [];

        if (username) {
          // ユーザーの全リポジトリからコミットを取得
          commits = await getAllUserCommitsForDate(dirName, username);
          console.log(
            `${dirName}: ${username}のコミットを${commits.length}件発見しました。`
          );
        } else {
          // 特定リポジトリからコミットを取得
          commits = await getCommitsForDate(dirName, owner, repo);
          console.log(
            `${dirName}: ${owner}/${repo}のコミットを${commits.length}件発見しました。`
          );
        }

        if (commits.length > 0) {
          // index.jsonにコミット情報を追加
          indexData.commits = commits;

          // 更新されたデータを書き込み
          await writeFile(indexPath, JSON.stringify(indexData, null, 2));
          console.log(`${dirName}: index.jsonを更新しました。`);
        } else {
          console.log(`${dirName}: コミットが見つかりませんでした。`);
        }
      } catch (error) {
        console.error(
          `${dirName}: 処理中にエラーが発生しました:`,
          error instanceof Error ? error.message : error
        );
      }
    }

    console.log('処理が完了しました。');
  } catch (error) {
    console.error(
      'エラーが発生しました:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

main();
