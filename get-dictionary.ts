import "server-only";
import type { Dictionary, Locale } from "@/i18n-config";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
	en: () => import("@/dictionaries/en.json").then((module) => module.default),
	ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
};

export const hasLocale = (locale: string): locale is Locale =>
	locale in dictionaries;

export const getDictionary = (locale: Locale) => dictionaries[locale]();
