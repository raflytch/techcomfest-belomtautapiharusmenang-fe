"use client";

import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountsUp";

const HeroSection = () => {
  const [isVisible, heroRef] = useScrollAnimation();
  const [statsCount1, countRef1] = useCountUp(15847, 2000);
  const [statsCount2, countRef2] = useCountUp(2341, 2000);
  const [statsCount3, countRef3] = useCountUp(8, 1000, 0);

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div ref={heroRef} className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div
            className={`transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm font-medium border-neutral-200 text-neutral-600 bg-neutral-50"
            >
              AI-Powered Sustainability Platform
            </Badge>
          </div>

          {/* Headline */}
          <div
            className={`space-y-4 transition-all duration-500 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight leading-tight">
              Sense Every Action,
              <br />
              <span className="text-emerald-600">Reward Every Impact</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Ubah setiap aksi hijau Anda menjadi data dampak nyata. Pilah
              sampah, tanam pohon, konsumsi produk ramah lingkungan—semua
              terverifikasi AI dan mendapat reward.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-500 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 h-12 text-base font-medium"
            >
              Mulai Aksi Hijau
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-neutral-200 hover:bg-neutral-50 px-6 h-12 text-base font-medium"
            >
              <Play className="w-4 h-4 mr-2" />
              Lihat Demo
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`pt-8 transition-all duration-500 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Separator className="mb-8 max-w-md mx-auto" />
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto">
              <div ref={countRef1} className="text-center">
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                  {statsCount1.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Aksi Hijau
                </div>
              </div>
              <div
                ref={countRef2}
                className="text-center border-x border-neutral-100"
              >
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                  {statsCount2.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Pengguna Aktif
                </div>
              </div>
              <div ref={countRef3} className="text-center">
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                  {Number(statsCount3).toFixed(1)} Ton
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Sampah Terpilah
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
