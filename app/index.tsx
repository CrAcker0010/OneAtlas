import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TemplatesShowcase } from '@/components/TemplatesShowcase';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full bg-dark-400 min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <TemplatesShowcase />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}