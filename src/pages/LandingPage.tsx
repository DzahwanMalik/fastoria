import type { JSX } from "react";

import CompetitionSection from "@/components/organisms/CompetitionSection";
import ContactSection from "@/components/organisms/ContactSection";
import Hero from "@/components/organisms/Hero";
import MarqueeTicker from "@/components/organisms/MarqueeTicker";
import SponsorSection from "@/components/organisms/SponsorSection";
import TimelineSection from "@/components/organisms/TimelineSection";
import MainLayout from "@/layouts/MainLayout";

export default function LandingPage(): JSX.Element {
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

  return (
    <MainLayout onRegisterClick={handleRegisterClick}>
      {/* Hero Section Organism */}
      <Hero onRegisterClick={handleRegisterClick} />

      {/* Infinite Marquee Announcement Organism */}
      <MarqueeTicker />

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
  );
}
