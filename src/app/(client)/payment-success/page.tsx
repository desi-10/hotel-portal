"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const BookingConfirmationPage = ({
  searchParams,
}: {
  searchParams: {
    booking: string;
    amount: string;
    payment_method: string;
    event: string;
  };
}) => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] =
    useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  const router = useRouter();

  console.log(searchParams);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let redirectTimer: NodeJS.Timeout;

    const { booking, amount, payment_method, event } = searchParams;

    const makePayment = async () => {
      try {
        if (event !== "undefined") {
          await axios.post(
            "https://hotelbookingcenter.pythonanywhere.com/api/event-center-payments/",
            {
              booking: booking,
              amount: parseFloat(amount),
              payment_method: payment_method,
              event_center_booking: event,
            }
          );
        } else {
          await axios.post(
            "https://hotelbookingcenter.pythonanywhere.com/api/payments/",
            {
              booking: booking,
              amount: parseFloat(amount),
              payment_method: payment_method,
            }
          );
        }

        setIsPaymentSuccessful(true);

        timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        redirectTimer = setTimeout(() => {
          router.push("/");
        }, 5000);
      } catch (error) {
        console.error("Payment failed:", error);
        // Handle payment failure (e.g., show error message)
      }
    };

    makePayment();

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [searchParams, router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isPaymentSuccessful && (
        <div className="fixed inset-0 flex justify-center items-center w-full h-screen pointer-events-none">
          <ConfettiExplosion
            particleCount={399}
            width={2000}
            duration={3000}
            force={1.5}
          />
        </div>
      )}
      <section className="space-y-3 text-center">
        <div>
          <div className="w-[200px] mx-auto">
            <Image
              src="/conf.png"
              alt="confetti"
              className="w-full"
              width={400}
              height={400}
            />
          </div>
          <p className="text-lg font-bold">Thank you for booking with us!</p>
          <p className="text-green-500 bg-green-100 p-3 mt-3 rounded-lg">
            Your booking was successful.
          </p>
          <p className="text-lg">
            Redirecting to the home page in {countdown} seconds...
          </p>
        </div>
      </section>
    </div>
  );
};

export default BookingConfirmationPage;
