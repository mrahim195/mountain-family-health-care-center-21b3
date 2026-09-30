"use client";

import { FormEvent, useId, useState } from "react";
import { CustomSelect } from "@/components/CustomSelect";
import { DatePicker } from "@/components/DatePicker";
import { site } from "@/lib/site";

type Errors = Partial<
  Record<"name" | "phone" | "email" | "service" | "preferredDate" | "message", string>
>;

const timeOptions = [
  { value: "morning", label: "Morning (8 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (1 PM – 5 PM)" },
  { value: "either", label: "Either works" },
];

const serviceOptions = [
  ...site.services.map((s) => ({ value: s.id, label: s.title })),
  { value: "other", label: "Other / not sure" },
];

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValidPhone(v: string) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function AppointmentForm() {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("either");

  const nameId = `${formId}-name`;
  const phoneId = `${formId}-phone`;
  const emailId = `${formId}-email`;
  const serviceId = `${formId}-service`;
  const dateId = `${formId}-date`;
  const timeId = `${formId}-time`;
  const messageId = `${formId}-message`;
  const serviceLabelId = `${formId}-service-label`;
  const dateLabelId = `${formId}-date-label`;
  const timeLabelId = `${formId}-time-label`;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name) next.name = "Please enter your full name.";
    if (!phone) next.phone = "Please enter a phone number so we can reach you.";
    else if (!isValidPhone(phone))
      next.phone = "Please enter a valid phone number.";
    if (!email) next.email = "Please enter your email address.";
    else if (!isValidEmail(email))
      next.email = "Please enter a valid email address.";
    if (!service) next.service = "Please choose a service.";
    if (!preferredDate)
      next.preferredDate = "Please choose a preferred date.";
    if (!message) next.message = "Please share a brief note about your visit.";
    else if (message.length < 10)
      next.message = "Please add a bit more detail (at least a sentence).";

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("service", service);
    data.set("preferredDate", preferredDate);
    data.set("preferredTime", preferredTime);

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("err");
      setFormMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          phone: String(data.get("phone") || "").trim(),
          message: String(data.get("message") || "").trim(),
          service:
            serviceOptions.find((s) => s.value === service)?.label || service,
          preferredDate,
          preferredTime:
            timeOptions.find((t) => t.value === preferredTime)?.label ||
            preferredTime,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not send your request.");

      setStatus("ok");
      setFormMessage(
        "Request sent. Our team will review your preferred date and contact you to confirm. This is not a confirmed appointment yet."
      );
      form.reset();
      setService("");
      setPreferredDate("");
      setPreferredTime("either");
      setErrors({});
    } catch (err) {
      setStatus("err");
      setFormMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us or try again."
      );
    }
  }

  return (
    <div className="form-card">
      <h2>Request an appointment</h2>
      <p className="form-intro">
        Tell us a preferred weekday and how we can help. We will follow up to
        confirm. Appointments are recommended.
      </p>

      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="form-row two">
          <div className={`field${errors.name ? " has-error" : ""}`}>
            <label htmlFor={nameId}>
              Full name<span className="req" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={nameId}
              name="name"
              autoComplete="name"
              required
              placeholder="Alex Nguyen"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${nameId}-err` : undefined}
            />
            {errors.name ? (
              <span className="field-error" id={`${nameId}-err`} role="alert">
                {errors.name}
              </span>
            ) : null}
          </div>

          <div className={`field${errors.phone ? " has-error" : ""}`}>
            <label htmlFor={phoneId}>
              Phone<span className="req" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={phoneId}
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="(559) 555-0123"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${phoneId}-err` : undefined}
            />
            {errors.phone ? (
              <span className="field-error" id={`${phoneId}-err`} role="alert">
                {errors.phone}
              </span>
            ) : null}
          </div>
        </div>

        <div className={`field${errors.email ? " has-error" : ""}`}>
          <label htmlFor={emailId}>
            Email<span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-err` : undefined}
          />
          {errors.email ? (
            <span className="field-error" id={`${emailId}-err`} role="alert">
              {errors.email}
            </span>
          ) : null}
        </div>

        <div className={`field${errors.service ? " has-error" : ""}`}>
          <span className="label" id={serviceLabelId}>
            Reason for visit<span className="req" aria-hidden="true">
              *
            </span>
          </span>
          <CustomSelect
            id={serviceId}
            name="service"
            value={service}
            options={serviceOptions}
            placeholder="Select a reason"
            required
            error={errors.service}
            labelledBy={serviceLabelId}
            onChange={(v) => {
              setService(v);
              setErrors((e) => ({ ...e, service: undefined }));
            }}
          />
          {errors.service ? (
            <span className="field-error" role="alert">
              {errors.service}
            </span>
          ) : null}
        </div>

        <div className="form-row two">
          <div className={`field${errors.preferredDate ? " has-error" : ""}`}>
            <span className="label" id={dateLabelId}>
              Preferred date<span className="req" aria-hidden="true">
                *
              </span>
            </span>
            <DatePicker
              id={dateId}
              name="preferredDate"
              value={preferredDate}
              labelledBy={dateLabelId}
              error={errors.preferredDate}
              onChange={(v) => {
                setPreferredDate(v);
                setErrors((e) => ({ ...e, preferredDate: undefined }));
              }}
            />
            {errors.preferredDate ? (
              <span className="field-error" role="alert">
                {errors.preferredDate}
              </span>
            ) : null}
          </div>

          <div className="field">
            <span className="label" id={timeLabelId}>
              Preferred time
            </span>
            <CustomSelect
              id={timeId}
              name="preferredTime"
              value={preferredTime}
              options={timeOptions}
              labelledBy={timeLabelId}
              onChange={setPreferredTime}
            />
          </div>
        </div>

        <div className={`field${errors.message ? " has-error" : ""}`}>
          <label htmlFor={messageId}>
            How can we help?<span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id={messageId}
            name="message"
            required
            placeholder="Briefly describe the reason for your visit or any questions."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${messageId}-err` : undefined}
          />
          {errors.message ? (
            <span className="field-error" id={`${messageId}-err`} role="alert">
              {errors.message}
            </span>
          ) : null}
        </div>

        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Submit request"
          )}
        </button>

        {formMessage ? (
          <p
            className={`form-msg ${status === "ok" ? "ok" : "err"}`}
            role="status"
            aria-live="polite"
          >
            {formMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}
