/**
 * MDXキーワードリンク機能に関連する型定義
 */

/**
 * キーワード識別子
 * ドキュメントのタイトル、種類、パスなどの情報を持つ
 */
export interface KeywordIdentifier {
  title: string; // ドキュメントのタイトル
  docType: string; // ドキュメントの種類（例: 'docs', 'api'）
  path: string; // ドキュメントへの相対パス
  lastModified?: number; // 最終更新時刻
}

/**
 * キーワードインデックス
 * キーワードをキーとして、関連するドキュメント情報を格納
 */
export interface KeywordIndex {
  [keyword: string]: {
    documents: KeywordIdentifier[]; // キーワードに関連するドキュメント
    isAmbiguous: boolean; // 重複があるかどうか
    lastUpdated: number; // 最終更新時刻
  };
}

/**
 * 重複タイトルエラー
 * 同じタイトルを持つドキュメントが複数存在する場合の情報
 */
export interface DuplicateTitleError {
  title: string;
  occurrences: KeywordIdentifier[];
  severity: 'warning' | 'error'; // エラーの重要度
  suggestion?: string; // 解決のための提案
}

/**
 * KeywordLinkコンポーネントのプロパティ
 */
export interface KeywordLinkProps {
  keyword: string; // リンクするキーワード
  docType?: string; // ドキュメントタイプ（任意）
  isValid?: boolean; // リンクが有効かどうか（任意）
  className?: string; // スタイリング用のクラス名（任意）
  initialData?: ResolvedKeyword | string; // 解決済みキーワードデータ（任意）、文字列の場合はJSONとしてパース
}

/**
 * キャッシュ設定
 */
export interface CacheConfig {
  enableFileWatcher: boolean; // ファイル変更の監視
  updateInterval: number; // 更新間隔（ミリ秒）
  ttl: number; // キャッシュの有効期限（ミリ秒）
  maxSize: number; // キャッシュの最大サイズ
  persistToDisk: boolean; // ディスクへの永続化
  version: string; // キャッシュバージョン
  cacheDir?: string; // キャッシュディレクトリのパスを追加
}

/**
 * キャッシュエントリ
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  version: string;
}

/**
 * パフォーマンスメトリクス
 */
export interface PerformanceMetrics {
  indexBuildTime: number; // インデックス構築時間
  cacheHitRate: number; // キャッシュヒット率
  resolutionTime: number; // キーワード解決時間
  memoryUsage: number; // メモリ使用量
  hits: number;
  misses: number;
  totalRequests: number;
}

/**
 * エラー種別
 */
export enum KeywordErrorType {
  RESOLUTION_ERROR = 'resolution_error', // キーワード解決エラー
  DUPLICATE_ERROR = 'duplicate_error', // 重複エラー
  CACHE_ERROR = 'cache_error', // キャッシュエラー
  PARSE_ERROR = 'parse_error', // パースエラー
}

/**
 * エラー情報
 */
export interface KeywordError {
  type: KeywordErrorType;
  message: string;
  details?: unknown;
  timestamp: number;
}

/**
 * ドキュメントマッピングの設定
 */
export interface DocumentMappingConfig {
  basePath: string;
  extensions: string[];
  ignorePaths: string[];
  indexUpdateInterval: number;
}

/**
 * ドキュメントメタデータ
 */
export interface DocumentMetadata {
  title: string;
  description?: string;
  path: string;
  slug: string;
  docType: string;
  keywords: string[];
  lastModified: string;
}

/**
 * ドキュメントマッピング結果
 */
export interface DocumentMapping {
  path: string;
  slug: string;
  docType: string;
  metadata: DocumentMetadata;
  keywords: string[];
}

/**
 * キーワード解決結果
 */
export interface ResolvedKeyword {
  keyword: string;
  docType?: string;
  mapping?: DocumentMapping;
  isAmbiguous: boolean;
  alternatives?: DocumentMapping[];
  error?: string;
  relatedKeywords?: string[]; // 関連キーワード
}

/**
 * パスエイリアス
 * エイリアスとそれに対応する実際のパスの対応を定義
 */
export interface PathAlias {
  alias: string; // エイリアス（例: '@docs'）
  path: string; // 実際のパス
}

/**
 * ドキュメントのフロントマター
 */
export interface DocFrontmatter {
  title?: string;
  description?: string;
  order?: number;
}

/**
 * ドキュメントノード
 * ドキュメントツリーの各ノードを表す
 */
export interface DocNode {
  title: string;
  description?: string;
  slug: string;
  order?: number;
  children: DocNode[];
}

/**
 * ドキュメントタイプ
 * ドキュメントの種類を表す
 */
export interface DocType {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  thumbnail?: string; // Gyazoなどの画像URLを格納
  status?: 'published' | 'draft' | 'deprecated'; // ドキュメントの状態
  disabled?: boolean; // ドロップダウンでの選択を無効化
  badge?: string; // "開発中" "非推奨"などのバッジテキスト
  badgeColor?: 'default' | 'warning' | 'error' | 'success'; // バッジの色
  hidden?: boolean; // 完全に非表示にする
  version?: string; // ドキュメントのバージョン
  lastUpdated?: string; // 最終更新日
  maintainers?: string[]; // メンテナー情報
  category?: string; // ドキュメントが属するカテゴリのID
  type?: 'docType'; // エンティティの種類（ドキュメントタイプ）
  tags?: {
    type?: string[];
    tech?: string[];
    [key: string]: string[] | undefined;
  };
}

/**
 * ドキュメントカテゴリ
 * ドキュメントタイプをグループ化するカテゴリを表す
 */
export interface DocCategory {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  type?: 'category'; // エンティティの種類（カテゴリ）
}
