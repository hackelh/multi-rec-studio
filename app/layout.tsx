import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multi Rec Studio | Studio Podcast Premium à Laval",
  description:
    "Studio de production audiovisuelle premium à Laval. Concept Plug & Play : enregistrement 4K multicaméra, son haute fidélité, montage professionnel. Idéal pour podcasts, PME, créateurs de contenu.",
  keywords: [
    "studio podcast Laval",
    "studio enregistrement Laval",
    "production audiovisuelle Laval",
    "podcast studio Montreal",
    "Multi Rec Studio",
  ].join(", "),
  openGraph: {
    title: "Multi Rec Studio | Studio Podcast Premium à Laval",
    description: "Plug & Play · Enregistrement 4K · Montage Pro · Livraison 24h",
    type: "website",
    locale: "fr_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
