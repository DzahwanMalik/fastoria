import type { JSX } from "react";
import { useMemo } from "react";
import { FiArrowRight, FiFileText } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import CountdownTimer from "@/components/molecules/CountdownTimer";
import HeroArtwork from "@/components/molecules/HeroArtwork";
import { formatRupiah } from "@/utils/currency";
import { formatTimelineDate } from "@/utils/date";
import { toEventSettingsValues } from "@/utils/eventSettings";

import {
  DEFAULT_HERO_DESCRIPTION,
  DEFAULT_HERO_EVENT_NAME,
  DEFAULT_HERO_PRIZE,
  DEFAULT_HERO_REGISTRATION_BADGE,
  DEFAULT_HERO_SUB_BADGE,
} from "./Hero.constants";
import type { HeroProps } from "./Hero.types";

export default function Hero({
  settings,
  onRegisterClick,
  onGuidebookClick,
}: HeroProps = {}): JSX.Element {
  const values = useMemo(
    () => (settings ? toEventSettingsValues(settings) : null),
    [settings],
  );

  const eventName = settings?.event_name?.trim() || DEFAULT_HERO_EVENT_NAME;

  const prizeFormatted = settings?.prize_pool
    ? `${formatRupiah(settings.prize_pool)}!`
    : DEFAULT_HERO_PRIZE;

  const description =
    settings?.event_description?.trim() || DEFAULT_HERO_DESCRIPTION;

  const { registrationBadgeText, targetTimestamp, dDayLabel } = useMemo(() => {
    const timeline = values?.timeline ?? [];

    const registrationStep =
      timeline.find((item) => /registra|daftar|pendaftaran/i.test(item.title)) ??
      timeline[0];

    const regBadge = registrationStep?.title
      ? `${registrationStep.title} DIBUKA`
      : DEFAULT_HERO_REGISTRATION_BADGE;

    let target: number | undefined;
    if (registrationStep?.end_date) {
      const parsed = new Date(`${registrationStep.end_date}T23:59:59`).getTime();
      if (!Number.isNaN(parsed)) {
        target = parsed;
      }
    }

    const eventDayStep =
      timeline.find((item) =>
        /event|pelaksanaan|h-day|hari h/i.test(item.title),
      ) ?? timeline[timeline.length - 1];

    let dDay: string | undefined;
    if (eventDayStep?.start_date) {
      const formatted = formatTimelineDate(eventDayStep.start_date);
      if (formatted) {
        dDay = `H-Day: ${formatted}`;
      }
    }

    return {
      registrationBadgeText: regBadge,
      targetTimestamp: target,
      dDayLabel: dDay,
    };
  }, [values]);

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
            {registrationBadgeText}
          </Badge>
          <Badge color="soft-lilac" rotate="right" pulse>
            {DEFAULT_HERO_SUB_BADGE}
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
                  {prizeFormatted}
                </Badge>
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* Countdown Timer Molecule */}
            <CountdownTimer
              targetTimestamp={targetTimestamp}
              headerTitle="Pendaftaran Ditutup Dalam:"
              dDayLabel={dDayLabel}
            />

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
              <Button
                href="#panduan"
                onClick={onGuidebookClick}
                variant="secondary"
                size="lg"
              >
                <FiFileText className="text-lg text-tertiary" />
                <span>Unduh Rulebook (PDF)</span>
              </Button>
            </div>
          </div>

          {/* Right Column: HeroArtwork Molecule (5 cols) */}
          <HeroArtwork
            badgeLabel={`${eventName} // OFFICIAL ARTWORK`}
            altText={eventName}
            seasonBadge="SEASON 04"
          />
        </div>
      </Card>
    </section>
  );
}
