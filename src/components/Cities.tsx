import React from "react";
import SectionHeader from "./Headers";
import { ArrowRight, Key } from "lucide-react";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";
import Image from "next/image";

const Cities = () => {
  const cities = [
    {
      id: 1,
      name: "London",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      name: "Paris",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      name: "Tokyo",
      image: "/c1.jpg",
    },

    {
      id: 4,
      name: "New York",
      image: "/c2.jpg",
    },

    {
      id: 5,
      name: "Dubai",
      image: "/c3.jpg",
    },
  ];

  return (
    <div className="bg-stone-200/40">
      <Wrapper>
        <SectionHeader
          mainText="Explore Best Cities"
          subText="Catalog of Categories"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />

        <div className="grid grid-cols-3 grid-rows-2 gap-5 mt-10">
          {cities.map((city, i) => {
            return (
              <div
                key={i}
                className="h-72 bg-black last:col-span-2 rounded-lg shadow-md overflow-hidden relative"
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-5 left-5 flex justify-center z-10 backdrop-blur w-fit p-1 rounded-lg">
                  <p className="text-sm text-white  flex items-center justify-center bg-primaryColor w-full px-5 py-1 rounded-lg">
                    {city.name}
                  </p>
                </div>
                <div className="absolute inset-0 bg-slate-600/20 flex items-center justify-center" />
              </div>
            );
          })}
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
