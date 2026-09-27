import businessImg from "@/assets/images/competitions/business-pitch.png";
import graphicImg from "@/assets/images/competitions/graphic-branding.png";
import uiuxImg from "@/assets/images/competitions/uiux-design.png";
import webAppImg from "@/assets/images/competitions/web-app-dev.png";
import type { CompetitionItem } from "@/components/molecules/CompetitionCard";

import type { CompetitionFilterTab } from "./CompetitionSection.types";

export const CATEGORY_TABS: CompetitionFilterTab[] = [
  { id: "all", label: "Semua Kategori" },
  { id: "design", label: "Design & Creative" },
  { id: "tech", label: "Tech & Development" },
  { id: "business", label: "Business & Startup" },
];

export const DEFAULT_COMPETITIONS: CompetitionItem[] = [
  {
    id: "uiux-design",
    category: "design",
    title: "UI/UX Design Challenge",
    description:
      "Rancang pengalaman digital dan solusi antarmuka aplikasi inovatif yang memecahkan masalah nyata dengan riset mendalam, wireframing, dan usability prototype berstandar industri.",
    imageSrc: uiuxImg,
    imageAlt: "UI/UX Design Challenge Illustration",
    imageBgColor: "bg-soft-lilac/30",
    tags: ["Tim 2-3 Orang", "Mahasiswa & Umum"],
    fee: "Rp 120.000",
    feeUnit: "/ Tim",
    slotBadge: {
      label: "EARLY BIRD SLOT",
      color: "electric-yellow",
    },
    guidebookUrl: "#panduan",
  },
  {
    id: "web-app-dev",
    category: "tech",
    title: "Web & App Development",
    description:
      "Kembangkan produk web atau mobile interaktif yang fungsional, responsif, dan siap pakai dalam format hackathon hybrid. Tunjukkan performa kode, arsitektur data, dan nilai guna.",
    imageSrc: webAppImg,
    imageAlt: "Web & App Development Illustration",
    imageBgColor: "bg-vivid-mint/20",
    tags: ["Tim 3-4 Orang", "Full-Stack & Mobile"],
    fee: "Rp 150.000",
    feeUnit: "/ Tim",
    slotBadge: {
      label: "TERMASUK SERVER DEV",
      color: "vivid-mint",
    },
    guidebookUrl: "#panduan",
  },
  {
    id: "graphic-branding",
    category: "design",
    title: "Graphic & Visual Branding",
    description:
      "Eksplorasi identitas visual menyeluruh, sistem branding merek fiktif, serta kampanye poster bertema masa depan berkelanjutan dan dampak sosial masyarakat.",
    imageSrc: graphicImg,
    imageAlt: "Graphic & Visual Branding Illustration",
    imageBgColor: "bg-tertiary-container/40",
    tags: ["Individu", "Desain Grafis & Poster"],
    fee: "Rp 75.000",
    feeUnit: "/ Orang",
    slotBadge: {
      label: "KATEGORI INDIVIDU",
      color: "electric-cyan",
    },
    guidebookUrl: "#panduan",
  },
  {
    id: "business-pitch",
    category: "business",
    title: "Business Pitch Competition",
    description:
      "Presentasikan rencana bisnis rintisan teknologi (start-up) yang scalable, teruji secara finansial, dan siap mendapatkan validasi pasar langsung di hadapan investor terkemuka.",
    imageSrc: businessImg,
    imageAlt: "Business Pitch Competition Illustration",
    imageBgColor: "bg-electric-yellow/20",
    tags: ["Tim 2-3 Orang", "Pitch Deck & BMC"],
    fee: "Rp 135.000",
    feeUnit: "/ Tim",
    slotBadge: {
      label: "PITCHING DECK REVIEW",
      color: "lime",
    },
    guidebookUrl: "#panduan",
  },
];
