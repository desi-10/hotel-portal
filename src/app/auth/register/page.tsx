import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, PersonStanding } from "lucide-react";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <main className="flex h-screen w-full">
      <section className="bg-gray-100 w-full flex  items-center overflow-auto">
        <div className="w-[60%] mx-auto">
          <p className="text-center mb-2">Hotel portal</p>
          <h2 className="text-center text-2xl mb-5">Welcome to Login System</h2>

          <div className="flex justify-between items-center">
            <Link href="/auth" className="w-full">
              <p className="border-b-4 flex items-center  py-2">
                <span>
                  <PersonStanding className="w-4 h-4 mx-2" />
                </span>
                Login
              </p>
            </Link>
            <div className="w-full border-b-4 border-b-blue-500 flex items-center py-2">
              <span>
                <Mail className="w-4 h-4 mx-2" />
              </span>
              Regster
            </div>
          </div>

          <form action="" className="mt-5 space-y-5">
            <div>
              <Label>
                Full name
                <span className="text-sm text-red-500">*</span>
              </Label>
              <Input
                type="text"
                className="w-full bg-gray-200 focus:bg-white"
              />
            </div>
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

            <Button className="w-full">Register</Button>

            <div className="flex items-center space-x-3 text-sm">
              <p className="h-[1px] w-full bg-gray-500"></p>
              <p className="p-2 rounded-full bg-gray-200">OR</p>
              <p className="h-[1px] w-full bg-gray-500"></p>
            </div>

            <div className="flex border justify-center p-3 rounded-full bg-white text-sm">
              <p>Sign in wth Google</p>
            </div>
          </form>
        </div>
      </section>
      <section className="w-full bg-[url('/hero.jpg')] bg-cover relative">
        <div className="absolute inset-0 bg-black/25"></div>
      </section>
    </main>
  );
};

export default RegisterPage;
