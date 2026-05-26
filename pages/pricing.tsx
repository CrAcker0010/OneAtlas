import React from 'react';
import { Navigation } from '@/app/components/Navigation';
import { PricingSection } from '@/app/components/PricingSection';
import { Footer } from '@/app/components/Footer';
import Head from 'next/head';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing — OneAtlas</title>
        <meta name="description" content="Simple, transparent pricing. Start for free and scale as you grow." />
      </Head>
      <div className="w-full bg-dark-400 min-h-screen">
        <Navigation />
        <main className="pt-16">
          <PricingSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
