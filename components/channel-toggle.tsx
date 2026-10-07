"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type React from "react";
import { SmsIcon } from "@/components/icons/sms-icon";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

export type CHANNEL = "whatsapp" | "sms";

type ChannelToggleProps = React.ComponentProps<"div"> & {
	channel: CHANNEL;
	setChannel: React.Dispatch<React.SetStateAction<CHANNEL>>;
	labels: Record<CHANNEL, string>;
};

/** WhatsApp / SMS switch — same treatment as the monthly / yearly toggle. */
export function ChannelToggle({
	channel,
	setChannel,
	labels,
	className,
	...props
}: ChannelToggleProps) {
	return (
		<div
			className={cn(
				"mx-auto flex w-fit rounded-xl border bg-card p-1 shadow-xs",
				className
			)}
			{...props}
		>
			{(["whatsapp", "sms"] as const).map((value) => (
				<button
					className="relative flex items-center px-4 py-1 text-sm [&_svg]:size-4"
					key={value}
					onClick={() => setChannel(value)}
					type="button"
				>
					<span className="relative z-10 flex items-center gap-1.5">
						{value === "whatsapp" ? <WhatsappIcon /> : <SmsIcon />}
						{labels[value]}
					</span>
					{channel === value && (
						<motion.span
							className="absolute inset-0 z-10 rounded-xl bg-background mix-blend-difference dark:bg-foreground"
							layoutId="channel"
							transition={{ type: "spring", duration: 0.4 }}
						/>
					)}
				</button>
			))}
		</div>
	);
}
