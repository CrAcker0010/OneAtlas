import React from 'react';
import { Navigation } from '@/app/components/Navigation';
import { HeroSection } from '@/app/components/HeroSection';
import { HowItWorks } from '@/app/components/HowItWorks';
import { FeaturesSection } from '@/app/components/FeaturesSection';
import { TemplatesShowcase } from '@/app/components/TemplatesShowcase';
import { PricingSection } from '@/app/components/PricingSection';
import { Footer } from '@/app/components/Footer';

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