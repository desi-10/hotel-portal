import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { AuthProvider } from "@/components/Session";
import StripeProvider from "@/components/StripeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Raleway({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <StripeProvider>
          <body className={inter.className}>
            <div className="bg-gray-100">{children}</div>
          </body>
          <Toaster position="top-center" />
        </StripeProvider>
      </SessionProvider>
    </html>
  );
}
