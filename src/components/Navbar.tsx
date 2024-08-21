"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Heart, ShoppingBag, Menu } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Listings",
      href: "/listings",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <nav className="sticky top-0 z-20 backdrop-blur-lg bg-white text-primaryColor">
      <div className="container flex justify-between items-center p-3">
        <div className="font-extrabold text-primaryColor">
          {/* <Image src="/logo.png" alt="logo" width={200} height={200} /> */}
          Hotel and Event Portal
        </div>

        <div className="hidden lg:flex items-center space-x-5">
          {links.map((link) => (
            <Link href={link.href} key={link.name}>
              <Button variant="link" className="text-primaryColor">
                {link.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-10">
          <ul className="flex items-center space-x-5">
            <li>
              <Heart />
            </li>
          </ul>

          <div className="flex items-center space-x-3">
            <Link href="/auth/register">
              <Button variant="link" className="text-primaryColor">
                Sign up
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-primaryColor text-white">Sign in</Button>
            </Link>
          </div>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primaryColor focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center bg-white text-primaryColor p-3 space-y-4">
          {links.map((link) => (
            <Link href={link.href} key={link.name}>
              <Button variant="link" className="text-primaryColor">
                {link.name}
              </Button>
            </Link>
          ))}
          <ul className="flex space-x-5">
            <li>
              <Heart />
            </li>
            <li>
              <ShoppingBag />
            </li>
          </ul>
          <div className="flex flex-col items-center space-y-3">
            <Link href="/auth/register">
              <Button variant="link" className="text-primaryColor">
                Sign up
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-primaryColor text-white">Sign in</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
