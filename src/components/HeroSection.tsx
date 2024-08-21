import { Pizza } from "lucide-react";
import React from "react";
import { MdOutlineLocalHotel } from "react-icons/md";

const HeroSection = () => {
  return (
    <main className="relative w-full h-screen flex justify-center items-center bg-[url('/33.jpg')] bg-center bg-cover bg-fixed overflow-hidden">
      <div className="relative z-10 text-white px-4 md:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Discover Top Attractions in Your City
          </h1>
          <p className="text-sm md:text-lg font-bold text-center mb-10">
            Explore the best spots around town curated by locals and experts.
          </p>
        </div>

        <div className="flex flex-col md:flex-row overflow-hidden w-full rounded-lg mb-5 shadow-lg">
          <input
            type="text"
            placeholder="Search for places, events, and more"
            className="w-full outline-none p-4 text-black"
          />
          <button className="p-4 bg-primaryColor text-white">Search</button>
        </div>

        <p className="text-sm md:text-base mb-3 text-center">
          Just browsing? Use quick search by category:
        </p>

        <div className="flex flex-wrap items-center justify-center space-x-8">
          <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:text-blue-500 hover:underline">
            <Pizza className="w-7 h-7 md:w-10 md:h-10" />
            <p>Restaurants</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:cursor-pointer hover:text-blue-500 hover:underline">
            <MdOutlineLocalHotel className="w-7 h-7 md:w-10 md:h-10" />
            <p>Hotels</p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>
    </main>
  );
};

export default HeroSection;
