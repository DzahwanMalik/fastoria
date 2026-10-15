import type { JSX } from "react";
import { useMemo } from "react";
import { FiRefreshCw } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { formatRupiah } from "@/utils/currency";

import type { DashboardStatId } from "./AdminDashboardPage.constants";
import {
  DASHBOARD_STAT_CONFIGS,
  QUICK_ACTIONS,
} from "./AdminDashboardPage.constants";

export default function AdminDashboardPage(): JSX.Element {
  const { user } = useAuth();
  const { stats, isLoading, error, refetch } = useDashboardStats();

  const statValues = useMemo<Record<DashboardStatId, string>>(
    () => ({
      competitions: String(stats.competitions),
      categories: String(stats.categories),
      prize: formatRupiah(stats.prizePool),
    }),
    [stats],
  );

  return (
    <>
      <header className="mb-8">
        <h1 className="font-headline-xl text-headline-xl uppercase tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Selamat datang kembali, {user?.email ?? "admin"}.
        </p>
      </header>

      {isLoading && (
        <Card shadow="md" className="p-8 text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Memuat statistik...
          </p>
        </Card>
      )}

      {!isLoading && error && (
        <Card
          shadow="md"
          className="flex flex-col items-center gap-4 p-8 text-center"
        >
          <p className="font-body-md text-body-md text-tertiary">{error}</p>
          <Button variant="secondary" size="md" onClick={refetch}>
            <FiRefreshCw aria-hidden="true" />
            Coba lagi
          </Button>
        </Card>
      )}

      {!isLoading && !error && (
        <>
          <section
            aria-label="Ringkasan statistik"
            className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3"
          >
            {DASHBOARD_STAT_CONFIGS.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card
                  key={stat.id}
                  bgColor={stat.bgColor}
                  shadow="md"
                  className="flex flex-col gap-3 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                      {stat.label}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-surface-white shadow-neo-xs">
                      <Icon aria-hidden="true" size={18} />
                    </span>
                  </div>

                  <p className="font-headline-lg text-headline-lg leading-none">
                    {statValues[stat.id]}
                  </p>

                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {stat.hint}
                  </p>
                </Card>
              );
            })}
          </section>

          <Card shadow="md" className="mt-8 p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight">
                Aksi Cepat
              </h2>
              <Badge color="surface-container" size="sm" shadow="none">
                Segera
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.id}
                    type="button"
                    disabled={action.disabled}
                    className="flex items-start gap-3 border-2 border-black bg-surface-container-low p-4 text-left transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-surface-container-low"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-surface-white shadow-neo-xs">
                      <Icon aria-hidden="true" size={18} />
                    </span>

                    <span className="min-w-0">
                      <span className="block font-headline-sm text-headline-sm uppercase tracking-tight">
                        {action.title}
                      </span>
                      <span className="mt-1 block font-body-sm text-body-sm text-on-surface-variant">
                        {action.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </>
  );
}
