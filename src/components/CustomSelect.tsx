"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { IconChevron } from "@/components/Icons";

export type SelectOption = { value: string; label: string };

type Props = {
  id?: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  labelledBy?: string;
};

export function CustomSelect({
  id,
  name,
  value,
  options,
  placeholder = "Select an option",
  required,
  error,
  onChange,
  labelledBy,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onTriggerKey(e: ReactKeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  return (
    <div className={`select-wrap${open ? " is-open" : ""}`} ref={wrapRef}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        id={id}
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
      >
        <span className={selected ? undefined : "placeholder"}>
          {selected?.label || placeholder}
        </span>
        <IconChevron />
      </button>
      <div
        className="select-menu"
        role="listbox"
        id={listId}
        tabIndex={-1}
        hidden={!open}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="option"
            className="select-option"
            aria-selected={opt.value === value}
            onClick={() => {
              onChange(opt.value);
              setOpen(false);
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
