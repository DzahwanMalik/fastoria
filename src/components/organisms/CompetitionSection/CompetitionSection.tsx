import type { JSX } from "react";
import { useMemo, useState } from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import type { CompetitionItem } from "@/components/molecules/CompetitionCard";
import CompetitionCard from "@/components/molecules/CompetitionCard";

import {
  CATEGORY_TABS,
  DEFAULT_COMPETITIONS,
} from "./CompetitionSection.constants";
import type { CompetitionSectionProps } from "./CompetitionSection.types";

export default function CompetitionSection({
  competitions = DEFAULT_COMPETITIONS,
  categories = CATEGORY_TABS,
  className = "",
}: CompetitionSectionProps = {}): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const resolvedCategories =
    categories.length > 0 ? categories : CATEGORY_TABS;

  const activeCategory = selectedCategory;

  const filteredCompetitions = useMemo(() => {
    if (activeCategory === "all") {
      return competitions;
    }
    return competitions.filter(
      (item) =>
        item.categorySlug === activeCategory ||
        item.categoryId === activeCategory ||
        item.category === activeCategory,
    );
  }, [competitions, activeCategory]);

  return (
    <section
      id="kategori"
      className={`w-full max-w-7xl mx-auto px-margin-mobile md:px-margin py-16 scroll-mt-24 ${className}`.trim()}
    >
      {/* Section Header */}
      <div className="mb-4">
        <div>
          <Badge color="punch-coral" rotate="left" shadow="xs" className="mb-3">
            PILIH ARENA KAMU
          </Badge>

          <h2 className="font-headline-xl text-headline-xl text-on-surface uppercase">
            KATEGORI PERLOMBAAN
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Pilih cabang kompetisi yang sesuai dengan keahlian dan minat tim
            Anda.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs Bar */}
      <div
        className="flex flex-wrap items-center gap-3 mb-8 overflow-x-auto pb-2"
        id="category-filter-bar"
      >
        {resolvedCategories.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <Button
              key={tab.id}
              variant={isActive ? "lime" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(tab.id)}
              className="cat-tab-btn"
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCompetitions.length === 0 && (
        <Card
          bgColor="white"
          borderWidth="thick"
          shadow="md"
          className="p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-3"
        >
          <p className="font-headline-sm text-base uppercase font-bold text-on-surface">
            Belum ada perlombaan untuk kategori ini
          </p>
          <p className="font-body-sm text-sm text-on-surface-variant max-w-sm">
            Silakan pilih kategori lain atau tampilkan seluruh cabang perlombaan
            yang tersedia.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="mt-2"
          >
            Tampilkan Semua Kategori
          </Button>
        </Card>
      )}

      {/* Competition Cards Grid */}
      {filteredCompetitions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCompetitions.map((competition: CompetitionItem) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
            />
          ))}
        </div>
      )}
    </section>
  );
}
