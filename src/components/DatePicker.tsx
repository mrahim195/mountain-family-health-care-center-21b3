"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { IconCalendar, IconChevron } from "@/components/Icons";

type Props = {
  id?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  labelledBy?: string;
  minDate?: Date;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDisplay(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isWeekend(d: Date) {
  const day = d.getDay();
  return day === 0 || day === 6;
}

export function DatePicker({
  id,
  name,
  value,
  onChange,
  error,
  labelledBy,
  minDate,
}: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const min = startOfDay(minDate || today);
  const [open, setOpen] = useState(false);
  const initial = value
    ? (() => {
        const [y, m] = value.split("-").map(Number);
        return new Date(y, m - 1, 1);
      })()
    : new Date(today.getFullYear(), today.getMonth(), 1);
  const [view, setView] = useState(initial);
  const wrapRef = useRef<HTMLDivElement>(null);
  const popId = useId();

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

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const monthLabel = view.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const canPrev =
    year > min.getFullYear() ||
    (year === min.getFullYear() && month > min.getMonth());

  return (
    <div className={`date-wrap${open ? " is-open" : ""}`} ref={wrapRef}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        className="date-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popId}
        aria-labelledby={labelledBy}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={value ? undefined : "placeholder"}>
          {value ? formatDisplay(value) : "Choose a preferred date"}
        </span>
        <IconCalendar />
      </button>

      <div
        className="calendar-popover"
        id={popId}
        role="dialog"
        aria-label="Choose a date"
        hidden={!open}
      >
        <div className="cal-header">
          <button
            type="button"
            className="cal-nav"
            aria-label="Previous month"
            disabled={!canPrev}
            onClick={() => setView(new Date(year, month - 1, 1))}
          >
            <IconChevron style={{ transform: "rotate(90deg)" }} />
          </button>
          <strong>{monthLabel}</strong>
          <button
            type="button"
            className="cal-nav"
            aria-label="Next month"
            onClick={() => setView(new Date(year, month + 1, 1))}
          >
            <IconChevron style={{ transform: "rotate(-90deg)" }} />
          </button>
        </div>

        <div className="cal-grid" role="grid" aria-label={monthLabel}>
          {WEEKDAYS.map((d) => (
            <div key={d} className="cal-dow">
              {d}
            </div>
          ))}
          {cells.map((date, i) => {
            if (!date) {
              return <div key={`e-${i}`} className="cal-day is-outside" />;
            }
            const iso = toISO(date);
            const disabled = startOfDay(date) < min || isWeekend(date);
            const selected = value === iso;
            const isToday = toISO(today) === iso;
            return (
              <button
                key={iso}
                type="button"
                className={`cal-day${selected ? " is-selected" : ""}${
                  isToday ? " is-today" : ""
                }`}
                disabled={disabled}
                aria-label={date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                aria-pressed={selected}
                onClick={() => {
                  onChange(iso);
                  setOpen(false);
                }}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
        <p className="cal-footnote">
          Weekends are closed. This date is a preference only. Staff will
          confirm availability.
        </p>
      </div>
    </div>
  );
}
