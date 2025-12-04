"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { problems2 } from "@/lib/constanst";

export default function ProblemsSection({ id }) {
  const [isVisible, sectionRef] = useScrollAnimation();

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
            Mengapa Sirkula?
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Masalah yang Kami Selesaikan
          </h2>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {problems2.map((problem, index) => (
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
                  {React.isValidElement(problem.icon)
                    ? React.cloneElement(problem.icon, {
                        className: "w-6 h-6 text-slate-600",
                      })
                    : problem.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
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
