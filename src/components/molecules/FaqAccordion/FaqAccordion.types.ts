export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export interface FaqAccordionProps {
  items?: FaqItem[];
  title?: string;
  className?: string;
}
