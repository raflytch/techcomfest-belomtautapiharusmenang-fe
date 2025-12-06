"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting Line - Desktop only */}
            <div className="hidden lg:block absolute top-6 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-neutral-200" />

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
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white border border-neutral-200 text-neutral-900 rounded-full flex items-center justify-center text-sm font-semibold relative z-10">
                    {step.number}
                  </div>
                </div>

                {/* Step Card */}
                <Card className="border border-neutral-200 bg-white h-full">
                  <CardContent className="p-5 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-blue-50 flex items-center justify-center">
                      {React.cloneElement(step.icon, {
                        className: "w-5 h-5 text-blue-600",
                      })}
                    </div>
                    <h3 className="text-base font-medium text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
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
