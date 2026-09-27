import type { JSX } from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

import type { CompetitionCardProps } from "./CompetitionCard.types";

export default function CompetitionCard({
  competition,
  onRegisterClick,
  onGuidebookClick,
  className = "",
}: CompetitionCardProps): JSX.Element {
  return (
    <Card
      bgColor="white"
      borderWidth="thick"
      shadow="lg"
      className={`group flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-neo-xl hover:-translate-x-0.5 hover:-translate-y-0.5 ${className}`.trim()}
    >
      <div>
        {/* Banner Artwork Container with 16:9 Aspect Ratio */}
        <div
          className={`w-full border-b-[2.5px] border-black overflow-hidden ${competition.imageBgColor}`}
          style={{ aspectRatio: "16 / 9" }}
        >
          <img
            src={competition.imageSrc}
            alt={competition.imageAlt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Card Body Details */}
        <div className="p-6">
          {/* Target Demographic & Team Requirement Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {competition.tags.map((tag) => (
              <Badge
                key={tag}
                color="white"
                shadow="xs"
                size="sm"
                borderWidth="normal"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Competition Title */}
          <h3 className="font-headline-lg text-headline-lg text-on-surface uppercase mb-3 leading-tight">
            {competition.title}
          </h3>

          {/* Description */}
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            {competition.description}
          </p>

          {/* Registration Fee & Slot Status Container Box */}
          <Card
            bgColor="container"
            borderWidth="thin"
            shadow="sm"
            className="p-4 mb-6 flex items-center justify-between"
          >
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block font-bold">
                BIAYA PENDAFTARAN
              </span>
              <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                {competition.fee}{" "}
                <span className="text-body-sm font-normal text-on-surface-variant">
                  {competition.feeUnit}
                </span>
              </span>
            </div>

            <Badge
              color={competition.slotBadge.color}
              shadow="xs"
              size="sm"
              borderWidth="normal"
            >
              {competition.slotBadge.label}
            </Badge>
          </Card>
        </div>
      </div>

      {/* Tactile Action CTA Row */}
      <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
        <Button
          variant="lime"
          size="md"
          className="flex-1"
          onClick={() => onRegisterClick?.(competition)}
        >
          Daftar Sekarang
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="flex-1"
          href={competition.guidebookUrl ?? "#panduan"}
          onClick={() => onGuidebookClick?.(competition)}
        >
          Guidebook (PDF)
        </Button>
      </div>
    </Card>
  );
}
