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

      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Impact2Action
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Sense Every Action, Reward Every Impact
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Platform AI-driven untuk melacak, memverifikasi, dan memberikan
                reward pada setiap aksi keberlanjutan Anda.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-3">
                {[
                  "Untuk Warga",
                  "Untuk UMKM",
                  "Untuk Kelurahan",
                  "Untuk Bank Sampah",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Sumber Daya</h3>
              <ul className="space-y-3">
                {["Dokumentasi", "Panduan", "FAQ", "Blog"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-green-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-3">
                {["Tentang Kami", "Kontak", "Karir", "Privacy Policy"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-green-400 transition-colors text-sm hover:translate-x-1 inline-block duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex justify-center items-center">
              <p className="text-sm text-gray-400">
                © 2024 Impact2Action. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
