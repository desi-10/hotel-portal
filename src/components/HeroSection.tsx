import { Pizza } from "lucide-react";
import React from "react";
import { MdOutlineLocalHotel } from "react-icons/md";

const HeroSection = () => {
  return (
    <main className="relative w-full h-screen flex justify-center items-center bg-[url('/hero.jpg')] bg-cover bg-fixed overflow-hidden">
      <div className="relative z-10 text-white px-8">
        <div>
          <h1 className="text-5xl font-bold text-white mb-5">
            Explore Best Places In City
          </h1>
          <p className="text-sm font-bold text-center mb-10">
            Find some of the best tips from around the city from our partners
            and friends.
          </p>
        </div>

        <div className="border w-full p-8 rounded-lg mb-5"></div>

        <p className="text-sm mb-3 text-center">
          Just looking around ? Use quick search by category :
        </p>

        <div className="flex items-center justify-center space-x-8">
          <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:text-blue-500 hover:underline">
            <Pizza className="w-7 h-7 text-2xl" />
            <p>Restaurant</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:text-blue-500 hover:underline">
            <MdOutlineLocalHotel className="w-7 h-7 text-2xl" />
            <p>Hotels</p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-slate-600/40"></div>
    </main>
  );
};

export default HeroSection;
