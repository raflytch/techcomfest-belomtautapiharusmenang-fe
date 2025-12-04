"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

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
        className="py-16 md:py-20 bg-green-600"
      >
        <div className="container mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Siap Mengubah Aksi Hijau Jadi Impact Nyata?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-green-100 mb-10">
              Bergabunglah dengan ribuan warga yang telah membuat perbedaan
              untuk lingkungan
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 text-lg font-semibold transition-colors duration-200"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg font-semibold transition-colors duration-200"
              >
                Hubungi Kami
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-white">
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
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Check className="w-5 h-5" />
                  <span className="text-sm md:text-base">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-5">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <p className="text-sm text-slate-400">
              © 2024 Sirkula. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
