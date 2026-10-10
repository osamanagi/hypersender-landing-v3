import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { hasLocale } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://hypersender.com";

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/terms-and-conditions">): Promise<Metadata> {
	const { lang } = await params;
	if (!hasLocale(lang)) return {};

	const url = `${SITE_URL}/${lang}/terms-and-conditions`;
	const title = "Terms & Conditions | Hypersender";
	const description =
		"Understand the rules for using Hypersender products and services.";

	return {
		title,
		description,
		alternates: {
			canonical: url,
			languages: Object.fromEntries(
				i18n.locales.map((locale) => [
					locale,
					`${SITE_URL}/${locale}/terms-and-conditions`,
				])
			),
		},
	};
}

export default async function TermsAndConditionsPage({
	params,
}: PageProps<"/[lang]/terms-and-conditions">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

	return (
		<LegalPage
			backLabel="Back to Home"
			badge="Terms & Conditions"
			homeHref={`/${lang}`}
			title="Understand the rules for using Hypersender"
			updated="Last Updated: 2024-07-22">
			<p>
				These Terms of Service (“Terms”) govern your access to and use of
				Hypersender products. By using the service you agree to be bound by
				everything on this page, so please read it carefully. If something is
				unclear email{" "}
				<a href="mailto:info@hypersender.com">info@hypersender.com</a> with
				“Terms of Service” in the subject line.
			</p>

			<h2>Changes to These Terms</h2>
			<p>
				We may update these Terms from time to time. Changes become effective
				once posted here, so review this page periodically to stay informed.
			</p>

			<h2>Creating Accounts</h2>
			<p>
				When you create an account (or log in using a third-party service) you
				agree to keep your password secure and accept responsibility for any
				activity on your account. Notify us immediately if you suspect
				unauthorized access.
			</p>

			<h2>Service Fees &amp; Payments</h2>
			<h3>Always Free Tier</h3>
			<p>
				We provide one free instance per service type with limited storage. No
				credit card is required, but we may change the free tier in the future.
				Attempts to bypass free-tier limits may result in suspension.
			</p>

			<h3>Paid Services</h3>
			<p>
				Pricing is listed on hypersender.com and paid monthly or annually in
				advance. We may revise fees with at least five days’ notice. Refunds,
				when needed, are reduced by payment-gateway fees. Paying for the service
				reserves capacity whether or not you fully use it.
			</p>

			<h3>Subscription Cancellation</h3>
			<p>
				You can cancel anytime from the Subscription page in your account or by
				contacting support. Cancellation takes effect at the end of the current
				paid term.
			</p>

			<h2>Disclaimer &amp; Limitation of Liability</h2>
			<p>
				Hypersender is an independently developed tool for automating messaging
				via WhatsApp and SMS. We are not endorsed by WhatsApp™, Meta™, or their
				affiliates. Use of our WhatsApp tooling may violate their terms and you
				assume all associated risk.
			</p>
			<p>
				Uptime is not guaranteed. Services may become unavailable if WhatsApp
				updates their clients or if device connectivity is lost. SMS delivery
				depends on your device’s network strength, balance, and battery level.
			</p>
			<p>
				Accounts or phone numbers can be blocked by WhatsApp’s anti-spam system.
				We are not responsible for bans, connection issues, or losses arising
				from changes in third-party software.
			</p>
			<p>
				Hypersender is not liable for indirect, incidental, or consequential
				damages. Total liability is limited to the amount you paid for the
				service. You agree to indemnify Hypersender against claims arising from
				your use of the platform.
			</p>

			<h2>Your Content &amp; Conduct</h2>
			<p>
				You are responsible for the legality and appropriateness of the content
				you make available through the service. By posting content, you grant us
				the right to use, reproduce, modify, and display it in connection with
				the service. Do not upload illegal, defamatory, or infringing content,
				spam, or harmful code.
			</p>
			<p>
				You must respect the law, third-party rights, and consent requirements
				when messaging recipients. You are responsible for every action taken
				through your account. We may change the service without notice to ensure
				reliability.
			</p>
			<p>
				Messaging must never promote prohibited goods, violate international
				law, incite violence, or spread hate. Organizing or sending spam through
				Hypersender is strictly forbidden.
			</p>

			<h2>Refund Policy</h2>
			<p>Refund requests are evaluated case by case and may be granted when:</p>
			<ul>
				<li>
					A technical issue prevents use of the service and cannot be resolved
					within seven business days.
				</li>
				<li>A billing error caused an incorrect or duplicate charge.</li>
				<li>
					You cancel within seven days of the initial purchase and have not used
					the service.
				</li>
				<li>Other exceptional circumstances reviewed by our support team.</li>
			</ul>
			<p>
				Refunds are not issued for change of mind, partial use, or promotional
				purchases.
			</p>

			<h3>Requesting a Refund</h3>
			<ol>
				<li>
					Email{" "}
					<a href="mailto:support@hypersender.com">support@hypersender.com</a>{" "}
					with your order details and reason.
				</li>
				<li>Provide supporting documentation if applicable.</li>
				<li>
					We respond within seven business days and process approved refunds
					within three business days.
				</li>
			</ol>
			<p>
				Refunds are issued to the original payment method and you will receive
				confirmation once processed.
			</p>

			<h2>Feedback</h2>
			<p>
				We appreciate your feedback, comments, and suggestions. By submitting
				feedback you grant Hypersender all rights to use it without expectation
				of compensation.
			</p>
		</LegalPage>
	);
}
