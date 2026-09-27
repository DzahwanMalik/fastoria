import type { JSX } from "react";
import { useMemo, useState } from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import type {
  CompetitionCategory,
  CompetitionItem,
} from "@/components/molecules/CompetitionCard";
import CompetitionCard from "@/components/molecules/CompetitionCard";

import { CATEGORY_TABS, DEFAULT_COMPETITIONS } from "./CompetitionSection.constants";
import type { CompetitionSectionProps } from "./CompetitionSection.types";

export default function CompetitionSection({
  competitions = DEFAULT_COMPETITIONS,
  onRegisterClick,
  onGuidebookClick,
  className = "",
}: CompetitionSectionProps): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<CompetitionCategory>("all");

  const filteredCompetitions = useMemo(() => {
    if (activeCategory === "all") {
      return competitions;
    }
    return competitions.filter((item) => item.category === activeCategory);
  }, [competitions, activeCategory]);

  return (
    <section
      id="kategori"
      className={`w-full max-w-7xl mx-auto px-margin-mobile md:px-margin py-16 scroll-mt-24 ${className}`.trim()}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <Badge
            color="punch-coral"
            rotate="left"
            shadow="xs"
            className="mb-3"
          >
            PILIH ARENA KAMU
          </Badge>

          <h2 className="font-headline-xl text-headline-xl text-on-surface uppercase">
            KATEGORI PERLOMBAAN
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Pilih cabang kompetisi yang sesuai dengan keahlian dan minat tim Anda.
          </p>
        </div>

        {/* Live Registration Status Indicator */}
        <div className="flex items-center gap-2">
          <Badge color="white" shadow="xs" size="sm" pulse>
            STATUS:{" "}
            <span className="text-primary font-bold ml-1">
              PENDAFTARAN AKTIF
            </span>
          </Badge>
        </div>
      </div>

      {/* Category Filter Tabs Bar */}
      <div
        className="flex flex-wrap items-center gap-3 mb-8 overflow-x-auto pb-2"
        id="category-filter-bar"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <Button
              key={tab.id}
              variant={isActive ? "lime" : "secondary"}
              size="sm"
              onClick={() => setActiveCategory(tab.id)}
              className="cat-tab-btn"
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Competition Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCompetitions.map((competition: CompetitionItem) => (
          <CompetitionCard
            key={competition.id}
            competition={competition}
            onRegisterClick={onRegisterClick}
            onGuidebookClick={onGuidebookClick}
          />
        ))}
      </div>
    </section>
  );
}
