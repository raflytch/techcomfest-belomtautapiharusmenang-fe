"use client";

import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

const HeroSection = () => {
  const [isVisible, heroRef] = useScrollAnimation();

  return (
    <section className="w-full relative -mt-16 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 relative z-10">
        <div
          ref={heroRef}
          className="flex justify-between gap-8 lg:gap-12 items-center max-w-7xl mx-auto"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-8">
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
                className="px-4 py-1.5 text-sm font-medium border-emerald-300/40 text-black bg-emerald-500/15 backdrop-blur-sm"
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-emerald-600 via-emerald-500 to-yellow-500 bg-clip-text text-transparent tracking-tight leading-tight">
                Sense Every Action,
                <br />
                Reward Every Impact
              </h1>
              <p className="text-base sm:text-lg text-black/80 max-w-2xl leading-relaxed">
                Ubah setiap aksi hijau Anda menjadi data dampak nyata. Pilah
                sampah, tanam pohon, konsumsi produk ramah lingkungan—semua
                terverifikasi AI dan mendapat reward.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 transition-all duration-500 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="bg-white hover:bg-emerald-50 text-[#2d5a3d] px-6 h-12 text-base font-medium border"
              >
                Mulai Aksi Hijau
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-black text-black bg-transparent hover:bg-white backdrop-blur-sm px-6 h-12 text-base font-medium"
              >
                <Play className="w-4 h-4 mr-2" />
                Lihat Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Circular Image */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-500 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-200/25 overflow-hidden">
                <Image
                  src="/images/plant.webp"
                  alt="Green Plant"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
