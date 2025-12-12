"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { images } from "@/lib/constanst";

export default function NotFound() {
  const router = useRouter();
  const lottieContainer = useRef(null);

  useEffect(() => {
    let animationInstance = null;

    const loadLottie = async () => {
      try {
        const lottie = (await import("lottie-web")).default;
        const animationData = await import(
          "@/../public/animations/not-found.json"
        );

        if (lottieContainer.current) {
          animationInstance = lottie.loadAnimation({
            container: lottieContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData.default || animationData,
          });
        }
      } catch (error) {
        console.error("Error loading Lottie animation:", error);
      }
    };

    loadLottie();

    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50/30 to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12">
            {/* Left Column - Animation */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Image
                  src={images.logo}
                  alt="Sirkula Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14"
                />
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Sirkula
                </span>
              </div>

              {/* Lottie Animation */}
              <div
                ref={lottieContainer}
                className="w-full max-w-sm aspect-square"
              />
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full w-fit">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Error 404
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Halaman Tidak
                  <br />
                  Ditemukan
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                  Silakan kembali ke beranda untuk melanjutkan.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30 w-full sm:w-auto"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Kembali ke Beranda
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Halaman Sebelumnya
                </Button>
              </div>

              {/* Quick Links */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Tautan Populer:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/sirkula-green-action"
                    className="inline-flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Sirkula-AI
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="inline-flex items-center px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Leaderboard
                  </Link>
                  <Link
                    href="/reedem"
                    className="inline-flex items-center px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Tukar Poin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
