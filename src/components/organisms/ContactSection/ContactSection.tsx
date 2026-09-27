import type { JSX } from "react";

import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import ContactCard from "@/components/molecules/ContactCard";
import FaqAccordion from "@/components/molecules/FaqAccordion";

import { DEFAULT_CONTACTS, DEFAULT_FAQS } from "./ContactSection.constants";
import type { ContactSectionProps } from "./ContactSection.types";

export default function ContactSection({
  contacts = DEFAULT_CONTACTS,
  faqs = DEFAULT_FAQS,
  className = "",
}: ContactSectionProps): JSX.Element {
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
            Tim panitia siap membantu pertanyaan teknis pendaftaran, panduan
            lomba, dan kemitraan kampus maupun media partner.
          </p>
        </div>

        {/* 3-Column Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>

        {/* Quick FAQ Mini Accordion */}
        <FaqAccordion items={faqs} />
      </Card>
    </section>
  );
}
