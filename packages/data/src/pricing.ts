/**
 * 料金関連のデータ
 * 提供サービスの料金情報を定義
 */

/**
 * 成果物アイテムの型定義
 */
export interface DeliverableItem {
	name: string;
	description: string;
	basePrice: string;
	period: string;
	features: string[];
	note: string;
}

/**
 * 成果物カテゴリーの型定義
 */
export interface DeliverableCategory {
	category: string;
	items: DeliverableItem[];
}

/**
 * よくある質問の型定義
 */
export interface FAQ {
	question: string;
	answer: string;
}

/**
 * 成果物一覧
 */
export const deliverables: DeliverableCategory[] = [
	{
		category: "Webサイト制作",
		items: [
			{
				name: "コーポレートサイト",
				description: "企業の情報発信のための公式Webサイト",
				basePrice: "100万円〜",
				period: "2-3ヶ月",
				features: [
					"要件定義・設計",
					"レスポンシブ対応",
					"お知らせ機能",
					"お問い合わせフォーム",
					"基本SEO対策",
				],
				note: "ページ数や機能により変動",
			},
			{
				name: "ランディングページ（LP）",
				description: "商品・サービスの訴求に特化したページ",
				basePrice: "30万円〜",
				period: "2-4週間",
				features: [
					"要件定義・設計",
					"レスポンシブ対応",
					"アニメーション実装",
					"お問い合わせフォーム",
					"アクセス解析",
				],
				note: "デザインの複雑さにより変動",
			},
			{
				name: "ブログ・メディアサイト",
				description: "記事コンテンツを中心とした情報発信サイト",
				basePrice: "80万円〜",
				period: "1-2ヶ月",
				features: [
					"要件定義・設計",
					"CMS機能",
					"会員機能",
					"検索機能",
					"SNS連携",
				],
				note: "CMS機能、会員機能の有無により変動",
			},
		],
	},
	{
		category: "Webアプリケーション開発",
		items: [
			{
				name: "管理画面システム",
				description: "データ管理・運用のための業務システム",
				basePrice: "150万円〜",
				period: "3-4ヶ月",
				features: [
					"要件定義・設計",
					"ユーザー管理",
					"権限管理",
					"データ一覧・編集",
					"CSV出力",
				],
				note: "機能の複雑さにより変動",
			},
			{
				name: "ECサイト",
				description: "オンラインショップシステム",
				basePrice: "200万円〜",
				period: "4-6ヶ月",
				features: [
					"要件定義・設計",
					"商品管理",
					"在庫管理",
					"決済機能",
					"会員機能",
				],
				note: "決済システム、在庫管理機能により変動",
			},
			{
				name: "予約システム",
				description: "オンライン予約・管理システム",
				basePrice: "120万円〜",
				period: "2-3ヶ月",
				features: [
					"要件定義・設計",
					"カレンダー連携",
					"メール通知",
					"管理機能",
					"決済機能",
				],
				note: "カレンダー連携、通知機能により変動",
			},
		],
	},
];

/**
 * よくある質問一覧
 */
export const faqs: FAQ[] = [
	{
		question: "料金はカスタマイズ可能ですか？",
		answer:
			"はい、プロジェクトの規模や要件に応じて柔軟に対応いたします。基本料金をベースに、必要な機能や対応範囲を調整することで、ご予算に合わせた提案が可能です。",
	},
	{
		question: "追加の機能開発が必要になった場合はどうなりますか？",
		answer:
			"開発途中での追加機能のご要望にも対応可能です。追加機能の内容を確認させていただき、必要な工数と費用を見積もった上で、ご提案させていただきます。",
	},
	{
		question: "保守・運用費用は含まれていますか？",
		answer:
			"基本料金には初期開発費用のみが含まれています。保守・運用については、別途月額でのサポートプランをご用意しております。具体的な費用は、システムの規模や必要なサポート内容によって異なります。",
	},
	{
		question: "お支払いのタイミングはいつですか？",
		answer:
			"基本的に、着手金（30%）、中間金（40%）、完了金（30%）の3回分割でのお支払いをお願いしております。ただし、プロジェクトの規模や期間によって、お支払い条件は柔軟に対応させていただきます。",
	},
	{
		question: "見積もりは無料ですか？",
		answer:
			"はい、初回のお見積りは無料です。プロジェクトの要件をヒアリングさせていただき、最適な提案と概算見積もりをご提示させていただきます。",
	},
];
