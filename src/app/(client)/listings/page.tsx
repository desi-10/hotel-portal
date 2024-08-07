"use client";
import HotelCard from "@/components/HotelCard";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineGridOn } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BsArrowUpRightSquare } from "react-icons/bs";
import axios from "axios";
import { HotelType } from "@/types/hostelTypes";

const ListingPage = () => {
  const [hotel, setHotel] = useState<HotelType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios(
          "https://hotelbookingcenter.pythonanywhere.com/api/hotels/"
        );
        setHotel(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchHotel();
  }, []);

  console.log(hotel);

  return (
    <main>
      <div className="relative h-96 bg-[url('/listing.jpg')] bg-cover">
        <div className="absolute inset-0 bg-black/75"></div>
      </div>
      <section className="container">
        <div className="bg-white border-b border-x p-7 rounded-b-lg flex justify-between items-center">
          <div className="">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <BsArrowUpRightSquare className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex space-x-20 relative py-10">
          <section className="w-[600px] sticky top-20 bg-black h-96 rounded-lg"></section>
          <section className="w-full">
            <div className="bg-white py-3 px-5 flex space-x-3 justify-between items-center rounded-lg mb-5 border">
              <p className="font-bold text-gray-500">
                Results For : <span className=" text-blue-500">New York</span>
              </p>
              <div className="flex items-center space-x-5">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-500 text-sm font-bold">
                    Sort by:
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-3">
                  <MdOutlineGridOn className="w-5 h-5" />
                  <FaListUl className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                hotel.map((hotel, i) => {
                  return (
                    <div key={i}>
                      <HotelCard hotel={hotel} />
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ListingPage;
