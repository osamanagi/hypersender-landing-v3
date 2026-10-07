"use client";

import type { VariantProps } from "class-variance-authority";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMounted } from "@/hooks/use-mounted";
import type { Dictionary } from "@/i18n-config";

export function ThemeToggle({
	labels,
	size = "icon-sm",
}: {
	labels: Dictionary["theme"];
	size?: VariantProps<typeof buttonVariants>["size"];
}) {
	const mounted = useMounted();
	const { theme, resolvedTheme, setTheme } = useTheme();

	const options = [
		{ value: "light", label: labels.light },
		{ value: "dark", label: labels.dark },
		{ value: "system", label: labels.system },
	] as const;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button aria-label={labels.label} size={size} variant="ghost" />
				}
			>
				{mounted && resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup
					onValueChange={(value) => setTheme(value as string)}
					value={mounted ? theme : undefined}
				>
					{options.map((option) => (
						<DropdownMenuRadioItem key={option.value} value={option.value}>
							{option.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
