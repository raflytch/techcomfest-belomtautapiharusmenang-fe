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
    <section className="w-full relative -mt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/trash.jpg')" }}
      />
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 relative z-10">
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
              className="px-4 py-1.5 text-sm font-medium border-white/30 text-white bg-white/10 backdrop-blur-sm"
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight drop-shadow-lg">
              Sense Every Action,
              <br />
              <span className="text-emerald-400">Reward Every Impact</span>
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
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
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 h-12 text-base font-medium shadow-lg"
            >
              Mulai Aksi Hijau
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm px-6 h-12 text-base font-medium"
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
            <Separator className="mb-8 max-w-md mx-auto bg-white/20" />
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto">
              <div ref={countRef1} className="text-center">
                <div className="text-2xl sm:text-3xl font-semibold text-white drop-shadow">
                  {statsCount1.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-white/70 mt-1">
                  Aksi Hijau
                </div>
              </div>
              <div
                ref={countRef2}
                className="text-center border-x border-white/20"
              >
                <div className="text-2xl sm:text-3xl font-semibold text-white drop-shadow">
                  {statsCount2.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-white/70 mt-1">
                  Pengguna Aktif
                </div>
              </div>
              <div ref={countRef3} className="text-center">
                <div className="text-2xl sm:text-3xl font-semibold text-white drop-shadow">
                  {Number(statsCount3).toFixed(1)} Ton
                </div>
                <div className="text-xs sm:text-sm text-white/70 mt-1">
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
