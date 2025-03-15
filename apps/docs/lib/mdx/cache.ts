import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { CacheConfig, CacheEntry, PerformanceMetrics } from './types';
import { CacheError, errorReporter } from './errors';

/**
 * MDXキーワードリンク機能のキャッシュ設定
 */

/**
 * 開発環境の設定
 * - ファイル変更を監視
 * - 5分ごとに更新
 * - 10分でキャッシュ無効化
 */
export const devConfig: CacheConfig = {
  enableFileWatcher: true, // ファイル変更を監視
  updateInterval: 5 * 60_000, // 5分ごとに更新
  ttl: 10 * 60_000, // 10分でキャッシュ無効化
  maxSize: 1000,
  persistToDisk: true,
  version: '1.0.0',
};

/**
 * 本番環境の設定
 * - 監視無効
 * - 更新なし
 * - キャッシュ永続化
 */
export const prodConfig: CacheConfig = {
  enableFileWatcher: false, // 監視無効
  updateInterval: 0, // 更新なし
  ttl: Number.POSITIVE_INFINITY, // キャッシュ永続化
  maxSize: 1000,
  persistToDisk: true,
  version: '1.0.0',
};

/**
 * LRUキャッシュの実装
 */
class LRUCache<T> {
  private cache: Map<string, CacheEntry<T>>;
  private maxSize: number;
  private ttl: number;
  private metrics: PerformanceMetrics;

  constructor(config: CacheConfig) {
    this.cache = new Map();
    this.maxSize = config.maxSize;
    this.ttl = config.ttl;
    this.metrics = {
      indexBuildTime: 0,
      cacheHitRate: 0,
      resolutionTime: 0,
      memoryUsage: 0,
      hits: 0,
      misses: 0,
      totalRequests: 0,
    };
  }

  async get(key: string): Promise<T | null> {
    try {
      const start = performance.now();
      const entry = this.cache.get(key);

      if (!entry) {
        this.updateMetrics('miss');
        return null;
      }

      if (this.isExpired(entry)) {
        this.cache.delete(key);
        this.updateMetrics('miss');
        return null;
      }

      // エントリを最新として扱うために削除して再追加
      this.cache.delete(key);
      this.cache.set(key, entry);

      this.updateMetrics('hit');
      this.metrics.resolutionTime = performance.now() - start;
      return entry.data;
    } catch (error) {
      errorReporter.report(
        error instanceof Error ? error : new Error('Unknown error in cache get')
      );
      return null;
    }
  }

  set(key: string, value: T, config: CacheConfig): void {
    // キャッシュが最大サイズに達している場合、最も古いエントリを削除
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      version: config.version,
    });

    this.updateMemoryUsage();
  }

  private isExpired(entry: CacheEntry<T>): boolean {
    const now = Date.now();
    return now - entry.timestamp > this.ttl;
  }

  private updateMetrics(type: 'hit' | 'miss'): void {
    const total = this.metrics.cacheHitRate * this.cache.size;
    const hits = type === 'hit' ? total + 1 : total;
    this.metrics.cacheHitRate = hits / (this.cache.size + 1);
  }

  private updateMemoryUsage(): void {
    if (typeof process !== 'undefined') {
      this.metrics.memoryUsage = process.memoryUsage().heapUsed;
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  clear(): void {
    this.cache.clear();
    this.updateMemoryUsage();
  }
}

/**
 * ファイルシステムキャッシュの実装
 */
export class FileSystemCache<T> {
  private readonly cacheDir: string;
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
    this.cacheDir = join(process.cwd(), '.cache', 'mdx-keywords');
  }

  /**
   * キャッシュディレクトリを初期化する
   */
  private async ensureCacheDirectory(): Promise<void> {
    try {
      await mkdir(this.cacheDir, { recursive: true });
    } catch (error) {
      console.warn('Failed to create cache directory:', error);
    }
  }

  /**
   * キャッシュを保存する
   */
  async save(key: string, value: T): Promise<void> {
    if (!this.config.persistToDisk) return;

    const cacheEntry: CacheEntry<T> = {
      data: value,
      timestamp: Date.now(),
      version: this.config.version,
    };

    try {
      await this.ensureCacheDirectory();
      const filePath = join(this.cacheDir, `${key}.json`);
      await writeFile(filePath, JSON.stringify(cacheEntry), 'utf-8');
    } catch (error) {
      console.warn('Failed to save cache to disk:', error);
    }
  }

  async load(key: string): Promise<T | null> {
    if (!this.config.persistToDisk) return null;

    try {
      const filePath = join(this.cacheDir, `${key}.json`);
      const content = await readFile(filePath, 'utf-8');
      const entry: CacheEntry<T> = JSON.parse(content);

      if (this.isExpired(entry) || entry.version !== this.config.version) {
        return null;
      }

      return entry.data;
    } catch (error) {
      return null;
    }
  }

  private isExpired(entry: CacheEntry<T>): boolean {
    const now = Date.now();
    return now - entry.timestamp > this.config.ttl;
  }
}

/**
 * キャッシュマネージャー
 * メモリキャッシュとファイルシステムキャッシュを統合
 */
export class CacheManager<T> {
  private cache: Map<string, CacheEntry<T>>;
  private fileSystemCache: FileSystemCache<T>;
  private config: CacheConfig;
  private metrics: PerformanceMetrics;

  constructor(config: CacheConfig) {
    this.config = {
      ...config,
      cacheDir: join(process.cwd(), '.cache', 'mdx-keywords'),
    };
    this.cache = new Map();
    this.fileSystemCache = new FileSystemCache<T>(this.config);
    this.metrics = {
      hits: 0,
      misses: 0,
      totalRequests: 0,
      indexBuildTime: 0,
      cacheHitRate: 0,
      resolutionTime: 0,
      memoryUsage: 0,
    };
  }

  async get(key: string): Promise<T | null> {
    try {
      const start = performance.now();
      this.metrics.totalRequests++;

      const memoryResult = await this.cache.get(key);
      if (memoryResult) {
        if (Date.now() - memoryResult.timestamp > this.config.ttl) {
          this.cache.delete(key);
          this.metrics.misses++;
        } else {
          this.metrics.hits++;
          this.metrics.cacheHitRate =
            this.metrics.hits / this.metrics.totalRequests;
          return memoryResult.data;
        }
      }

      const fileResult = await this.fileSystemCache.load(key);
      if (fileResult) {
        await this.set(key, fileResult);
        this.metrics.hits++;
        this.metrics.cacheHitRate =
          this.metrics.hits / this.metrics.totalRequests;
        return fileResult;
      }

      this.metrics.misses++;
      this.metrics.cacheHitRate =
        this.metrics.hits / this.metrics.totalRequests;
      return null;
    } catch (error) {
      errorReporter.report(
        error instanceof Error
          ? error
          : new Error('Unknown error in CacheManager.get')
      );
      return null;
    }
  }

  async set(key: string, value: T): Promise<void> {
    const start = performance.now();

    try {
      this.cache.set(key, {
        data: value,
        timestamp: Date.now(),
        version: this.config.version,
      });

      await this.fileSystemCache.save(key, value);
      this.metrics.indexBuildTime = performance.now() - start;

      if (typeof process !== 'undefined') {
        this.metrics.memoryUsage = process.memoryUsage().heapUsed;
      }
    } catch (error) {
      console.error('Cache set operation failed:', error);
      errorReporter.report(
        new CacheError('キャッシュの保存に失敗しました', { key, error })
      );
    }
  }

  getMetrics(): PerformanceMetrics {
    return this.metrics;
  }

  clear(): void {
    this.cache.clear();
  }
}

// デフォルトのキャッシュ設定
export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  enableFileWatcher: false,
  updateInterval: 0,
  ttl: 5 * 60 * 1000, // 5分
  maxSize: 1000,
  persistToDisk: true,
  version: '1.0.0',
};
