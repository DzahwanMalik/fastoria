import type { JSX } from "react";
import { FiArrowRight, FiAward, FiFileText, FiUsers } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import CountdownTimer from "@/components/molecules/CountdownTimer";
import HeroArtwork from "@/components/molecules/HeroArtwork";
import HighlightItem from "@/components/molecules/HighlightItem";

import type { HeroProps } from "./Hero.types";

export default function Hero({ onRegisterClick }: HeroProps = {}): JSX.Element {
  return (
    <section
      id="hero"
      className="relative w-full max-w-7xl mx-auto px-margin-mobile md:px-margin pt-8 pb-16 md:py-16"
    >
      {/* Neo-Brutalist Master Container Card */}
      <Card
        bgColor="white"
        shadow="xl"
        borderWidth="thick"
        className="relative p-6 md:p-12 overflow-hidden"
      >
        {/* Top Badges & Neo-Stickers Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Badge color="electric-yellow" rotate="left" borderWidth="thick">
            PENDAFTARAN GELOMBANG 2 DIBUKA
          </Badge>
          <Badge color="soft-lilac" rotate="right" pulse>
            KUOTA TERBATAS
          </Badge>
        </div>

        {/* 2-Column Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Countdown & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-4 mb-8">
              <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-[50px] md:leading-14 text-on-surface tracking-tight uppercase font-extrabold">
                Tunjukkan Bakat, Rebut Total Hadiah{" "}
                <Badge
                  color="lime"
                  rotate="left"
                  borderWidth="thick"
                  size="inherit"
                  shadow="sm"
                  className="mt-1"
                >
                  Rp 75.000.000!
                </Badge>
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Ajang kompetisi nasional desain antarmuka, rekayasa perangkat
                lunak, dan inovasi bisnis untuk mahasiswa serta talenta muda
                terbaik di seluruh Indonesia. Siapkan karyamu dan jadilah jawara
                di arena!
              </p>
            </div>

            {/* Countdown Timer Molecule (Self-contained timer logic) */}
            <CountdownTimer />

            {/* Action Buttons Row with Button Atoms */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                href="#kategori"
                onClick={onRegisterClick}
                variant="primary"
                size="lg"
              >
                <span>Daftar Sekarang</span>
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="#panduan" variant="secondary" size="lg">
                <FiFileText className="text-lg text-tertiary" />
                <span>Unduh Rulebook (PDF)</span>
              </Button>
            </div>

            {/* Micro Highlights with HighlightItem Molecules */}
            <div className="mt-8 pt-6 border-t-2 border-surface-container flex flex-wrap items-center gap-6 text-on-surface-variant font-label-md text-xs sm:text-sm">
              <HighlightItem
                icon={<FiUsers className="text-secondary" />}
                label="500+ Tim Berpartisipasi"
              />
              <HighlightItem
                icon={<FiAward className="text-tertiary" />}
                label="Sertifikat Berlisensi Nasional"
              />
            </div>
          </div>

          {/* Right Column: HeroArtwork Molecule (5 cols) */}
          <HeroArtwork />
        </div>
      </Card>
    </section>
  );
}
