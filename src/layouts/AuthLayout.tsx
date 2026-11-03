import type { JSX, ReactNode } from "react";

import { useEventSettings } from "@/hooks/useEventSettings";

export interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title = "Admin Login",
  subtitle = "Masuk untuk mengelola konten Fastoria.",
}: AuthLayoutProps): JSX.Element {
  const { settings } = useEventSettings();
  const logoUrl = settings?.logo_url;
  const eventName = settings?.event_name || "Fastoria Logo";

  return (
    <div className="min-h-screen bg-canvas-bg text-on-surface antialiased flex flex-col items-center justify-center px-margin-mobile py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="h-14 border-[2.5px] border-black px-3 py-1.5 shadow-neo-sm bg-surface-white flex items-center justify-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={eventName}
                className="h-full w-auto object-contain block"
              />
            ) : (
              <span className="font-headline-md text-base font-black uppercase tracking-tight">
                THE.FASTORIA
              </span>
            )}
          </div>

          <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-center">
            {title}
          </h1>

          <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
            {subtitle}
          </p>
        </div>

        <div className="bg-surface-white border-[2.5px] border-black shadow-neo-lg p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export { AuthLayout };
