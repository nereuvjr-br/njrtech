import { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { HeroPersonalized } from '@/components/landing/hero-personalized';
import { WhatWeDo } from '@/components/landing/what-we-do';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { LeadFormModal } from '@/components/landing/lead-form-modal';

export const metadata: Metadata = {
  title: 'Criação de Landing Page de Alta Conversão | NJR Tech',
  description: 'Desenvolvemos landing pages focadas em conversão com design persuasivo, SEO otimizado, formulários inteligentes e testes A/B contínuos. Transforme visitantes em clientes.',
  keywords: ['landing page', 'criação de landing page', 'landing page conversão', 'design persuasivo', 'landing page otimizada'],
  openGraph: {
    title: 'Criação de Landing Page de Alta Conversão | NJR Tech',
    description: 'Landing pages que convertem: design persuasivo, SEO otimizado e testes A/B.',
    type: 'website',
  },
};

export default function LandingPageService() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero fixo para Landing Page */}
        <HeroPersonalized showBadge={true} forceVariant="landing-page" />

        {/* Seção de serviços relacionados */}
        <WhatWeDo />

        {/* FAQ */}
        <Faq />
      </main>
      <Footer />
      <LeadFormModal />
    </div>
  );
}
