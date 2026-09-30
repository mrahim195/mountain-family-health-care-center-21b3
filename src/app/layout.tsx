import type { Metadata } from "next";
import { Literata, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Literata({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const titleDefault = `${site.businessName} | Family Practice in Fresno`;

export const metadata: Metadata = {
  metadataBase: new URL("https://mountainfamilyhealthcare.example"),
  title: {
    default: titleDefault,
    template: `%s | ${site.businessName}`,
  },
  description: site.description.slice(0, 155),
  applicationName: site.businessName,
  keywords: [
    "Mountain Family Health Care Center",
    "family practice Fresno",
    "medical clinic Fresno",
    "primary care N First Street",
    "doctor Fresno CA 93710",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.businessName,
    title: titleDefault,
    description: site.tagline,
    images: [
      {
        url: site.images.waiting,
        width: 1280,
        height: 720,
        alt: `${site.businessName} clinic`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: site.tagline,
    images: [site.images.waiting],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon" }],
    apple: [{ url: "/icon" }],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
