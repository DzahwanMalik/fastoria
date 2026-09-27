import type { JSX } from "react";

import type { HighlightItemProps } from "./HighlightItem.types";

export default function HighlightItem({ icon, label }: HighlightItemProps): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
