import type { JSX } from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

import type { ContactCardProps } from "./ContactCard.types";

export default function ContactCard({
  contact,
  className = "",
}: ContactCardProps): JSX.Element {
  return (
    <Card
      bgColor="canvas"
      borderWidth="normal"
      shadow="md"
      className={`p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-neo-lg ${className}`.trim()}
    >
      <div>
        {/* Header Category Tag & Icon */}
        <div className="flex items-center justify-between mb-4">
          <Badge color="white" shadow="none" size="sm" borderWidth="normal">
            {contact.categoryTag}
          </Badge>
          <span
            className={`material-symbols-outlined text-2xl select-none ${
              contact.iconColorClass ?? "text-on-surface"
            }`}
            aria-hidden="true"
          >
            {contact.iconName}
          </span>
        </div>

        {/* Contact Person Name */}
        <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">
          {contact.name}
        </h4>

        {/* Role & Responsibility Description */}
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
          {contact.description}
        </p>

        {/* Contact Value (Phone Number / Email Address) */}
        <span className="font-label-md text-label-md block font-bold text-on-surface mb-4">
          {contact.contactValue}
        </span>
      </div>

      {/* Action Button Atom (WhatsApp / Email) */}
      <Button
        variant={contact.actionVariant ?? "mint"}
        size="sm"
        href={contact.actionHref}
        target="_blank"
        rel="noopener"
        className="w-full"
      >
        {contact.actionLabel}
      </Button>
    </Card>
  );
}
