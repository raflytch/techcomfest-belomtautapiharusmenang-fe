"use client";

import React from "react";
import ProblemsSection from "@/components/ProblemsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTAFooter from "@/components/CTAFooter";
import HeroSection from "@/components/HeroSection";

export default function HomeComposite() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="border-t border-neutral-100">
        <ProblemsSection id="problemsSection" />
      </div>
      <div className="border-t border-neutral-100">
        <FeaturesSection id="featuresSection" />
      </div>
      <div className="border-t border-neutral-100">
        <HowItWorksSection id="howItWorksSection" />
      </div>
      <div className="border-t border-neutral-100">
        <CTAFooter />
      </div>
    </div>
  );
}
