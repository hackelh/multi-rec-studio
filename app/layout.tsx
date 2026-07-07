import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const BASE_URL = "https://multirecstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Multi Rec Studio | Studio Podcast Premium à Laval",
    template: "%s | Multi Rec Studio",
  },
  description:
    "Studio de production audiovisuelle premium à Laval. Concept Plug & Play : enregistrement 4K multicaméra, son haute fidélité, montage professionnel. Idéal pour podcasts, PME, créateurs de contenu.",
  keywords: [
    "studio podcast Laval",
    "studio enregistrement Laval",
    "production audiovisuelle Laval",
    "podcast studio Montréal",
    "Multi Rec Studio",
    "studio enregistrement Québec",
    "réservation studio en ligne",
  ],
  authors: [{ name: "Multi Rec Studio" }],
  creator: "Multi Rec Studio",
  publisher: "Multi Rec Studio",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Multi Rec Studio | Studio Podcast Premium à Laval",
    description: "Plug & Play · Enregistrement 4K · Son HD · 3 Studios · Ouvert 7j/7 de 10h à 22h",
    url: BASE_URL,
    siteName: "Multi Rec Studio",
    type: "website",
    locale: "fr_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Rec Studio | Studio Podcast Premium à Laval",
    description: "Studio Plug & Play à Laval · Enregistrement 4K · 7j/7 10h–22h",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BASE_URL,
  name: "Multi Rec Studio",
  description:
    "Studio de production audiovisuelle et podcast premium à Laval, Québec. Concept Plug & Play avec enregistrement 4K, son haute fidélité et montage professionnel.",
  url: BASE_URL,
  email: "multirecstudio1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Laval",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.5688,
    longitude: -73.7119,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "22:00",
    },
  ],
  priceRange: "$$",
  image: `${BASE_URL}/opengraph-image`,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
