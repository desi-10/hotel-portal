import React from "react";
import SectionHeader from "./Headers";
import Wrapper from "./Wrapper";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import HotelCard from "./HotelCard";

const MostPlaces = () => {
  const filterData = [
    {
      id: 1,
      name: "All categories",
    },
    {
      id: 2,
      name: "Restaurant",
    },
    {
      id: 3,
      name: "Hotel",
    },
    {
      id: 4,
      name: "Event",
    },
    {
      id: 5,
      name: "Attraction",
    },
  ];
  return (
    <div>
      <Wrapper>
        <SectionHeader
          mainText="Most Visited Places"
          subText="Best Listings"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />

        <div className="flex justify-center mt-10 border-2 overflow-hidden w-fit mx-auto rounded-lg text-xs font-bold">
          <ul className="flex items-center bg-gray-100 [&>li]:cursor-pointer [&>li]:px-5 [&>li]:p-3 divide-x">
            {filterData.map((item) => (
              <li
                key={item.id}
                className={`${
                  item.id === 1 && "bg-blue-500 text-white"
                } text-gray-500`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {Array.from({ length: 5 }).map((_, i) => {
            return <HotelCard key={i} />;
          })}
        </div>
      </Wrapper>
    </div>
  );
};

export default MostPlaces;
