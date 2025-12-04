"use client";

import React from "react";
import ProblemsSection from "@/components/ProblemsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTAFooter from "@/components/CTAFooter";
import HeroSection from "@/components/HeroSection";

export default function HomeComposite() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemsSection id="problemsSection" />
      <FeaturesSection id="featuresSection" />
      <HowItWorksSection id="howItWorksSection" />
      <CTAFooter />
    </div>
  );
}
