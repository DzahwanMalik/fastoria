import type { JSX, ReactNode } from "react";

import fastoriaLogo from "@/assets/images/LOGO PNG.png";

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
  return (
    <div className="min-h-screen bg-canvas-bg text-on-surface antialiased flex flex-col items-center justify-center px-margin-mobile py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="h-14 border-[2.5px] border-black px-3 py-1.5 shadow-neo-sm bg-surface-white flex items-center justify-center">
            <img
              src={fastoriaLogo}
              alt="Fastoria Logo"
              className="h-full w-auto object-contain block"
            />
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
