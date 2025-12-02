"use client";

import Link from "next/link";
import { User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/components/auth/AuthLayout";

export default function AuthSelectComposite() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md border shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Selamat Datang</CardTitle>
          <CardDescription>
            Masuk ke akun Anda untuk melanjutkan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Pilih jenis akun untuk masuk
          </p>
          <Link href="/auth/user" className="block">
            <Button
              variant="outline"
              className="w-full h-16 justify-start gap-4 border hover:bg-green-50 hover:border-green-600"
            >
              <div className="p-2 rounded-lg bg-green-100">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Pengguna</p>
                <p className="text-xs text-muted-foreground">
                  Masuk sebagai warga/pengguna
                </p>
              </div>
            </Button>
          </Link>
          <Link href="/auth/umkm" className="block">
            <Button
              variant="outline"
              className="w-full h-16 justify-start gap-4 border hover:bg-green-50 hover:border-green-600"
            >
              <div className="p-2 rounded-lg bg-green-100">
                <Store className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold">UMKM</p>
                <p className="text-xs text-muted-foreground">
                  Masuk sebagai pelaku UMKM
                </p>
              </div>
            </Button>
          </Link>
          <div className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link
                href="/sign-up"
                className="text-green-600 hover:underline font-medium"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
