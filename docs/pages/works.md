# 実績紹介トップページ設計書

## 1. 全体構成

実績紹介トップページは、企業向け実績、フリーランス実績、個人開発の3つのカテゴリーを効果的に紹介し、各詳細ページへの導線を提供します。

## 2. セクション構成

### 2.1 ヘッダーセクション
#### コンポーネント
- ページタイトル：「実績紹介」
- リード文
  ```
  Webサービス開発からAI駆動開発まで、
  多様なプロジェクトを通じて培った経験と技術力をご紹介します。
  ```

### 2.2 カテゴリーナビゲーション
#### コンポーネント
- カテゴリータブ
  - 企業向け実績
  - フリーランス実績
  - 個人開発プロジェクト
- カテゴリー説明文
  ```
  各カテゴリーの実績一覧から、詳細な事例をご覧いただけます。
  技術スタックや開発プロセス、成果について詳しく解説しています。
  ```

### 2.3 企業向け実績セクション
#### コンポーネント
- セクションヘッダー
  - タイトル：「企業向け実績」
  - 説明：「企業での開発実績をご紹介します」

- 実績カード一覧
  1. さいとう製菓株式会社 流通管理システム
     - 期間：2023年
     - 概要：流通管理システムの保守運用、UI改善
     - 技術：Next.js, Blueprint.js
     - 成果：ユーザー操作性の向上
     - サムネイル画像

  2. 橋爪商事株式会社 ホームページ改修
     - 期間：2023年
     - 概要：ホームページ改修と独自CMS開発
     - 技術：Next.js, TypeScript, TailwindCSS, Supabase
     - 成果：情報発信力の強化
     - サムネイル画像

### 2.4 フリーランス実績セクション
#### コンポーネント
- セクションヘッダー
  - タイトル：「フリーランス実績」
  - 説明：「フリーランスとしての開発実績をご紹介します」

- 実績カード一覧
  1. 学習塾業務管理システム
     - 期間：2022年
     - 概要：業務効率化システムの開発
     - 技術：React, Firebase
     - 成果：業務時間1日平均20分短縮
     - サムネイル画像

  2. 学習塾ホームページ更新機能
     - 期間：2022年
     - 概要：独自CMSとAPI開発
     - 技術：Hono, Firebase
     - 成果：更新作業の効率化
     - サムネイル画像

### 2.5 個人開発プロジェクトセクション
#### コンポーネント
- セクションヘッダー
  - タイトル：「個人開発プロジェクト」
  - 説明：「技術研鑽のための個人開発プロジェクトをご紹介します」

- プロジェクトカード一覧
  1. AIタスク管理アプリ
     - 状態：開発中
     - 概要：LLMを活用したタスク管理アプリ
     - 技術：Next.js, TypeScript, Supabase
     - 特徴：AI技術の実践的応用
     - サムネイル画像

  2. 社内チャットボット
     - 状態：開発中
     - 概要：業務効率化のためのAIチャットボット
     - 技術：Next.js, TypeScript, OpenAI API
     - 特徴：自然言語処理の活用
     - サムネイル画像

### 2.6 CTAセクション
#### コンポーネント
- お問い合わせ導線
  - メッセージ：「プロジェクトについて詳しく知りたい方はお気軽にお問い合わせください」
  - ボタン：「お問い合わせ」
  - リンク先：`/contact`

## 3. デザイン要件

### 3.1 レイアウト
- グリッドシステム
  - デスクトップ：3カラム
  - タブレット：2カラム
  - モバイル：1カラム

### 3.2 カードデザイン
- 情報階層
  1. サムネイル画像
  2. プロジェクト名
  3. 概要
  4. 技術スタック
  5. 成果・特徴

- インタラクション
  - ホバー時の拡大効果
  - クリックで詳細ページへ遷移

### 3.3 フィルタリング機能
- カテゴリー別表示
- 技術スタックによるフィルタリング
- 年別フィルタリング

## 4. アニメーション仕様

### 4.1 ページ遷移
- フェードイン効果
- スムーズスクロール

### 4.2 カード表示
- スタガード（ずらし）アニメーション
- Intersection Observerによる表示制御

## 5. パフォーマンス最適化

### 5.1 画像最適化
- WebPフォーマット使用
- 適切なサイズ設定
  - サムネイル：400x300px
  - Retinaディスプレイ対応（2x）
- プログレッシブ画像読み込み

### 5.2 コンテンツ最適化
- 遅延読み込み
- ページネーション（12件ごと）
- キャッシュ制御

## 6. TODO項目

### 6.1 プロジェクト画像素材
#### スクリーンショット
- [ ] さいとう製菓株式会社 流通管理システム
  - システムのUI画面（操作性改善前後の比較）
  - ダッシュボード画面
  - 主要機能の画面

- [ ] 橋爪商事株式会社 ホームページ
  - トップページ
  - CMS管理画面
  - コンテンツ編集画面

- [ ] 学習塾業務管理システム
  - 生徒管理画面
  - スケジュール管理画面
  - 成績管理画面

- [ ] 学習塾ホームページ更新機能
  - CMS管理画面
  - API構成図
  - 更新フロー図

- [ ] AIタスク管理アプリ
  - タスク一覧画面
  - AI分析画面
  - レポート画面

- [ ] 社内チャットボット
  - チャット画面
  - 管理画面
  - 分析画面

### 6.2 プロジェクト詳細情報
#### 成果の具体的数値
- [ ] さいとう製菓株式会社
  - UI改善による操作時間の短縮率
  - ユーザー満足度調査結果
  - エラー報告件数の変化

- [ ] 橋爪商事株式会社
  - 更新作業時間の短縮率
  - アクセス数の変化
  - 問い合わせ数の変化

- [ ] 学習塾業務管理システム
  - 具体的な業務効率化の内訳
  - 導入後の教職員の反応
  - コスト削減効果

#### プロジェクト体制
- [ ] 各プロジェクトの情報を追加
  - チーム規模
  - 役割分担
  - 開発期間の詳細なスケジュール
  - 使用した開発手法
  - コミュニケーション方法

### 6.3 技術スタックの詳細
- [ ] 各プロジェクトの技術選定理由
- [ ] アーキテクチャ図
- [ ] インフラ構成図
- [ ] CI/CD構成
- [ ] テスト戦略

### 6.4 開発プロセス
- [ ] 各プロジェクトの開発フロー
  - 要件定義フェーズの詳細
  - 設計フェーズでの工夫
  - 実装フェーズでの取り組み
  - テストフェーズの内容
  - リリース後の運用体制

### 6.5 課題と解決策
- [ ] 各プロジェクトで直面した課題
  - 技術的な課題
  - プロジェクトマネジメント上の課題
  - コミュニケーション上の課題
- [ ] 解決のために実施した施策
- [ ] 得られた教訓

## 7. 更新履歴管理
- [ ] 各プロジェクトの更新日時
- [ ] 変更内容のログ
- [ ] 今後の更新予定 