import type { JSX } from "react";

import CompetitionSection from "@/components/organisms/CompetitionSection";
import ContactSection from "@/components/organisms/ContactSection";
import Hero from "@/components/organisms/Hero";
import LandingError from "@/components/organisms/LandingError";
import LandingLoading from "@/components/organisms/LandingLoading";
import TimelineSection from "@/components/organisms/TimelineSection";
import { useEventSettings } from "@/hooks/useEventSettings";
import { useLandingCompetitions } from "@/hooks/useLandingCompetitions";
import MainLayout from "@/layouts/MainLayout";

export default function LandingPage(): JSX.Element {
  const {
    settings,
    isLoading: isSettingsLoading,
    error: settingsError,
    refetch: refetchSettings,
  } = useEventSettings();

  const {
    competitions,
    categories,
    isLoading: isCompetitionsLoading,
    error: competitionsError,
    refetch: refetchCompetitions,
  } = useLandingCompetitions();

  const isLoading = isSettingsLoading || isCompetitionsLoading;
  const error = settingsError || competitionsError;

  const handleRetry = () => {
    if (settingsError) refetchSettings();
    if (competitionsError) refetchCompetitions();
  };

  // Pre-bootstrap state: Loading before landing page opens
  if (isLoading) {
    return <LandingLoading />;
  }

  // Pre-bootstrap state: Error handling before landing page opens
  if (error || !settings) {
    return (
      <LandingError
        message={
          error ??
          "Data konfigurasi event belum tersedia di database. Periksa database atau coba lagi."
        }
        onRetry={handleRetry}
      />
    );
  }

  return (
    <MainLayout settings={settings}>
      {/* Hero Section Organism with Supabase Data */}
      <Hero settings={settings} />

      {/* Competition Categories Section Organism */}
      <CompetitionSection
        competitions={competitions}
        categories={categories}
      />

      {/* Official Schedule & Timeline Organism */}
      <TimelineSection settings={settings} />

      {/* Contact Person Organism with Supabase Data */}
      <ContactSection settings={settings} />
    </MainLayout>
  );
}
