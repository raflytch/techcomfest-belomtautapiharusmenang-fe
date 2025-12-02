"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function CTAFooter() {
  const [isVisible, sectionRef] = (() => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setIsVisible(true),
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);
    return [isVisible, ref];
  })();

  return (
    <>
      <section
        ref={sectionRef}
        className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600"
      >
        <div className="container mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Siap Mengubah Aksi Hijau Jadi Impact Nyata?
            </h2>
            <p className="text-lg md:text-xl text-green-50 mb-10">
              Bergabunglah dengan ribuan warga yang telah membuat perbedaan
              untuk lingkungan
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-white/10 px-8 py-6 text-lg font-semibold hover:scale-105 transition-transform duration-300"
              >
                Hubungi Kami
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-white">
              {[
                "Gratis untuk warga",
                "Verifikasi AI instan",
                "Reward nyata",
              ].map((text, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Check className="w-5 h-5" />
                  <span className="text-sm md:text-base">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-5">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-300">
              © 2024 Sirkula. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
