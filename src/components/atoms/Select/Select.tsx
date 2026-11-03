import type { FocusEvent, JSX, KeyboardEvent } from "react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";

import type { SelectProps } from "./Select.types";

export default function Select({
  label,
  options,
  value,
  onChange,
  onBlur,
  name,
  id,
  placeholder,
  leadingIcon,
  error,
  disabled = false,
  className = "",
  triggerClassName = "",
  menuClassName = "",
  optionClassName = "",
  renderValue,
  renderOption,
  ref,
}: SelectProps): JSX.Element {
  const autoId = useId();
  const selectId = id ?? autoId;
  const labelId = `${selectId}-label`;
  const listboxId = `${selectId}-listbox`;
  const errorId = `${selectId}-error`;
  const hasError = Boolean(error);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const menuOptions = useMemo(
    () =>
      placeholder ? [{ value: "", label: placeholder }, ...options] : options,
    [options, placeholder],
  );

  const selectedIndex = useMemo(
    () => menuOptions.findIndex((option) => option.value === value),
    [menuOptions, value],
  );
  const selectedOption =
    selectedIndex >= 0 ? menuOptions[selectedIndex] : undefined;
  const hasSelectedValue = Boolean(selectedOption?.value);

  const setTriggerRef = useCallback(
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

  const getOptionId = (index: number) => `${selectId}-option-${index}`;

  const openMenu = () => {
    if (disabled) {
      return;
    }

    setActiveIndex(
      selectedIndex >= 0 ? selectedIndex : menuOptions.length > 0 ? 0 : -1,
    );
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const selectOption = (index: number) => {
    if (disabled) {
      return;
    }

    const option = menuOptions[index];

    if (!option) {
      return;
    }

    onChange(option.value);
    closeMenu();
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        if (!isOpen || menuOptions.length === 0) {
          openMenu();
          return;
        }

        setActiveIndex((current) => (current + 1) % menuOptions.length);
        return;

      case "ArrowUp":
        event.preventDefault();

        if (!isOpen || menuOptions.length === 0) {
          openMenu();
          return;
        }

        setActiveIndex((current) =>
          current <= 0 ? menuOptions.length - 1 : current - 1,
        );
        return;

      case "Home":
        if (!isOpen) {
          return;
        }

        event.preventDefault();
        setActiveIndex(0);
        return;

      case "End":
        if (!isOpen) {
          return;
        }

        event.preventDefault();
        setActiveIndex(menuOptions.length - 1);
        return;

      case "Enter":
      case " ":
        event.preventDefault();

        if (!isOpen) {
          openMenu();
        } else if (activeIndex >= 0) {
          selectOption(activeIndex);
        }

        return;

      case "Escape":
        if (!isOpen) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        closeMenu();
        return;

      case "Tab":
        closeMenu();
        return;

      default:
        return;
    }
  };

  const handleRootBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      onBlur?.();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex < 0) {
      return;
    }

    listRef.current?.children[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [isOpen, activeIndex]);

  const borderClass = hasError ? "border-tertiary" : "border-black";

  return (
    <div
      ref={rootRef}
      onBlur={handleRootBlur}
      className={`flex flex-col gap-1.5 ${className}`.trim()}
    >
      <label
        id={labelId}
        htmlFor={selectId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <div className="relative">
        <button
          id={selectId}
          ref={setTriggerRef}
          type="button"
          name={name}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            isOpen && activeIndex >= 0 ? getOptionId(activeIndex) : undefined
          }
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          disabled={disabled}
          onClick={() => (isOpen ? closeMenu() : openMenu())}
          onKeyDown={handleTriggerKeyDown}
          className={`flex w-full items-center gap-2.5 cursor-pointer bg-surface-white text-left text-on-surface font-body-md text-body-md px-3.5 py-3 border-[2.5px] ${borderClass} shadow-neo-xs outline-none transition-shadow focus:shadow-neo-sm disabled:cursor-not-allowed disabled:opacity-60 ${triggerClassName}`.trim()}
        >
          {leadingIcon && (
            <span
              aria-hidden="true"
              className="shrink-0 text-on-surface-variant"
            >
              {leadingIcon}
            </span>
          )}

          <span
            className={`flex-1 truncate ${hasSelectedValue ? "" : "text-on-surface-variant"}`}
          >
            {renderValue
              ? renderValue(hasSelectedValue ? selectedOption : undefined)
              : (selectedOption?.label ?? placeholder ?? "")}
          </span>

          <FiChevronDown
            aria-hidden="true"
            className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <ul
            id={listboxId}
            ref={listRef}
            role="listbox"
            aria-labelledby={labelId}
            className={`absolute z-30 mt-2 max-h-60 w-full overflow-y-auto border-[2.5px] border-black bg-surface-white shadow-neo-sm ${menuClassName}`.trim()}
          >
            {menuOptions.length === 0 && (
              <li
                role="presentation"
                className="px-3.5 py-3 font-body-sm text-body-sm text-on-surface-variant"
              >
                Tidak ada pilihan.
              </li>
            )}

            {menuOptions.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;

              const stateClasses = isActive
                ? "bg-primary-container text-on-surface"
                : isSelected
                  ? "bg-surface-container-low text-on-surface"
                  : "text-on-surface";

              return (
                <li
                  key={option.value}
                  id={getOptionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 font-body-md text-body-md transition-colors ${stateClasses} ${optionClassName}`.trim()}
                >
                  {renderOption ? (
                    renderOption(option, { isActive, isSelected })
                  ) : (
                    <>
                      <span className="flex-1 truncate">{option.label}</span>
                      {isSelected && (
                        <FiCheck aria-hidden="true" className="shrink-0" />
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
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
