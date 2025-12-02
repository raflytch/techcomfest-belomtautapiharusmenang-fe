"use client";

import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/constanst";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Image src={images.logo} alt="Sirkula Logo" className="w-12 h-12" />
        </Link>
        {children}
      </div>
    </div>
  );
}
