"use client";

import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/constanst";
import GuestGuard from "./GuestGuard";

export default function AuthLayout({ children }) {
  return (
    <GuestGuard>
      <div className="min-h-screen bg-zinc-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-8">
          <Link
            href="/"
            className="flex flex-col items-center gap-2 mb-6 sm:mb-8"
          >
            <Image
              src={images.logo}
              alt="Sirkula Logo"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </Link>
          {children}
        </div>
      </div>
    </GuestGuard>
  );
}
