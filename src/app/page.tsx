import { Header } from '@/components/landing/header';
// import { HeroPersonalized } from '@/components/landing/hero-personalized';
import { HeroIndustrial } from '@/components/landing/hero-industrial';
import { WhatWeDoEnhanced } from '@/components/landing/what-we-do-enhanced';
import { WhyUs } from '@/components/landing/why-us';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { LeadFormModal } from '@/components/landing/lead-form-modal';
import { WhatsappFloat } from '@/components/landing/whatsapp-float';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative selection:bg-primary selection:text-black">
      <div className="scanline-overlay" />
      <Header />
      <main className="flex-1">
        {/* Hero Industrial Grade 10 */}
        <HeroIndustrial />

        <WhatWeDoEnhanced />
        <WhyUs />
        <HowItWorks />

        {/* FAQ Original */}
        <Faq />
      </main>
      <Footer />
      <LeadFormModal />
      <WhatsappFloat />
    </div>
  );
}
