import type { JSX } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

import type { LandingErrorProps } from "./LandingError.types";

export default function LandingError({
  title = "Koneksi ke Server Terputus",
  message = "Gagal memuat data event dari database. Periksa koneksi internet Anda atau coba beberapa saat lagi.",
  onRetry,
  className = "",
}: LandingErrorProps = {}): JSX.Element {
  return (
    <div
      role="alert"
      className={`min-h-screen bg-canvas-bg flex items-center justify-center p-4 selection:bg-primary-container selection:text-on-surface ${className}`.trim()}
    >
      <Card
        bgColor="white"
        borderWidth="thick"
        shadow="xl"
        className="max-w-lg w-full p-6 sm:p-10 text-center relative overflow-hidden"
      >
        <div className="flex justify-center mb-6">
          <Badge color="punch-coral" rotate="left" borderWidth="thick" shadow="sm">
            GAGAL MEMUAT DATA
          </Badge>
        </div>

        {/* Warning Icon Badge Container */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-[3px] border-black bg-punch-coral shadow-neo-sm flex items-center justify-center -rotate-2">
            <FiAlertTriangle size={34} className="text-black" aria-hidden="true" />
          </div>
        </div>

        <h2 className="font-headline-md text-xl sm:text-2xl uppercase font-black tracking-tight text-on-surface mb-3">
          {title}
        </h2>

        <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-md mx-auto mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          {onRetry && (
            <Button variant="primary" size="lg" onClick={onRetry}>
              <FiRefreshCw className="text-lg" aria-hidden="true" />
              <span>Coba Lagi</span>
            </Button>
          )}

          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.reload()}
          >
            <span>Muat Ulang Halaman</span>
          </Button>
        </div>

        <p className="mt-8 font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">
          FAST &bull; ART &bull; SPORT // FASTORIA 2027
        </p>
      </Card>
    </div>
  );
}
