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
    <Sidebar suppressHydrationWarning>
      <SidebarHeader className="border-b">
        <Link href="/" className="flex items-center gap-3 px-2 py-3">
          <Image src={images.logo} alt="Sirkula Logo" className="w-8 h-8" />
          <span className="font-semibold text-lg text-green-800">Sirkula</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu suppressHydrationWarning>
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
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t" suppressHydrationWarning>
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
                    className="data-[state=open]:bg-sidebar-accent"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          session.role === "UMKM"
                            ? session.umkmLogoUrl || session.avatarUrl
                            : session.avatarUrl
                        }
                        alt={session.name}
                      />
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {getInitials(session.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-medium">{session.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        {getRoleIcon()}
                        {getRoleLabel()}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href={`${getDashboardPath()}/profile`}
                      className="cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profil Akun
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
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
