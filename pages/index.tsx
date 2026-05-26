import React from 'react';
import { Navigation } from '@/app/components/Navigation';
import { HeroSection } from '@/app/components/HeroSection';
import { HowItWorks } from '@/app/components/HowItWorks';
import { FeaturesSection } from '@/app/components/FeaturesSection';
import { TemplatesShowcase } from '@/app/components/TemplatesShowcase';
import { TestimonialsSection } from '@/app/components/TestimonialsSection';
import { PricingSection } from '@/app/components/PricingSection';
import { Footer } from '@/app/components/Footer';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>OneAtlas — Build AI-Powered Apps in Minutes</title>
        <meta name="description" content="Turn your ideas into production-ready apps in minutes. OneAtlas uses frontier AI models to generate full-stack applications from a simple description." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div className="w-full bg-dark-400 min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <HowItWorks />
          <FeaturesSection />
          <TemplatesShowcase />
          <TestimonialsSection />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
