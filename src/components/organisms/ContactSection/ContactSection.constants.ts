import type { ContactCardItem } from "@/components/molecules/ContactCard";
import type { FaqItem } from "@/components/molecules/FaqAccordion";

export const DEFAULT_CONTACTS: ContactCardItem[] = [
  {
    id: "cp-teknis",
    categoryTag: "TEKNIS & PANDUAN",
    iconName: "support_agent",
    iconColorClass: "text-tertiary",
    name: "Sarah Adelia",
    description:
      "Seputar kriteria karya, submission file, dan technical meeting.",
    contactValue: "+62 812-3456-7890",
    actionLabel: "Chat WhatsApp",
    actionHref: "https://wa.me/6281234567890",
    actionVariant: "mint",
  },
  {
    id: "cp-admin",
    categoryTag: "PEMBAYARAN & ADMIN",
    iconName: "payments",
    iconColorClass: "text-secondary",
    name: "Budi Pratama",
    description:
      "Verifikasi invoice, sertifikat tim, dan administrasi kemitraan.",
    contactValue: "+62 857-1234-5678",
    actionLabel: "Chat WhatsApp",
    actionHref: "https://wa.me/6285712345678",
    actionVariant: "mint",
  },
  {
    id: "cp-email",
    categoryTag: "SURAT RESMI & SPONSOR",
    iconName: "mail",
    iconColorClass: "text-on-surface",
    name: "Email Sekretariat",
    description:
      "Permohonan proposal sponsorship, surat izin kampus, dan media partner.",
    contactValue: "halo@arenafest.id",
    actionLabel: "Kirim Email Resmi",
    actionHref: "mailto:halo@arenafest.id",
    actionVariant: "cyan",
  },
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question:
      "Apakah anggota tim boleh berasal dari kampus atau instansi yang berbeda?",
    answer:
      "Ya, diperbolehkan! Anggota tim dapat berasal dari institusi pendidikan atau organisasi yang berbeda, asalkan memenuhi batasan usia 17–25 tahun.",
    defaultOpen: false,
  },
  {
    id: "faq-2",
    question: "Apakah peserta boleh mendaftar lebih dari satu kategori lomba?",
    answer:
      "Boleh, peserta diperkenankan mengikuti maksimal 2 cabang kompetisi dengan catatan jadwal finalis dan pengumpulan karya dipenuhi masing-masing.",
    defaultOpen: true,
  },
  {
    id: "faq-3",
    question: "Bagaimana mekanisme pelaksanaan babak Grand Final?",
    answer:
      "Babak final diselenggarakan secara hybrid. 5 finalis terpilih dapat hadir langsung di panggung luring (Jakarta) atau melalui live streaming terverifikasi.",
    defaultOpen: false,
  },
];
