import type { JSX } from "react";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

import type { RulebookBannerProps } from "./RulebookBanner.types";

export default function RulebookBanner({
  title = "Buku Panduan Teknis Lengkap (Official Rulebook)",
  description = "Memuat kriteria penilaian detail, template presentasi, dan tata tertib kompetisi.",
  downloadLabel = "Unduh PDF (4.2 MB)",
  onDownloadClick,
  className = "",
}: RulebookBannerProps): JSX.Element {
  const handleDownload = () => {
    if (onDownloadClick) {
      onDownloadClick();
    } else {
      alert("Download Buku Panduan ARENA.FEST 2025 (PDF) berhasil dimulai!");
    }
  };

  return (
    <Card
      bgColor="container"
      borderWidth="normal"
      shadow="md"
      id="panduan"
      className={`mt-12 p-6 flex flex-col md:flex-row items-center justify-between gap-6 scroll-mt-24 ${className}`.trim()}
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Book Icon Plate */}
        <Card
          bgColor="tertiary"
          borderWidth="thin"
          shadow="xs"
          className="w-12 h-12 flex items-center justify-center shrink-0"
        >
          <span
            className="material-symbols-outlined text-tertiary text-2xl select-none"
            aria-hidden="true"
          >
            menu_book
          </span>
        </Card>

        {/* Text Details */}
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
            {title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>

      {/* Tactile Download Button */}
      <Button
        variant="secondary"
        size="lg"
        onClick={handleDownload}
        className="w-full md:w-auto text-center whitespace-nowrap hover:bg-electric-yellow"
      >
        {downloadLabel}
      </Button>
    </Card>
  );
}
