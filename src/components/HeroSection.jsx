import { Sparkles, ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountsUp";
import { Badge } from "./ui/badge";

const HeroSection = () => {
  const [isVisible, heroRef] = useScrollAnimation();
  const [statsCount1, countRef1] = useCountUp(15847, 2000);
  const [statsCount2, countRef2] = useCountUp(2341, 2000);
  const [statsCount3, countRef3] = useCountUp(8, 1000, 0);

  return (
    <div className="w-full px-4 py-8 md:py-12 h-full bg-white">
      {/* Header */}
      <div
        ref={heroRef}
        className={`flex justify-between items-center mb-5 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Badge
          variant="outline"
          className="border-green-200 bg-green-50 text-green-700 px-4 py-2 text-sm"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Sustainability Platform
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div className="space-y-8">
          <div
            className={`transition-all duration-500 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Sense Every Action,
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">
              Reward Every Impact
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Ubah setiap aksi hijau Anda menjadi data dampak nyata. Pilah
              sampah, tanam pohon, konsumsi produk ramah lingkungan—semua
              terverifikasi AI dan mendapat reward!
            </p>
          </div>

          {/* Stats with counter animation */}
          <div
            className={`grid grid-cols-3 gap-4 md:gap-8 transition-all duration-500 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div
              ref={countRef1}
              className="border-r border-slate-200 pr-4 md:pr-8"
            >
              <div className="text-2xl md:text-4xl font-bold text-green-600 mb-2">
                {statsCount1.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-slate-500">Aksi Hijau</div>
            </div>
            <div
              ref={countRef2}
              className="border-r border-slate-200 pr-4 md:pr-8"
            >
              <div className="text-2xl md:text-4xl font-bold text-green-600 mb-2">
                {statsCount2.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-slate-500">Pengguna Aktif</div>
            </div>
            <div ref={countRef3}>
              <div className="text-2xl md:text-4xl font-bold text-green-600 mb-2">
                {Number(statsCount3).toFixed(1)} Ton
              </div>
              <div className="text-xs md:text-sm text-slate-500">Sampah Terpilah</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg transition-colors duration-200">
              Mulai Aksi Hijau
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="px-6 py-6 text-lg border-slate-200 hover:bg-slate-50 transition-colors duration-200"
            >
              <Play className="w-5 h-5 mr-2" />
              Lihat Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
