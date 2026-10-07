import { NextResponse, type NextRequest } from "next/server";
import { i18n, type Locale } from "@/i18n-config";

/**
 * Picks the best supported locale from the `Accept-Language` header, honouring
 * the `q` weights, then falls back to the default locale.
 */
function getLocale(request: NextRequest): Locale {
	const header = request.headers.get("accept-language");
	if (!header) return i18n.defaultLocale;

	const preferred = header
		.split(",")
		.map((part) => {
			const [tag, ...params] = part.trim().split(";");
			const quality = params.find((param) => param.trim().startsWith("q="));
			return {
				tag: tag.trim().toLowerCase(),
				quality: quality ? Number(quality.split("=")[1]) : 1,
			};
		})
		.filter(({ tag }) => tag && tag !== "*")
		.sort((a, b) => b.quality - a.quality);

	for (const { tag } of preferred) {
		const base = tag.split("-")[0];
		const match = i18n.locales.find(
			(locale) => locale === tag || locale === base
		);
		if (match) return match;
	}

	return i18n.defaultLocale;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const pathnameHasLocale = i18n.locales.some(
		(locale) =>
			pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
	);

	if (pathnameHasLocale) return;

	request.nextUrl.pathname = `/${getLocale(request)}${
		pathname === "/" ? "" : pathname
	}`;

	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	// Skip internal paths, API routes and anything with a file extension.
	matcher: ["/((?!_next|api|.*\\..*).*)"],
};
