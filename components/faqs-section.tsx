import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { cn } from "@/lib/utils";
import { i18n, type Dictionary, type Locale } from "@/i18n-config";

const contactUrl = "https://wa.me/201065684630";

export function FaqsSection({
	dict,
	locale,
}: {
	dict: Dictionary;
	locale: Locale;
}) {
	// The guide line, and the crosses on it, sit on the edge of the questions
	// column that faces the copy — that edge flips with the reading direction.
	const isRtl = i18n.dir[locale] === "rtl";

	return (
		<section className="relative" id="faqs">
			<div className="grid grid-cols-1 md:grid-cols-2">
				<div className="px-4 pt-16 pb-10 md:px-8 md:pt-24 md:pb-12">
					<div className="space-y-5">
						<h2 className="text-balance font-medium text-3xl tracking-tight md:text-5xl">
							{dict.faqs.title}
						</h2>
						<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
							{dict.faqs.subtitle}
						</p>
						<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
							{dict.faqs.contact.prompt}{" "}
							<a
								className="text-primary hover:underline"
								href={contactUrl}
								rel="noreferrer"
								target="_blank">
								{dict.faqs.contact.cta}
							</a>
						</p>
					</div>
				</div>

				<div className="relative pb-16 md:pt-24 md:pb-24">
					{/* vertical guide line: spans from the top divider down to the closing one */}
					<div
						aria-hidden="true"
						className={cn(
							"pointer-events-none absolute top-0 bottom-3 w-px bg-border",
							isRtl ? "right-3" : "left-3"
						)}
					/>

					<Accordion className="rounded-none border-x-0 border-y">
						{dict.faqs.items.map((item, index) => (
							<AccordionItem
								className={cn("group relative", isRtl ? "pr-5" : "pl-5")}
								key={item.question}
								value={`faq-${index + 1}`}>
								<DecorIcon
									className={cn(
										"size-3 group-last:hidden",
										isRtl ? "right-[13px]" : "left-[13px]"
									)}
									position={isRtl ? "bottom-right" : "bottom-left"}
								/>

								<AccordionTrigger className="px-4 py-4 hover:no-underline focus-visible:underline focus-visible:ring-0">
									{item.question}
								</AccordionTrigger>

								<AccordionContent className="px-4 pb-4 text-muted-foreground">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>

			<FullWidthDivider className="bottom-3" />
			<DecorIcon className="bottom-3 size-4" position="bottom-left" />
			<DecorIcon className="bottom-3 size-4" position="bottom-right" />
		</section>
	);
}
