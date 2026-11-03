import type { JSX, KeyboardEvent } from "react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import {
  DAY_NAMES,
  DEFAULT_PLACEHOLDER,
  MONTH_NAMES,
} from "./DatePicker.constants";
import type { DatePickerProps } from "./DatePicker.types";
import {
  formatDisplayDate,
  formatIsoDate,
  generateCalendarDays,
  parseIsoDate,
} from "./DatePicker.utils";

export default function DatePicker({
  label,
  value = "",
  onChange,
  onBlur,
  name,
  id,
  placeholder = DEFAULT_PLACEHOLDER,
  error,
  disabled = false,
  minDate,
  maxDate,
  leftElement,
  leftElementClassName = "",
  className = "",
  triggerClassName = "",
  popupClassName = "",
  ref,
}: DatePickerProps): JSX.Element {
  const autoId = useId();
  const datePickerId = id ?? autoId;
  const labelId = `${datePickerId}-label`;
  const errorId = `${datePickerId}-error`;
  const dialogId = `${datePickerId}-dialog`;
  const hasError = Boolean(error);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [navYear, setNavYear] = useState<number | null>(null);
  const [navMonth, setNavMonth] = useState<number | null>(null);

  const parsedValue = useMemo(() => parseIsoDate(value), [value]);

  const viewYear = useMemo(() => {
    return (
      navYear ?? (parsedValue ? parsedValue.year : new Date().getFullYear())
    );
  }, [navYear, parsedValue]);

  const viewMonth = useMemo(() => {
    return (
      navMonth ?? (parsedValue ? parsedValue.month : new Date().getMonth())
    );
  }, [navMonth, parsedValue]);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    setNavYear(null);
    setNavMonth(null);
    onBlur?.();
  }, [onBlur]);

  // Close on outside pointer interaction
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closePopover();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, closePopover]);

  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setNavYear(viewYear - 1);
      setNavMonth(11);
    } else {
      setNavYear(viewYear);
      setNavMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setNavYear(viewYear + 1);
      setNavMonth(0);
    } else {
      setNavYear(viewYear);
      setNavMonth(viewMonth + 1);
    }
  };

  const handleSelectDate = (iso: string) => {
    onChange?.(iso);
    closePopover();
    triggerRef.current?.focus();
  };

  const handleSelectToday = () => {
    const today = new Date();
    const todayIso = formatIsoDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    onChange?.(todayIso);
    closePopover();
    triggerRef.current?.focus();
  };

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange?.("");
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      closePopover();
    } else if (
      (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") &&
      !isOpen
    ) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const calendarDays = useMemo(() => {
    return generateCalendarDays(viewYear, viewMonth, value, minDate, maxDate);
  }, [viewYear, viewMonth, value, minDate, maxDate]);

  const displayDate = useMemo(() => formatDisplayDate(value), [value]);

  const borderClass = hasError ? "border-tertiary" : "border-black";

  return (
    <div
      ref={rootRef}
      className={`flex flex-col gap-1.5 ${className}`.trim()}
    >
      <label
        id={labelId}
        htmlFor={datePickerId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <div className="relative">
        <button
          id={datePickerId}
          ref={setButtonRef}
          type="button"
          name={name}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={isOpen ? dialogId : undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          onClick={() => {
            if (!disabled) {
              if (isOpen) {
                closePopover();
              } else {
                setIsOpen(true);
              }
            }
          }}
          onKeyDown={handleTriggerKeyDown}
          className={`flex w-full items-center text-left bg-surface-white text-on-surface font-body-md text-body-md pl-11 pr-10 py-3 border-[2.5px] ${borderClass} shadow-neo-xs outline-none transition-shadow focus:shadow-neo-sm disabled:cursor-not-allowed disabled:opacity-60 ${triggerClassName}`.trim()}
        >
          <span
            className={`flex-1 truncate ${displayDate ? "" : "text-on-surface-variant"}`}
          >
            {displayDate || placeholder}
          </span>
        </button>

        <span
          className={`pointer-events-none absolute inset-y-0 left-3.5 flex items-center font-body-md text-body-md text-on-surface-variant ${leftElementClassName}`.trim()}
        >
          {leftElement ?? <FiCalendar aria-hidden="true" size={18} />}
        </span>

        {value && !disabled ? (
          <button
            type="button"
            aria-label="Hapus tanggal"
            onClick={handleClear}
            className="absolute inset-y-0 right-2 flex cursor-pointer items-center p-1.5 text-on-surface-variant hover:text-tertiary transition-colors"
          >
            <FiX aria-hidden="true" size={16} />
          </button>
        ) : (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-on-surface-variant">
            <FiChevronDown
              aria-hidden="true"
              className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        )}

        {isOpen && (
          <div
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`absolute z-30 mt-2 w-full sm:w-76 border-[2.5px] border-black bg-surface-white p-4 shadow-neo-md ${popupClassName}`.trim()}
          >
            {/* Header: Month & Year navigation */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
              <button
                type="button"
                aria-label="Bulan sebelumnya"
                onClick={handlePrevMonth}
                className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-black bg-surface-container text-on-surface transition-all hover:bg-electric-yellow active:bg-primary-container shadow-neo-xs"
              >
                <FiChevronLeft aria-hidden="true" size={16} />
              </button>

              <span className="font-headline-sm text-sm uppercase tracking-tight font-black text-on-surface">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                aria-label="Bulan berikutnya"
                onClick={handleNextMonth}
                className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-black bg-surface-container text-on-surface transition-all hover:bg-electric-yellow active:bg-primary-container shadow-neo-xs"
              >
                <FiChevronRight aria-hidden="true" size={16} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 pt-3 pb-1 text-center font-label-caps text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              {DAY_NAMES.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Calendar Day Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((cell) => {
                const isSelected = cell.isSelected;
                const isToday = cell.isToday;
                const isCurrentMonth = cell.isCurrentMonth;
                const isDisabled = cell.isDisabled;

                let cellStyle =
                  "text-on-surface border-transparent hover:border-black hover:bg-electric-yellow hover:shadow-neo-xs cursor-pointer";

                if (isDisabled) {
                  cellStyle =
                    "text-on-surface-variant/30 cursor-not-allowed pointer-events-none border-transparent";
                } else if (isSelected) {
                  cellStyle =
                    "bg-primary-container text-on-surface font-black border-black shadow-neo-xs cursor-pointer";
                } else if (isToday) {
                  cellStyle =
                    "border-black font-black bg-surface-container hover:bg-electric-yellow cursor-pointer shadow-neo-xs";
                } else if (!isCurrentMonth) {
                  cellStyle =
                    "text-on-surface-variant/40 border-transparent hover:border-black hover:bg-electric-yellow cursor-pointer";
                }

                return (
                  <button
                    key={cell.iso}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelectDate(cell.iso)}
                    className={`flex h-8 w-8 items-center justify-center border-2 font-body-sm text-xs transition-colors mx-auto ${cellStyle}`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t-2 border-black/10">
              <button
                type="button"
                onClick={handleSelectToday}
                className="font-label-caps text-xs uppercase tracking-wider font-bold text-on-surface hover:text-secondary cursor-pointer underline underline-offset-2"
              >
                Hari Ini
              </button>

              <button
                type="button"
                onClick={closePopover}
                className="font-label-caps text-xs uppercase tracking-wider font-bold text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="font-body-sm text-body-sm text-tertiary"
        >
          {error}
        </p>
      )}
    </div>
  );
}
