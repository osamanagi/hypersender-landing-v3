"use client";

import { useRef, useState, useEffect, type ComponentPropsWithoutRef } from "react";
import type { Locale } from "@/i18n-config";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeBlock({ locale = "en", ...props }: ComponentPropsWithoutRef<"pre"> & { locale?: Locale }) {
  const ref = useRef<HTMLPreElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const labels = locale === "ar" ? ["نسخ الكود", "تم النسخ", "تعذر النسخ"] : ["Copy code", "Copied", "Could not copy"];
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(ref.current?.querySelector("code")?.textContent ?? "");
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="code-block relative" dir="ltr">
      <div className="flex items-center justify-between gap-3 border-b bg-muted/50 px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{(props as Record<string, unknown>)["data-language"] as string ?? "code"}</span>
        <Button aria-label={labels[0]} size="sm" variant="ghost" onClick={copy}>
          {status === "copied" ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
          <span aria-live="polite">{labels[status === "copied" ? 1 : status === "error" ? 2 : 0]}</span>
        </Button>
      </div>
      <pre {...props} ref={ref} />
    </div>
  );
}
