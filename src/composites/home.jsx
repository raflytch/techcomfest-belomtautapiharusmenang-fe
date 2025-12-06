"use client";

import React from "react";
import ProblemsSection from "@/components/ProblemsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTAFooter from "@/components/CTAFooter";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import FAQ from "@/components/FAQ";

export default function HomeComposite() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutUsSection id="aboutUsSection" />
      <ProblemsSection id="problemsSection" />
      <HowItWorksSection id="howItWorksSection" />
      <FeaturesSection id="featuresSection" />
      <FAQ id="faqSection" />
      <CTAFooter />
    </div>
  );
}
