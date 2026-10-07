import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero";
import { LogosSection } from "@/components/logos-section";
import { getDictionary, hasLocale } from "@/get-dictionary";
import { cn } from "@/lib/utils";

export default async function Home({ params }: PageProps<"/[lang]">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
			<Header dict={dict} locale={lang} />
			<main
				className={cn(
					"relative mx-auto max-w-7xl grow",
					// X Borders
					"before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
					"after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border"
				)}
			>
				<HeroSection dict={dict} locale={lang} />
				<LogosSection dict={dict} />
			</main>
		</div>
	);
}
