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
  ReviewType,
  RoomType,
  WorkHoursType,
} from "@/types/hostelTypes";
import axios from "axios";
import { ArrowLeft, ArrowRight, Heart, Wifi, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Rating from "@/components/Rating";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SeeAllReviews from "@/components/SeeAllReviews";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MdOutlineFastfood,
  MdOutlineMeetingRoom,
  MdOutlineSportsTennis,
} from "react-icons/md";
import { FaSwimmingPool } from "react-icons/fa";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CheckoutPage from "@/components/Checkout";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
const localizer = momentLocalizer(moment);

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
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const [progress, setProgress] = useState(60);

  const fetchHotel = async () => {
    try {
      const { data } = await axios.get(
        `https://hotelbookingcenter.pythonanywhere.com/api/hotels/${searchParams.hotel__hotel_number}/`
      );
      console.log(data);
      setHotel(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `https://hotelbookingcenter.pythonanywhere.com/api/reviews/?hotel__hotel_number=${searchParams.hotel__hotel_number}`
      );
      console.log(data);
      setReviews(data);
      console.log(data);
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
  const [roomId, setRoomId] = useState(0);
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
          room: roomId || selectedRoom?.id,
        }
      );

      alert("Booking successful");
      console.log(checkin);
      console.log(checkout);

      console.log(data);

      setCheckin("");
      setCheckout("");
      setRoomId(0);
      setIsLoading(false);
      fetchHotel();
    } catch (error) {
      setCheckin("");
      setCheckout("");
      setIsLoading(false);
      console.log(error);
    }

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: selectedRoom,
        }),
      });

      const data = await response.json();
      window.location.href = data.url;
      console.log(data.url);
    } catch (error) {
      console.error("Error fetching payment intent URL:", error);
    }
  };

  const [quality, setQuality] = useState(0);
  const [location, setLocation] = useState(0);
  const [service, setService] = useState(0);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [isAddReviewLoading, setIsAddReviewLoading] = useState(false);

  const handleAddReview = async () => {
    setIsAddReviewLoading(true);
    try {
      const { data } = await axios.post(
        "https://hotelbookingcenter.pythonanywhere.com/api/reviews/",
        {
          hotel: params.id,
          quality_rating: quality,
          location_rating: location,
          service_rating: service,
          price_rating: price,
          user: 1,
          review: message,
        }
      );
      console.log(data);
      setIsAddReviewLoading(false);
      setMessage("");
      setQuality(0);
      setLocation(0);
      setService(0);
      setPrice(0);
      fetchReviews();
    } catch (error) {
      console.error(error);
      setIsAddReviewLoading(false);
    }
  };

  const overallRating =
    ((hotel?.avg_ratings?.average_price_rating || 0) +
      (hotel?.avg_ratings?.average_location_rating || 0) +
      (hotel?.avg_ratings?.average_quality_rating || 0) +
      (hotel?.avg_ratings?.average_service_rating || 0)) /
    4;

  const [modal, setModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | undefined>(
    undefined
  );
  const handleRooms = (id: number) => {
    setModal(true);
    setSelectedRoom(rooms.find((room) => room.id === id));
  };

  const events = selectedRoom?.booking_list?.map((booking) => ({
    title: `Booking #${booking.booking_number} (${booking.status})`,
    start: new Date(booking.checkin),
    end: new Date(booking.checkout),
    allDay: false,
  }));

  const [activeSection, setActiveSection] = useState("top");

  const handleScrollToSection = (section: string) => {
    const target = document.getElementById(section);
    target?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  return (
    <main>
      {modal && (
        <section className="flex justify-center items-center fixed inset-0 w-screen h-screen bg-black/80 z-50">
          <div className="relative h-[90%] w-[90%] bg-white rounded-lg p-5 overflow-auto">
            <button
              className="rounded-full bg-red-500 text-white w-fit ml-auto flex justify-center items-center p-2"
              onClick={() => {
                setModal(false);
              }}
            >
              <X className="w-4 h-4" />
            </button>
            {/* <h1 className="text-3xl font-bold">Room Details</h1> */}
            <div className="flex justify-between space-x-5">
              <div className="w-full space-y-5">
                <h2 className="text-3xl font-bold">
                  {selectedRoom?.room_number}
                </h2>

                <div className="flex justify-between items-center w-full h-96 rounded-lg bg-black overflow-hidden">
                  <Image
                    src={selectedRoom?.image || ""}
                    width={600}
                    height={600}
                    alt="logo"
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="space-y-5 shadow-lg rounded-lg">
                  <p className="text-lg font-bold p-3 border-b">Description</p>
                  <p className="p-3">{selectedRoom?.description}</p>
                </div>
              </div>
              <div className="w-[500px] h-fit bg-white rounded-lg shadow-lg p-5">
                <Badge variant="outline">
                  {selectedRoom?.is_available ? "Available" : "Not Available"}
                </Badge>

                <div className="my-5">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    toolbar={false}
                  />
                </div>

                <div className="mt-5 space-y-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-full">
                      <Label>Check-in</Label>
                      <Input
                        type="datetime-local"
                        className="p-2 border w-full"
                        onChange={(event) => setCheckin(event.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <Label>Check-out</Label>
                      <Input
                        type="datetime-local"
                        className="p-2 border w-full"
                        onChange={(event) => setCheckout(event.target.value)}
                      />
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primaryColor text-white px-5 py-1 flex space-x-3 w-full"
                    >
                      <p>{isLoading ? "Loading" : "Book Now"}</p>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="relative h-96 bg-[url('/22.jpg')] bg-fixed bg-center bg-cover">
        <div className="absolute inset-0 bg-black/75"></div>
      </div>
      <section className="container bg-white border-b sticky top-16 z-20">
        <div className="flex justify-between items-center">
          <ul className="flex space-x-3 [&>li]:p-5">
            <li
              className={`cursor-pointer ${
                activeSection === "top" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleScrollToSection("top")}
            >
              Top
            </li>
            <li
              className={`cursor-pointer ${
                activeSection === "details" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleScrollToSection("details")}
            >
              Details
            </li>
            <li
              className={`cursor-pointer ${
                activeSection === "gallery" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleScrollToSection("gallery")}
            >
              Gallery
            </li>
            <li
              className={`cursor-pointer ${
                activeSection === "menu" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleScrollToSection("menu")}
            >
              Menu
            </li>
            <li
              className={`cursor-pointer ${
                activeSection === "reviews" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleScrollToSection("reviews")}
            >
              Reviews
            </li>
          </ul>
          {/* <div>
            <Button className="bg-primaryColor text-white px-5 py-1 flex space-x-3">
              <p>Save</p>
              {false ? (
                <Heart className="w-4 h-4" />
              ) : (
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              )}
            </Button>
          </div> */}
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
          <div
            id="top"
            className="w-full h-[400px] border overflow-hidden rounded-lg mb-5 bg-white shadow-lg"
          >
            <Image
              src={hotel?.image || ""}
              alt={hotel?.name || "Hotel Image"}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          <div
            id="details"
            className="border rounded-lg bg-white mb-5 shadow-lg"
          >
            <p className="p-5 border-b font-bold">Description</p>
            <p className="p-5">{hotel?.description}</p>

            <div className="py-3">
              {hotel?.website && (
                <Link href={hotel.website} className="p-5">
                  <Button>Website</Button>
                </Link>
              )}
            </div>
          </div>

          <div className="border rounded-lg bg-white mb-5 shadow-lg">
            <p className="p-5 border-b font-bold">Facilities</p>
            <ul className="p-5">
              {hotel?.facilities && (
                <div className="flex space-x-3 items-center">
                  {hotel.facilities?.has_wifi && (
                    <li>
                      <Wifi className="w-4 h-4" />
                    </li>
                  )}
                  {hotel.facilities?.has_breakfast_in_bed && (
                    <li>
                      <MdOutlineFastfood className="w-4 h-4" />
                    </li>
                  )}
                  {hotel.facilities?.has_conference_room && (
                    <li>
                      <MdOutlineMeetingRoom className="w-4 h-4" />
                    </li>
                  )}
                  {hotel.facilities?.has_swimming_pool && (
                    <li>
                      <FaSwimmingPool className="w-4 h-4" />
                    </li>
                  )}
                  {hotel.facilities?.has_tennis_court && (
                    <li>
                      <MdOutlineSportsTennis className="w-4 h-4" />
                    </li>
                  )}
                </div>
              )}
            </ul>
          </div>

          <div className="border rounded-lg bg-white mb-5 shadow-lg ">
            <p className="p-5 border-b font-bold">Rooms</p>
            {rooms.length === 0 ? (
              <p className="p-5">No rooms available</p>
            ) : (
              <ul className="grid grid-cols-3">
                {rooms?.slice(0, 3).map((room) => (
                  <li
                    key={room.id}
                    onClick={() => handleRooms(room.id)}
                    className="flex flex-col p-5 cursor-pointer"
                  >
                    <div className="w-[200px] h-24 rounded-lg overflow-hidden">
                      <Image
                        src={room?.image || ""}
                        alt={room?.room_number || "Room Image"}
                        width={600}
                        height={600}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="text-lg text-center">{room?.room_number}</p>
                  </li>
                ))}
              </ul>
            )}

            <div className="p-5">
              <Button variant={"outline"} className="flex w-fit ml-auto">
                <p>View All Rooms</p>
              </Button>
            </div>
          </div>

          <div id="gallery" className="border rounded-lg bg-white shadow-lg">
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
                        src={image.image || ""}
                        alt={image.image || "Hotel Image"}
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

          <div
            id="reviews"
            className="border rounded-lg bg-white shadow-lg mt-5"
          >
            <p className="p-5 border-b font-bold">Room Review</p>
            <div className="p-5 flex items-center space-x-10 bg-gray-200">
              <div className="flex flex-col space-y-1 justify-center">
                <div className="text-3xl flex justify-center items-center w-20 h-16 bg-primaryColor text-white rounded-lg ">
                  <p>{overallRating.toFixed(2)}</p>
                </div>
                <Rating rating={overallRating} />
              </div>

              <div className="flex space-x-5 w-full">
                <div className="w-full space-y-3">
                  <div>
                    <Label>Quality</Label>
                    <Progress
                      value={
                        (hotel?.avg_ratings?.average_quality_rating ?? 0) * 20
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Progress
                      value={
                        (hotel?.avg_ratings?.average_location_rating ?? 0) * 20
                      }
                      className="w-full text-primaryColor"
                    />
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <div>
                    <Label>Price</Label>
                    <Progress
                      value={
                        (hotel?.avg_ratings?.average_price_rating ?? 0) * 20
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <Label>Service</Label>
                    <Progress
                      value={
                        (hotel?.avg_ratings?.average_service_rating ?? 0) * 20
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5 ">
              {reviews?.slice(0, 3).map((review) => (
                <SeeAllReviews key={review.id} review={review} />
              ))}
            </div>
            <Dialog>
              <DialogTrigger className="flex justify-end items-end p-3 w-full">
                <Button variant="outline">See All Reviews</Button>
              </DialogTrigger>
              <DialogContent className="h-[90vh] max-h-full max-w[600px] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Reviews</DialogTitle>
                  <DialogDescription>
                    See all reviews for this hotel
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {reviews?.map((review) => (
                    <SeeAllReviews key={review.id} review={review} />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg bg-white shadow-lg my-5">
            <p className="p-5 border-b font-bold">Add Review</p>

            <div className="flex items-center bg-gray-200 p-5 space-x-5">
              <div className="border-b w-full">
                <div className="flex items-center space-x-3">
                  <Label className="w-20">Quality</Label>
                  <Input
                    type="range"
                    value={quality}
                    defaultValue={1}
                    min={1}
                    max={5}
                    onChange={(event) =>
                      setQuality(parseInt(event.target.value))
                    }
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Label className="w-20">Location</Label>
                  <Input
                    value={location}
                    type="range"
                    defaultValue={1}
                    min={1}
                    max={5}
                    onChange={(event) =>
                      setLocation(parseInt(event.target.value))
                    }
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Label className="w-20">Price</Label>
                  <Input
                    type="range"
                    value={price}
                    defaultValue={1}
                    min={1}
                    max={5}
                    onChange={(event) => setPrice(parseInt(event.target.value))}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Label className="w-20">Service</Label>
                  <Input
                    type="range"
                    className="w-full bg-primaryColor"
                    value={service}
                    defaultValue={1}
                    min={1}
                    max={5}
                    onChange={(e) => setService(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="p-5 w-40 h-20 flex flex-col justify-center items-center bg-white rounded-lg">
                <p className="text-3xl font-bold text-primaryColor">
                  {((price + service + quality + location) / 4).toFixed(2)}
                </p>
                <Rating rating={(price + service + quality + location) / 4} />
              </div>
            </div>

            <div className="p-5 space-y-3">
              <textarea
                value={message}
                className="w-full p-5 border rounded-lg text-black"
                cols={30}
                rows={10}
                placeholder="Enter message"
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
              <Button
                onClick={handleAddReview}
                disabled={isAddReviewLoading}
                className="w-full bg-primaryColor"
              >
                {isAddReviewLoading ? "Loading" : "Add Review"}
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
                          className="flex items-center justify-between py-2 text-sm"
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
                  type="datetime-local"
                  className="p-2 border w-full"
                  onChange={(event) => setCheckin(event.target.value)}
                />
              </div>
              <div className="w-full">
                <Label>Check-out</Label>
                <Input
                  type="datetime-local"
                  className="p-2 border w-full"
                  onChange={(event) => setCheckout(event.target.value)}
                />
              </div>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Room</SelectLabel>
                    {rooms.map((room) => (
                      <SelectItem
                        key={room.id}
                        value={room.id.toString()}
                        onChange={() => setRoomId(room.id)}
                      >
                        {room.room_number}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <form onSubmit={handleSubmit}>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primaryColor text-white px-5 py-1 flex space-x-3 w-full"
              >
                <p>{isLoading ? "Loading" : "Book Now"}</p>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            {/* <CheckoutPage amount={price} /> */}
          </div>

          {/* <div className="w-full bg-white rounded-lg p-5 shadow-lg mt-5">
            <p className="font-bold">Similar Listings</p>
          </div> */}
        </section>
      </div>
    </main>
  );
};

export default SingleHotel;
