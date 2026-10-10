import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary, hasLocale } from "@/get-dictionary";
import { i18n } from "@/i18n-config";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Arabic UI type. Tajawal is a static family (no 600), so 600 maps to 700.
const tajawal = Tajawal({
	subsets: ["arabic", "latin"],
	variable: "--font-tajawal",
	weight: ["400", "500", "700"],
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// Required with `cacheComponents`: every root parameter needs at least one value.
export function generateStaticParams() {
	return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
	const { lang } = await params;
	if (!hasLocale(lang)) return {};

	const dict = await getDictionary(lang);

	return {
		title: dict.metadata.title,
		description: dict.metadata.description,
		alternates: {
			languages: Object.fromEntries(
				i18n.locales.map((locale) => [locale, `/${locale}`])
			),
		},
	};
}

export default async function RootLayout({
	children,
	params,
}: LayoutProps<"/[lang]">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<html
			className={cn(
				"h-full",
				"antialiased",
				geistSans.variable,
				geistMono.variable,
				inter.variable,
				lang === "ar" ? tajawal.variable : "font-sans"
			)}
			dir={i18n.dir[lang]}
			lang={lang}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					<div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
						<Header dict={dict} locale={lang} />
						<div
							className={cn(
								"relative mx-auto max-w-7xl grow",
								"before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
								"after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border"
							)}
						>
							<main>{children}</main>

							<Footer dict={dict} locale={lang} />
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
