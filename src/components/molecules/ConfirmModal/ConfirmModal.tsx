import type { JSX } from "react";

import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";

import type { ConfirmModalProps } from "./ConfirmModal.types";

/**
 * Destructive-action dialog built on {@link Modal}. While `isLoading` is set
 * the dialog can no longer be dismissed, so the in-flight request is not
 * orphaned.
 */
export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Ya, hapus",
  cancelLabel = "Batal",
  loadingLabel = "Memproses...",
  isLoading = false,
  onConfirm,
  onCancel,
  className = "",
}: ConfirmModalProps): JSX.Element | null {
  const handleClose = () => {
    if (!isLoading) {
      onCancel();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="sm"
      className={className}
    >
      <p className="font-body-md text-body-md text-on-surface-variant">
        {message}
      </p>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button
          variant="secondary"
          size="md"
          disabled={isLoading}
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>

        <Button
          variant="danger"
          size="md"
          disabled={isLoading}
          onClick={onConfirm}
        >
          {isLoading ? loadingLabel : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
