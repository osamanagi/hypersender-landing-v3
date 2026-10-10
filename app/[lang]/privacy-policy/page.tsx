import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { hasLocale } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://hypersender.com";

export async function generateMetadata({
	params,
}: PageProps<"/[lang]/privacy-policy">): Promise<Metadata> {
	const { lang } = await params;
	if (!hasLocale(lang)) return {};

	const url = `${SITE_URL}/${lang}/privacy-policy`;
	const title = "Privacy Policy | Hypersender";
	const description =
		"How Hypersender collects, processes, and safeguards your data.";

	return {
		title,
		description,
		alternates: {
			canonical: url,
			languages: Object.fromEntries(
				i18n.locales.map((locale) => [
					locale,
					`${SITE_URL}/${locale}/privacy-policy`,
				])
			),
		},
	};
}

export default async function PrivacyPolicyPage({
	params,
}: PageProps<"/[lang]/privacy-policy">) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

	return (
		<LegalPage
			backLabel="Back to Home"
			badge="Privacy Policy"
			homeHref={`/${lang}`}
			title="How we collect, process, and safeguard your data"
			updated="Last Updated: 2024-07-22">
			<p>
				Our privacy policy explains how we collect, use, maintain, and disclose
				information from users of our website, application, and any other
				interactions with Hypersender. We may update this page periodically and
				changes become effective 30 days after publishing the revised date
				above. We encourage you to review the policy regularly to understand how
				we safeguard your information.
			</p>

			<h2>Collection of Information</h2>
			<h3>Information You Provide</h3>
			<p>
				We collect information you willingly provide, including when you
				participate in service features, fill out forms, request support, or
				otherwise communicate with us. This can include your name, email
				address, mailing address, and other contact details you choose to share.
			</p>

			<h3>Automatically Collected Information</h3>
			<p>When you access or use our services, we automatically collect:</p>
			<ul>
				<li>
					<strong>Log Information:</strong> Browser type, access times, pages
					viewed, IP address, and the referring page before visiting our
					services.
				</li>
				<li>
					<strong>Device Information:</strong> Hardware model and operating
					system details for the device you use to access our services.
				</li>
				<li>
					<strong>Cookies and Tracking Technologies:</strong> We use cookies and
					tracking pixels to improve our services, understand popular features,
					and measure campaign effectiveness.
				</li>
			</ul>

			<h2>Use of Information</h2>
			<p>We use collected information to:</p>
			<ul>
				<li>Deliver, maintain, and enhance our services.</li>
				<li>
					Provide requested features, process transactions, and send
					confirmations.
				</li>
				<li>
					Send technical notices, updates, security alerts, and administrative
					messages.
				</li>
				<li>Respond to comments, questions, and provide support.</li>
				<li>Share news and updates about our services.</li>
				<li>Monitor usage trends and personalize the experience.</li>
			</ul>
			<p>
				By using our services, you consent to processing and transferring your
				information within the United States and other countries where we
				operate.
			</p>

			<h3>Operations</h3>
			<p>
				We use the information (excluding Client Data) to operate, maintain,
				enhance, and provide all features of the service. Client Data is
				processed solely in accordance with instructions from the applicable
				client or user.
			</p>

			<h3>Improvements</h3>
			<p>
				Usage patterns help us improve the service and develop new products,
				features, and functionality.
			</p>

			<h3>Communications</h3>
			<p>
				We may use your email address or other information to contact you for
				administrative purposes (support, security notices, compliance issues)
				or for updates on promotions and events. You can opt out of promotional
				communications at any time.
			</p>

			<h2>Sharing of Information</h2>
			<p>
				We do not sell, trade, or rent personal identification information. We
				may share aggregated and anonymized demographic data with trusted
				partners for the purposes outlined above.
			</p>

			<h2>Security</h2>
			<p>
				We implement security safeguards to protect against unauthorized access,
				alteration, disclosure, or destruction of personal information. While we
				use SSL/TLS encryption to protect transmitted data, no method of
				transmission or storage is 100% secure, and we cannot guarantee absolute
				security.
			</p>

			<h2>Storage Duration</h2>
			<p>
				Unless a specific retention period is stated, we store personal data
				until the purpose for collection no longer applies. If you request
				deletion or withdraw consent, we delete your data unless legal
				obligations (such as tax requirements) mandate retention.
			</p>

			<h2>Account and Data Deletion</h2>
			<p>
				To delete your account and data, send an email to{" "}
				<a
					href="mailto:support@hypersender.com?subject=Account%20Deletion%20Request&body=Please%20delete%20my%20Hypersender%20account%20and%20associated%20data.%20My%20account%20email%20is%3A%20">
					support@hypersender.com
				</a>{" "}
				with the subject “Account Deletion Request” and this body: “Please
				delete my Hypersender account and associated data. My account email
				is: [your email].”
			</p>
			<p>
				Your account and data will be deleted within 7 days. If you log in
				during this period, your deletion request will be canceled.
			</p>

			<h2>Contact</h2>
			<p>
				If you have questions about this policy or wish to exercise data rights,
				email <a href="mailto:info@hypersender.com">info@hypersender.com</a> with
				“Data Protection” in the subject line.
			</p>
		</LegalPage>
	);
}
