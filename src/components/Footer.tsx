import Link from "next/link";
import { Logo } from "@/components/Logo";
import { formatPhoneDisplay, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link
            href="/"
            className="brand"
            aria-label={`${site.businessName} home`}
          >
            <Logo variant="mark" width={36} height={36} />
            <span className="brand-text">
              <strong>Mountain Family</strong>
              <span>Health Care Center</span>
            </span>
          </Link>
          <p>
            Family practice clinic serving Fresno from our suite on N First
            Street. Appointments recommended.
          </p>
        </div>

        <div>
          <strong>Explore</strong>
          <ul className="footer-links">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Visit & call</strong>
          <ul className="footer-links">
            <li>
              <a href={site.mapsLink} target="_blank" rel="noopener noreferrer">
                {site.address}
              </a>
            </li>
            <li>
              <a href={site.phoneHref}>{formatPhoneDisplay(site.phone)}</a>
            </li>
            <li>{site.hoursSummary}</li>
          </ul>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>
          © {year} {site.businessName}
        </span>
        <span>Fresno, California</span>
      </div>
    </footer>
  );
}
