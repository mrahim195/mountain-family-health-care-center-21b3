import type { Metadata } from "next";
import { AppointmentForm } from "@/components/AppointmentForm";
import { IconClock, IconPhone, IconPin } from "@/components/Icons";
import { formatPhoneDisplay, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Appointments",
  description:
    "Request an appointment at Mountain Family Health Care Center in Fresno. Prefer a weekday and we will confirm availability.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Appointments</p>
          <h1>Schedule a visit</h1>
          <p className="lede">
            Share your preferred weekday and reason for visit. This sends a
            request. Staff will contact you to confirm. For faster help, call{" "}
            {formatPhoneDisplay(site.phone)}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell contact-layout">
          <AppointmentForm />

          <aside className="contact-aside">
            <article className="aside-card">
              <h2>Clinic details</h2>
              <ul className="aside-list">
                <li>
                  <IconPhone width={18} height={18} />
                  <div>
                    <strong>Phone</strong>
                    <a href={site.phoneHref}>
                      {formatPhoneDisplay(site.phone)}
                    </a>
                  </div>
                </li>
                <li>
                  <IconPin width={18} height={18} />
                  <div>
                    <strong>Address</strong>
                    <a
                      href={site.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.address}
                    </a>
                  </div>
                </li>
                <li>
                  <IconClock width={18} height={18} />
                  <div>
                    <strong>Hours</strong>
                    <span>{site.hoursSummary}</span>
                  </div>
                </li>
              </ul>
            </article>

            <article className="aside-card">
              <h2>Weekly hours</h2>
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

            <article className="aside-card note-card">
              <h2>Please note</h2>
              <p>
                Submitting this form does not confirm an appointment. We review
                requests against open weekday slots and then contact you.
              </p>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}
