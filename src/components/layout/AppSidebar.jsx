"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  User,
  Ticket,
  LogOut,
  ChevronUp,
  Store,
  Building2,
  Shield,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { images } from "@/lib/constanst";
import { useSession, useLogout } from "@/hooks/use-auth";

const umkmMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/umkm",
    icon: LayoutDashboard,
  },
  {
    title: "Profil UMKM",
    url: "/dashboard/umkm/profile",
    icon: Store,
  },
  {
    title: "Kelola Voucher",
    url: "/dashboard/umkm/voucher",
    icon: Ticket,
  },
];

const dinasMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/dinas",
    icon: LayoutDashboard,
  },
  {
    title: "Profil",
    url: "/dashboard/dinas/profile",
    icon: User,
  },
];

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Pengguna",
    url: "/dashboard/admin/users",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isLoading } = useSession();
  const { logout } = useLogout();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getDashboardPath = () => {
    if (!session) return "/dashboard";
    switch (session.role) {
      case "UMKM":
        return "/dashboard/umkm";
      case "DLH":
        return "/dashboard/dinas";
      case "ADMIN":
        return "/dashboard/admin";
      default:
        return "/dashboard";
    }
  };

  const getMenuItems = () => {
    if (!session) return [];
    switch (session.role) {
      case "UMKM":
        return umkmMenuItems;
      case "DLH":
        return dinasMenuItems;
      case "ADMIN":
        return adminMenuItems;
      default:
        return [];
    }
  };

  const getRoleIcon = () => {
    if (!session) return null;
    switch (session.role) {
      case "UMKM":
        return <Store className="w-4 h-4" />;
      case "DLH":
        return <Building2 className="w-4 h-4" />;
      case "ADMIN":
        return <Shield className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getRoleLabel = () => {
    if (!session) return "";
    switch (session.role) {
      case "UMKM":
        return "UMKM";
      case "DLH":
        return "Dinas Lingkungan";
      case "ADMIN":
        return "Administrator";
      default:
        return session.role;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar suppressHydrationWarning className="border-r">
      <SidebarHeader className="border-b">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4"
        >
          <Image
            src={images.logo}
            alt="Sirkula Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
          />
          <span className="font-semibold text-base sm:text-lg text-green-800">
            Sirkula
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 sm:px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs sm:text-sm px-2 sm:px-3 py-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu suppressHydrationWarning className="space-y-1">
              {isLoading ? (
                <>
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                </>
              ) : (
                menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                      className="h-10 sm:h-11 px-3 sm:px-4 text-sm sm:text-base"
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className="border-t px-2 sm:px-3 py-2"
        suppressHydrationWarning
      >
        {isLoading ? (
          <div className="p-2">
            <SidebarMenuSkeleton showIcon />
          </div>
        ) : session ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent h-auto py-2 sm:py-3 px-3 sm:px-4"
                  >
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10 shrink-0">
                      <AvatarImage
                        src={
                          session.role === "UMKM"
                            ? session.umkmLogoUrl || session.avatarUrl
                            : session.avatarUrl
                        }
                        alt={session.name}
                      />
                      <AvatarFallback className="bg-green-100 text-green-800 text-xs sm:text-sm">
                        {getInitials(session.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5 leading-none min-w-0 flex-1">
                      <span className="font-medium text-sm sm:text-base truncate">
                        {session.name}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 truncate">
                        {getRoleIcon()}
                        <span className="truncate">{getRoleLabel()}</span>
                      </span>
                    </div>
                    <ChevronUp className="ml-auto w-4 h-4 shrink-0" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] min-w-[200px]"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href={`${getDashboardPath()}/profile`}
                      className="cursor-pointer text-sm sm:text-base py-2"
                    >
                      <User className="w-4 h-4 mr-2 shrink-0" />
                      <span>Profil Akun</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 cursor-pointer text-sm sm:text-base py-2"
                  >
                    <LogOut className="w-4 h-4 mr-2 shrink-0" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : null}
      </SidebarFooter>
    </Sidebar>
  );
}
