export type CountdownCardVariant = "default" | "danger";

export interface CountdownCardProps {
  value: string | number;
  label: string;
  variant?: CountdownCardVariant;
  pulse?: boolean;
  className?: string;
}
