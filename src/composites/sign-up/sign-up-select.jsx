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
      <Card className="w-[calc(100%-2rem)] max-w-sm sm:max-w-md border shadow-none">
        <CardHeader className="text-center p-3 sm:p-6 pb-2 sm:pb-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm text-muted-foreground hover:text-foreground mb-2 sm:mb-4 w-fit"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Kembali ke Beranda
          </Link>
          <CardTitle className="text-lg sm:text-2xl font-bold">
            Buat Akun
          </CardTitle>
          <CardDescription className="text-[10px] sm:text-sm">
            Pilih jenis akun yang ingin Anda daftarkan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-4 p-3 sm:p-6 pt-0">
          <Link href="/sign-up/user" className="block">
            <Button
              variant="outline"
              className="w-full h-auto py-2.5 sm:py-4 px-2.5 sm:px-4 flex items-center justify-start gap-2 sm:gap-4 border hover:bg-green-50 hover:border-green-200"
            >
              <div className="p-1 sm:p-2 rounded-full bg-green-100 shrink-0">
                <User className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="font-semibold text-xs sm:text-base leading-tight">
                  Daftar sebagai Pengguna
                </p>
                <p className="text-[9px] sm:text-xs text-muted-foreground leading-tight mt-0.5">
                  Untuk berkontribusi dalam pengelolaan sampah
                </p>
              </div>
            </Button>
          </Link>

          <Link href="/sign-up/umkm" className="block">
            <Button
              variant="outline"
              className="w-full h-auto py-2.5 sm:py-4 px-2.5 sm:px-4 flex items-center justify-start gap-2 sm:gap-4 border hover:bg-green-50 hover:border-green-200"
            >
              <div className="p-1 sm:p-2 rounded-full bg-green-100 shrink-0">
                <Store className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="font-semibold text-xs sm:text-base leading-tight">
                  Daftar sebagai UMKM
                </p>
                <p className="text-[9px] sm:text-xs text-muted-foreground leading-tight mt-0.5">
                  Untuk pelaku usaha mengelola limbah bisnis
                </p>
              </div>
            </Button>
          </Link>

          <div className="pt-2 sm:pt-4 text-center">
            <p className="text-[10px] sm:text-sm text-muted-foreground">
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
