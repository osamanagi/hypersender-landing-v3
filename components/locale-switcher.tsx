"use client";

import type { VariantProps } from "class-variance-authority";
import { GlobeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { i18n, type Locale } from "@/i18n-config";

export function LocaleSwitcher({
	label,
	locale,
	size = "icon-sm",
}: {
	label: string;
	locale: Locale;
	size?: VariantProps<typeof buttonVariants>["size"];
}) {
	const pathname = usePathname();
	const router = useRouter();

	const switchTo = (nextLocale: string) => {
		if (!pathname) return;

		// Replace the leading locale segment, keeping the rest of the path.
		const segments = pathname.split("/");
		segments[1] = nextLocale;
		router.push(segments.join("/"));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button aria-label={label} size={size} variant="ghost" />}
			>
				<GlobeIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup onValueChange={switchTo} value={locale}>
					{i18n.locales.map((option) => (
						<DropdownMenuRadioItem key={option} value={option}>
							{i18n.labels[option]}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
