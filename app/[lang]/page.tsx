import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero";
import { LogosSection } from "@/components/logos-section";
import { getDictionary, hasLocale } from "@/get-dictionary";
import { cn } from "@/lib/utils";
import { FeatureSection } from "@/components/feature-section";
import { SecondaryFeatureSection } from "@/components/secondary-feature-section";
import { OtpSection } from "@/components/otp-section";
import { SdkSection } from "@/components/sdk-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqsSection } from "@/components/faqs-section";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
			<Header dict={dict} locale={lang} />
			<div
				className={cn(
					"relative mx-auto max-w-7xl grow",
					"before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
					"after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border"
				)}
			>
				<main>
					<HeroSection dict={dict} locale={lang} />
					<LogosSection dict={dict} />
					<FeatureSection dict={dict} />
					<SecondaryFeatureSection dict={dict} />
					<OtpSection dict={dict} />
					<SdkSection dict={dict} />
					<PricingSection dict={dict} />
					<FaqsSection dict={dict} locale={lang} />
					<CallToAction dict={dict} />
				</main>

				<Footer dict={dict} locale={lang} />
			</div>
		</div>
	);
}
