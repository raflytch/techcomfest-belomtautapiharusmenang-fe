"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { problems2 } from "@/lib/constanst";

export default function ProblemsSection({ id }) {
  const [isVisible, sectionRef] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-20" id={id}>
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
          {problems2.map((problem, index) => (
            <Card
              key={index}
              className={`border-2 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
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
