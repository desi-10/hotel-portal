import { Check, Wifi } from "lucide-react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { RiHome5Line } from "react-icons/ri";
import {
  MdFreeBreakfast,
  MdOutlineFastfood,
  MdOutlineMeetingRoom,
  MdOutlineSportsTennis,
} from "react-icons/md";
import Image from "next/image";
import React from "react";
import { HotelType } from "@/types/hostelTypes";
import Link from "next/link";
import { FaSwimmingPool } from "react-icons/fa";

const HotelCard = ({ hotel }: { hotel: HotelType | any }) => {
  console.log(hotel);

  return (
    <Link
      href={
        hotel?.event_center_number
          ? `/event-centers/${hotel.id}/?event_center_number=${hotel?.event_center_number}`
          : `/listings/${hotel.id}/?hotel__hotel_number=${hotel.hotel_number}`
      }
    >
      <div className="border rounded-2xl overflow-hidden text-sm shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="w-full h-56 sm:h-48 lg:h-56">
          <Image
            src={hotel.image || ""}
            alt={hotel.name}
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="rounded-t-3xl bg-white -mt-4 relative z-10 flex flex-col justify-between h-[240px]">
          <header className="border-b py-3 px-5 space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold hover:text-blue-500">
                {hotel.name}
              </p>
              <div className="bg-green-500 rounded-full p-2 text-white">
                <Check className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <IoLocationOutline className="w-5 h-5 text-blue-500" />
              <span>{hotel.address}</span>
            </div>
          </header>
          <main className="py-3 px-5 border-b space-y-2">
            <p className="text-gray-500 line-clamp-2">{hotel.description}</p>
            <div className="flex items-center space-x-3">
              <p>Facilities:</p>
              <ul className="flex items-center space-x-3">
                {hotel.facilities?.has_wifi && (
                  <li>
                    <Wifi className="w-4 h-4" />
                  </li>
                )}
                {hotel.facilities?.has_breakfast_in_bed && (
                  <li>
                    <MdOutlineFastfood className="w-4 h-4" />
                  </li>
                )}
                {hotel.facilities?.has_conference_room && (
                  <li>
                    <MdOutlineMeetingRoom className="w-4 h-4" />
                  </li>
                )}
                {hotel.facilities?.has_swimming_pool && (
                  <li>
                    <FaSwimmingPool className="w-4 h-4" />
                  </li>
                )}
                {hotel.facilities?.has_tennis_court && (
                  <li>
                    <MdOutlineSportsTennis className="w-4 h-4" />
                  </li>
                )}
              </ul>
            </div>
          </main>
          <footer className="flex items-center justify-between divide-x">
            <div className="flex items-center space-x-3 p-3">
              <p className="bg-blue-200 rounded-full p-2 text-white">
                <RiHome5Line className="w-5 h-5" />
              </p>
              <p>{hotel.name}</p>
            </div>
            <div className="flex items-center space-x-2 p-3">
              <IoMailOutline className="w-5 h-5" />
              <IoLocationOutline className="w-5 h-5" />
              <AiOutlineExpandAlt className="w-5 h-5" />
            </div>
          </footer>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
