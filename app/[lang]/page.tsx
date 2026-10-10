import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero";
import { LogosSection } from "@/components/logos-section";
import { getDictionary, hasLocale } from "@/get-dictionary";
import { FeatureSection } from "@/components/feature-section";
import { SecondaryFeatureSection } from "@/components/secondary-feature-section";
import { OtpSection } from "@/components/otp-section";
import { SdkSection } from "@/components/sdk-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqsSection } from "@/components/faqs-section";
import { CallToAction } from "@/components/cta";

export default async function Home({ params }: PageProps<"/[lang]">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

	const dict = await getDictionary(lang);

	return (
		<>
			<HeroSection dict={dict} locale={lang} />
			<LogosSection dict={dict} />
			<FeatureSection dict={dict} />
			<SecondaryFeatureSection dict={dict} />
			<OtpSection dict={dict} />
			<SdkSection dict={dict} />
			<PricingSection dict={dict} />
			<FaqsSection dict={dict} locale={lang} />
			<CallToAction dict={dict} />
		</>
	);
}
