import type { JSX } from "react";
import { useMemo } from "react";

import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import type { ContactCardItem } from "@/components/molecules/ContactCard";
import ContactCard from "@/components/molecules/ContactCard";
import { toEventSettingsValues } from "@/utils/eventSettings";
import { isPhoneContactType, sanitizePhoneDigits } from "@/utils/phone";

import { DEFAULT_CONTACTS } from "./ContactSection.constants";
import type { ContactSectionProps } from "./ContactSection.types";

export default function ContactSection({
  settings,
  contacts: propContacts,
  className = "",
}: ContactSectionProps): JSX.Element {
  const contacts: ContactCardItem[] = useMemo(() => {
    if (propContacts && propContacts.length > 0) {
      return propContacts;
    }

    if (settings) {
      const values = toEventSettingsValues(settings);
      if (values.contact.length > 0) {
        return values.contact.map((item, index) => {
          const isPhone = isPhoneContactType(item.type);
          const digits = sanitizePhoneDigits(item.value);
          const waNumber = digits.startsWith("62")
            ? digits
            : `62${digits.replace(/^0+/, "")}`;
          const actionHref = isPhone
            ? `https://wa.me/${waNumber}`
            : item.type.toLowerCase().includes("email")
              ? `mailto:${item.value}`
              : item.value;

          return {
            id: `contact-${index + 1}`,
            categoryTag: (item.type || "WHATSAPP").toUpperCase(),
            name: item.label || "Narahubung Resmi",
            description:
              "Hubungi narahubung resmi untuk informasi seputar pendaftaran, teknis perlombaan, & informasi penting.",
            contactValue: item.value,
            actionLabel: isPhone ? "Chat WhatsApp" : "Kirim Pesan",
            actionHref,
            actionVariant: isPhone ? "whatsapp" : "email",
          };
        });
      }
    }

    return DEFAULT_CONTACTS;
  }, [propContacts, settings]);

  const gridClass = useMemo(() => {
    if (contacts.length === 1) return "grid-cols-1 max-w-md mx-auto";
    if (contacts.length === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  }, [contacts.length]);

  return (
    <section
      id="kontak"
      className={`w-full max-w-7xl mx-auto px-margin-mobile md:px-margin py-16 scroll-mt-24 ${className}`.trim()}
    >
      {/* Outer Neo-Brutalist Enclosing Card */}
      <Card
        bgColor="white"
        borderWidth="thick"
        shadow="xl"
        className="p-6 md:p-12 relative overflow-hidden"
      >
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <Badge
            color="electric-yellow"
            rotate="left"
            shadow="xs"
            className="mb-3"
          >
            BUTUH BANTUAN CEPAT?
          </Badge>

          <h2 className="font-headline-xl text-headline-xl text-on-surface uppercase">
            PUNYA PERTANYAAN? HUBUNGI KAMI!
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Tim panitia siap membantu pertanyaan seputar teknis pendaftaran, panduan
            lomba, serta konfirmasi kepesertaan Anda.
          </p>
        </div>

        {/* Dynamic Responsive Contact Cards Grid */}
        <div className={`grid ${gridClass} gap-6`}>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </Card>
    </section>
  );
}
