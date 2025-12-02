"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  Award,
  Settings,
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

export default function ProfilePage() {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    );
  }

  if (!session) {
    router.push("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <Image src={images.logo} alt="Sirkula Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-green-800">Profil Saya</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border shadow-none md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={session.avatarUrl} alt={session.name} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                    {getInitials(session.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{session.name}</h2>
                <p className="text-sm text-muted-foreground">{session.email}</p>
                <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                  {session.role}
                </Badge>
                <Separator className="my-4" />
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>{session.totalPoints} Poin</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Bergabung {formatDate(session.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
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

          <Card className="border shadow-none md:col-span-2">
            <CardHeader>
              <CardTitle>Pengaturan Akun</CardTitle>
              <CardDescription>
                Kelola informasi profil dan keamanan akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="security">Keamanan</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4 pt-4">
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={avatarPreview || session.avatarUrl}
                          alt={session.name}
                        />
                        <AvatarFallback className="bg-green-100 text-green-800">
                          {getInitials(session.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
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
                        <p className="text-xs text-muted-foreground mt-1">
                          JPEG, PNG, GIF, WebP. Maks 5MB
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
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
                        className="border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={session.email}
                        disabled
                        className="border bg-muted"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="security" className="space-y-4 pt-4">
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Password Saat Ini</Label>
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
                          className="border pr-10"
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
                      <Label htmlFor="newPassword">Password Baru</Label>
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
                          className="border pr-10"
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
                      className="bg-green-600 hover:bg-green-700"
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
                    <h3 className="text-lg font-medium text-red-600">
                      Zona Berbahaya
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Setelah Anda menghapus akun, tidak ada jalan kembali.
                      Harap pastikan.
                    </p>
                    <Dialog
                      open={deleteDialogOpen}
                      onOpenChange={setDeleteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus Akun
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {deleteStep === 1
                              ? "Konfirmasi Hapus Akun"
                              : "Verifikasi OTP"}
                          </DialogTitle>
                          <DialogDescription>
                            {deleteStep === 1
                              ? "Tindakan ini tidak dapat dibatalkan. Akun Anda akan dihapus secara permanen."
                              : "Masukkan kode OTP yang telah dikirim ke email Anda."}
                          </DialogDescription>
                        </DialogHeader>
                        {deleteStep === 1 ? (
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setDeleteDialogOpen(false)}
                            >
                              Batal
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDeleteRequest}
                              disabled={isRequestingDelete}
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
                                  <InputOTPSlot index={0} className="border" />
                                  <InputOTPSlot index={1} className="border" />
                                  <InputOTPSlot index={2} className="border" />
                                  <InputOTPSlot index={3} className="border" />
                                  <InputOTPSlot index={4} className="border" />
                                  <InputOTPSlot index={5} className="border" />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setDeleteStep(1);
                                  setDeleteOtp("");
                                  setDeleteDialogOpen(false);
                                }}
                              >
                                Batal
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                disabled={
                                  isConfirmingDelete || deleteOtp.length !== 6
                                }
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
