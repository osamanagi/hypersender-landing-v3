import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/decor-icon";

type Language = {
	/** Optional: omitted when the logo asset is itself a wordmark. */
	name?: string;
	src: string;
	color: string;
	/** Optional image sizing override, for wordmark-style logos. */
	imgClassName?: string;
};

const languages = {
	laravel: {
		name: "Laravel",
		src: "/Images/logos/laravel.svg",
		color: "#FF2D20",
	},
	nodejs: {
		name: "Node.js",
		src: "/Images/logos/nodejs.svg",
		color: "#5FA04E",
	},
	rest: {
		name: "REST",
		src: "/Images/logos/rest.svg",
		color: "#0EA5E9",
	},
	go: {
		name: "Go",
		src: "/Images/logos/goland.svg",
		color: "#00ADD8",
	},
	python: {
		name: "Python",
		src: "/Images/logos/python.svg",
		color: "#3776AB",
	},
	swift: {
		name: "Swift",
		src: "/Images/logos/swift.svg",
		color: "#F05138",
	},
	dotnet: {
		src: "/Images/logos/dotNet.svg",
		color: "#512BD4",
		imgClassName: "h-4 w-14 md:h-5 md:w-16",
	},
	kotlin: {
		name: "Kotlin",
		src: "/Images/logos/kotlin.svg",
		color: "#7F52FF",
	},
} satisfies Record<string, Language>;

export function LogoCloud() {
	return (
		<div className="grid grid-cols-2 border md:grid-cols-4">
			<LogoCard
				className="relative border-r border-b bg-secondary dark:bg-secondary/30"
				language={languages.laravel}
			>
				<DecorIcon className="z-10" position="bottom-right" />
			</LogoCard>

			<LogoCard
				className="border-b md:border-r"
				language={languages.nodejs}
			/>

			<LogoCard
				className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
				language={languages.rest}
			>
				<DecorIcon className="z-10" position="bottom-right" />
				<DecorIcon className="z-10 hidden md:block" position="bottom-left" />
			</LogoCard>

			<LogoCard
				className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
				language={languages.go}
			/>

			<LogoCard
				className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
				language={languages.python}
			>
				<DecorIcon className="z-10 md:hidden" position="bottom-right" />
			</LogoCard>

			<LogoCard
				className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
				language={languages.swift}
			/>

			<LogoCard className="border-r" language={languages.dotnet} />

			<LogoCard
				className="bg-secondary dark:bg-secondary/30"
				language={languages.kotlin}
			/>
		</div>
	);
}

type LogoCardProps = React.ComponentProps<"div"> & {
	language: Language;
};

function LogoCard({ language, className, children, ...props }: LogoCardProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-center gap-2.5 bg-background px-4 py-8 md:p-8",
				className
			)}
			{...props}
		>
			<img
				alt=""
				aria-hidden="true"
				className={cn(
					"pointer-events-none size-6 shrink-0 select-none dark:brightness-150 md:size-7",
					language.imgClassName
				)}
				height="auto"
				src={language.src}
				width="auto"
			/>
			{language.name ? (
				<span
					className="font-semibold text-sm tracking-tight dark:brightness-150 md:text-base"
					style={{ color: language.color }}
				>
					{language.name}
				</span>
			) : null}
			{children}
		</div>
	);
}
