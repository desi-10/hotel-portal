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
import ClipLoader from "react-spinners/ClipLoader";

const LoginPage = () => {
  const [OTPValue, setOTPValue] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [openOTP, setOpenOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error state before making a request

    try {
      if (openOTP) {
        const { data } = await axios.post(
          "https://hotelbookingcenter.pythonanywhere.com/api/token/verify-otp/",
          { phone_number: phonenumber, otp: OTPValue }
        );
        setIsLoading(false);
        setOpenOTP(false);
        router.push("/");
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        const { data } = await axios.post(
          "https://hotelbookingcenter.pythonanywhere.com/api/token/generate-otp/",
          { phone_number: phonenumber }
        );
        setIsLoading(false);
        setOpenOTP(true);
      }
    } catch (error) {
      setIsLoading(false);
      setError("Failed to authenticate. Please try again.");
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full">
      <section className="bg-gray-100 flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md mx-auto">
          <p className="text-center mb-2 text-sm md:text-base text-gray-700">
            Hotel Portal
          </p>
          <h2 className="text-center text-xl md:text-2xl mb-5 text-blue-600 font-bold">
            Welcome to the Login System
          </h2>

          <div className="flex justify-between items-center mb-5">
            <p className="border-b-4 border-b-blue-600 w-full flex items-center py-2 text-center text-gray-800">
              <PersonStanding className="w-4 h-4 mx-2" />
              Login
            </p>
            <Link
              href="/auth/register"
              className="border-b-2 border-gray-300 flex items-center py-2 text-center text-blue-600"
            >
              <Mail className="w-4 h-4 mx-2" />
              Register
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="phonenumber"
                className="block text-sm md:text-base text-gray-700"
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

            {error && <p className="text-red-500 text-center">{error}</p>}

            <Button className="w-full">
              <div className="flex justify-center items-center">
                {isLoading ? (
                  <ClipLoader
                    color="#ffffff"
                    size={20}
                    aria-label="Loading Spinner"
                  />
                ) : (
                  <p>{!openOTP ? "Get OTP" : "Login"}</p>
                )}
              </div>
            </Button>
          </form>

          <Button asChild variant="link" className="mt-5 flex justify-center">
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </Button>
        </div>
      </section>
      <section className="w-full md:w-1/2 bg-[url('/hero.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/25"></div>
      </section>
    </main>
  );
};

export default LoginPage;
