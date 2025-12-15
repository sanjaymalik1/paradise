import HeroSection from "@/components/HeroSection";
import PromoBanner from "@/components/PromoBanner";
import EmailSubscription from "@/components/EmailSubscription";
import GlobalPresence from "@/components/GlobalPresence";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CityNav from "@/components/CityNav";

export default function Page() {
  return (
    <main className="">
      <header>
        <Navbar />
        <CityNav />
      </header>
      <HeroSection />
      <PromoBanner />
      <EmailSubscription />
      <GlobalPresence />
      <Footer />
    </main>
  )
}