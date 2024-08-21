"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "./Headers";
import LatestListing from "./LatestListing";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HotelType } from "@/types/hostelTypes";
import axios from "axios";
import Link from "next/link";

function Listings() {
  const [hotels, setHotels] = useState<HotelType[] | []>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({
      playOnInit: true,
      delay: 3000,
      active: true,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      stopOnFocusIn: true,
    }),
  ]);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const fetchHotel = async () => {
    try {
      const { data } = await axios.get(
        `https://hotelbookingcenter.pythonanywhere.com/api/hotels/`
      );
      console.log(data);
      setHotels(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <main className="py-10 px-3">
      <SectionHeader
        mainText="The Latest Listings"
        subText="newest listings"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />

      <div className="relative mt-10">
        <div
          className="flex justify-center items-center absolute bg-primaryColor text-white border h-10 w-10 z-10  rounded-r-full left-0 top-1/2 -translate-y-1/2  group-hover/name:opacity-100 transition-all duration-300 cursor-pointer"
          onClick={scrollPrev}
        >
          <ArrowLeft className="h-4 w-4" />
        </div>
        <div
          className="flex justify-center items-center absolute bg-primaryColor text-white border h-10 w-10 z-10 rounded-l-full right-0 top-1/2 -translate-y-1/2  group-hover/name:opacity-100 transition-all duration-300 cursor-pointer"
          onClick={scrollNext}
        >
          <ArrowRight className="h-4 w-4" />
        </div>
        <div className="embla" ref={emblaRef}>
          <div className="flex space-x-8">
            {hotels.map((hotel, i) => {
              return (
                <div key={hotel.id} className="">
                  <Link
                    href={`/listings/${hotel.id}/?hotel__hotel_number=${hotel.hotel_number}`}
                  >
                    <LatestListing hotel={hotel} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Listings;
