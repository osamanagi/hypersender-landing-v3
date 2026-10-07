"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary, Locale } from "@/i18n-config";
import Link from "next/link";

export const navLinks = [
	{ key: "features", href: "#" },
	{ key: "pricing", href: "#" },
	{ key: "about", href: "#" },
] as const;

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
	const scrolled = useScroll(10);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 mx-auto w-full max-w-7xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
				{
					"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-6xl md:shadow":
						scrolled,
				}
			)}
		>
			<nav
				className={cn(
					"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
					{
						"md:px-2": scrolled,
					}
				)}
			>
				<Link
					className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
					href={`/${locale}`}
				>
					<Logo className="h-4" />
				</Link>
				<div className="hidden items-center gap-2 md:flex">
					<div>
						{navLinks.map((link) => (
							<Button
								key={link.key}
								render={<a href={link.href} />}
								nativeButton={false}
								size="sm"
								variant="ghost"
							>
								{dict.header.nav[link.key]}
							</Button>
						))}
					</div>
					<LocaleSwitcher label={dict.locale.label} locale={locale} />
					<ThemeToggle labels={dict.theme} />
					<Button size="sm" variant="outline">
						{dict.header.signIn}
					</Button>
					<Button size="sm">{dict.header.getStarted}</Button>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<LocaleSwitcher
						label={dict.locale.label}
						locale={locale}
						size="icon"
					/>
					<ThemeToggle labels={dict.theme} size="icon" />
					<MobileNav dict={dict} />
				</div>
			</nav>
		</header>
	);
}
