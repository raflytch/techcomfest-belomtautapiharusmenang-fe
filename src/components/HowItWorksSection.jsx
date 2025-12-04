"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { steps } from "@/lib/constanst";

export default function HowItWorksSection({ id }) {
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

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-slate-50" id={id}>
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
            Cara Kerja
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Mudah, Cepat, dan Terverifikasi
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting Lines with animation */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="hidden lg:block absolute top-8 h-px bg-slate-200"
                style={{
                  left: `calc(${i * 25 + 12.5}% + 1.5rem)`,
                  width: "calc(25% - 3rem)",
                }}
              >
                <div
                  className="h-full bg-slate-400 transition-all duration-1000 ease-out"
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
                className={`relative flex flex-col items-center transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 border-2 border-slate-300 text-slate-600 rounded-full flex items-center justify-center text-lg font-semibold relative z-10 bg-white">
                    {step.number}
                  </div>
                </div>

                <Card className="border border-slate-200 bg-white hover:border-slate-300 transition-colors duration-200 w-full">
                  <CardContent className="p-5 md:p-6 text-center flex flex-col items-center h-full">
                    <div className="flex justify-center mb-4 mt-2">
                      {React.isValidElement(step.icon)
                        ? React.cloneElement(step.icon, {
                            className: "w-10 h-10 md:w-12 md:h-12 text-slate-500",
                          })
                        : step.icon}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
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
