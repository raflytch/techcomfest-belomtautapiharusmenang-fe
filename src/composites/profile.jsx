"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  Award,
  Trash2,
  Camera,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { images } from "@/lib/constanst";
import {
  useSession,
  useUpdateProfile,
  useRequestDeleteAccount,
  useConfirmDeleteAccount,
} from "@/hooks/use-auth";
import FullscreenLoader from "@/components/ui/fullscreen-loader";

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="h-5 w-40 mb-6" />
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border shadow-none lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Separator className="my-4" />
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-none lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full mb-6" />
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div>
                    <Skeleton className="h-9 w-28 mb-1" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-36" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ProfileComposite() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { data: session, isLoading } = useSession();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: requestDelete, isPending: isRequestingDelete } =
    useRequestDeleteAccount();
  const { mutate: confirmDelete, isPending: isConfirmingDelete } =
    useConfirmDeleteAccount();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    currentPassword: "",
    newPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteOtp, setDeleteOtp] = useState("");

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
      month: "long",
      year: "numeric",
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const data = {};
    if (profileData.name && profileData.name !== session?.name) {
      data.name = profileData.name;
    }
    if (profileData.currentPassword && profileData.newPassword) {
      data.currentPassword = profileData.currentPassword;
      data.newPassword = profileData.newPassword;
    }
    if (avatarFile) {
      data.avatar = avatarFile;
    }
    if (Object.keys(data).length > 0) {
      updateProfile(data);
    }
  };

  const handleDeleteRequest = () => {
    requestDelete(undefined, {
      onSuccess: () => {
        setDeleteStep(2);
      },
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteOtp.length === 6) {
      confirmDelete(deleteOtp);
    }
  };

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/auth");
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Show fullscreen loader for mutations (POST/PATCH/DELETE operations)
  if (isUpdating || isRequestingDelete || isConfirmingDelete) {
    return (
      <FullscreenLoader
        text={
          isUpdating
            ? "Menyimpan perubahan..."
            : isRequestingDelete
            ? "Memproses permintaan..."
            : "Menghapus akun..."
        }
      />
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Image
            src={images.logo}
            alt="Sirkula Logo"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-green-800">
            Profil Saya
          </h1>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          <Card className="border shadow-none lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mb-4">
                  <AvatarImage src={session.avatarUrl} alt={session.name} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-xl sm:text-2xl">
                    {getInitials(session.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg sm:text-xl font-semibold">
                  {session.name}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground break-all">
                  {session.email}
                </p>
                <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                  {session.role}
                </Badge>
                <Separator className="my-4" />
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <Award className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{session.totalPoints} Poin</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>Bergabung {formatDate(session.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>
                      {session.isEmailVerified
                        ? "Email Terverifikasi"
                        : "Email Belum Diverifikasi"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Pengaturan Akun
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Kelola informasi profil dan keamanan akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="profile" className="text-xs sm:text-sm">
                    Profil
                  </TabsTrigger>
                  <TabsTrigger value="security" className="text-xs sm:text-sm">
                    Keamanan
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4">
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Avatar className="h-14 w-14 sm:h-16 sm:w-16">
                        <AvatarImage
                          src={avatarPreview || session.avatarUrl}
                          alt={session.name}
                        />
                        <AvatarFallback className="bg-green-100 text-green-800">
                          {getInitials(session.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center sm:text-left">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleAvatarChange}
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Ganti Foto
                        </Button>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          JPEG, PNG, GIF, WebP. Maks 5MB
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs sm:text-sm">
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        placeholder={session.name}
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        className="border text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={session.email}
                        disabled
                        className="border bg-muted text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-sm"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="security" className="space-y-4">
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="currentPassword"
                        className="text-xs sm:text-sm"
                      >
                        Password Saat Ini
                      </Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password saat ini"
                          value={profileData.currentPassword}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="border pr-10 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="newPassword"
                        className="text-xs sm:text-sm"
                      >
                        Password Baru
                      </Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Minimal 8 karakter"
                          value={profileData.newPassword}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              newPassword: e.target.value,
                            })
                          }
                          className="border pr-10 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-sm"
                      disabled={
                        isUpdating ||
                        !profileData.currentPassword ||
                        !profileData.newPassword
                      }
                    >
                      {isUpdating ? "Menyimpan..." : "Ubah Password"}
                    </Button>
                  </form>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium text-red-600">
                      Zona Berbahaya
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Setelah Anda menghapus akun, tidak ada jalan kembali.
                      Harap pastikan.
                    </p>
                    <Dialog
                      open={deleteDialogOpen}
                      onOpenChange={setDeleteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="w-full sm:w-auto text-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus Akun
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-base sm:text-lg">
                            {deleteStep === 1
                              ? "Konfirmasi Hapus Akun"
                              : "Verifikasi OTP"}
                          </DialogTitle>
                          <DialogDescription className="text-xs sm:text-sm">
                            {deleteStep === 1
                              ? "Tindakan ini tidak dapat dibatalkan. Akun Anda akan dihapus secara permanen."
                              : "Masukkan kode OTP yang telah dikirim ke email Anda."}
                          </DialogDescription>
                        </DialogHeader>
                        {deleteStep === 1 ? (
                          <DialogFooter className="flex-col sm:flex-row gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setDeleteDialogOpen(false)}
                              className="w-full sm:w-auto"
                            >
                              Batal
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDeleteRequest}
                              disabled={isRequestingDelete}
                              className="w-full sm:w-auto"
                            >
                              {isRequestingDelete
                                ? "Memproses..."
                                : "Lanjutkan"}
                            </Button>
                          </DialogFooter>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex justify-center">
                              <InputOTP
                                maxLength={6}
                                value={deleteOtp}
                                onChange={setDeleteOtp}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot
                                    index={0}
                                    className="border h-10 w-10 sm:h-12 sm:w-12"
                                  />
                                  <InputOTPSlot
                                    index={1}
                                    className="border h-10 w-10 sm:h-12 sm:w-12"
                                  />
                                  <InputOTPSlot
                                    index={2}
                                    className="border h-10 w-10 sm:h-12 sm:w-12"
                                  />
                                  <InputOTPSlot
                                    index={3}
                                    className="border h-10 w-10 sm:h-12 sm:w-12"
                                  />
                                  <InputOTPSlot
                                    index={4}
                                    className="border h-10 w-10 sm:h-12 sm:w-12"
                                  />
                                  <InputOTPSlot
                                    index={5}
                                    className="border h-10 w-10 sm:h-12 sm:w-12"
                                  />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                            <DialogFooter className="flex-col sm:flex-row gap-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setDeleteStep(1);
                                  setDeleteOtp("");
                                  setDeleteDialogOpen(false);
                                }}
                                className="w-full sm:w-auto"
                              >
                                Batal
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                disabled={
                                  isConfirmingDelete || deleteOtp.length !== 6
                                }
                                className="w-full sm:w-auto"
                              >
                                {isConfirmingDelete
                                  ? "Menghapus..."
                                  : "Hapus Akun"}
                              </Button>
                            </DialogFooter>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
