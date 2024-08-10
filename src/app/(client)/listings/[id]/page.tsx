"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GalleryType,
  HotelType,
  RoomType,
  WorkHoursType,
} from "@/types/hostelTypes";
import axios from "axios";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Rating from "@/components/Rating";
import { Progress } from "@/components/ui/progress";

const SingleHotel = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { hotel__hotel_number: string };
}) => {
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [workhours, setWorkhours] = useState<WorkHoursType[] | null>(null);
  const [gallery, setGallery] = useState<GalleryType[] | null>(null); // Updated this to match the API response
  const [reviews, setReviews] = useState<any[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const [progress, setProgress] = useState(60);

  const fetchHotel = async () => {
    try {
      const { data } = await axios.get(
        `https://hotelbookingcenter.pythonanywhere.com/api/hotels/${params.id}/`
      );
      setHotel(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchWorkHours = async () => {
      try {
        const { data } = await axios.get(
          `https://hotelbookingcenter.pythonanywhere.com/api/workhours/?hotel__hotel_number=${searchParams.hotel__hotel_number}`
        );
        setWorkhours(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGallery = async () => {
      try {
        const { data } = await axios.get(
          `https://hotelbookingcenter.pythonanywhere.com/api/gallery/?hotel__hotel_number=${searchParams.hotel__hotel_number}`
        );
        setGallery(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `https://hotelbookingcenter.pythonanywhere.com/api/reviews/?hotel__hotel_number=${searchParams.hotel__hotel_number}`
        );
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(
          `https://hotelbookingcenter.pythonanywhere.com/api/rooms/?hotel__hotel_number=${searchParams.hotel__hotel_number}`
        );
        setRooms(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGallery();
    fetchHotel();
    fetchWorkHours();
    fetchReviews();
    fetchRooms();
  }, [params.id, searchParams.hotel__hotel_number]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({
      playOnInit: true,
      delay: 3000,
      active: true,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      stopOnFocusIn: true,
    }),
  ]);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkin || !checkout) {
      alert("Please select check-in and check-out dates");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://hotelbookingcenter.pythonanywhere.com/api/bookings/",
        {
          checkin: checkin,
          checkout: checkout,
          user: 1,
          room: params.id,
        }
      );

      alert("Booking successful");
      console.log(checkin);
      console.log(checkout);

      console.log(data);

      setCheckin("");
      setCheckout("");
      setIsLoading(false);
      fetchHotel();
    } catch (error) {
      setCheckin("");
      setCheckout("");
      setIsLoading(false);
      console.log(error);
    }
  };

  const [quality, setQuality] = useState(0);
  const [location, setLocation] = useState(0);
  const [service, setService] = useState(0);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  const handleAddReview = async () => {
    try {
      const { data } = await axios.post(
        "https://hotelbookingcenter.pythonanywhere.com/api/reviews/",
        {
          hotel: params.id,
          quality: quality,
          location: location,
          service: service,
          price: price,
          user: 1,
        }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="relative h-96 bg-[url('/listing.jpg')] bg-cover">
        <div className="absolute inset-0 bg-black/75"></div>
      </div>
      <section className="container bg-white border-b sticky top-16 z-20">
        <div className="flex justify-between items-center">
          <ul className="flex space-x-3 [&>li]:p-5">
            <li className="border-b-2 border-blue-500">Top</li>
            <li>Details</li>
            <li>Gallery</li>
            <li>Menu</li>
            <li>Reviews</li>
          </ul>
          <div>
            <Button className="bg-primaryColor text-white px-5 py-1 flex space-x-3">
              <p>Save</p>
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <div className="flex justify-between items-center container py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/hotels">Hotels</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{hotel?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <BsArrowUpRightSquare className="w-6 h-6 text-blue-500" />
      </div>

      <div className="flex space-x-10 container">
        <section className="w-full">
          <div className="w-full h-[400px] border overflow-hidden rounded-lg mb-5 bg-white shadow-lg">
            <Image
              src={hotel?.image || ""}
              alt={hotel?.name || "Hotel Image"}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="border rounded-lg bg-white mb-5 shadow-lg">
            <p className="p-5 border-b">Description</p>
            <p className="p-5">{hotel?.description}</p>
            {hotel?.website && (
              <Link href={hotel.website} className="p-5">
                <Button>Website</Button>
              </Link>
            )}
          </div>

          <div className="border rounded-lg bg-white mb-5 shadow-lg">
            <p className="p-5 border-b">Facilities</p>
            <ul className="p-5">
              {hotel?.facilities && (
                <div className="flex space-x-3 items-center">
                  {hotel.facilities.has_wifi && <li>Has WiFi</li>}
                  {hotel.facilities.has_swimming_pool && (
                    <li>Has Swimming Pool</li>
                  )}
                  {hotel.facilities.has_conference_room && (
                    <li>Has Conference Room</li>
                  )}
                  {hotel.facilities.has_tennis_court && (
                    <li>Has Tennis Court</li>
                  )}
                  {hotel.facilities.has_breakfast_in_bed && (
                    <li>Has Breakfast in Bed</li>
                  )}
                </div>
              )}
            </ul>
          </div>

          <div className="border rounded-lg bg-white shadow-lg">
            <p className="p-5 border-b">Gallery</p>
            <div className="relative">
              <div
                className="flex justify-center items-center absolute bg-primaryColor text-white border h-10 w-10 z-10  rounded-r-full left-0 top-1/2 -translate-y-1/2  group-hover/name:opacity-100 transition-all duration-300 cursor-pointer"
                onClick={scrollPrev}
              >
                <ArrowLeft className="h-4 w-4" />
              </div>
              <div
                className="flex justify-center items-center absolute bg-primaryColor text-white border h-10 w-10 z-10 rounded-l-full right-0 top-1/2 -translate-y-1/2  group-hover/name:opacity-100 transition-all duration-300 cursor-pointer"
                onClick={scrollNext}
              >
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="embla" ref={emblaRef}>
                <div className="flex w-full p-2 overflow-hidden">
                  {gallery?.map((image) => (
                    <div
                      key={image.id}
                      className="h-44 overflow-hidden mx-3 rounded-lg flex-shrink-0"
                    >
                      <Image
                        src={image.image}
                        alt={image.image}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg bg-white shadow-lg mt-5">
            <p className="p-5 border-b">Item Review</p>
            <div className="p-5 flex items-center space-x-10 bg-gray-200">
              <div className="flex flex-col space-y-1 justify-center">
                <p className="text-3xl p-3 bg-primaryColor text-white rounded-lg w-fit">
                  4.1
                </p>
                <Rating rating={4.1} />
              </div>

              <div className="flex space-x-5 w-full">
                <div className="w-full space-y-3">
                  <div>
                    <Label>Quality</Label>
                    <Progress value={progress} className="w-full" />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Progress
                      value={progress}
                      className="w-full text-primaryColor"
                    />
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <div>
                    <Label>Price</Label>
                    <Progress value={progress} className="w-full" />
                  </div>
                  <div className="w-full">
                    <Label>Service</Label>
                    <Progress value={progress} className="w-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center space-x-5 p-5">
              <div className="w-28 rounded-full overflow-hidden">
                <Image src={""} alt="avatar" width={100} height={100} />
              </div>
              <div className="bg-gray-200 w-full p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-500">Name</p>
                  <div className="flex items-center space-x-3">
                    <Rating rating={4.5} />
                    <p className="p-3 rounded-lg text-white bg-primaryColor text-center">
                      4.5
                    </p>
                  </div>
                </div>
                <p className="text-sm py-5 text-gray-500 border-b border-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur totam itaque est deleniti aliquam, et accusamus
                  nostrum sit sapiente nesciunt quaerat, recusandae eveniet
                  praesentium enim blanditiis maiores at maxime nihil?
                </p>
                <div>
                  <p className="text-sm py-3 text-gray-500">
                    Posted 2 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg bg-white shadow-lg mt-5">
            <p className="p-5 border-b">Add Review</p>

            <div className="p-5 border-b bg-gray-200">
              <div className="flex items-center space-x-3">
                <Label>Quality</Label>
                <Input type="range" defaultValue={1} min={1} max={5} />
              </div>
              <div className="flex items-center space-x-3">
                <Label>Location</Label>
                <Input type="range" defaultValue={1} min={1} max={5} />
              </div>

              <div className="flex items-center space-x-3">
                <Label>Price</Label>
                <Input
                  type="range"
                  defaultValue={1}
                  min={1}
                  max={5}
                  // onChange={}
                />
              </div>

              <div className="flex items-center space-x-3">
                <Label>Service</Label>
                <Input
                  type="range"
                  className="w-full bg-primaryColor"
                  defaultValue={1}
                  min={1}
                  max={5}
                  onChange={(e) => setService(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="p-5 space-y-3">
              <textarea
                name=""
                id=""
                className="w-full p-5 border rounded-lg"
                cols={30}
                rows={10}
              ></textarea>
              <Button
                onClick={handleAddReview}
                className="w-full bg-primaryColor"
              >
                Add Review
              </Button>
            </div>
          </div>
        </section>
        <section className="w-[700px]">
          <div className="w-full bg-white rounded-lg p-5 shadow-lg">
            <p className="font-bold text-center border-b">Work Hours</p>
            <div className="w-full bg-white divide-y">
              {workhours?.length === 0 ? (
                <div>No work hours available</div>
              ) : (
                workhours?.map((workHour) => (
                  <div key={workHour.id} className="divide-y">
                    {workHour.workhours.map((hour) => {
                      return (
                        <div
                          key={hour.day}
                          className="flex items-center justify-between py-2"
                        >
                          <p>{hour.day}</p>
                          <p>{hour.period}</p>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-5 p-5 bg-white rounded-lg shadow-lg space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-full">
                <Label>Check-in</Label>
                <Input
                  type="date"
                  className="p-2 border w-full"
                  onChange={(event) => setCheckin(event.target.value)}
                />
              </div>
              <div className="w-full">
                <Label>Check-out</Label>
                <Input
                  type="date"
                  className="p-2 border w-full"
                  onChange={(event) => setCheckout(event.target.value)}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <Button
                type="submit"
                className="bg-primaryColor text-white px-5 py-1 flex space-x-3 w-full"
              >
                <p>Book Now</p>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="w-full bg-white rounded-lg p-5 shadow-lg mt-5">
            <p className="font-bold">Similar Listings</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SingleHotel;
