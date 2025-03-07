"use client";

import { BasicHero } from "../../../../../../../packages/sample/src/components/layout/basic-hero";

export const BlogHero = () => {
	return (
		<BasicHero
			title="Blog"
			description="Web開発、プログラミング、キャリアについての記事を発信しています。"
			pattern="grid"
			size="lg"
			align="left"
		/>
	);
};
