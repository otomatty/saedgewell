import { createAssetsTsupConfig } from "@saedgewell/config";

export default createAssetsTsupConfig({
	splitting: false,
	external: ["@saedgewell/types"],
	// アセットファイルをコピーするための設定
	loader: {
		".svg": "file",
		".png": "file",
		".jpg": "file",
		".jpeg": "file",
		".webp": "file",
		".gif": "file",
		".ttf": "file",
		".woff": "file",
		".woff2": "file",
		".eot": "file",
		".otf": "file",
	},
});
