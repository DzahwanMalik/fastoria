import type { JSX, ReactNode } from "react";

import Navbar from "@/components/organisms/Navbar";

export interface MainLayoutProps {
  children: ReactNode;
  onRegisterClick?: () => void;
}

export default function MainLayout({
  children,
}: MainLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-canvas-bg text-on-surface antialiased selection:bg-primary-container selection:text-on-surface">
      {/* Sticky Top Organism */}
      <Navbar />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-canvas-bg min-h-screen">
        {children}
      </main>
    </div>
  );
}

export { MainLayout };
