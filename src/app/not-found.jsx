"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/constanst";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src={images.logo}
            alt="Sirkula Logo"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        {/* 404 Illustration */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-green-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            Silakan kembali ke beranda atau gunakan navigasi untuk menemukan
            yang Anda butuhkan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Halaman Sebelumnya
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Tautan Berguna:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/leaderboard"
              className="text-green-600 hover:text-green-700 hover:underline"
            >
              Leaderboard
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/sirkula-green-action"
              className="text-green-600 hover:text-green-700 hover:underline"
            >
              Green Action
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/reedem"
              className="text-green-600 hover:text-green-700 hover:underline"
            >
              Redeem
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
