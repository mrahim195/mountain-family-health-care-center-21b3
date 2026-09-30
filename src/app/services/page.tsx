import type { Metadata } from "next";
import Link from "next/link";
import { ServiceIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { formatPhoneDisplay, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Family practice services at Mountain Family Health Care Center in Fresno, including checkups, sick visits, and ongoing primary care.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Services</p>
          <h1>Primary care for everyday needs</h1>
          <p className="lede">
            Family practice care for checkups, acute concerns, and ongoing
            health management. Request a visit and we will confirm what we can
            schedule.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell service-grid service-grid-lg">
          {site.services.map((item, i) => (
            <Reveal key={item.id}>
              <article
                className="service-tile"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="service-icon" aria-hidden="true">
                  <ServiceIcon name={item.icon} />
                </span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-inner">
          <div>
            <h2>Need to be seen?</h2>
            <p>
              Call {formatPhoneDisplay(site.phone)} or send an appointment
              request. We will follow up to confirm timing.
            </p>
          </div>
          <div className="actions">
            <Link className="btn btn-accent" href="/contact">
              Request an appointment
            </Link>
            <a className="btn btn-light" href={site.phoneHref}>
              Call the clinic
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
