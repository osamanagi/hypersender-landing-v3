"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/portal";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon } from "lucide-react";
import type { Dictionary } from "@/i18n-config";

export function MobileNav({ dict }: { dict: Dictionary }) {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label={dict.header.openMenu}
				className="md:hidden"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				{open ? (
					<XIcon className="size-4.5" />
				) : (
					<MenuIcon className="size-4.5" />
				)}
			</Button>
			{open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"size-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Button
									className="justify-start"
									key={link.key}
									render={
										<a
											href={link.href}
											rel={link.external ? "noreferrer noopener" : undefined}
											target={link.external ? "_blank" : undefined}
										/>
									}
									nativeButton={false}
									variant="ghost"
								>
									{dict.header.nav[link.key]}
								</Button>
							))}
						</div>
						<div className="mt-12 flex flex-col gap-2">
							<Button className="w-full" variant="outline">
								{dict.header.signIn}
							</Button>
							<Button className="w-full">{dict.header.getStarted}</Button>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
