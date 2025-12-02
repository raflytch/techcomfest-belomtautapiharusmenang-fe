"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, Store } from "lucide-react";
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

export default function UmkmRegisterComposite() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    businessType: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate: register, isPending } = useRegisterUmkm();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, businessType: value });
  };

  if (isPending) {
    return <FullscreenLoader text="Sedang mendaftar..." />;
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md border shadow-none max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Store className="w-6 h-6 text-green-600" />
            <CardTitle className="text-2xl font-bold">Daftar UMKM</CardTitle>
          </div>
          <CardDescription>
            Daftarkan bisnis Anda untuk mengelola limbah dengan lebih baik
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nama Bisnis/Usaha</Label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Nama toko/usaha Anda"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Nama Pemilik</Label>
              <Input
                id="ownerName"
                name="ownerName"
                type="text"
                placeholder="Nama lengkap pemilik"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Bisnis</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="bisnis@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Jenis Usaha</Label>
              <Select
                value={formData.businessType}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="border">
                  <SelectValue placeholder="Pilih jenis usaha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="makanan">Makanan & Minuman</SelectItem>
                  <SelectItem value="retail">Retail/Toko</SelectItem>
                  <SelectItem value="jasa">Jasa</SelectItem>
                  <SelectItem value="manufaktur">Manufaktur</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Usaha</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Alamat lengkap usaha"
                value={formData.address}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isPending}
            >
              {isPending ? "Memproses..." : "Daftar UMKM"}
            </Button>
          </form>

          <div className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Sudah punya akun UMKM?{" "}
              <Link
                href="/auth/umkm"
                className="text-green-600 hover:underline font-medium"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
