"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Heart, ShoppingBag, Menu } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./Session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useAuth();

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
          JCJ Lite
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
          {/* <ul className="flex items-center space-x-5">
            <li>
              <Heart />
            </li>
          </ul> */}

          {session.data?.user?.name ? (
            <div className="border px-3 py-1 rounded-lg">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center space-x-3">
                    <p>{session.data?.user?.name}</p>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={session.data?.user?.image || "/download.png"}
                        alt={session.data?.user?.name}
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
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
          )}
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
          {/* <ul className="flex space-x-5">
            <li>
              <Heart />
            </li>
            <li>
              <ShoppingBag />
            </li>
          </ul> */}
          {session.data?.user?.name ? (
            <div className="border px-3 py-1 rounded-lg">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {session.data?.user?.name}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
