import type { JSX } from "react";
import { Toaster } from "sonner";

/**
 * Global toast host. Sonner is rendered "unstyled" so every toast is painted
 * with the Electric Neo-Brutalist tokens instead of sonner's defaults.
 */
export default function AppToaster(): JSX.Element {
  return (
    <Toaster
      position="bottom-right"
      theme="light"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-full items-start gap-3 border-[2.5px] border-black shadow-neo-md p-4 font-body-sm text-body-sm text-on-surface",
          title: "font-headline-sm text-headline-sm",
          description: "font-body-sm text-body-sm text-on-surface-variant",
          icon: "shrink-0 mt-0.5",
          default: "bg-surface-white",
          success: "bg-primary-container",
          error: "bg-punch-coral text-surface-white",
          info: "bg-electric-cyan",
          warning: "bg-electric-yellow",
        },
      }}
    />
  );
}
