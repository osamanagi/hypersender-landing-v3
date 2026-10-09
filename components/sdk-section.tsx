"use client";

import * as React from "react";
import type { Dictionary } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { CheckIcon, CopyIcon } from "lucide-react";

const laravel = {
	docsUrl:
		"https://docs.hypersender.com/v2/packages-and-sdks/laravel/installation",
	repoUrl: "https://github.com/hypersender/hypersender-laravel",
};

/**
 * Split panel in the same shape as the feature grid: two cells that the 1px
 * `bg-border` gutter divides.
 *
 * The panel carries no horizontal padding on purpose. It has to sit flush with
 * the page's vertical borders, otherwise the full-width dividers, the page
 * borders and the corner decor do not meet on the same points.
 */
export function SdkSection({ dict }: { dict: Dictionary }) {
	const copy = dict.sdkSection;

	return (
		<div className="relative" id="laravel-sdk">
			<div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2">
				<DecorIcon className="size-4" position="top-left" />
				<DecorIcon className="size-4" position="top-right" />
				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />

				<FullWidthDivider className="-top-px" />
				<FullWidthDivider className="-bottom-px" />

				<div className="flex flex-col justify-center gap-5 bg-background px-6 py-10 md:px-10 md:py-14">
					<span className="w-fit rounded-md border bg-muted/20 px-2.5 py-1 font-medium text-xs">
						{copy.badge}
					</span>

					<h2 className="font-medium text-2xl tracking-tight md:text-3xl">
						{copy.title}
					</h2>

					<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
						{copy.description}
					</p>

					<div className="flex flex-wrap items-center gap-3 pt-1">
						<Button
							nativeButton={false}
							render={
								<a
									href={laravel.docsUrl}
									rel="noreferrer"
									target="_blank"
								/>
							}>
							{copy.docsCta}
						</Button>
						<Button
							nativeButton={false}
							render={
								<a
									href={laravel.repoUrl}
									rel="noreferrer"
									target="_blank"
								/>
							}
							variant="outline">
							{copy.githubCta}
						</Button>
					</div>
				</div>

				<div className="flex flex-col justify-center gap-4 bg-background px-6 py-10 md:px-10 md:py-14">
					<div className="flex items-center justify-between gap-3">
						<p className="font-medium text-sm">{copy.installLabel}</p>
						<CopyCommandButton
							command={copy.installCommand}
							copiedLabel={copy.copied}
							label={copy.copyCommand}
						/>
					</div>

					<pre
						className="overflow-x-auto rounded-lg border bg-muted/20 px-4 py-3 font-mono text-xs md:text-sm"
						dir="ltr">
						<code>{copy.installCommand}</code>
					</pre>

					<p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
						{copy.nextSteps}
					</p>
				</div>
			</div>
		</div>
	);
}

function CopyCommandButton({
	command,
	label,
	copiedLabel,
}: {
	command: string;
	label: string;
	copiedLabel: string;
}) {
	const [copied, setCopied] = React.useState(false);
	const timer = React.useRef<number | undefined>(undefined);

	React.useEffect(() => () => window.clearTimeout(timer.current), []);

	return (
		<Button
			aria-label={copied ? copiedLabel : label}
			onClick={() => {
				void navigator.clipboard.writeText(command).then(() => {
					setCopied(true);
					window.clearTimeout(timer.current);
					timer.current = window.setTimeout(() => setCopied(false), 2000);
				});
			}}
			size="icon-sm"
			variant="outline">
			{copied ? (
				<CheckIcon className="text-primary" />
			) : (
				<CopyIcon />
			)}
		</Button>
	);
}
