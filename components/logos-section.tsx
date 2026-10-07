import { LogoCloud } from "@/components/logo-cloud"; // @efferd/logo-cloud-2
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import type { Dictionary } from "@/i18n-config";

export function LogosSection({ dict }: { dict: Dictionary }) {
	return (
		<section className="mb-12">
			<h2 className="py-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
				{dict.logos.supporting}{" "}
				<span className="text-foreground">{dict.logos.highlight}</span>
			</h2>
			<div className="relative *:border-0">
				<DecorIcon className="size-4" position="top-left" />
				<DecorIcon className="size-4" position="top-right" />
				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />

				<FullWidthDivider className="-top-px" />
				<LogoCloud />
				<FullWidthDivider className="-bottom-px" />
			</div>
		</section>
	);
}
