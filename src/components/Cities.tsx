"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "./Headers";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";
import Link from "next/link";
import axios from "axios";
import { HotelType } from "@/types/hostelTypes";
import Image from "next/image";

// Predefined images for cities
const cityImages: { [key: string]: string } = {
  Ho: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  Accra:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  Ahodzo: "/c1.jpg",
  koforidua: "/c2.jpg",
  Bono: "/c3.jpg",
};

const Cities = () => {
  const [hotels, setHotels] = useState<HotelType[] | []>([]);

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

  const getUniqueCities = (hotels: HotelType[]): string[] => {
    const cities = hotels.map((hotel) => hotel.city);
    return Array.from(new Set(cities));
  };

  const getCityImage = (city: string) => {
    return cityImages[city] || "/default-image.jpg"; // Fallback to a default image if city not found
  };

  return (
    <div className="bg-stone-200/40">
      <Wrapper>
        <SectionHeader
          mainText="Explore Best Cities"
          subText="Catalog of Categories"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-5 mt-10">
          {getUniqueCities(hotels)
            ?.slice(0, 5)
            ?.map((city, i) => (
              <Link
                href={`/listings/?city=${city}`}
                key={i}
                className="h-72 bg-black lg:last:col-span-2 rounded-lg shadow-md overflow-hidden relative"
              >
                <Image
                  src={Object.entries(cityImages)[i][1]}
                  alt={city}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-5 left-5 flex justify-center z-10 backdrop-blur w-fit p-1 rounded-lg">
                  <p className="text-sm text-white flex items-center justify-center bg-primaryColor w-full px-5 py-1 rounded-lg">
                    {city}
                  </p>
                </div>
                <div className="absolute inset-0 bg-slate-600/20 flex items-center justify-center" />
              </Link>
            ))}
        </div>

        <div className="flex justify-center mt-10 bg-gray-300 w-fit mx-auto rounded-lg p-1.5">
          <Button className="group w-70 relative overflow-hidden bg-primaryColor text-lg p-5">
            <span className="pr-3">View All Cities </span>
            <ArrowRight className="w-4 h-4 group-hover:ml-4 transition-all duration-300" />
            <span className="bg-transparent rounded-full w-16 h-16 group-hover:bg-gray-300/10 absolute -right-2 -top-3"></span>
          </Button>
        </div>
      </Wrapper>
    </div>
  );
};

export default Cities;
