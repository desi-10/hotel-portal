import Cities from "@/components/Cities";
import CountUpComponent from "@/components/CountUp";
import HeroSection from "@/components/HeroSection";
import Listings from "@/components/Listings";
import MostPlaces from "@/components/MostPlaces";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Listings />
      <Cities />
      <CountUpComponent />
      <MostPlaces />
    </main>
  );
}
