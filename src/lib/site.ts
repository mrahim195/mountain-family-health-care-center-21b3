export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: "family" | "checkup" | "sick" | "chronic" | "access" | "pay";
};

export type HourRow = {
  day: string;
  time: string;
};

export type SiteContent = {
  businessName: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  mapsLink: string;
  coordinates: { lat: number; lng: number };
  hours: HourRow[];
  hoursSummary: string;
  rating: number | null;
  reviewCount: number | null;
  reviewsLink: string;
  images: {
    featured: string;
    gallery: string;
    waiting: string;
    desk: string;
    exterior: string;
  };
  amenities: string[];
  services: ServiceItem[];
  nav: { href: string; label: string }[];
  faq: { question: string; answer: string }[];
};

export const site: SiteContent = {
  businessName: "Mountain Family Health Care Center",
  shortName: "Mountain Family",
  tagline: "Family practice care in Fresno",
  description:
    "Mountain Family Health Care Center is a family practice clinic on N First Street in Fresno. We see patients by appointment for everyday primary care, checkups, and ongoing health needs in an accessible neighborhood office.",
  phone: "+1 559-226-6796",
  phoneHref: "tel:+15592266796",
  email: "",
  address: "5187 N First St Ste 105, Fresno, CA 93710",
  streetAddress: "5187 N First St Ste 105",
  city: "Fresno",
  region: "CA",
  postalCode: "93710",
  mapsLink:
    "https://www.google.com/maps/place/Mountain+Family+Health+Care+Center/@36.8118934,-119.77285,17z",
  coordinates: { lat: 36.8118934, lng: -119.77285 },
  hours: [
    { day: "Monday", time: "8:00 AM – 12:00 PM, 1:00 – 5:00 PM" },
    { day: "Tuesday", time: "8:00 AM – 12:00 PM, 1:00 – 5:00 PM" },
    { day: "Wednesday", time: "8:00 AM – 12:00 PM, 1:00 – 5:00 PM" },
    { day: "Thursday", time: "8:00 AM – 12:00 PM, 1:00 – 5:00 PM" },
    { day: "Friday", time: "8:00 AM – 3:30 PM" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
  hoursSummary: "Mon–Thu 8–12 & 1–5 · Fri 8–3:30 · Closed weekends",
  rating: 3.9,
  reviewCount: 25,
  reviewsLink:
    "https://search.google.com/local/reviews?placeid=ChIJ21Rl-GRdlIARSMw3yx-ELkI&q=Mountain+Family+Health+Care+Center&authuser=0&hl=en",
  images: {
    featured:
      "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmT3UwTIWRPSlaTp5XMJlKsin3f0BrYXrxKTvvEfo4dFWJJfkGyAHuW0I_vCSvl_VbmG8-acMPMf1XCPyMkEQjhVL2scozWU0UvKAYMmlfm4ZBpluRHfLOz8Xtjvv-sxeLb8TW2=w1920-h1080-k-no",
    gallery:
      "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmT3UwTIWRPSlaTp5XMJlKsin3f0BrYXrxKTvvEfo4dFWJJfkGyAHuW0I_vCSvl_VbmG8-acMPMf1XCPyMkEQjhVL2scozWU0UvKAYMmlfm4ZBpluRHfLOz8Xtjvv-sxeLb8TW2=w1920-h1080-k-no",
    waiting: "/images/clinic-waiting.jpg",
    desk: "/images/care-desk.jpg",
    exterior: "/images/clinic-exterior.jpg",
  },
  amenities: [
    "Wheelchair accessible entrance",
    "Wheelchair accessible parking lot",
    "Wheelchair accessible restroom",
    "Appointments recommended",
    "Credit cards accepted",
    "Debit cards accepted",
  ],
  services: [
    {
      id: "family",
      title: "Family practice",
      description:
        "Primary care for adults and families in one familiar Fresno clinic, focused on clear answers and steady follow-through.",
      icon: "family",
    },
    {
      id: "checkup",
      title: "Checkups & preventive care",
      description:
        "Routine visits to review your health, screenings, and questions before small concerns become larger ones.",
      icon: "checkup",
    },
    {
      id: "sick",
      title: "Sick visits",
      description:
        "Same-week appointment requests for colds, infections, and other urgent but non-emergency needs when we have openings.",
      icon: "sick",
    },
    {
      id: "chronic",
      title: "Ongoing care",
      description:
        "Support for long-term conditions with scheduled follow-ups so treatment stays organized and practical.",
      icon: "chronic",
    },
  ],
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Appointments" },
  ],
  faq: [
    {
      question: "Do I need an appointment?",
      answer:
        "Appointments are recommended. Request a preferred day and time online or call us, and we will follow up to confirm.",
    },
    {
      question: "What are your hours?",
      answer:
        "Monday through Thursday we are open 8 AM–12 PM and 1–5 PM. Friday we are open 8 AM–3:30 PM. We are closed Saturday and Sunday.",
    },
    {
      question: "Where are you located?",
      answer:
        "We are at 5187 N First St, Suite 105 in Fresno, CA 93710. The entrance and parking lot are wheelchair accessible.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards and debit cards.",
    },
    {
      question: "Is the office accessible?",
      answer:
        "Yes. We have a wheelchair accessible entrance, parking lot, and restroom.",
    },
  ],
};

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function hoursForToday(): HourRow {
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return (
    site.hours.find((h) => h.day === day) || {
      day,
      time: "See weekly hours",
    }
  );
}
