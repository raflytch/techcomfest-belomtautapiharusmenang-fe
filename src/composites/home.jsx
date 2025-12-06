"use client";

import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
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
      <BlurFade delay={0} inView>
        <HeroSection />
      </BlurFade>
      <BlurFade delay={0.15} inView>
        <AboutUsSection id="aboutUsSection" />
      </BlurFade>
      <BlurFade delay={0.2} inView>
        <ProblemsSection id="problemsSection" />
      </BlurFade>
      <BlurFade delay={0.25} inView>
        <HowItWorksSection id="howItWorksSection" />
      </BlurFade>
      <BlurFade delay={0.3} inView>
        <FeaturesSection id="featuresSection" />
      </BlurFade>
      <BlurFade delay={0.35} inView>
        <FAQ id="faqSection" />
      </BlurFade>
      <BlurFade delay={0.4} inView>
        <CTAFooter />
      </BlurFade>
    </div>
  );
}
