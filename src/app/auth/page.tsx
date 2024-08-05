import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, PersonStanding } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex h-screen w-full">
      <section className="bg-gray-100 w-full flex items-center overflow-auto py-10">
        <div className="w-[60%] h-full mx-auto">
          <p className="text-center mb-2">Hotel portal</p>
          <h2 className="text-center text-2xl mb-5 text-blue-500 font-bold">
            Welcome to Login System
          </h2>

          <div className="flex justify-between items-center">
            <p className="border-b-4 border-b-blue-500 w-full flex items-center  py-2">
              <span>
                <PersonStanding className="w-4 h-4 mx-2" />
              </span>
              Login
            </p>
            <Link
              href="/auth/register"
              className="w-full border-b-2 flex items-center py-2"
            >
              <span>
                <Mail className="w-4 h-4 mx-2" />
              </span>
              Regster
            </Link>
          </div>

          <form action="" className="mt-5 space-y-5">
            <div>
              <Label>
                Email
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                type="text"
                className="w-full bg-gray-200 focus:bg-white"
              />
            </div>

            <div>
              <Label>
                Password
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                type="password"
                className="w-full bg-gray-200 focus:bg-white"
              />
            </div>

            <Button className="w-full">Login</Button>

            <div className="flex items-center space-x-3 text-sm">
              <p className="h-[1px] w-full bg-gray-500"></p>
              <p className="p-2 rounded-full bg-gray-200">OR</p>
              <p className="h-[1px] w-full bg-gray-500"></p>
            </div>

            <div className="flex border justify-center p-3 rounded-full bg-white text-sm">
              <p>Sign in wth Google</p>
            </div>
          </form>
          <Button asChild variant="link" className="mt-5 flex justify-center">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
      <section className="w-full bg-[url('/hero.jpg')] bg-cover relative">
        <div className="absolute inset-0 bg-black/25"></div>
      </section>
    </main>
  );
};

export default LoginPage;
