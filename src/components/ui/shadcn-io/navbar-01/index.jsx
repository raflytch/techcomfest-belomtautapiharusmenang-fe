"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { navigationLinks } from "@/lib/constanst";
import { images } from "@/lib/constanst";
import { useSession, useLogout } from "@/hooks/use-auth";
import { User, LogOut, Settings, LayoutDashboard, Trophy } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { HamburgerIcon } from "lucide-react";

// ... Logo dan HamburgerIcon sama ...

export const Navbar01 = React.forwardRef(
  (
    {
      className,
      logoHref = "#",
      signInText = "Sign In",
      signInHref = "#signin",
      ctaText = "Get Started",
      ctaHref = "#get-started",
      onSignInClick,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const { data: session, isLoading, refetch } = useSession();
    const { logout } = useLogout();

    // Tambahkan mounted state
    useEffect(() => {
      setMounted(true);
    }, []);

    const getInitials = (name) => {
      if (!name) return "U";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const getDashboardLink = () => {
      if (!session) return "/";
      switch (session.role) {
        case "UMKM":
          return "/dashboard/umkm";
        case "DLH":
          return "/dashboard/dinas";
        case "ADMIN":
          return "/dashboard/admin";
        default:
          return "/";
      }
    };

    const isHashLink = (href) => {
      return href.startsWith("#");
    };

    const handleNavigation = (e, href) => {
      if (!isHashLink(href)) {
        setIsPopoverOpen(false);
        return;
      }

      const isHomePage = pathname === "/";
      const sectionId = href === "#" ? "home" : href.substring(1);

      if (!isHomePage) {
        return;
      } else {
        e.preventDefault();
        scrollToSection(sectionId);
      }
    };

    const scrollToSection = (sectionId) => {
      if (sectionId === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setIsPopoverOpen(false);
        return;
      }

      const element = document.getElementById(sectionId);

      if (!element) {
        return;
      }

      const headerOffset = 64;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsPopoverOpen(false);
    };

    useEffect(() => {
      if (pathname === "/" && window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      }
    }, [pathname]);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    useEffect(() => {
      const handleFocus = () => {
        refetch();
      };
      window.addEventListener("focus", handleFocus);
      return () => window.removeEventListener("focus", handleFocus);
    }, [refetch]);

    const combinedRef = React.useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const getLinkHref = (href) => {
      if (!isHashLink(href)) {
        return href;
      }
      return href === "#" ? "/" : `/${href}`;
    };

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side - sama seperti sebelumnya */}
          <div className="flex items-center gap-2">
            {isMobile && (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <Link
                            href={getLinkHref(link.href)}
                            onClick={(e) => handleNavigation(e, link.href)}
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                              link.active
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80"
                            )}
                          >
                            {link.label === "Leaderboard" && (
                              <Trophy className="mr-2 h-4 w-4" />
                            )}
                            {link.label}
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    scrollToSection("home");
                  }
                }}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <Image
                  className="text-2xl w-10 h-10"
                  src={images.logo}
                  alt="Sirkula Logo"
                />
                <span className="hidden font-bold text-xl sm:inline-block text-green-800">
                  Sirkula
                </span>
              </Link>
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <Link
                          href={getLinkHref(link.href)}
                          onClick={(e) => handleNavigation(e, link.href)}
                          className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                            link.active ||
                              pathname === link.href ||
                              (link.href === "#" && pathname === "/")
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80 hover:text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>

          {/* Right side - Fixed hydration */}
          {!mounted || isLoading ? (
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session.avatarUrl} alt={session.name} />
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {getInitials(session.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{session.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.email}
                      </p>
                      <p className="text-xs text-green-600 font-medium">
                        {session.totalPoints} Poin
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/leaderboard" className="cursor-pointer">
                      <Trophy className="mr-2 h-4 w-4" />
                      Leaderboard
                    </Link>
                  </DropdownMenuItem>
                  {session.role !== "WARGA" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href={getDashboardLink()}
                        className="cursor-pointer"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={() => router.push("/auth")}
              >
                Masuk
              </Button>
              <Button
                size="sm"
                className="text-sm font-medium px-4 rounded-md shadow-sm bg-green-800 hover:opacity-90 hover:bg-green-800"
                onClick={() => router.push("/sign-up")}
              >
                Daftar
              </Button>
            </div>
          )}
        </div>
      </header>
    );
  }
);

Navbar01.displayName = "Navbar01";

export { Logo, HamburgerIcon };
