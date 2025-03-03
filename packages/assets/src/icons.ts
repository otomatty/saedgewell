/**
 * アイコン関連のアセット
 */

// ロゴ・マニフェスト用アイコン
import WebAppManifestLarge from "./icons/web-app-manifest-512x512.png";
import WebAppManifestSmall from "./icons/web-app-manifest-192x192.png";

// 技術スタックアイコン
import NextJS from "./icons/next-js.svg";
import React from "./icons/react.svg";
import TypeScript from "./icons/typescript.svg";
import TailwindCSS from "./icons/tailwind-css-2.svg";
import Hono from "./icons/hono.svg";
import Tauri from "./icons/tauri.svg";
import Jotai from "./icons/jotai.png";
import Storybook from "./icons/storybook.svg";
import Supabase from "./icons/supabase/supabase-logo-icon.svg";
import GCP from "./icons/google-cloud.svg";
import Vite from "./icons/vite.svg";
import Bun from "./icons/bun/logo.svg";
import ShadcnUI from "./icons/shadcn.svg";
import JavaScript from "./icons/js/javascript-large.svg";
import CSS from "./icons/css/css.svg";
import ChatGPT from "./icons/chatgpt.svg";
import Gemini from "./icons/gemini.svg";
import Markdown from "./icons/markdown.svg";
import Motion from "./icons/motion/motion-logo-light.svg";
import NodeJS from "./icons/nodejs.svg";
import PostgreSQL from "./icons/postgresql.svg";
import Docker from "./icons/docker.svg";
import Git from "./icons/git.svg";
import GitHub from "./icons/github.svg";
import Figma from "./icons/figma.svg";
import Canva from "./icons/canva.svg";

/**
 * アイコンのパス
 */
export const Icons = {
	// マニフェスト用アイコン
	WebAppManifest: {
		Large: WebAppManifestLarge,
		Small: WebAppManifestSmall,
	},

	// 技術スタックアイコン
	TechStack: {
		// フロントエンド
		NextJS,
		React,
		TypeScript,
		TailwindCSS,
		Hono,
		Tauri,
		Jotai,
		Storybook,
		Motion,
		ShadcnUI,

		// バックエンド
		Supabase,
		GCP,
		Vite,
		Bun,
		NodeJS,
		PostgreSQL,
		Docker,

		// 言語・ツール
		JavaScript,
		CSS,
		ChatGPT,
		Gemini,
		Markdown,
		Git,
		GitHub,
		Figma,
		Canva,
	},
};
