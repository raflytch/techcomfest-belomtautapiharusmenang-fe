"use client";

import Link from "next/link";
import { User, Store, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SignUpSelectComposite() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md border shadow-none">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <CardTitle className="text-2xl font-bold">Buat Akun</CardTitle>
          <CardDescription>
            Pilih jenis akun yang ingin Anda daftarkan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/sign-up/user" className="block">
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex items-center justify-start gap-4 border hover:bg-green-50 hover:border-green-200"
            >
              <div className="p-2 rounded-full bg-green-100">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Daftar sebagai Pengguna</p>
                <p className="text-xs text-muted-foreground">
                  Untuk pengguna yang ingin berkontribusi dalam pengelolaan
                  sampah
                </p>
              </div>
            </Button>
          </Link>

          <Link href="/sign-up/umkm" className="block">
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex items-center justify-start gap-4 border hover:bg-green-50 hover:border-green-200"
            >
              <div className="p-2 rounded-full bg-green-100">
                <Store className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Daftar sebagai UMKM</p>
                <p className="text-xs text-muted-foreground">
                  Untuk pelaku usaha yang ingin mengelola limbah bisnis
                </p>
              </div>
            </Button>
          </Link>

          <div className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link
                href="/auth"
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
