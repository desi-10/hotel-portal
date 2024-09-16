"use client";
import InputOTPWithSeparator from "@/components/OTP";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Mail, PersonStanding } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { IoIosPersonAdd } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [OTPValue, setOTPValue] = useState("");
  const [openOTP, setOpenOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (openOTP) {
        const { data } = await axios.post(
          "https://hotelbookingcenter.pythonanywhere.com/api/token/register/",
          {
            username: username,
            otp: OTPValue,
            phone_number: phonenumber,
          }
        );
        console.log(data);
        setIsLoading(false);
        setOpenOTP(false);
        console.log(data);
        router.push("/auth/");
      } else {
        const { data } = await axios.post(
          "https://hotelbookingcenter.pythonanywhere.com/api/token/generate-otp/",
          {
            phone_number: phonenumber,
          }
        );
        console.log(data);
        setOpenOTP(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full">
      <section className="bg-gray-100 flex-1 flex justify-center items-center overflow-auto p-4">
        <div className="w-full max-w-md mx-auto">
          <p className="text-center mb-2 text-sm md:text-base">JCJ Lite</p>
          <h2 className="text-center text-xl md:text-2xl mb-5 text-blue-500 font-bold">
            Welcome to the Register System
          </h2>

          <div className="flex justify-between items-center mb-5">
            <Link
              href="/auth/"
              className="border-b-4  w-full flex items-center py-2 text-center"
            >
              <span>
                <FiLogIn className="w-4 h-4 mx-2" />
              </span>
              Login
            </Link>
            <Link
              href="/auth/register"
              className="border-b-4 border-b-primaryColor flex items-center w-full py-2 text-center mt-2 md:mt-0"
            >
              <span>
                <IoIosPersonAdd className="w-4 h-4 mx-2" />
              </span>
              Register
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="username" className="block text-sm md:text-base">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full bg-gray-200 focus:bg-white"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="phonenumber"
                className="block text-sm md:text-base"
              >
                Phone Number
              </Label>
              <Input
                type="tel"
                id="phonenumber"
                placeholder="(0)"
                value={phonenumber}
                onChange={(event) => setPhonenumber(event.target.value)}
                className="w-full bg-gray-200 focus:bg-white"
                required
              />
            </div>

            {openOTP && (
              <div className="flex justify-center items-center">
                <InputOTPWithSeparator
                  value={OTPValue}
                  onChange={setOTPValue}
                />
              </div>
            )}

            <Button className="w-full">
              <div className="flex justify-center items-center">
                {isLoading ? (
                  <ClipLoader
                    color="#ffffff"
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <p>{!openOTP ? "Get OTP" : "Register"}</p>
                )}
              </div>
            </Button>
          </form>

          <Button asChild variant="link" className="mt-5 flex justify-center">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
      <section className="w-full md:w-1/2 bg-[url('/hero.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/25"></div>
      </section>
    </main>
  );
};

export default RegisterPage;
