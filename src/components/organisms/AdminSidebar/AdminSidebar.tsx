import type { JSX } from "react";
import { FiLogOut, FiX } from "react-icons/fi";
import { NavLink } from "react-router";
import { toast } from "sonner";

import fastoriaLogo from "@/assets/images/LOGO PNG.png";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/hooks/useAuth";

import { ADMIN_NAV_ITEMS } from "./AdminSidebar.constants";
import type { AdminSidebarProps } from "./AdminSidebar.types";

export default function AdminSidebar({
  open,
  onClose,
}: AdminSidebarProps): JSX.Element {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Berhasil keluar.");
  };

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        aria-label="Navigasi admin"
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-surface-white border-r-[3px] border-black transition-transform duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-20 px-5 border-b-[3px] border-black flex items-center gap-3">
          <div className="h-11 border-[2.5px] border-black px-2 py-1 shadow-neo-sm flex items-center justify-center shrink-0">
            <img
              src={fastoriaLogo}
              alt="Fastoria Logo"
              className="h-full w-auto object-contain block"
            />
          </div>

          <span className="font-headline-md text-lg font-black uppercase tracking-tight leading-tight">
            THE<span className="text-tertiary">.</span>FASTORIA
            <span className="block font-label-caps text-label-caps text-on-surface-variant">
              Admin
            </span>
          </span>

          <Button
            variant="secondary"
            size="sm"
            className="ml-auto p-0! w-9 h-9 shrink-0 lg:hidden"
            onClick={onClose}
            aria-label="Tutup menu navigasi"
          >
            <FiX size={18} />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            if (item.disabled) {
              return (
                <span
                  key={item.label}
                  aria-disabled="true"
                  className="flex items-center gap-3 px-4 py-3 border-2 border-black/20 font-headline-sm text-sm uppercase tracking-wide text-on-surface-variant/60 cursor-not-allowed"
                >
                  <Icon aria-hidden="true" size={18} />
                  {item.label}
                  <Badge
                    color="surface-container"
                    size="sm"
                    shadow="none"
                    className="ml-auto"
                  >
                    Soon
                  </Badge>
                </span>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 border-[2.5px] border-black font-headline-sm text-sm uppercase tracking-wide transition-all ${
                    isActive
                      ? "bg-primary-container shadow-neo-sm"
                      : "bg-surface-white hover:bg-surface-container"
                  }`
                }
              >
                <Icon aria-hidden="true" size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t-[3px] border-black">
          <p className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant mb-1">
            Masuk sebagai
          </p>
          <p className="font-body-sm text-body-sm text-on-surface truncate mb-3">
            {user?.email ?? "admin"}
          </p>

          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => void handleSignOut()}
          >
            <FiLogOut aria-hidden="true" />
            Keluar
          </Button>
        </div>
      </aside>
    </>
  );
}
