import { themeEntryPoints } from "./theme";
import { notificationEntryPoints } from "./notification";
import { achievementsEntryPoints } from "./achievements";
import { authEntryPoints } from "./auth";
import { contactsEntryPoints } from "./contacts";
import { gmailEntryPoints } from "./gmail";
import type { FeaturesEntryPoints } from "../types";

export const featuresEntryPoints: FeaturesEntryPoints = {
	theme: themeEntryPoints,
	notification: notificationEntryPoints,
	achievements: achievementsEntryPoints,
	auth: authEntryPoints,
	contacts: contactsEntryPoints,
	gmail: gmailEntryPoints,
};
