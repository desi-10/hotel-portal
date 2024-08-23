"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "./Headers";
import Wrapper from "./Wrapper";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { HotelType } from "@/types/hostelTypes";
import Link from "next/link";
import HotelCard from "./HotelCard";
import axios from "axios";

const MostPlaces = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [selectedNumber, setSelectedNumber] = useState(1);

  useEffect(() => {
    const getHotel = async () => {
      const { data } = await axios(
        "https://hotelbookingcenter.pythonanywhere.com/api/hotels/"
      );
      setHotels(data);
    };

    getHotel();
  }, []);

  const filterData = [
    {
      id: 1,
      name: "All categories",
    },
    {
      id: 2,
      name: "Hotel",
    },
    {
      id: 3,
      name: "Event center",
    },
  ];

  const handleFetchData = async (id: number) => {
    if (id === 1) {
      const getHotelAndEvents = async () => {
        const hotelsRes = await axios(
          "https://hotelbookingcenter.pythonanywhere.com/api/hotels/"
        );

        const eventsRes = await axios(
          "https://hotelbookingcenter.pythonanywhere.com/api/event-centers/"
        );

        setHotels([...hotelsRes.data, ...eventsRes.data]);
      };

      getHotelAndEvents();
    }

    if (id === 2) {
      const getHotel = async () => {
        const { data } = await axios(
          "https://hotelbookingcenter.pythonanywhere.com/api/hotels/"
        );
        setHotels(data);
      };

      getHotel();
    }

    if (id === 3) {
      const getEvent = async () => {
        const { data } = await axios(
          "https://hotelbookingcenter.pythonanywhere.com/api/event-centers/"
        );

        setHotels(data);
      };

      getEvent();
    }
    setSelectedNumber(id);
  };

  return (
    <div>
      <div className="px-5 lg:container">
        <SectionHeader mainText="Most Visited Places" subText="Best Listings" />

        <div className="flex justify-center mt-10 border-2 overflow-hidden w-fit mx-auto rounded-lg text-xs font-bold">
          <ul className="flex items-center bg-gray-100 [&>li]:cursor-pointer [&>li]:px-5 [&>li]:p-3 divide-x">
            {filterData.map((item) => (
              <li
                onClick={() => handleFetchData(item.id)}
                key={item.id}
                className={`${
                  item.id === selectedNumber && "bg-primaryColor text-white"
                } text-gray-500`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
          {hotels.map((hotel, i) => (
            <div key={i}>
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>

        <Link href="/listings">
          <div className="flex justify-center mt-10 bg-gray-300 w-fit mx-auto rounded-lg p-1.5">
            <Button className="group w-full sm:w-auto relative overflow-hidden bg-primaryColor text-lg p-5">
              <span className="pr-3">View All Hotels</span>
              <ArrowRight className="w-4 h-4 group-hover:ml-4 transition-all duration-300" />
              <span className="bg-transparent rounded-full w-16 h-16 group-hover:bg-gray-300/10 absolute -right-2 -top-3"></span>
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MostPlaces;
