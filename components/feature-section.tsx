"use client";

import * as React from "react";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Dictionary } from "@/i18n-config";
import { SmsIcon } from "@/components/icons/sms-icon";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { KeyRoundIcon, LinkIcon } from "lucide-react";

type FeatureId = keyof Dictionary["features"]["tabs"];

type FeatureTab = {
	id: FeatureId;
	icon: React.ReactNode;
	embedSrc: string;
	embedTitle: string;
};

/**
 * One card per product area, each opening its Arcade walkthrough in the panel
 * below. The WhatsApp / SMS webhook tabs from the old landing page are left out.
 */
const featureTabs: FeatureTab[] = [
	{
		id: "whatsapp",
		icon: <WhatsappIcon className="size-7" />,
		embedSrc:
			"https://demo.arcade.software/HHVp2JwKurmOMU05KSpZ?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true",
		embedTitle: "Seamlessly Send Messages via Hypersender WhatsApp API",
	},
	{
		id: "sms",
		icon: <SmsIcon className="size-7" />,
		embedSrc:
			"https://demo.arcade.software/4eIF73n5oj3HBhoII0yh?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true",
		embedTitle: "Seamlessly Configure and Test API Requests with Hypersender SMS",
	},
	{
		id: "otpRequest",
		icon: <KeyRoundIcon className="size-7" />,
		embedSrc:
			"https://demo.arcade.software/PwO3GckpVUsixrQX4K8G?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true",
		embedTitle: "Send OTP via the API Using Postman",
	},
	{
		id: "otpLink",
		icon: <LinkIcon className="size-7" />,
		embedSrc:
			"https://demo.arcade.software/PdNJvHRkkBIpPaHPxQdT?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true",
		embedTitle: "Generate a WhatsApp OTP Link with Hypersender API",
	},
];

export function FeatureSection({ dict }: { dict: Dictionary }) {
	const [mountedTabs, setMountedTabs] = React.useState<Set<FeatureId>>(
		() => new Set<FeatureId>([featureTabs[0].id])
	);

	return (
		<div className="mx-auto w-full max-w-7xl place-content-center space-y-12" id="features">
			<div className="mx-auto max-w-2xl space-y-2 text-center px-4">
				<h2 className="font-medium text-3xl tracking-tight md:text-5xl">{dict.features.title}</h2>
				<p className="text-muted-foreground text-sm leading-relaxed md:text-base">{dict.features.subtitle}</p>
			</div>

			<Tabs className="gap-0" defaultValue={featureTabs[0].id} onValueChange={(value) => setMountedTabs((previous) => (previous.has(value as FeatureId) ? previous : new Set(previous).add(value as FeatureId)))}>
				<div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
					<DecorIcon className="size-4" position="top-left" />
					<DecorIcon className="size-4" position="top-right" />
					<FullWidthDivider position="top" />
					<TabsList className="contents">
						{featureTabs.map((tab) => (
							<TabsTrigger
								className="group/card relative flex h-auto! w-full flex-col items-start justify-between overflow-hidden whitespace-normal rounded-none border-0 bg-background p-4 text-start data-active:bg-secondary data-active:shadow-none! md:p-6 dark:data-active:bg-secondary/30"
								key={tab.id}
								value={tab.id}>
								<span className="relative z-10 flex items-center py-2 [&_svg]:text-primary">{tab.icon}</span>

								<span className="relative z-10 flex flex-col gap-2">
									<span className="font-medium text-foreground text-lg">{dict.features.tabs[tab.id].title}</span>
									<span className="text-muted-foreground text-xs leading-relaxed">{dict.features.tabs[tab.id].description}</span>
								</span>
							</TabsTrigger>
						))}
					</TabsList>
					<FullWidthDivider position="bottom" />
					<DecorIcon className="size-4" position="bottom-left" />
					<DecorIcon className="size-4" position="bottom-right" />
				</div>

				{featureTabs.map((tab) => (
					<TabsContent className="relative overflow-hidden" keepMounted={mountedTabs.has(tab.id)} key={tab.id} value={tab.id}>
						<ArcadeEmbed src={tab.embedSrc} title={tab.embedTitle} />
						<FullWidthDivider position="bottom" />
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}

function ArcadeEmbed({ src, title }: { src: string; title: string }) {
	return (
		<div className="relative h-0 w-full overflow-hidden pb-[calc(54.285714285714285%+41px)]">
			<iframe
				allow="clipboard-write"
				allowFullScreen
				className="absolute -inset-5 size-[calc(100%_+_2rem)]"
				loading="lazy"
				src={src}
				style={{ colorScheme: "light" }}
				title={title}
			/>
		</div>
	);
}
