import { Header } from '@/components/landing/header';
import { HeroPersonalized } from '@/components/landing/hero-personalized';
import { WhatWeDo } from '@/components/landing/what-we-do';
import { WhyUs } from '@/components/landing/why-us';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { ChatWidget } from '@/components/landing/chat-widget';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero com UTM Tracking Personalizado */}
        <HeroPersonalized showBadge={true} />
        
        <WhatWeDo />
        <WhyUs />
        <HowItWorks />

        {/* FAQ Original */}
        <Faq />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
