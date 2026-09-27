import type { TimelineStepItem } from "@/components/molecules/TimelineStepCard";

export const DEFAULT_TIMELINE_STEPS: TimelineStepItem[] = [
  {
    stepNumber: "01",
    startDate: "2026-09-01T00:00:00+07:00",
    endDate: "2026-09-30T23:59:59+07:00",
    title: "Pendaftaran & Pembayaran",
    description:
      "Registrasi akun ketua tim, pengisian biodata, dan pembayaran administrasi lomba.",
  },
  {
    stepNumber: "02",
    date: "2026-10-05T00:00:00+07:00",
    title: "Technical Meeting",
    description:
      "Penjelasan rinci ketentuan teknis, format pengumpulan karya via Zoom Meeting nasional.",
  },
  {
    stepNumber: "03",
    date: "2026-10-15T00:00:00+07:00",
    title: "Pengumpulan Karya",
    description:
      "Batas akhir unggah berkas, repositori GitHub, link prototype, dan proposal bisnis (23:59 WIB).",
  },
  {
    stepNumber: "04",
    date: "2026-10-25T00:00:00+07:00",
    title: "Pengumuman Finalis",
    description:
      "Rilis 5 tim terbaik per cabang kompetisi yang berhak melaju ke panggung Grand Final.",
  },
  {
    stepNumber: "05",
    date: "2026-11-10T00:00:00+07:00",
    title: "Grand Final & Awarding",
    description:
      "Live pitching, sesi tanya-jawab juri, serta malam penganugerahan pemenang di Jakarta.",
  },
];
