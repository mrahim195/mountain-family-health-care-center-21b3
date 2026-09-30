"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { Logo } from "@/components/Logo";
import { formatPhoneDisplay, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="shell nav-row">
        <Link
          href="/"
          className="brand"
          aria-label={`${site.businessName} home`}
        >
          <Logo />
          <span className="brand-text">
            <strong>Mountain Family</strong>
            <span>Health Care Center</span>
          </span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="btn btn-primary nav-cta" href="/contact">
          Request appointment
        </Link>

        <button
          type="button"
          className={`menu-toggle${open ? " is-open" : ""}`}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`mobile-nav${open ? " is-open" : ""}`}
        id={panelId}
        hidden={!open}
      >
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={close}
        />
        <nav className="mobile-nav-panel" aria-label="Mobile">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <div className="mobile-nav-actions">
            <Link className="btn btn-primary" href="/contact" onClick={close}>
              Request appointment
            </Link>
            <a className="btn btn-ghost" href={site.phoneHref} onClick={close}>
              Call {formatPhoneDisplay(site.phone)}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
