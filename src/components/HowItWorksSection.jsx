"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { steps } from "@/lib/constanst";

export default function HowItWorksSection({ id }) {
  const [isVisible, sectionRef] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24" id={id}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Badge
            variant="outline"
            className="mb-4 border-neutral-200 text-neutral-600 bg-white px-3 py-1"
          >
            Cara Kerja
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-emerald-600 via-emerald-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            Mudah, Cepat, dan Terverifikasi
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Empat langkah sederhana untuk berkontribusi pada lingkungan
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Connecting Line - Desktop only */}
            <div className="hidden lg:block absolute top-6 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-neutral-200 z-0" />

            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Step Number */}
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-neutral-200 text-neutral-900 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold relative z-10 shadow-sm">
                    {step.number}
                  </div>
                </div>

                {/* Step Card */}
                <Card className="relative border border-neutral-200 bg-white h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <BorderBeam
                    size={80}
                    duration={7}
                    delay={index * 1.5}
                    colorFrom="#3b82f6"
                    colorTo="#60a5fa"
                  />
                  <CardContent className="p-4 md:p-5 text-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      {React.cloneElement(step.icon, {
                        className: "w-6 h-6 md:w-7 md:h-7 text-blue-600",
                      })}
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
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
