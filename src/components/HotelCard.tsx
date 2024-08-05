import {
  Check,
  House,
  Locate,
  LocateIcon,
  Mail,
  Pizza,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const HotelCard = () => {
  return (
    <div className="border rounded-2xl overflow-hidden text-sm ">
      <div className="w-full h-48">
        <Image
          src="/hero.jpg"
          alt="hotel"
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="rounded-t-3xl bg-white -mt-4 relative z-10">
        <header className="border-b py-3 px-5 space-y-3">
          <div className="flex items-center space-x-2">
            <p className="text-lg font-bold">Luxary Resaturant</p>
            <div className="bg-green-500 rounded-full p-2 text-white">
              <Check className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Locate />
            <span>Location</span>
          </div>
        </header>
        <main className="py-3 px-5 border-b space-y-2">
          <p className=" text-gray-500">
            Sed interdum metus at nisi tempor laoreet. Integer gravida orci a
            justo sodales.
          </p>
          <div className="flex items-center space-x-3">
            <p>Facilities</p>
            <ul className="flex items-center space-x-3">
              <li>
                <Wifi className="w-4 h-4" />
              </li>
              <li>
                <Pizza className="w-4 h-4" />
              </li>
            </ul>
          </div>
        </main>
        <footer className="flex items-center justify-between divide-x">
          <div className="flex items-center space-x-3 p-3">
            <p className="bg-red-200 rounded-full p-2 text-white">
              <House />
            </p>
            <p>Hotel</p>
          </div>
          <div className="flex items-center space-x-3 p-3">
            <Mail />
            <Pizza />
            <LocateIcon />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HotelCard;
