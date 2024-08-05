import React from "react";
import SectionHeader from "./Headers";
import { ArrowRight, Key } from "lucide-react";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";

const Cities = () => {
  return (
    <div className="bg-stone-200/40">
      <Wrapper>
        <SectionHeader
          mainText="Explore Best Cities"
          subText="Catalog of Categories"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        />

        <div className="grid grid-cols-3 grid-rows-2 gap-5 mt-10">
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <div
                key={i}
                className="h-72 bg-black last:col-span-2 rounded-lg shadow-md"
              ></div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Button className="group w-40 text-xs relative overflow-hidden bg-blue-700 hover:bg-blue-800">
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
