import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
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
    <div className="sticky top-0  z-20 flex justify-between items-center  text-white container mx-auto p-3 bg-blue-950">
      <div className="w-12">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </div>

      <ul className="flex items-center space-x-5">
        {links.map((link) => (
          <Link href={link.href} key={link.name}>
            <Button variant="link" className="text-white">
              {link.name}
            </Button>
          </Link>
        ))}
      </ul>

      <div className="flex items-center space-x-10">
        <ul className="flex items-center space-x-5">
          <li>
            <Heart />
          </li>
          <li>
            <ShoppingBag />
          </li>
        </ul>

        <div className="flex items-center space-x-3">
          <Button variant="link" className="text-white">
            {" "}
            Sign up
          </Button>
          <Button className="bg-white text-blue-500">Sign in</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
