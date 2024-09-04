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
import ClipLoader from "react-spinners/ClipLoader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EventCenters = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { query: string; city: string };
}) => {
  const [hotel, setHotel] = useState<HotelType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      setIsLoading(true);
      try {
        if (searchParams.query) {
          const { data } = await axios(
            `https://hotelbookingcenter.pythonanywhere.com/api/event-centers/?name=${searchParams.query}`
          );
          setHotel(data);
          setIsLoading(false);
          return;
        }

        if (searchParams.city) {
          const { data } = await axios(
            `https://hotelbookingcenter.pythonanywhere.com/api/hotels/?city=${searchParams.city}`
          );
          setHotel(data);
          setIsLoading(false);
          return;
        }

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

  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState("");

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios(
        `https://hotelbookingcenter.pythonanywhere.com/api/hotels/?search=${searchTerm}&city=${cities}`
      );
      console.log(data);
      setHotel(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getUniqueCities = (hotels: HotelType[]): string[] => {
    // Extract cities from hotels and include empty string if present
    const cities = hotels.map((hotel) => hotel.city);

    // Use a Set to get unique values
    const uniqueCities = Array.from(new Set(cities));

    return uniqueCities;
  };

  const handleClear = () => {
    setSearchTerm("");
    setCities("");
  };

  return (
    <main>
      <div className="relative h-96 bg-[url('/33.jpg')] bg-fixed bg-center bg-cover flex justify-center items-center">
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="relative z-10 text-center text-white px-4 py-6 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our Listings
          </h1>
          <p className="text-lg md:text-xl">
            Browse through a variety of options and find exactly what youre
            looking for.
          </p>
        </div>
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
                  <BreadcrumbLink href="/listings">Listings</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <BsArrowUpRightSquare className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex space-x-20 relative py-10">
          <section className="w-[600px] sticky top-20 bg-white h-fit rounded-lg space-y-3 shadow-lg overflow-hidden">
            <h4 className="bg-primaryColor p-4 text-white">Filter by</h4>

            <form
              onSubmit={handleSearch}
              className="flex flex-col space-y-5 p-4"
            >
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                type="text"
                placeholder="What are you looking for?"
              />

              <Select onValueChange={setCities}>
                <SelectTrigger>
                  <SelectValue placeholder="Cities" />
                </SelectTrigger>
                <SelectContent>
                  {getUniqueCities(hotel).map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-5">
                <Button type="submit" className="w-full bg-primaryColor">
                  Search
                </Button>
                <Button
                  onClick={handleClear}
                  type="reset"
                  variant={"ghost"}
                  className="w-full"
                >
                  Clear
                </Button>
              </div>
            </form>
          </section>
          <section className="w-full">
            <div className="bg-white py-3 px-5 flex space-x-3 justify-between items-center rounded-lg mb-5 border">
              <div className="font-bold text-gray-500 flex items-center space-x-5">
                Results For :{" "}
                <div className=" text-primaryColor flex items-center space-x-2 ml-2 capitalize">
                  <p>{searchParams.query || "All Hotels"}</p>
                  <p className="text-sm">[{hotel.length}]</p>
                </div>
              </div>
              {/* <div className="flex items-center space-x-5">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-500 text-sm font-bold">
                    Sort by:
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="----" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Popular</SelectItem>
                      <SelectItem value="dark">New</SelectItem>
                      <SelectItem value="system">Relevance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-3">
                  <MdOutlineGridOn className="w-5 h-5" />
                  <FaListUl className="w-5 h-5" />
                </div>
              </div> */}
            </div>

            {isLoading ? (
              <div className="flex justify-center mt-10 w-full">
                <ClipLoader
                  color="#000000"
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-10">
                {hotel.map((hotel, i) => {
                  return (
                    <div key={i}>
                      <HotelCard hotel={hotel} />
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default EventCenters;
