import type enDictionary from "@/dictionaries/en.json";

export const i18n = {
	defaultLocale: "en",
	locales: ["en", "ar"],
	dir: {
		en: "ltr",
		ar: "rtl",
	},
	labels: {
		en: "English",
		ar: "العربية",
	},
} as const;

export type Locale = (typeof i18n)["locales"][number];
export type Dictionary = typeof enDictionary;
