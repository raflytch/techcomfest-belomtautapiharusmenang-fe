"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  MapPin,
  FileText,
  Camera,
  ArrowLeft,
  Save,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { images } from "@/lib/constanst";
import { useSession, useUpdateUmkmProfile } from "@/hooks/use-auth";
import FullscreenLoader from "@/components/ui/fullscreen-loader";

const UMKM_CATEGORIES = [
  "Makanan & Minuman",
  "Fashion & Pakaian",
  "Kerajinan Tangan",
  "Pertanian & Perkebunan",
  "Kesehatan & Kecantikan",
  "Jasa & Layanan",
  "Teknologi",
  "Lainnya",
];

export default function UmkmDashboardComposite() {
  const router = useRouter();
  const logoInputRef = useRef(null);
  const { data: session, isLoading } = useSession();
  const { mutate: updateUmkmProfile, isPending: isUpdating } =
    useUpdateUmkmProfile();

  const [umkmData, setUmkmData] = useState({
    umkmName: "",
    umkmDescription: "",
    umkmAddress: "",
    umkmCategory: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    if (umkmData.umkmName) data.umkmName = umkmData.umkmName;
    if (umkmData.umkmDescription)
      data.umkmDescription = umkmData.umkmDescription;
    if (umkmData.umkmAddress) data.umkmAddress = umkmData.umkmAddress;
    if (umkmData.umkmCategory) data.umkmCategory = umkmData.umkmCategory;
    if (logoFile) data.logo = logoFile;

    if (Object.keys(data).length > 0) {
      updateUmkmProfile(data);
    }
  };

  if (isLoading) {
    return <FullscreenLoader text="Memuat dashboard..." />;
  }

  // Show fullscreen loader for mutation (update UMKM profile)
  if (isUpdating) {
    return <FullscreenLoader text="Menyimpan perubahan..." />;
  }

  if (!session || session.role !== "UMKM") {
    router.push("/");
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
          <div>
            <h1 className="text-2xl font-bold text-green-800">
              Dashboard UMKM
            </h1>
            <p className="text-sm text-muted-foreground">
              Kelola profil bisnis Anda
            </p>
          </div>
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
              </div>

              <div className="mt-6 space-y-2">
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="w-full justify-start border"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Profil Akun
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Informasi UMKM
              </CardTitle>
              <CardDescription>
                Perbarui informasi bisnis UMKM Anda agar lebih mudah ditemukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={logoPreview || ""} alt="Logo UMKM" />
                    <AvatarFallback className="bg-green-50 border-2 border-dashed border-green-200">
                      <Store className="w-8 h-8 text-green-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={handleLogoChange}
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPEG, PNG, GIF, WebP. Maks 5MB
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="umkmName">
                    <Store className="w-4 h-4 inline mr-2" />
                    Nama UMKM
                  </Label>
                  <Input
                    id="umkmName"
                    placeholder="Nama bisnis Anda"
                    value={umkmData.umkmName}
                    onChange={(e) =>
                      setUmkmData({ ...umkmData, umkmName: e.target.value })
                    }
                    className="border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="umkmCategory">Kategori UMKM</Label>
                  <Select
                    value={umkmData.umkmCategory}
                    onValueChange={(value) =>
                      setUmkmData({ ...umkmData, umkmCategory: value })
                    }
                  >
                    <SelectTrigger className="border w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {UMKM_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="umkmAddress">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Alamat UMKM
                  </Label>
                  <Input
                    id="umkmAddress"
                    placeholder="Alamat lengkap bisnis Anda"
                    value={umkmData.umkmAddress}
                    onChange={(e) =>
                      setUmkmData({ ...umkmData, umkmAddress: e.target.value })
                    }
                    className="border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="umkmDescription">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Deskripsi UMKM
                  </Label>
                  <Textarea
                    id="umkmDescription"
                    placeholder="Ceritakan tentang bisnis Anda, produk yang dijual, dll."
                    value={umkmData.umkmDescription}
                    onChange={(e) =>
                      setUmkmData({
                        ...umkmData,
                        umkmDescription: e.target.value,
                      })
                    }
                    className="border min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isUpdating}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
