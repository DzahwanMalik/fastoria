export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items?: FaqItem[];
  title?: string;
  className?: string;
}
