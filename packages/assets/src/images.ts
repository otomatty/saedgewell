/**
 * 画像関連のアセット
 */

// ロゴ
import LogoLight from "./images/saedgewell_logo_light.svg";
import LogoDark from "./images/saedgewell_logo_dark.svg";

// プロフィール
import Profile from "./images/profile.webp";

// GitHub
import GitHubLight1 from "./images/github-light-1.webp";
import GitHubLight2 from "./images/github-light-2.webp";
import GitHubLight3 from "./images/github-light-3.webp";
import GitHubDark1 from "./images/github-dark-1.webp";
import GitHubDark2 from "./images/github-dark-2.webp";
import GitHubDark3 from "./images/github-dark-3.webp";

// その他
import Circle from "./images/circle.svg";
import Cosense from "./images/cosense.webp";
import AkimasaPF from "./images/akimasapf.png";

/**
 * 画像のパス
 */
export const Images = {
	// ロゴ
	Logo: {
		Light: LogoLight,
		Dark: LogoDark,
	},

	// プロフィール
	Profile,

	// GitHub
	GitHub: {
		Light: [GitHubLight1, GitHubLight2, GitHubLight3],
		Dark: [GitHubDark1, GitHubDark2, GitHubDark3],
	},

	// その他
	Circle,
	Cosense,
	AkimasaPF,
};
