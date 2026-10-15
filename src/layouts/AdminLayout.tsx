import type { JSX } from "react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router";

import Button from "@/components/atoms/Button";
import AdminSidebar from "@/components/organisms/AdminSidebar";

export default function AdminLayout(): JSX.Element {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas-bg text-on-surface antialiased">
      <AdminSidebar
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 h-16 bg-surface-white border-b-[3px] border-black shadow-neo-sm flex items-center gap-3 px-margin-mobile md:px-margin">
          <Button
            variant="secondary"
            size="sm"
            className="lg:hidden p-0! w-11 h-11 shrink-0"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka menu navigasi"
          >
            <FiMenu size={24} />
          </Button>

          <span className="font-headline-sm text-headline-sm uppercase tracking-tight">
            Admin Panel
          </span>
        </header>

        <main className="flex-1 px-margin-mobile md:px-margin py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export { AdminLayout };
