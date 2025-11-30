"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Play,
  ArrowRight,
  Bot,
  Target,
  BarChart3,
  Camera,
  Coins,
  Gift,
  Check,
  AlertCircle,
  TrendingUp,
  Users,
} from "lucide-react";

// Motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Counter animation hook
function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - start) + start));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration, start]);

  return [count, countRef];
}

// Animated sections with scroll detection
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [isVisible, ref];
}

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
                  {statsCount3.toFixed(1)} Ton
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
      <CTAAndFooter />
    </div>
  );
}

export function ProblemsSection() {
  const [isVisible, sectionRef] = useScrollAnimation();

  const problems = [
    {
      icon: <AlertCircle className="w-10 h-10 text-red-600" />,
      title: "Tidak Ada Verifikasi Aksi Hijau",
      description:
        "Warga sulit membuktikan kontribusi nyata mereka terhadap lingkungan. Aksi hijau seperti pemilahan sampah atau penanaman pohon tidak tercatat secara terverifikasi.",
      bgColor: "bg-red-50",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
      title: "Data Dampak Lingkungan Tidak Terintegrasi",
      description:
        "Kelurahan dan bank sampah kesulitan melacak dampak kolektif dari program keberlanjutan. Data tersebar dan tidak real-time.",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Gift className="w-10 h-10 text-purple-600" />,
      title: "Tidak Ada Insentif untuk Aksi Hijau",
      description:
        "Warga tidak mendapat reward atau apresiasi nyata dari aksi hijau mereka, sehingga motivasi untuk konsisten berkurang.",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Users className="w-10 h-10 text-orange-600" />,
      title: "UMKM Hijau Sulit Menjangkau Konsumen",
      description:
        "UMKM yang menjual produk ramah lingkungan kesulitan menemukan target market yang peduli keberlanjutan.",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge
            variant="outline"
            className="mb-6 bg-green-50 text-green-700 border-green-200 px-4 py-2"
          >
            Mengapa Impact2Action?
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Masalah yang Kami Selesaikan
          </h2>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className={`border-none shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 ${problem.bgColor} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 hover:rotate-6 hover:scale-110`}
                >
                  {problem.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [isVisible, sectionRef] = useScrollAnimation();

  const features = [
    {
      icon: <Bot className="w-12 h-12 text-purple-600" />,
      title: "Verifikasi AI Otomatis",
      description:
        "Upload foto atau video aksi hijau Anda.  AI kami akan memverifikasi jenis sampah, tanaman, atau produk ramah lingkungan secara otomatis.",
      tags: [
        { label: "Computer Vision", variant: "secondary" },
        { label: "Real-time", variant: "secondary" },
      ],
      bgColor: "bg-purple-50",
    },
    {
      icon: <Target className="w-12 h-12 text-pink-600" />,
      title: "Sistem Poin & Reward",
      description:
        "Setiap aksi terverifikasi dikonversi menjadi poin.  Tukar poin dengan voucher UMKM hijau atau sumbangkan untuk impact kolektif.",
      tags: [
        { label: "Gamifikasi", variant: "secondary" },
        { label: "Voucher", variant: "secondary" },
      ],
      bgColor: "bg-pink-50",
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-green-600" />,
      title: "Dashboard Impact",
      description:
        "Lihat dampak kolektif dari aksi hijau Anda dan komunitas.  Data real-time untuk kelurahan, bank sampah, dan UMKM.",
      tags: [
        { label: "Analytics", variant: "secondary" },
        { label: "Visualisasi", variant: "secondary" },
      ],
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge
            variant="outline"
            className="mb-6 bg-green-50 text-green-700 border-green-200 px-4 py-2"
          >
            Fitur Unggulan
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Teknologi AI untuk Aksi Hijau Anda
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Platform berbasis AI yang memverifikasi, merekam, dan memberikan
            reward untuk setiap aksi keberlanjutan Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border-none shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 hover:rotate-12 hover:scale-110`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant={tag.variant}
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const [isVisible, sectionRef] = useScrollAnimation();
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setLineProgress(100);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const steps = [
    {
      number: "01",
      icon: <Camera className="w-16 h-16 text-gray-700" />,
      title: "Lakukan Aksi Hijau",
      description:
        "Pilah sampah, tanam pohon, atau gunakan produk ramah lingkungan. Upload foto/video aksi Anda ke platform.",
    },
    {
      number: "02",
      icon: <Bot className="w-16 h-16 text-pink-600" />,
      title: "AI Verifikasi Otomatis",
      description:
        "Teknologi AI Computer Vision mengklasifikasi jenis sampah, tanaman, atau produk hijau dengan skor akurasi tinggi.",
    },
    {
      number: "03",
      icon: <Coins className="w-16 h-16 text-yellow-600" />,
      title: "Dapatkan Poin",
      description:
        "Aksi terverifikasi dikonversi menjadi poin.  Semakin tinggi skor AI, semakin besar poin yang Anda dapat.",
    },
    {
      number: "04",
      icon: <Gift className="w-16 h-16 text-red-600" />,
      title: "Tukar Reward",
      description:
        "Gunakan poin untuk voucher UMKM hijau atau sumbangkan untuk impact komunitas seperti penanaman pohon kolektif.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge
            variant="outline"
            className="mb-6 bg-green-50 text-green-700 border-green-200 px-4 py-2"
          >
            Cara Kerja
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Mudah, Cepat, dan Terverifikasi
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting Lines with animation */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="hidden md:block absolute top-8 h-0.5 bg-gray-200"
                style={{
                  left: `calc(${i * 25 + 12.5}% + 1. 5rem)`,
                  width: "calc(25% - 3rem)",
                }}
              >
                <div
                  className="h-full bg-teal-400 transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? `${lineProgress}%` : "0%",
                    transitionDelay: `${i * 300}ms`,
                  }}
                />
              </div>
            ))}

            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center transition-all duration-700  ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step Number Circle */}
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md relative z-10 hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                </div>

                {/* Card */}
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gray-50 w-full hover:-translate-y-2">
                  <CardContent className="p-6 text-center flex flex-col items-center h-full">
                    <div className="flex justify-center mb-4 mt-2 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAAndFooter() {
  const [isVisible, sectionRef] = useScrollAnimation();

  return (
    <>
      {/* CTA Section */}
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

            {/* CTA Buttons */}
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

            {/* Features List */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
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

            {/* Platform Links */}
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

            {/* Resources Links */}
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

            {/* Company Links */}
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

          {/* Bottom Bar */}
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
