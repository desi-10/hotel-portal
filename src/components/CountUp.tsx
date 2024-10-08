"use client";
import React from "react";
import Wrapper from "./Wrapper";
import CountUp from "react-countup";

const CountUpComponent = () => {
  const countUpData = [
    {
      id: 1,
      count: 1254,
      title: "New Visitors Every Week",
    },
    {
      id: 2,
      count: 12168,
      title: "Happy Customers Every Year",
    },
    {
      id: 3,
      count: 1254,
      title: "New Visitors Every Week",
    },
    {
      id: 4,
      count: 2172,
      title: "Won Amazing Awards",
    },
    {
      id: 5,
      count: 732,
      title: "New Listings Every Week",
    },
  ];
  return (
    <main className="bg-[url('/celebrate.jpg')] bg-cover bg-fixed relative h-full overflow-hidden">
      <Wrapper>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-white py-10">
          {countUpData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center"
            >
              <h1 className="text-5xl font-bold mb-2">
                <CountUp
                  enableScrollSpy
                  scrollSpyOnce={true}
                  end={item.count}
                  duration={3}
                />
              </h1>
              <p className="text-sm font-bold mb-3">{item.title}</p>
              <div className="w-10 h-1 bg-primaryColor"></div>
            </div>
          ))}
        </div>
      </Wrapper>
      <div className="absolute inset-0 bg-black/75"></div>
    </main>
  );
};

export default CountUpComponent;
