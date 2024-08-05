import Cities from "@/components/Cities";
import CountUp from "@/components/CountUp";
import SectionHeader from "@/components/Headers";
import HeroSection from "@/components/HeroSection";
import HotelCard from "@/components/HotelCard";
import Listings from "@/components/Listings";
import MostPlaces from "@/components/MostPlaces";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Listings />
      <Cities />
      <CountUp />
      <MostPlaces />
    </main>
  );
}
