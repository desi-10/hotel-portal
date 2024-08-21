import React from "react";
import { Heart, Star, Unlock } from "lucide-react";
import Image from "next/image";
import { HotelType } from "@/types/hostelTypes";
import Rating from "./Rating";
import { RiHome5Line } from "react-icons/ri";

const LatestListing = ({ hotel }: { hotel: HotelType }) => {
  const overallRating =
    ((hotel?.avg_ratings?.average_price_rating || 0) +
      (hotel?.avg_ratings?.average_location_rating || 0) +
      (hotel?.avg_ratings?.average_quality_rating || 0) +
      (hotel?.avg_ratings?.average_service_rating || 0)) /
    4;

  return (
    <section className="text-xs text-white shadow-lg h-72 w-[450px] p-5 rounded-lg overflow-hidden relative group">
      <Image
        src={hotel.image || "/room1.jpg"}
        alt={hotel.name || "hotel image"}
        width={1000}
        height={1000}
        className="absolute inset-0 group-hover:scale-110 transition-all duration-700"
      />
      <div className="flex flex-col relative justify-between z-10 h-full shadow-md">
        <div className="flex justify-between items-center ">
          <div className="bg-blue-700 p-2 rounded-full flex items-center space-x-2 group cursor-pointer">
            <Heart className="w-4 h-4" />
            <p className="hidden group-hover:block">Save</p>
          </div>

          {/* <div className="flex items-center space-x-3 bg-green-400 px-3 py-1 rounded-full">
            <Unlock className="w-4 h-4" />
            <p>Available</p>
          </div> */}
        </div>

        <div>
          <div className="flex justify-between font-bold items-center border-b pb-3 border-opacity-30 border-gray-300">
            <div>
              <p>{hotel.name}</p>
              <p>{hotel.region}</p>
            </div>

            <div className="flex items-center space-x-3">
              <p className="p-3 bg-blue-700 rounded-lg w-fit text-white">
                {overallRating.toFixed(2)}
              </p>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <Rating rating={overallRating} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <div className="flex items-center space-x-3 bg-white w-fit px-3 py-2 rounded-full text-black">
              <p>
                <RiHome5Line className="w-5 h-5" />
              </p>
              <p className="font-bold">Hostel</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950  to-transparent"></div>
    </section>
  );
};

export default LatestListing;
