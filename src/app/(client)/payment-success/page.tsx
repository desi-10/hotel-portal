"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const BookingConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(5);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let redirectTimer: NodeJS.Timeout;

    // Start countdown and redirect after a few seconds
    timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    setIsLoading(false);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="fixed inset-0 flex justify-center items-center w-full h-screen pointer-events-none">
        <ConfettiExplosion
          particleCount={399}
          width={2000}
          duration={3000}
          force={1.5}
        />
      </div>
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
