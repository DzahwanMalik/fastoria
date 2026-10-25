import type { ContactCardItem } from "@/components/molecules/ContactCard";

export const DEFAULT_CONTACTS: ContactCardItem[] = [
  {
    id: "cp-teknis",
    categoryTag: "TEKNIS & PANDUAN",
    name: "Sarah Adelia",
    description:
      "Seputar kriteria karya, submission file, dan technical meeting.",
    contactValue: "+62 812-3456-7890",
    actionLabel: "Chat WhatsApp",
    actionHref: "https://wa.me/6281234567890",
    actionVariant: "whatsapp",
  },
  {
    id: "cp-admin",
    categoryTag: "PEMBAYARAN & ADMIN",
    name: "Budi Pratama",
    description:
      "Verifikasi invoice, sertifikat tim, dan administrasi kemitraan.",
    contactValue: "+62 857-1234-5678",
    actionLabel: "Chat WhatsApp",
    actionHref: "https://wa.me/6285712345678",
    actionVariant: "whatsapp",
  },
  {
    id: "cp-email",
    categoryTag: "SURAT RESMI & SPONSOR",
    name: "Email Sekretariat",
    description:
      "Permohonan proposal sponsorship, surat izin kampus, dan media partner.",
    contactValue: "halo@arenafest.id",
    actionLabel: "Kirim Email Resmi",
    actionHref: "mailto:halo@arenafest.id",
    actionVariant: "email",
  },
];
