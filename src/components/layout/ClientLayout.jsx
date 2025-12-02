"use client";

import { usePathname } from "next/navigation";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide navbar on auth and sign-up pages
  const hideNavbar =
    pathname.startsWith("/auth") || pathname.startsWith("/sign-up");

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute inset-0 z-0" />
      <div className="relative z-10 bg-zinc-50">
        {!hideNavbar && <Navbar01 />}
        {children}
      </div>
    </div>
  );
}
