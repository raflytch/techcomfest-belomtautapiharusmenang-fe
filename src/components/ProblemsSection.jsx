"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { problems2 } from "@/lib/constanst";

export default function ProblemsSection({ id }) {
  const [isVisible, sectionRef] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-neutral-50" id={id}>
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
            Mengapa Sirkula?
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
            Masalah yang Kami Selesaikan
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Tantangan lingkungan yang dihadapi masyarakat Indonesia saat ini
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {problems2.map((problem, index) => (
            <Card
              key={index}
              className={`border border-neutral-200 bg-white hover:border-neutral-300 transition-all duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                  {React.cloneElement(problem.icon, {
                    className: "w-5 h-5 text-neutral-700",
                  })}
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
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
