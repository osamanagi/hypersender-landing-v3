import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import type { Dictionary } from "@/i18n-config";
import { ArrowRightIcon } from "lucide-react";

export function CallToAction({ dict }: { dict: Dictionary }) {
	return (
		<div className="relative mx-auto flex w-full max-w-7xl flex-col justify-between gap-y-4 px-4 py-10 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
			<FullWidthDivider className="bottom-3" />
			<DecorIcon className="bottom-3 size-4" position="bottom-left" />
			<DecorIcon className="bottom-3 size-4" position="bottom-right" />

			<h2 className="text-center font-semibold text-xl md:text-3xl">
				{dict.ctaSection.title}
			</h2>
			<p className="text-balance text-center font-medium text-muted-foreground text-sm md:text-base">
				{dict.ctaSection.description}
			</p>

			<div className="flex items-center justify-center gap-2">
				<Button variant="outline">{dict.ctaSection.contactSales}</Button>
				<Button>
					{dict.ctaSection.getStarted}{" "}
					<ArrowRightIcon data-icon="inline-end" />
				</Button>
			</div>
		</div>
	);
}
