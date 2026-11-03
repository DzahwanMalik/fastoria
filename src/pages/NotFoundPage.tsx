import type { JSX } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";

import Button from "@/components/atoms/Button";
import { useEventSettings } from "@/hooks/useEventSettings";

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();
  const { settings } = useEventSettings();
  const logoUrl = settings?.logo_url;
  const eventName = settings?.event_name || "Fastoria Logo";

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-canvas-bg text-on-surface antialiased flex flex-col items-center justify-center px-margin-mobile py-12">
      <div className="w-full max-w-lg flex flex-col items-center gap-6 text-center">
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

        <div className="w-full bg-surface-white border-[2.5px] border-black shadow-neo-lg p-8 sm:p-10 flex flex-col items-center gap-4">
          <p className="font-headline-xl text-headline-xl leading-none text-tertiary">
            404
          </p>

          <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight">
            Halaman Tidak Ditemukan
          </h1>

          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
          </p>

          <Button
            variant="primary"
            size="md"
            onClick={handleBackHome}
            className="mt-2"
          >
            <FiArrowLeft aria-hidden="true" />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}
