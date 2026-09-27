import type { JSX } from "react";

import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";

import type { FaqAccordionProps } from "./FaqAccordion.types";

export default function FaqAccordion({
  items = [],
  title = "FAQ (PERTANYAAN SERING DITANYAKAN)",
  className = "",
}: FaqAccordionProps): JSX.Element {
  return (
    <Card
      bgColor="white"
      borderWidth="normal"
      shadow="md"
      id="faq"
      className={`scroll-mt-24 ${className}`.trim()}
    >
      {/* Accordion Header Banner */}
      <div className="bg-surface-container border-b-[2.5px] border-black p-4 flex items-center justify-between">
        <span className="font-headline-sm text-headline-sm uppercase text-on-surface">
          {title}
        </span>
        <Badge color="white" size="sm" shadow="none" borderWidth="normal">
          {items.length} ITEMS
        </Badge>
      </div>

      {/* Accordion Items List */}
      <div className="divide-y-2 divide-black">
        {items.map((item, index) => (
          <details
            key={item.id ?? index}
            className="group p-4 cursor-pointer select-none transition-colors hover:bg-surface-container-low"
            open={item.defaultOpen}
          >
            <summary className="font-headline-sm text-headline-sm text-on-surface list-none flex items-center justify-between gap-4">
              <span>{item.question}</span>
              <span
                className="material-symbols-outlined text-2xl group-open:rotate-180 transition-transform duration-200 shrink-0 select-none"
                aria-hidden="true"
              >
                expand_more
              </span>
            </summary>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 pl-1 leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Card>
  );
}
