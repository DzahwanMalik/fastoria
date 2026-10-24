import type { JSX } from "react";

import CompetitionSection from "@/components/organisms/CompetitionSection";
import ContactSection from "@/components/organisms/ContactSection";
import ErrorBoundary from "@/components/organisms/ErrorBoundary";
import Hero from "@/components/organisms/Hero";
import LandingError from "@/components/organisms/LandingError";
import LandingLoading from "@/components/organisms/LandingLoading";
import SponsorSection from "@/components/organisms/SponsorSection";
import TimelineSection from "@/components/organisms/TimelineSection";
import { useEventSettings } from "@/hooks/useEventSettings";
import MainLayout from "@/layouts/MainLayout";

export default function LandingPage(): JSX.Element {
  const { settings, isLoading, error, refetch } = useEventSettings();

  const handleRegisterClick = () => {
    const section = document.getElementById("kategori");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGuidebookClick = () => {
    const section = document.getElementById("panduan");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
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
        onRetry={refetch}
      />
    );
  }

  return (
    <ErrorBoundary>
      <MainLayout settings={settings} onRegisterClick={handleRegisterClick}>
        {/* Hero Section Organism with Supabase Data */}
        <Hero
          settings={settings}
          onRegisterClick={handleRegisterClick}
          onGuidebookClick={handleGuidebookClick}
        />

        {/* Competition Categories Section Organism */}
        <CompetitionSection
          onRegisterClick={handleRegisterClick}
          onGuidebookClick={handleGuidebookClick}
        />

        {/* Official Schedule & Timeline Organism */}
        <TimelineSection />

        {/* Contact Person & Quick FAQ Organism */}
        <ContactSection />

        {/* Partners & Sponsors Marquee Organism */}
        <SponsorSection />
      </MainLayout>
    </ErrorBoundary>
  );
}
