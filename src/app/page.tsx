import Image from "next/image";
import Link from "next/link";
import {
  IconAccess,
  IconCheck,
  IconClock,
  IconPay,
  IconPhone,
  IconPin,
  ServiceIcon,
} from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { formatPhoneDisplay, hoursForToday, site } from "@/lib/site";

export default function HomePage() {
  const todayHours = hoursForToday();

  return (
    <>
      <section className="hero" aria-label="Welcome">
        <div className="hero-media">
          <Image
            src={site.images.waiting}
            alt="Calm waiting area at Mountain Family Health Care Center"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content">
          <div className="shell hero-inner">
            <p className="brand-lockup">Mountain Family Health Care Center</p>
            <h1>Family practice care in Fresno</h1>
            <p className="lede">
              Primary care for your household on N First Street. Schedule ahead
              for checkups, sick visits, and ongoing health needs.
            </p>
            <div className="actions">
              <Link className="btn btn-accent" href="/contact">
                Request an appointment
              </Link>
              <a className="btn btn-light" href={site.phoneHref}>
                <IconPhone width={18} height={18} />
                Call {formatPhoneDisplay(site.phone)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="info-strip">
            <div className="info-item">
              <IconPin width={18} height={18} />
              <div>
                <strong>Fresno clinic</strong>
                <p>5187 N First St, Suite 105</p>
              </div>
            </div>
            <div className="info-item">
              <IconClock width={18} height={18} />
              <div>
                <strong>Today · {todayHours.day}</strong>
                <p>{todayHours.time}</p>
              </div>
            </div>
            {site.rating && site.reviewCount ? (
              <a
                className="info-item info-link"
                href={site.reviewsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="star" aria-hidden="true">
                  ★
                </span>
                <div>
                  <strong>
                    {site.rating} on Google
                  </strong>
                  <p>{site.reviewCount} reviews</p>
                </div>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Care we provide</p>
              <h2>Everyday medicine for your family</h2>
              <p>
                Straightforward primary care in a neighborhood office. Tell us
                what you need when you request a visit.
              </p>
            </div>
          </Reveal>
          <div className="service-grid">
            {site.services.map((item, i) => (
              <Reveal key={item.id}>
                <article
                  className="service-tile"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="service-icon" aria-hidden="true">
                    <ServiceIcon name={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="section-actions">
              <Link className="btn btn-primary" href="/services">
                View all services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-split">
        <div className="shell split-grid">
          <Reveal>
            <div className="split-copy">
              <p className="eyebrow">About the clinic</p>
              <h2>A familiar place for Fresno families</h2>
              <p>
                Mountain Family Health Care Center is a family practice clinic
                at 5187 N First Street, Suite 105. We recommend appointments so
                your visit can be prepared and on time.
              </p>
              <ul className="check-list">
                <li>
                  <IconCheck width={18} height={18} />
                  Wheelchair accessible entrance, parking, and restroom
                </li>
                <li>
                  <IconCheck width={18} height={18} />
                  Credit and debit cards accepted
                </li>
                <li>
                  <IconCheck width={18} height={18} />
                  Weekday hours with a midday break Monday–Thursday
                </li>
              </ul>
              <Link className="text-link" href="/about">
                More about the clinic
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="split-media">
              <Image
                src={site.images.desk}
                alt="Quiet clinical workspace prepared for a patient visit"
                width={1280}
                height={720}
                sizes="(max-width: 840px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Visit basics</p>
              <h2>What to expect when you come in</h2>
            </div>
          </Reveal>
          <div className="step-row">
            <Reveal>
              <article className="step">
                <span className="step-num">1</span>
                <h3>Request a time</h3>
                <p>
                  Share a preferred weekday online or call{" "}
                  {formatPhoneDisplay(site.phone)}. We confirm availability
                  before your visit is set.
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article className="step">
                <span className="step-num">2</span>
                <h3>Arrive prepared</h3>
                <p>
                  Bring your ID, insurance card if you have one, and a short
                  list of questions or medications.
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article className="step">
                <span className="step-num">3</span>
                <h3>See your clinician</h3>
                <p>
                  We focus on clear next steps for checkups, sick visits, and
                  ongoing care needs.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell amenity-band">
          <Reveal>
            <div>
              <p className="eyebrow">Access & payments</p>
              <h2>Designed for a straightforward visit</h2>
            </div>
          </Reveal>
          <div className="amenity-grid">
            <Reveal>
              <div className="amenity">
                <IconAccess />
                <div>
                  <strong>Accessible office</strong>
                  <p>Entrance, parking lot, and restroom are wheelchair accessible.</p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="amenity">
                <IconPay />
                <div>
                  <strong>Card payments</strong>
                  <p>Credit and debit cards are accepted at the clinic.</p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="amenity">
                <IconClock />
                <div>
                  <strong>{site.hoursSummary}</strong>
                  <p>Closed Saturday and Sunday.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-map">
        <div className="shell map-grid">
          <Reveal>
            <div>
              <p className="eyebrow">Location</p>
              <h2>Find us in Fresno</h2>
              <p className="section-copy">
                {site.address}
              </p>
              <div className="actions">
                <a
                  className="btn btn-primary"
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
                <a className="btn btn-ghost" href={site.phoneHref}>
                  Call the clinic
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="map-frame">
              <Image
                src={site.images.exterior}
                alt="Neighborhood medical office exterior with accessible entrance"
                width={1280}
                height={720}
                sizes="(max-width: 840px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">FAQ</p>
              <h2>Quick answers before you call</h2>
            </div>
          </Reveal>
          <div className="faq-list">
            {site.faq.map((item) => (
              <Reveal key={item.question}>
                <details className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-inner">
          <div>
            <h2>Ready to schedule?</h2>
            <p>
              Request a preferred day online, or call{" "}
              {formatPhoneDisplay(site.phone)}. We will confirm before your
              appointment is set.
            </p>
          </div>
          <div className="actions">
            <Link className="btn btn-accent" href="/contact">
              Request an appointment
            </Link>
            <a className="btn btn-light" href={site.phoneHref}>
              Call now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
