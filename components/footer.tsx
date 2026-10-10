import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { GooglePlayIcon } from "@/components/icons/google-play-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { XIcon } from "@/components/icons/x-icon";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/i18n-config";
import Link from "next/link";

type FooterLink = { label: string; href: string; external?: boolean };

export async function Footer({
	dict,
	locale,
}: {
	dict: Dictionary;
	locale: Locale;
}) {
	"use cache";
	const year = new Date().getFullYear();
	const t = dict.footer;

	const groups: { title: string; items: FooterLink[] }[] = [
		{
			title: t.product,
			items: [
				{ label: t.features, href: "#features" },
				{ label: t.pricing, href: "#pricing" },
				{ label: t.sdk, href: "#laravel-sdk" },
				{ label: t.docs, href: "https://docs.hypersender.com", external: true },
			],
		},
		{
			title: t.resources,
			items: [
				{ label: t.faqs, href: "#faqs" },
				{ label: t.blog, href: `/${locale}/blog` },
				{ label: t.discord, href: "https://discord.gg/ysSmK32ykC", external: true },
				{ label: t.whatsapp, href: "https://wa.me/201065684630", external: true },
			],
		},
		{
			title: t.legal,
			items: [
				{ label: t.terms, href: `/${locale}/terms-and-conditions` },
				{ label: t.privacy, href: `/${locale}/privacy-policy` },
			],
		},
	];

	return (
		<footer className="relative">
			<div className="relative">
				<div className="grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-8 md:py-16">
					<div className="col-span-2 flex flex-col gap-4 md:col-span-1">
						<Link className="flex w-fit items-center gap-2" href={`/${locale}`}>
							<Logo className="size-8 shrink-0" />
							<span className="font-bold text-lg tracking-tight">{dict.brand}</span>
						</Link>
						<div className="flex items-center gap-2">
							{socialLinks.map((social) => (
								<Button
									aria-label={social.label}
									key={social.label}
									nativeButton={false}
									render={<a href={social.href} rel="noreferrer noopener" target="_blank" />}
									size="icon"
									variant="outline">
									{social.icon}
								</Button>
							))}
						</div>
					</div>

					{groups.map((group) => (
						<div key={group.title}>
							<h3 className="mb-4 font-medium text-xs">{group.title}</h3>
							<ul className="space-y-2 text-muted-foreground text-sm">
								{group.items.map((item) => (
									<li key={item.label}>
										<a
											className="hover:text-foreground"
											href={item.href}
											rel={item.external ? "noreferrer noopener" : undefined}
											target={item.external ? "_blank" : undefined}>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<FullWidthDivider position="bottom" />
				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />
			</div>

			<div className="flex flex-col-reverse items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8">
				<p className="text-muted-foreground text-xs">
					{t.rights.replace("{year}", String(year))}
				</p>

				<Button
					className="h-11"
					nativeButton={false}
					render={
						<a
							dir="ltr"
							href={playStoreUrl}
							rel="noreferrer noopener"
							target="_blank"
						/>
					}
					variant="outline">
					<GooglePlayIcon className="size-5" />
					<span className="flex flex-col items-start justify-center pe-2 text-start">
						<span className="font-light text-[10px] leading-none tracking-tighter">
							GET IT ON
						</span>
						<span className="font-bold text-base leading-none">Google Play</span>
					</span>
				</Button>
			</div>
		</footer>
	);
}

const playStoreUrl = "#"; // TODO: the Google Play listing URL

const socialLinks = [
	{ label: "Facebook", href: "#", icon: <FacebookIcon /> },
	{ label: "Instagram", href: "#", icon: <InstagramIcon /> },
	{ label: "LinkedIn", href: "#", icon: <LinkedinIcon /> },
	{ label: "X", href: "https://twitter.com/hypersender", icon: <XIcon /> },
];
