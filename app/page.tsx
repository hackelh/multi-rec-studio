import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <About />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
