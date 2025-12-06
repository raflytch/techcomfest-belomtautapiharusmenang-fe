"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  Calendar,
  Shield,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { images } from "@/lib/constanst";
import { useSession, useGetAllUsers, useGetUserById } from "@/hooks/use-auth";
import FullscreenLoader from "@/components/ui/fullscreen-loader";

export default function DinasDashboardComposite() {
  const router = useRouter();
  const { data: session, isLoading: sessionLoading } = useSession();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const { data: usersData, isLoading: usersLoading } = useGetAllUsers({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const { data: userDetail, isLoading: detailLoading } =
    useGetUserById(selectedUserId);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "DLH":
        return "bg-blue-100 text-blue-800";
      case "UMKM":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const handleViewDetail = (userId) => {
    setSelectedUserId(userId);
    setDetailDialogOpen(true);
  };

  if (sessionLoading) {
    return <FullscreenLoader text="Memuat dashboard..." />;
  }

  useEffect(() => {
    if (!session || session.role !== "DLH") {
      router.push("/");
    }
  }, [session, router]);

  if (!session || session.role !== "DLH") {
    return null;
  }

  const users = usersData?.data?.data || [];
  const pagination = usersData?.data?.meta || { total: 0, totalPages: 1 };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <Image src={images.logo} alt="Sirkula Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold text-green-800">
              Dashboard Dinas
            </h1>
            <p className="text-sm text-muted-foreground">
              Dinas Lingkungan Hidup
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Pengguna
                  </p>
                  <p className="text-2xl font-bold">{pagination.total || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total UMKM</p>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.role === "UMKM").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Terverifikasi</p>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.isEmailVerified).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border shadow-none">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Daftar Pengguna
                </CardTitle>
                <CardDescription>Monitoring pengguna platform</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[140px] border">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Terbaru</SelectItem>
                    <SelectItem value="asc">Terlama</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={limit.toString()}
                  onValueChange={(v) => setLimit(Number(v))}
                >
                  <SelectTrigger className="w-[100px] border">
                    <SelectValue placeholder="Limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pengguna</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Poin</TableHead>
                        <TableHead>Tanggal Daftar</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            Tidak ada data pengguna
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={user.avatarUrl}
                                    alt={user.name}
                                  />
                                  <AvatarFallback className="bg-green-100 text-green-800 text-xs">
                                    {getInitials(user.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">
                                    {user.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getRoleBadgeColor(
                                  user.role
                                )} hover:opacity-80`}
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {user.isActive ? (
                                <Badge
                                  variant="outline"
                                  className="border-green-500 text-green-600"
                                >
                                  Aktif
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="border-red-500 text-red-600"
                                >
                                  Nonaktif
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{user.totalPoints || 0}</TableCell>
                            <TableCell>{formatDate(user.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetail(user.id)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Halaman {page} dari {pagination.totalPages || 1}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) =>
                          Math.min(pagination.totalPages || 1, p + 1)
                        )
                      }
                      disabled={page >= (pagination.totalPages || 1)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Detail Pengguna</DialogTitle>
              <DialogDescription>Informasi lengkap pengguna</DialogDescription>
            </DialogHeader>
            {detailLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
              </div>
            ) : userDetail?.data ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={userDetail.data.avatarUrl}
                      alt={userDetail.data.name}
                    />
                    <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                      {getInitials(userDetail.data.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {userDetail.data.name}
                    </h3>
                    <Badge
                      className={`${getRoleBadgeColor(
                        userDetail.data.role
                      )} hover:opacity-80`}
                    >
                      {userDetail.data.role}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{userDetail.data.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {userDetail.data.isEmailVerified
                        ? "Email Terverifikasi"
                        : "Email Belum Diverifikasi"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Bergabung {formatDate(userDetail.data.createdAt)}
                    </span>
                  </div>
                  {userDetail.data.umkmName && (
                    <div className="flex items-center gap-3 text-sm">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>{userDetail.data.umkmName}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
