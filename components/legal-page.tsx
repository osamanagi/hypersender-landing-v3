import Link from "next/link";
import type React from "react";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Shared frame for the legal pages (Terms, Privacy). Mirrors the landing page's
 * banded efferd look: two full-bleed bands, each closed by a rule with the `+`
 * corner decor on the page borders.
 *
 * The legal copy is English-only (as on the previous landing page), so the whole
 * block is forced LTR — it reads correctly even under the Arabic locale.
 */
export function LegalPage({
	badge,
	title,
	updated,
	backLabel,
	homeHref,
	children,
}: {
	badge: string;
	title: string;
	updated: string;
	backLabel: string;
	homeHref: string;
	children: React.ReactNode;
}) {
	return (
		<div className="relative" dir="ltr">
			<div className="relative">
				<div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
					<div className="max-w-7xl space-y-3">
						<p className="font-medium text-primary text-xs uppercase tracking-[0.3em]">
							{badge}
						</p>
						<h1 className="text-balance font-medium text-3xl tracking-tight md:text-5xl">
							{title}
						</h1>
						<p className="text-muted-foreground text-sm">{updated}</p>
					</div>
				</div>

				<FullWidthDivider position="bottom" />
				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />
			</div>

			<div className="relative">
				<div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
					<div className="max-w-7xl">
						<article className={legalProse}>{children}</article>

						<div className="mt-12">
							<Button
								nativeButton={false}
								render={<Link href={homeHref} />}
								variant="outline">
								{backLabel}
							</Button>
						</div>
					</div>
				</div>

				<FullWidthDivider position="bottom" />
				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />
			</div>
		</div>
	);
}

// Long-form legal typography, kept as variants so the page files stay plain JSX.
const legalProse = cn(
	"text-muted-foreground",
	"[&_h2]:mt-10 [&_h2]:font-medium [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:tracking-tight md:[&_h2]:text-2xl",
	"[&_h3]:mt-8 [&_h3]:font-medium [&_h3]:text-base [&_h3]:text-foreground",
	"[&_p]:mt-4 [&_p]:text-sm [&_p]:leading-relaxed md:[&_p]:text-base",
	"[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:ps-5",
	"[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:ps-5",
	"[&_li]:text-sm [&_li]:leading-relaxed md:[&_li]:text-base",
	"[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
	"[&_strong]:font-medium [&_strong]:text-foreground"
);
