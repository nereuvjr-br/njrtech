import { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { HeroPersonalized } from '@/components/landing/hero-personalized';
import { WhatWeDo } from '@/components/landing/what-we-do';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { ChatWidget } from '@/components/landing/chat-widget';

export const metadata: Metadata = {
  title: 'SEO Otimizado com Inteligência Artificial | NJR Tech',
  description: 'Rankear no Google com IA: análise técnica completa, otimização de conteúdo semântico, Core Web Vitals perfeitos e estratégia de palavras-chave long-tail.',
  keywords: ['SEO com IA', 'otimização SEO', 'SEO inteligente', 'ranking Google', 'palavras-chave long-tail', 'Core Web Vitals'],
  openGraph: {
    title: 'SEO Otimizado com IA | NJR Tech',
    description: 'Rankear no Google com análise de IA e otimização técnica completa.',
    type: 'website',
  },
};

export default function SEOIAService() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroPersonalized showBadge={true} forceVariant="seo" />
        <WhatWeDo />
        <Faq />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
