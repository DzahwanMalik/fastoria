import type { JSX } from "react";
import { useMemo, useState } from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import type { CompetitionItem } from "@/components/molecules/CompetitionCard";
import CompetitionCard from "@/components/molecules/CompetitionCard";
import { useLandingCompetitions } from "@/hooks/useLandingCompetitions";

import {
  CATEGORY_TABS,
  DEFAULT_COMPETITIONS,
} from "./CompetitionSection.constants";
import type { CompetitionSectionProps } from "./CompetitionSection.types";

export default function CompetitionSection({
  competitions: propCompetitions,
  categories: propCategories,
  isLoading: propIsLoading,
  error: propError,
  onRetry: propOnRetry,
  onRegisterClick,
  onGuidebookClick,
  className = "",
}: CompetitionSectionProps = {}): JSX.Element {
  const isSelfManaged = propCompetitions === undefined;
  const selfData = useLandingCompetitions();

  const competitions = isSelfManaged
    ? selfData.competitions
    : propCompetitions ?? DEFAULT_COMPETITIONS;

  const categories = isSelfManaged
    ? selfData.categories.length > 0
      ? selfData.categories
      : CATEGORY_TABS
    : propCategories ?? CATEGORY_TABS;

  const isLoading = isSelfManaged ? selfData.isLoading : propIsLoading ?? false;
  const error = isSelfManaged ? selfData.error : propError ?? null;
  const onRetry = isSelfManaged ? selfData.refetch : propOnRetry;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCategory =
    selectedCategory ?? (categories.length > 1 ? categories[1].id : "all");

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
        {categories.map((tab) => {
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

      {/* Loading Skeleton State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="competition-skeletons">
          {[1, 2, 3, 4].map((key) => (
            <Card
              key={key}
              bgColor="white"
              borderWidth="thick"
              shadow="lg"
              className="p-0 overflow-hidden animate-pulse"
            >
              <div
                className="w-full bg-surface-container border-b-[2.5px] border-black"
                style={{ aspectRatio: "16 / 9" }}
              />
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <div className="h-6 w-28 bg-surface-container border border-black" />
                  <div className="h-6 w-20 bg-surface-container border border-black" />
                </div>
                <div className="h-8 w-3/4 bg-surface-container border border-black" />
                <div className="h-12 w-full bg-surface-container border border-black" />
                <div className="h-16 w-full bg-surface-container-low border border-black" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <Card
          bgColor="white"
          borderWidth="thick"
          shadow="lg"
          className="p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-4 max-w-xl mx-auto"
        >
          <div className="w-14 h-14 border-[2.5px] border-black bg-punch-coral shadow-neo-xs flex items-center justify-center">
            <FiAlertCircle size={28} className="text-black" />
          </div>

          <h3 className="font-headline-md text-lg sm:text-xl uppercase font-bold text-on-surface">
            Gagal Memuat Perlombaan
          </h3>

          <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-md">
            {error}
          </p>

          {onRetry && (
            <Button variant="primary" size="md" onClick={onRetry} className="mt-2">
              <FiRefreshCw className="mr-2 text-base" />
              <span>Coba Lagi</span>
            </Button>
          )}
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredCompetitions.length === 0 && (
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
            Silakan pilih kategori lain atau tampilkan seluruh cabang perlombaan yang tersedia.
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
      {!isLoading && !error && filteredCompetitions.length > 0 && (
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
      )}
    </section>
  );
}
