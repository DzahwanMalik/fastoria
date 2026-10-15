import type { JSX, MouseEvent } from "react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

import Button from "@/components/atoms/Button";

import type { ModalProps, ModalSize } from "./Modal.types";

const SIZE_MAP: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

/**
 * Portal-based dialog. Closes on Escape and on backdrop click, locks body
 * scroll while open, and restores focus to the previously focused element.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  children,
  className = "",
}: ModalProps): JSX.Element | null {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/50">
      <div
        onClick={handleBackdropClick}
        className="flex min-h-full items-start justify-center p-4"
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={-1}
          className={`my-auto w-full ${SIZE_MAP[size]} border-[3px] border-black bg-surface-white shadow-neo-lg outline-none ${className}`.trim()}
        >
          <div className="flex items-start justify-between gap-4 border-b-[3px] border-black px-6 py-4">
            <div className="min-w-0">
              <h2
                id={titleId}
                className="font-headline-md text-headline-md uppercase tracking-tight"
              >
                {title}
              </h2>

              {description && (
                <p
                  id={descriptionId}
                  className="mt-1 font-body-sm text-body-sm text-on-surface-variant"
                >
                  {description}
                </p>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="p-0! w-9 h-9 shrink-0"
              onClick={onClose}
              aria-label="Tutup dialog"
            >
              <FiX size={18} />
            </Button>
          </div>

          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
