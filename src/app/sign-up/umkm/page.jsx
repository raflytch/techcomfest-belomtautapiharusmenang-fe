"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRegisterUmkm } from "@/hooks/use-auth";
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

export default function UmkmSignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    umkmName: "",
    umkmDescription: "",
    umkmAddress: "",
    umkmCategory: "",
  });
  const [error, setError] = useState("");

  const { mutate: register, isPending } = useRegisterUmkm();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError("Password tidak cocok");
        return;
      }
      if (formData.password.length < 8) {
        setError("Password minimal 8 karakter");
        return;
      }
      setStep(2);
      return;
    }

    register(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, umkmCategory: value });
  };

  if (isPending) {
    return <FullscreenLoader text="Mendaftarkan UMKM..." />;
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md border shadow-none">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            {step === 1 ? (
              <Link
                href="/sign-up"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Link>
            ) : (
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </button>
            )}
            <span className="text-sm text-muted-foreground">
              Langkah {step} dari 2
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">
            Daftar sebagai UMKM
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Buat akun untuk mendaftarkan UMKM Anda"
              : "Lengkapi informasi UMKM Anda"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Pemilik</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      value={formData.password}
                      onChange={handleChange}
                      required
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
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="border pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="umkmName">Nama UMKM</Label>
                  <Input
                    id="umkmName"
                    name="umkmName"
                    type="text"
                    placeholder="Nama bisnis Anda"
                    value={formData.umkmName}
                    onChange={handleChange}
                    required
                    className="border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="umkmCategory">Kategori UMKM</Label>
                  <Select
                    value={formData.umkmCategory}
                    onValueChange={handleSelectChange}
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
                  <Label htmlFor="umkmAddress">Alamat UMKM</Label>
                  <Input
                    id="umkmAddress"
                    name="umkmAddress"
                    type="text"
                    placeholder="Alamat lengkap bisnis Anda"
                    value={formData.umkmAddress}
                    onChange={handleChange}
                    required
                    className="border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="umkmDescription">Deskripsi UMKM</Label>
                  <Textarea
                    id="umkmDescription"
                    name="umkmDescription"
                    placeholder="Ceritakan tentang bisnis Anda"
                    value={formData.umkmDescription}
                    onChange={handleChange}
                    required
                    className="border min-h-[100px]"
                  />
                </div>
              </>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isPending}
            >
              {isPending ? "Memproses..." : step === 1 ? "Lanjutkan" : "Daftar"}
            </Button>
          </form>

          <div className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link
                href="/auth/umkm"
                className="text-green-600 hover:underline font-medium"
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
