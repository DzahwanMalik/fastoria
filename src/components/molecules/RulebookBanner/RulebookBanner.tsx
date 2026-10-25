import type { JSX } from "react";
import { FiBookOpen } from "react-icons/fi";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

import type { RulebookBannerProps } from "./RulebookBanner.types";

const DEFAULT_RULEBOOK_URL =
  "https://drive.google.com/file/d/1Ke5OjKLzGnHz6vrluyXsYEAdQ36fxCUw/view?usp=drive_link";

export default function RulebookBanner({
  title = "Buku Panduan Teknis Lengkap (Official Rulebook)",
  description = "Memuat kriteria penilaian detail, tata tertib kompetisi, dan alur perlombaan.",
  downloadLabel = "Unduh PDF Rulebook",
  downloadUrl = DEFAULT_RULEBOOK_URL,
  onDownloadClick,
  className = "",
}: RulebookBannerProps = {}): JSX.Element {
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
          <FiBookOpen size={24} className="text-black" aria-hidden="true" />
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
        href={downloadUrl}
        target={downloadUrl ? "_blank" : undefined}
        rel={downloadUrl ? "noopener noreferrer" : undefined}
        onClick={onDownloadClick}
        className="w-full md:w-auto text-center whitespace-nowrap hover:bg-electric-yellow"
      >
        {downloadLabel}
      </Button>
    </Card>
  );
}
