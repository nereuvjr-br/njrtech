import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { WhatWeDo } from '@/components/landing/what-we-do';
import { WhyUs } from '@/components/landing/why-us';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Pricing } from '@/components/landing/pricing';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhatWeDo />
        <WhyUs />
        <HowItWorks />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
