"use client";

import { usePathname } from "next/navigation";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";
import { AppSidebar } from "@/components/layout/AppSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hideNavbar =
    pathname.startsWith("/auth") || pathname.startsWith("/sign-up");

  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-white">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="text-sm font-medium text-muted-foreground">
              Dashboard
            </span>
          </header>
          <main className="flex-1 bg-zinc-50">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

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
