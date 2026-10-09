import type React from "react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import {
	ArrowUpRightIcon,
	KeyRoundIcon,
	LinkIcon,
	ShieldCheckIcon,
} from "lucide-react";

type StepId = keyof Dictionary["otp"]["steps"];

const otpDocsUrl = "https://docs.hypersender.com/v2/api-reference/otp";

/**
 * One step per OTP endpoint, in the order the flow runs in. The icons mirror the
 * ones the feature tabs already use for OTP (a key and a link).
 */
const steps: { id: StepId; icon: React.ReactNode; href: string }[] = [
	{
		id: "request",
		icon: <KeyRoundIcon />,
		href: `${otpDocsUrl}/otp-service/request-code`,
	},
	{
		id: "validate",
		icon: <ShieldCheckIcon />,
		href: `${otpDocsUrl}/otp-service/validate-code`,
	},
	{
		id: "callback",
		icon: <LinkIcon />,
		href: `${otpDocsUrl}/otp-service/generate-link`,
	},
];

/**
 * Layout follows the efferd `features-2` block: a dashed frame with corner decor
 * around three columns that are wired together by dashed connectors, so the OTP
 * steps read as a flow. The only change to the block is that each column is a
 * link to the docs page of the endpoint it describes.
 */
export function OtpSection({ dict }: { dict: Dictionary }) {
	return (
		<div className="relative" id="otp">
			<FullWidthDivider position="top" />

			<div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-12 px-4 py-16 sm:py-32 md:px-8">
				<div className="mx-auto max-w-2xl space-y-2 text-center">
					<h2 className="font-medium text-3xl tracking-tight md:text-5xl">
						{dict.otp.title}
					</h2>
					<p className="text-muted-foreground text-sm leading-relaxed md:text-base">
						{dict.otp.subtitle}
					</p>
				</div>

				<div className="relative mx-auto w-full max-w-4xl">
					{/* Corner Icons */}
					<DecorIcon
						className="size-6 stroke-2 stroke-border"
						position="top-left"
					/>
					<DecorIcon
						className="size-6 stroke-2 stroke-border"
						position="top-right"
					/>
					<DecorIcon
						className="size-6 stroke-2 stroke-border"
						position="bottom-left"
					/>
					<DecorIcon
						className="size-6 stroke-2 stroke-border"
						position="bottom-right"
					/>

					<DashedLine className="inset-x-3 top-[-1.5px]" />
					<DashedLine className="inset-x-3 bottom-[-1.5px]" />
					<DashedLine className="inset-y-3 start-[-1.5px]" />
					<DashedLine className="inset-y-3 end-[-1.5px]" />

					<div className="grid grid-cols-1 md:grid-cols-3">
						{steps.map(({ id, icon, href }) => (
							<a
								className="group relative flex flex-col items-start gap-4 p-8"
								href={href}
								key={id}
								rel="noreferrer"
								target="_blank">
								<span className="[&_svg]:size-7 [&_svg]:text-muted-foreground">
									{icon}
								</span>

								<div className="space-y-1.5">
									<h3 className="flex items-center gap-1.5 font-medium text-lg">
										{dict.otp.steps[id].title}
										<ArrowUpRightIcon className="size-4 text-muted-foreground transition-colors group-hover:text-primary rtl:-scale-x-100" />
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{dict.otp.steps[id].description}
									</p>
								</div>

								<DashedLine className="inset-x-5 bottom-0 group-last:hidden md:inset-y-5 md:start-full md:end-auto" />
							</a>
						))}
					</div>
				</div>

				<div className="mx-auto max-w-xl space-y-2 text-center">
					<h3 className="font-medium text-xl tracking-tight md:text-2xl">
						{dict.otp.cta.title}
					</h3>
					<p className="text-muted-foreground text-sm leading-relaxed">
						{dict.otp.cta.description}
					</p>

					<div className="flex flex-wrap items-center justify-center gap-3 pt-4">
						<Button
							nativeButton={false}
							render={
								<a
									href={`${otpDocsUrl}/introduction`}
									rel="noreferrer"
									target="_blank"
								/>
							}>
							{dict.otp.cta.docs}
						</Button>
						<Button
							nativeButton={false}
							render={
								<a
									href={`${otpDocsUrl}/otp-collection.json`}
									rel="noreferrer"
									target="_blank"
								/>
							}
							variant="outline">
							{dict.otp.cta.postman}
						</Button>
					</div>
				</div>
			</div>

			<FullWidthDivider position="bottom" />
		</div>
	);
}

function DashedLine({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			aria-hidden="true"
			className={cn("absolute border border-dashed", className)}
			{...props}
		/>
	);
}
