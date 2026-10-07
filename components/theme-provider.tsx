"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * The theme script has to execute from the server-rendered HTML (before first
 * paint) so there is no flash, but when React renders it on the client it must
 * not look like an executable script, otherwise React logs
 * "Encountered a script tag while rendering React component" — which happens
 * whenever the `[lang]` root layout re-renders on a locale change.
 */
const scriptProps = {
	type: typeof window === "undefined" ? "text/javascript" : "text/plain",
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider scriptProps={scriptProps} {...props}>
			{children}
		</NextThemesProvider>
	);
}
