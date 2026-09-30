import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconCheck } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { formatPhoneDisplay, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Mountain Family Health Care Center, a family practice clinic on N First Street in Fresno with accessible facilities and weekday hours.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="eyebrow">About</p>
            <h1>Family practice on N First Street</h1>
            <p className="lede">
              Mountain Family Health Care Center serves Fresno households from
              Suite 105 at 5187 N First Street. We focus on clear primary care
              visits and recommend scheduling ahead.
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href="/contact">
                Request an appointment
              </Link>
              <a className="btn btn-ghost" href={site.phoneHref}>
                Call {formatPhoneDisplay(site.phone)}
              </a>
            </div>
          </div>
          <div className="page-hero-media">
            <Image
              src={site.images.waiting}
              alt="Clinic waiting area with natural light"
              width={1280}
              height={720}
              priority
              sizes="(max-width: 840px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell about-grid">
          <Reveal>
            <article className="panel">
              <h2>How we work</h2>
              <p>
                Appointments are recommended so the clinic can prepare for your
                visit. Bring questions, a medication list, and payment or
                insurance details when you come in.
              </p>
              <ul className="check-list">
                {site.amenities.map((item) => (
                  <li key={item}>
                    <IconCheck width={18} height={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal>
            <article className="panel panel-hours">
              <h2>Hours</h2>
              <table className="hours-table">
                <tbody>
                  {site.hours.map((row) => (
                    <tr key={row.day}>
                      <th scope="row">{row.day}</th>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell split-grid">
          <Reveal>
            <div className="split-media">
              <Image
                src={site.images.exterior}
                alt="Accessible entrance to the medical suite"
                width={1280}
                height={720}
                sizes="(max-width: 840px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="split-copy">
              <p className="eyebrow">Visit</p>
              <h2>Getting here</h2>
              <p>
                We are in Fresno at {site.address}. Parking includes wheelchair
                accessible spaces, and the entrance and restroom are accessible.
              </p>
              <div className="actions">
                <a
                  className="btn btn-primary"
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                </a>
                <Link className="btn btn-ghost" href="/contact">
                  Book a visit
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
