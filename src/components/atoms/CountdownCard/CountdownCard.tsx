import type { JSX } from "react";

import Card from "@/components/atoms/Card";

import type { CountdownCardProps } from "./CountdownCard.types";

export default function CountdownCard({
  value,
  label,
  variant = "default",
  pulse = false,
  className = "",
}: CountdownCardProps): JSX.Element {
  const isDanger = variant === "danger";

  return (
    <Card
      bgColor="white"
      shadow="sm"
      borderWidth="normal"
      className={`p-2 sm:p-3 text-center select-none transition-all ${className}`.trim()}
    >
      <div className={pulse ? "animate-pulse" : ""}>
        <span
          className={`font-headline-xl text-2xl sm:text-4xl block font-black leading-none ${
            isDanger ? "text-punch-coral" : "text-on-surface"
          }`}
        >
          {value}
        </span>
        <span
          className={`font-label-caps text-[10px] sm:text-xs tracking-widest block mt-1.5 font-bold ${
            isDanger ? "text-punch-coral font-black" : "text-on-surface-variant"
          }`}
        >
          {label}
        </span>
      </div>
    </Card>
  );
}
