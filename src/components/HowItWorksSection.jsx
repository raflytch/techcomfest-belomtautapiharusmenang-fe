"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { steps } from "@/lib/constanst";

export default function HowItWorksSection() {
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
    <section ref={sectionRef} className="py-20">
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
                  left: `calc(${i * 25 + 12.5}% + 1.5rem)`,
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
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md relative z-10 hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                </div>

                <Card className="border-2 hover:shadow-lg transition-all duration-300 bg-gray-50 w-full hover:-translate-y-2">
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
