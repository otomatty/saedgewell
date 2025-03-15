import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CacheManager, DEFAULT_CACHE_CONFIG } from '../cache';
import type { CacheConfig } from '../types';

describe('CacheManager', () => {
  let cacheManager: CacheManager<string>;
  let config: CacheConfig;

  beforeEach(() => {
    config = {
      ...DEFAULT_CACHE_CONFIG,
      ttl: 1000, // 1秒
      maxSize: 10,
    };
    cacheManager = new CacheManager<string>(config);
  });

  afterEach(() => {
    cacheManager.clear();
  });

  describe('基本的な操作', () => {
    it('値を設定して取得できること', async () => {
      await cacheManager.set('key1', 'value1');
      const result = await cacheManager.get('key1');
      expect(result).toBe('value1');
    });

    it('存在しないキーはnullを返すこと', async () => {
      const result = await cacheManager.get('nonexistent');
      expect(result).toBeNull();
    });

    it('TTL経過後はキャッシュが無効になること', async () => {
      await cacheManager.set('key1', 'value1');
      await new Promise((resolve) => setTimeout(resolve, 1100)); // TTL + 100ms
      const result = await cacheManager.get('key1');
      expect(result).toBeNull();
    });
  });

  describe('メトリクス', () => {
    it('ヒット数とミス数が正しく計測されること', async () => {
      await cacheManager.set('key1', 'value1');
      await cacheManager.get('key1'); // hit
      await cacheManager.get('key2'); // miss

      const metrics = cacheManager.getMetrics();
      expect(metrics.hits).toBe(1);
      expect(metrics.misses).toBe(1);
      expect(metrics.totalRequests).toBe(2);
    });

    it('キャッシュヒット率が正しく計算されること', async () => {
      await cacheManager.set('key1', 'value1');
      await cacheManager.get('key1'); // hit
      await cacheManager.get('key2'); // miss

      const metrics = cacheManager.getMetrics();
      expect(metrics.cacheHitRate).toBe(0.5); // 1 hit / 2 requests
    });
  });

  describe('エラーハンドリング', () => {
    it('エラー発生時もnullを返すこと', async () => {
      // Map.prototype.getをモック
      const mockGet = vi.spyOn(Map.prototype, 'get').mockImplementation(() => {
        throw new Error('Simulated error');
      });

      const result = await cacheManager.get('key1');
      expect(result).toBeNull();

      // モックを元に戻す
      mockGet.mockRestore();
    });
  });

  describe('パフォーマンス', () => {
    it('大量のデータを処理できること', async () => {
      const items = Array.from({ length: 100 }, (_, i) => ({
        key: `key${i}`,
        value: `value${i}`,
      }));

      // データの設定
      const startSet = performance.now();
      await Promise.all(
        items.map((item) => cacheManager.set(item.key, item.value))
      );
      const setTime = performance.now() - startSet;

      // データの取得
      const startGet = performance.now();
      const results = await Promise.all(
        items.map((item) => cacheManager.get(item.key))
      );
      const getTime = performance.now() - startGet;

      // 結果の検証
      expect(results.filter(Boolean).length).toBe(items.length);
      expect(setTime).toBeLessThan(1000); // 1秒以内
      expect(getTime).toBeLessThan(1000); // 1秒以内
    });

    it('メモリ使用量が制限を超えないこと', async () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // maxSizeを超えるデータを設定
      const items = Array.from({ length: config.maxSize + 10 }, (_, i) => ({
        key: `key${i}`,
        value: `value${i}`,
      }));

      await Promise.all(
        items.map((item) => cacheManager.set(item.key, item.value))
      );

      const metrics = cacheManager.getMetrics();
      expect(metrics.memoryUsage - initialMemory).toBeLessThan(
        1024 * 1024 * 10
      ); // 10MB以内
    });

    it('TTLが適切に機能すること', async () => {
      const shortTTLConfig = {
        ...config,
        ttl: 100, // 100ms
      };
      const shortTTLCache = new CacheManager<string>(shortTTLConfig);

      await shortTTLCache.set('key1', 'value1');

      // TTL内のアクセス
      const immediateResult = await shortTTLCache.get('key1');
      expect(immediateResult).toBe('value1');

      // TTL経過後のアクセス
      await new Promise((resolve) => setTimeout(resolve, 150));
      const delayedResult = await shortTTLCache.get('key1');
      expect(delayedResult).toBeNull();
    });

    it('同時アクセスを適切に処理できること', async () => {
      const concurrentAccess = async () => {
        const promises = Array.from({ length: 10 }, async (_, i) => {
          await cacheManager.set(`key${i}`, `value${i}`);
          return cacheManager.get(`key${i}`);
        });

        const results = await Promise.all(promises);
        return results.filter(Boolean).length;
      };

      const successCount = await concurrentAccess();
      expect(successCount).toBe(10);
    });
  });
});
