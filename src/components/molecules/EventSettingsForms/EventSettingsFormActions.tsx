import type { JSX } from "react";
import { FiSave } from "react-icons/fi";

import Button from "@/components/atoms/Button";

export interface EventSettingsFormActionsProps {
  submitLabel: string;
  isLoading?: boolean;
  onCancel?: () => void;
}

export default function EventSettingsFormActions({
  submitLabel,
  isLoading = false,
  onCancel,
}: EventSettingsFormActionsProps): JSX.Element {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
        {isLoading ? "Menyimpan..." : submitLabel}
        {!isLoading && <FiSave aria-hidden="true" />}
      </Button>

      {onCancel && (
        <Button
          type="button"
          variant="secondary"
          size="lg"
          disabled={isLoading}
          onClick={onCancel}
        >
          Batal
        </Button>
      )}
    </div>
  );
}
