/**
 * ドキュメントタイプとカテゴリの型定義
 */

/**
 * ドキュメントタイプ
 * ドキュメントの種類を表す
 */
export interface DocType {
  /** 識別子 */
  id: string;
  /** タイトル */
  title: string;
  /** 説明 */
  description?: string;
  /** アイコン */
  icon?: string;
  /** サムネイル */
  thumbnail?: string; // Gyazoなどの画像URLまたは/thumbnails/から始まる相対パス
  /** ドキュメントの状態 */
  status?: 'published' | 'draft' | 'deprecated';
  /** ドロップダウンでの選択を無効化 */
  disabled?: boolean;
  /** "開発中" "非推奨"などのバッジテキスト */
  badge?: string;
  /** バッジの色 */
  badgeColor?: 'default' | 'warning' | 'error' | 'success';
  /** 完全に非表示にする */
  hidden?: boolean;
  /** ドキュメントのバージョン */
  version?: string;
  /** 最終更新日 */
  lastUpdated?: string;
  /** メンテナー情報 */
  maintainers?: string[];
  /** ドキュメントが属するカテゴリのID */
  category?: string;
  /** エンティティの種類（ドキュメントタイプ） */
  type?: 'docType';
  /** タグ情報 */
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
  /** 識別子 */
  id: string;
  /** タイトル */
  title: string;
  /** 説明 */
  description?: string;
  /** アイコン */
  icon?: string;
  /** 表示順序 */
  order?: number;
  /** ドロップダウンでの選択を無効化 */
  disabled?: boolean;
  /** 完全に非表示にする */
  hidden?: boolean;
  /** エンティティの種類（カテゴリ） */
  type?: 'category';
}
