import type { JSX } from "react";
import { FiEdit2, FiExternalLink, FiImage, FiMapPin } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { formatRupiah } from "@/utils/currency";
import { formatTimelineDate } from "@/utils/date";

import type { EventSettingsSummaryProps } from "./EventSettingsSummary.types";

const EMPTY_TEXT = "Belum ada data.";

export default function EventSettingsSummary({
  values,
  onEditSection,
  className = "",
}: EventSettingsSummaryProps): JSX.Element {
  const { info } = values;
  const prizePool =
    info.prize_pool === "" ? EMPTY_TEXT : formatRupiah(Number(info.prize_pool));

  const editButton = (section: "contact" | "timeline" | "social_media") => (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onEditSection(section)}
    >
      <FiEdit2 aria-hidden="true" />
      Edit
    </Button>
  );

  return (
    <div className={`flex flex-col gap-gutter ${className}`.trim()}>
      <Card shadow="sm" className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-4">
            {info.logo_url ? (
              <img
                src={info.logo_url}
                alt={`Logo ${info.event_name}`}
                className="h-16 w-16 shrink-0 border-[2.5px] border-black bg-surface-white object-contain"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center border-[2.5px] border-black bg-surface-container text-on-surface-variant"
              >
                <FiImage size={18} />
              </div>
            )}

            <h2 className="font-headline-md text-headline-md uppercase tracking-tight">
              {info.event_name || EMPTY_TEXT}
            </h2>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEditSection("info")}
          >
            <FiEdit2 aria-hidden="true" />
            Edit
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge color="vivid-mint" size="sm" shadow="none">
            {prizePool}
          </Badge>

          <Badge color="electric-cyan" size="sm" shadow="none">
            {info.venue_name || EMPTY_TEXT}
          </Badge>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">
          {info.event_description || EMPTY_TEXT}
        </p>

        <p className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
          <FiMapPin aria-hidden="true" size={14} />
          {info.address || EMPTY_TEXT}
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
        <Card shadow="sm" className="flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight">
              Kontak
            </h3>
            {editButton("contact")}
          </div>

          {values.contact.length === 0 ? (
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {EMPTY_TEXT}
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {values.contact.map((item) => (
                <li
                  key={`${item.type}-${item.label}-${item.value}`}
                  className="flex flex-wrap items-center justify-between gap-2"
                >
                  <span className="font-body-sm text-body-sm">{item.label}</span>
                  <Badge color="surface-container" size="sm" shadow="none">
                    {item.type}: {item.value}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card shadow="sm" className="flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight">
              Sosial Media
            </h3>
            {editButton("social_media")}
          </div>

          {values.social_media.length === 0 ? (
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {EMPTY_TEXT}
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {values.social_media.map((item) => (
                <li key={`${item.platform}-${item.url}`}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-body-sm text-body-sm underline underline-offset-4"
                  >
                    {item.label}
                    <FiExternalLink aria-hidden="true" size={12} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card shadow="sm" className="flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight">
            Timeline
          </h3>
          {editButton("timeline")}
        </div>

        {values.timeline.length === 0 ? (
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {EMPTY_TEXT}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {values.timeline.map((item, index) => (
              <li
                key={`${item.step}-${item.title}`}
                className="flex gap-3 border-t-2 border-black/10 pt-4 first:border-t-0 first:pt-0"
              >
                <Badge color="soft-lilac" size="sm" shadow="none">
                  {item.step || index + 1}
                </Badge>

                <div className="min-w-0">
                  <p className="font-headline-sm text-headline-sm uppercase tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-1 font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                    {formatTimelineDate(item.start_date, item.end_date || undefined)}
                  </p>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
