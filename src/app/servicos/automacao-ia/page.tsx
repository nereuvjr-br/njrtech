import { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { HeroPersonalized } from '@/components/landing/hero-personalized';
import { WhatWeDo } from '@/components/landing/what-we-do';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { ChatWidget } from '@/components/landing/chat-widget';

export const metadata: Metadata = {
  title: 'Criação de Agente de IA e Automação de Processos | NJR Tech',
  description: 'Desenvolvemos agentes inteligentes e fluxos de automação que executam tarefas repetitivas, integram sistemas (CRM, email, DB) e aumentam eficiência operacional 24/7.',
  keywords: ['agente de IA', 'automação de processos', 'RPA', 'integração de sistemas', 'automação inteligente', 'workflows'],
  openGraph: {
    title: 'Agentes de IA e Automação | NJR Tech',
    description: 'Automação inteligente que executa tarefas repetitivas e integra sistemas.',
    type: 'website',
  },
};

export default function AutomacaoIAService() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroPersonalized showBadge={true} forceVariant="automation" />
        <WhatWeDo />
        <Faq />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
