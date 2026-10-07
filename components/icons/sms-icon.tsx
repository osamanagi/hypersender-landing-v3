/**
 * SMS / text-message glyph — Material Design Icons "sms" outlined variant
 * (Apache-2.0). Outline so it sits at the same visual weight as the other card
 * icons. Monochrome — inherits `currentColor`.
 */
export function SmsIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			aria-hidden="true"
			fill="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7zm8 0h2v2h-2zm-4 0h2v2h-2z" />
		</svg>
	);
}
