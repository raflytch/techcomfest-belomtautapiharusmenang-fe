"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { features } from "@/lib/constanst";

export default function FeaturesSection({ id }) {
  const [isVisible, sectionRef] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white" id={id}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge
            variant="outline"
            className="mb-6 text-green-700 border-green-200 px-4 py-2"
          >
            Fitur Unggulan
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Teknologi AI untuk Aksi Hijau Anda
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
            Platform berbasis AI yang memverifikasi, merekam, dan memberikan
            reward untuk setiap aksi keberlanjutan Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border border-slate-200 bg-white hover:border-slate-300 transition-colors duration-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center mb-6">
                  {React.isValidElement(feature.icon)
                    ? React.cloneElement(feature.icon, {
                        className: "w-6 h-6 text-slate-600",
                      })
                    : feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="border-slate-200 text-slate-600 text-xs"
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
