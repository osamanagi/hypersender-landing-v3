"use client";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `false` during SSR and the hydration render, then `true` on the
 * client. Hydration-safe alternative to a `setState` mount flag.
 */
export function useMounted() {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);
}
