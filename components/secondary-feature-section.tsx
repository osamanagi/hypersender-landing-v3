import { cn } from '@/lib/utils';
import type React from 'react';
import { DecorIcon } from '@/components/decor-icon';
import { ActivityIcon, LockIcon, SearchIcon, ZapIcon } from 'lucide-react';
import type { Dictionary } from '@/i18n-config';
import { FullWidthDivider } from './full-width-divider';

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};

type SecondaryFeatureId = keyof Dictionary['secondaryFeatures']['cards'];

/**
 * Icons mirror the ones the old landing page used for these four features:
 * a pulse line (monitoring), a bolt (integrations), a magnifier (searchability)
 * and a padlock (OTP authentication).
 */
const secondaryFeatures: { id: SecondaryFeatureId; icon: React.ReactNode }[] = [
	{ id: 'monitoring', icon: <ActivityIcon /> },
	{ id: 'integrations', icon: <ZapIcon /> },
	{ id: 'searchability', icon: <SearchIcon /> },
	{ id: 'otp', icon: <LockIcon /> },
];

export function SecondaryFeatureSection({ dict }: { dict: Dictionary }) {
	return (
		<div className="relative">
			<FullWidthDivider position="top" />

			<div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-12 px-4 py-16 sm:py-32 md:px-8">
				<div className="mx-auto max-w-2xl space-y-2 text-center">
					<h2 className="font-medium text-3xl tracking-tight md:text-5xl">
						{dict.secondaryFeatures.title}
					</h2>
					<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
						{dict.secondaryFeatures.subtitle}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{secondaryFeatures.map(({ id, icon }) => (
						<FeatureCard
							feature={{ icon, ...dict.secondaryFeatures.cards[id] }}
							key={id}
						/>
					))}
				</div>
			</div>

			<FullWidthDivider position="bottom" />
		</div>
	);
}

function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<'div'> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn(
				'relative flex flex-col justify-between gap-6 bg-background px-6 pt-8 pb-6 shadow-xs',
				// Gradient inspired by testimonials
				'bg-[radial-gradient(50%_80%_at_25%_0%,theme(--color-emerald-600/.2),transparent)]',
				className,
			)}
			{...props}>
			{/* Extended Borders */}
			<div className="absolute -inset-y-4 -left-px w-px bg-border" />
			<div className="absolute -inset-y-4 -right-px w-px bg-border" />
			<div className="absolute -inset-x-4 -top-px h-px bg-border" />
			<div className="absolute -right-4 -bottom-px -left-4 h-px bg-border" />

			{/* Corner Decor */}
			<DecorIcon className="size-3.5" position="top-left" />

			<div className={cn('relative z-10 flex w-fit items-center justify-center rounded-lg border bg-muted/20 p-3', '[&_svg]:size-5 [&_svg]:stroke-[1.5] [&_svg]:text-foreground')}>{feature.icon}</div>

			<div className="relative z-10 space-y-2">
				<h3 className="font-medium text-base text-foreground">{feature.title}</h3>
				<p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
			</div>
		</div>
	);
}
