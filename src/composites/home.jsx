"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useCountUp } from "@/hooks/useCountsUp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProblemsSection from "@/components/ProblemsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTAFooter from "@/components/CTAFooter";

export default function HomeComposite() {
  const [isVisible, heroRef] = useScrollAnimation();
  const [statsCount1, countRef1] = useCountUp(15847, 2000);
  const [statsCount2, countRef2] = useCountUp(2341, 2000);
  const [statsCount3, countRef3] = useCountUp(8, 1000, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 h-full">
        {/* Header */}
        <div
          ref={heroRef}
          className={`flex justify-between items-center mb-5 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Sustainability Platform
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Sense Every Action,
              </h1>
              <h1 className="text-5xl font-bold text-green-600 mb-6">
                Reward Every Impact
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ubah setiap aksi hijau Anda menjadi data dampak nyata. Pilah
                sampah, tanam pohon, konsumsi produk ramah lingkungan—semua
                terverifikasi AI dan mendapat reward!
              </p>
            </div>

            {/* Stats with counter animation */}
            <div
              className={`grid grid-cols-3 gap-8 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div
                ref={countRef1}
                className="hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {statsCount1.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Aksi Hijau</div>
              </div>
              <div
                ref={countRef2}
                className="hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {statsCount2.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Pengguna Aktif</div>
              </div>
              <div
                ref={countRef3}
                className="hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {Number(statsCount3).toFixed(1)} Ton
                </div>
                <div className="text-sm text-gray-600">Sampah Terpilah</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex gap-4 transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg hover:scale-105 transition-transform duration-300">
                Mulai Aksi Hijau
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="px-6 py-6 text-lg bg-white hover:scale-105 transition-transform duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Lihat Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProblemsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTAFooter />
    </div>
  );
}
