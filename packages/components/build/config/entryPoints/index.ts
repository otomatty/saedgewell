import type { EntryPoints } from "./types";

// Components
import { animationEntryPoints } from "./animation";
import { backgroundEntryPoints } from "./background";
import { coreEntryPoints } from "./core";
import { layoutEntryPoints } from "./layout";
import { feedbackEntryPoints } from "./feedback";

// Features
import { themeEntryPoints } from "./features/theme";
import { notificationEntryPoints } from "./features/notification";
import { achievementsEntryPoints } from "./features/achievements";
import { authEntryPoints } from "./features/auth";
import { contactsEntryPoints } from "./features/contacts";
import { gmailEntryPoints } from "./features/gmail";

// Providers
import { providersEntryPoints } from "./providers";

// Lib
import { libEntryPoints } from "./lib";

export const entryPoints: EntryPoints = {
	components: {
		animation: animationEntryPoints,
		background: backgroundEntryPoints,
		core: coreEntryPoints,
		layout: layoutEntryPoints,
		feedback: feedbackEntryPoints,
		features: {
			theme: themeEntryPoints,
			notification: notificationEntryPoints,
			achievements: achievementsEntryPoints,
			auth: authEntryPoints,
			contacts: contactsEntryPoints,
			gmail: gmailEntryPoints,
		},
	},
	providers: providersEntryPoints,
	lib: libEntryPoints,
};
