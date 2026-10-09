"use client";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { type CHANNEL, ChannelToggle } from "@/components/channel-toggle";
import { type FREQUENCY, FrequencyToggle } from "@/components/frequency-toggle";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import type { Dictionary } from "@/i18n-config";
import { StarIcon, CheckCircleIcon } from "lucide-react";

type PlanId = keyof Dictionary["pricing"]["plans"]["whatsapp"];

type Plan = {
	id: PlanId;
	href: string;
	/**
	 * Price per month. `yearly` is the yearly total divided by twelve so the
	 * discount badge compares like with like. Left out for the free and
	 * enterprise tiers, which show a label instead.
	 */
	price?: {
		monthly: number;
		yearly: number;
	};
	popular?: boolean;
};

const whatsappPlans: Plan[] = [
	{
		id: "free",
		href: "https://app.hypersender.com/subscriptions/new?type=1",
	},
	{
		id: "starter",
		href: "https://app.hypersender.com/subscriptions/new?type=1",
		price: { monthly: 9.99, yearly: 8.33 },
		popular: true,
	},
	{
		id: "pro",
		href: "https://app.hypersender.com/subscriptions/new?type=1",
		price: { monthly: 26.99, yearly: 22.5 },
	},
	{
		id: "business",
		href: "https://app.hypersender.com/subscriptions/new?type=1",
		price: { monthly: 39.99, yearly: 33.33 },
	},
	{
		id: "enterprise",
		href: "https://wa.me/201065684630",
	},
];

const smsPlans: Plan[] = [
	{
		id: "free",
		href: "https://app.hypersender.com/subscriptions/new?type=2",
	},
	{
		id: "starter",
		href: "https://app.hypersender.com/subscriptions/new?type=2",
		price: { monthly: 7.99, yearly: 6.67 },
		popular: true,
	},
	{
		id: "pro",
		href: "https://app.hypersender.com/subscriptions/new?type=2",
		price: { monthly: 22.5, yearly: 18.75 },
	},
	{
		id: "business",
		href: "https://app.hypersender.com/subscriptions/new?type=2",
		price: { monthly: 34.99, yearly: 55.42 },
	},
	{
		id: "enterprise",
		href: "https://wa.me/201065684630",
	},
];

const plans: Record<CHANNEL, Plan[]> = {
	whatsapp: whatsappPlans,
	sms: smsPlans,
};

export function PricingSection({ dict }: { dict: Dictionary }) {
	const [frequency, setFrequency] = React.useState<FREQUENCY>("monthly");
	const [channel, setChannel] = React.useState<CHANNEL>("whatsapp");

	return (
		<div className="relative">
			<div className="flex w-full flex-col items-center justify-center space-y-7 p-4">
				<div className="mx-auto max-w-xl space-y-2">
					<h2 className="text-center font-bold text-2xl tracking-tight md:text-3xl lg:font-extrabold lg:text-4xl">
						{dict.pricing.title}
					</h2>
					<p className="text-center text-muted-foreground text-sm md:text-base">
						{dict.pricing.subtitle}
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-3">
					<ChannelToggle
						channel={channel}
						labels={{
							whatsapp: dict.pricing.whatsapp,
							sms: dict.pricing.sms,
						}}
						setChannel={setChannel}
					/>
					<FrequencyToggle
						frequency={frequency}
						labels={{
							monthly: dict.pricing.monthly,
							yearly: dict.pricing.yearly,
						}}
						setFrequency={setFrequency}
					/>
				</div>

				<div className="mx-auto grid w-full max-w-7xl gap-6 grid-cols-1 md:grid-cols-3">
					{plans[channel].map((plan) => (
						<PricingCard
							channel={channel}
							dict={dict}
							frequency={frequency}
							key={plan.id}
							plan={plan}
						/>
					))}
				</div>
			</div>

			<FullWidthDivider position="bottom" />
			<DecorIcon className="size-4" position="bottom-left" />
			<DecorIcon className="size-4" position="bottom-right" />
		</div>
	);
}

type PricingCardProps = React.ComponentProps<"div"> & {
	channel: CHANNEL;
	dict: Dictionary;
	frequency: FREQUENCY;
	plan: Plan;
};

export function PricingCard({
	channel,
	dict,
	frequency,
	plan,
	className,
	...props
}: PricingCardProps) {
	const copy = dict.pricing.plans[channel][plan.id];
	const price = plan.price;
	const discount =
		price && frequency === "yearly" && price.monthly > price.yearly
			? Math.round(((price.monthly - price.yearly) / price.monthly) * 100)
			: null;

	const href = `${plan.href}&is_yearly=${frequency === "yearly"}`;

	return (
		<div
			className={cn(
				"relative flex w-full flex-col overflow-hidden rounded-lg border shadow-xs",
				className
			)}
			{...props}
		>
			<div
				className={cn(
					"border-b p-4",
					plan.popular && "bg-card dark:bg-card/80"
				)}
			>
				<div className="absolute end-2 top-2 z-10 flex items-center gap-2">
					{plan.popular && (
						<div className="flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs">
							<StarIcon className="size-3 fill-current" />
							{dict.pricing.popular}
						</div>
					)}

					<AnimatePresence>
						{discount !== null && (
							<motion.div
								animate={{ opacity: 1 }}
								className="flex items-center gap-1 rounded-md border bg-primary px-2 py-0.5 text-primary-foreground text-xs"
								exit={{ opacity: 0 }}
								initial={{ opacity: 0 }}
								key="discount-badge"
								layout
								transition={{ duration: 0.15 }}
							>
								{dict.pricing.discount.replace(
									"{percent}",
									String(discount)
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className="font-medium text-lg">{copy.name}</div>
				<p className="font-normal text-muted-foreground text-sm">{copy.info}</p>
				<h3 className="mt-6 mb-1 flex w-max items-end gap-1">
					{price ? (
						<NumberFlow
							className="font-extrabold text-3xl [&::part(suffix)]:font-normal [&::part(suffix)]:text-base [&::part(suffix)]:text-muted-foreground"
							format={{
								style: "currency",
								currency: "USD",
							}}
							suffix={dict.pricing.perMonth}
							value={price[frequency]}
						/>
					) : (
						<span className="font-extrabold text-3xl">
							{"priceLabel" in copy ? copy.priceLabel : null}
						</span>
					)}
				</h3>
				<p className="mb-2 font-normal text-muted-foreground text-xs">
					{frequency === "yearly"
						? dict.pricing.billedYearly
						: dict.pricing.billedMonthly}
				</p>
			</div>
			<div
				className={cn(
					"space-y-3 px-4 pt-6 pb-8 text-muted-foreground text-sm",
					plan.popular && "bg-muted/10"
				)}
			>
				{copy.features.map((feature) => (
					<div className="flex items-center gap-2" key={feature}>
						<CheckCircleIcon className="size-3.5 shrink-0 text-foreground" />
						<p>{feature}</p>
					</div>
				))}
			</div>
			<div
				className={cn(
					"mt-auto w-full border-t p-3",
					plan.popular && "bg-card dark:bg-card/80"
				)}
			>
				<Button
					className="w-full"
					nativeButton={false}
					render={<Link href={href} />}
					variant={plan.popular ? "default" : "outline"}
				>
					{copy.cta}
				</Button>
			</div>
		</div>
	);
}
