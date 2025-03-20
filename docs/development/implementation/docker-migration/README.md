# モノレポアプリケーションのDocker移行マイルストーン

## 概要

このドキュメントは、Next.js 15、Bun、Supabase、Turboを使用したモノレポアプリケーションをDocker環境に移行するためのマイルストーン計画です。リポジトリ全体を段階的にDockerコンテナ化し、サブドメイン間での認証共有を実装した一貫した開発環境を実現することを目的としています。

## 重要な注意事項

⚠️ **Supabase作業における重要な前提条件**: 
- Docker環境でSupabaseを操作する前に、**必ず既存のローカルSupabaseプロセスをチェックし停止**してください。
- ポート競合を避けるために、各スクリプトは`scripts/dev/check-local-supabase.sh`を使用して既存のプロセスをチェックします。
- 既存のSupabaseを適切に停止しない場合、データの不整合やポート競合の問題が発生する可能性があります。
⚠️ **Supabase作業における更新された方針**: 
- Supabase自体は既にDocker上で動作しているため、**再コンテナ化は行いません**。
- 代わりに、Supabase CLIを使用したローカル環境とDockerコンテナの連携に焦点を当てます。
- サブドメイン間認証は、Supabase SDKの`cookieOptions`設定を使用して実装します。
- Docker環境では、アプリケーションのみをコンテナ化し、ローカルのSupabaseサービスと連携します。

## 目次

1. [前提条件と目標](./prerequisites.md) - プロジェクトの現状と移行目標の概要
2. [フェーズ1: 準備と検証](./phase1.md) - 環境準備とDockerの検証
3. [フェーズ2: Supabaseの連携](./phase2.md) - SupabaseとDockerの連携と認証設定
4. [フェーズ3: アプリケーションの移行](./phase3.md) - Next.jsアプリのコンテナ化
5. [フェーズ4: Nginx設定](./phase4.md) - サブドメインとリバースプロキシの設定
6. [フェーズ5: 最適化とテスト](./phase5.md) - パフォーマンス最適化とテスト
7. [フェーズ6: 環境構築自動化](./phase6.md) - 初期設定と開発環境構築の自動化

## 主要機能

- **サブドメイン間認証共有**: すべてのアプリケーション（web, docs, admin）間でシームレスな認証共有
- **アーキテクチャ最適化**: Intel CPUとApple Silicon (M1/M2) の両方に最適化
- **効率的な開発環境**: ホットリロード、ボリュームマウント、キャッシュの最適化
- **コンテナ間通信**: Dockerネットワークを使用した効率的なサービス間通信
- **自動化されたセットアップ**: ワンコマンドでの環境構築と初期設定
- **CI/CD統合**: GitHub Actionsを使用した自動テストとビルド

## 想定期間

- 総所要時間: 3〜4週間 (修正後)
- 各フェーズの目安:
  - フェーズ1: 2-3日
  - フェーズ2: 2-3日 (簡略化により短縮)
  - フェーズ3: 5-7日
  - フェーズ4: 3-4日
  - フェーズ5: 3-5日
  - フェーズ6: 3-4日

## マルチアーキテクチャ対応

このマイルストーンは、Intel Mac、M1/M2 Mac (Apple Silicon)、Linuxなど複数のアーキテクチャで動作するよう設計されています。アーキテクチャ固有の設定や最適化についても各フェーズで詳細に記載しています。

## テクノロジースタック

- **コンテナ化**: Docker, Docker Compose
- **フロントエンド**: Next.js 15 (App Router), React 18
- **バックエンド**: Supabase (PostgreSQL, Auth, Storage)
- **ビルドツール**: Turborepo, Bun 1.2.4+
- **リバースプロキシ**: Nginx
- **CI/CD**: GitHub Actions

## 参考リンク

- [Docker公式ドキュメント](https://docs.docker.com/)
- [Supabase Self-Hostingガイド](https://supabase.com/docs/guides/self-hosting)
- [Next.js 15 Dockerデプロイメントガイド](https://nextjs.org/docs/app/building-your-application/deploying)
- [Bun 1.2公式Docker対応ガイド](https://bun.sh/guides/ecosystem/docker)
- [Turborepo Dockerガイド](https://turbo.build/repo/docs/guides/tools/docker)
- [Supabase認証ガイド](https://supabase.com/docs/guides/auth)
- [Next.js 15のサーバーコンポーネントでのSupabase認証](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabaseのサブドメイン認証実装例](https://github.com/sourman/example-supabase-auth-across-subdomains)
- [Docker Compose V2ガイド](https://docs.docker.com/compose/compose-v2/)
- [Apple SiliconでのDockerパフォーマンス最適化](https://www.docker.com/blog/faster-multi-platform-builds-dockerfile-cross-compilation-guide/)
- [Nginx サブドメイン設定ガイド](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/)
- [Docker BuildKit最適化ガイド](https://docs.docker.com/develop/develop-images/build_enhancements/)
- [GitHub Actions Docker統合ガイド](https://docs.github.com/ja/actions/publishing-packages/publishing-docker-images) 