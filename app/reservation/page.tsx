import type { Metadata } from "next";
import Header from "@/components/Header";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Réserver un studio",
  description:
    "Réservez votre créneau en ligne dans l'un de nos 3 studios à Laval. Studio Antique, Détente ou Pro — disponible 7 jours sur 7 de 10h à 22h. Réservation rapide et gratuite.",
  alternates: {
    canonical: "https://multirecstudio.com/reservation",
  },
  openGraph: {
    title: "Réserver un studio | Multi Rec Studio Laval",
    description: "Choisissez votre studio et réservez en 2 minutes. 3 ambiances, 7j/7, 10h–22h.",
    url: "https://multirecstudio.com/reservation",
  },
};

export default function ReservationPage() {
  return (
    <main>
      <Header />
      <Reservation />
      <Footer />
    </main>
  );
}
