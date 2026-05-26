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
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,400&display=swap" rel="stylesheet" />
      </Head>
      <div className="w-full min-h-screen" style={{ background: '#F5F5EE' }}>
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
