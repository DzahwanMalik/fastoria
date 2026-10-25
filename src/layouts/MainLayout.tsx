import type { JSX, ReactNode } from "react";

import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import type { Tables } from "@/types/database";

export interface MainLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  settings?: Tables<"event_settings"> | null;
}

export default function MainLayout({
  children,
  showFooter = true,
  settings,
}: MainLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-canvas-bg text-on-surface antialiased selection:bg-primary-container selection:text-on-surface flex flex-col justify-between">
      {/* Sticky Top Organism */}
      <Navbar
        logoUrl={settings?.logo_url}
        eventName={settings?.event_name}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-canvas-bg min-h-screen flex-1">
        {children}
      </main>

      {/* Global Footer Organism */}
      {showFooter && <Footer />}
    </div>
  );
}

export { MainLayout };
