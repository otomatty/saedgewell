'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GitCommit,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
} from 'lucide-react';
import { cn } from '@kit/ui/utils';

interface CommitData {
  message: string;
  sha: string;
  date: string;
  authorName: string;
  authorLogin?: string;
  authorAvatar?: string;
  commitUrl: string;
  repoName?: string;
  repoOwner?: string;
  repoUrl?: string;
  additions?: number;
  deletions?: number;
}

interface GitHubCommitsProps {
  commits: CommitData[];
  className?: string;
  maxInitialCount?: number;
}

export function GitHubCommits({
  commits,
  className,
  maxInitialCount = 3,
}: GitHubCommitsProps) {
  const [expanded, setExpanded] = useState(false);
  const displayedCommits = expanded
    ? commits
    : commits.slice(0, maxInitialCount);
  const hasMoreCommits = commits.length > maxInitialCount;

  if (commits.length === 0) {
    return null;
  }

  // コミットメッセージの最初の行だけを表示（PRタイトルなど）
  const formatCommitMessage = (message: string) => {
    return message.split('\n')[0];
  };

  // 日時を読みやすいフォーマットに変換
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // コミットの統計情報を計算
  const calculateStats = () => {
    let totalAdditions = 0;
    let totalDeletions = 0;

    for (const commit of commits) {
      if (commit.additions !== undefined) {
        totalAdditions += commit.additions;
      }
      if (commit.deletions !== undefined) {
        totalDeletions += commit.deletions;
      }
    }

    return {
      totalCommits: commits.length,
      totalAdditions,
      totalDeletions,
    };
  };

  const stats = calculateStats();

  return (
    <div className={cn('space-y-2 text-sm', className)}>
      <h4 className="font-semibold flex items-center gap-1 text-muted-foreground">
        <GitCommit className="size-4" />
        コミット履歴
        <span className="ml-2 font-normal text-xs">
          {stats.totalCommits}件
          <span className="text-success ml-1" title="追加行数">
            <Plus className="size-3 inline-block" />
            {stats.totalAdditions}
          </span>
          <span className="text-destructive/80 ml-1" title="削除行数">
            <Minus className="size-3 inline-block" />
            {stats.totalDeletions}
          </span>
        </span>
      </h4>

      <ul className="space-y-2">
        {displayedCommits.map((commit) => (
          <li
            key={commit.sha}
            className="flex items-start gap-3 py-1.5 border-b border-border/30 last:border-0"
          >
            {/* 著者アバター */}
            <div className="flex-shrink-0 mt-1">
              {commit.authorAvatar ? (
                <Image
                  src={commit.authorAvatar}
                  alt={commit.authorName}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="size-6 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    {commit.authorName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* コミット情報 */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col">
                <Link
                  href={commit.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm truncate hover:underline flex items-center gap-1"
                >
                  {formatCommitMessage(commit.message)}
                  <ExternalLink className="size-3 inline-block opacity-50" />
                </Link>
                <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                  <span>{formatDate(commit.date)}</span>
                  {(commit.authorLogin || commit.authorName) &&
                    commit.repoName && (
                      <>
                        <span className="mx-1">・</span>
                        <Link
                          href={commit.repoUrl || ''}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center"
                        >
                          {commit.authorLogin || commit.authorName}/
                          {commit.repoName}
                        </Link>
                      </>
                    )}
                </div>
                {/* 追加・削除行数を表示 */}
                {(commit.additions !== undefined ||
                  commit.deletions !== undefined) && (
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    {commit.additions !== undefined && (
                      <span
                        className="flex items-center gap-0.5 text-success"
                        title="追加された行数"
                      >
                        <Plus className="size-3.5" />
                        {commit.additions}
                      </span>
                    )}
                    {commit.deletions !== undefined && (
                      <span
                        className="flex items-center gap-0.5 text-destructive/80"
                        title="削除された行数"
                      >
                        <Minus className="size-3.5" />
                        {commit.deletions}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* もっと見るボタン */}
      {hasMoreCommits && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="size-3.5" />
              <span>折りたたむ</span>
            </>
          ) : (
            <>
              <ChevronDown className="size-3.5" />
              <span>もっと見る（{commits.length - maxInitialCount}件）</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
