import { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { HeroPersonalized } from '@/components/landing/hero-personalized';
import { WhatWeDo } from '@/components/landing/what-we-do';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { LeadFormModal } from '@/components/landing/lead-form-modal';

export const metadata: Metadata = {
  title: 'Criação de Site Profissional Moderno e Responsivo | NJR Tech',
  description: 'Desenvolvemos sites institucionais modernos, 100% responsivos que refletem a identidade da sua marca. Design único, performance otimizada e SEO técnico.',
  keywords: ['site profissional', 'criação de site', 'site institucional', 'site responsivo', 'desenvolvimento web'],
  openGraph: {
    title: 'Criação de Site Profissional | NJR Tech',
    description: 'Sites institucionais modernos e responsivos que refletem sua marca.',
    type: 'website',
  },
};

export default function SiteProfissionalService() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroPersonalized showBadge={true} forceVariant="site-profissional" />
        <WhatWeDo />
        <Faq />
      </main>
      <Footer />
      <LeadFormModal />
    </div>
  );
}
