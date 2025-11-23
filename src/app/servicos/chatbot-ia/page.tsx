import { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { HeroPersonalized } from '@/components/landing/hero-personalized';
import { WhatWeDo } from '@/components/landing/what-we-do';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { LeadFormModal } from '@/components/landing/lead-form-modal';

export const metadata: Metadata = {
  title: 'Chatbots com IA Generativa e Formulários Inteligentes | NJR Tech',
  description: 'Capte leads e atenda clientes 24/7 com chatbots inteligentes: respostas personalizadas, integração WhatsApp/Telegram e qualificação automática de leads.',
  keywords: ['chatbot IA', 'chatbot inteligente', 'formulário inteligente', 'atendimento 24/7', 'captura de leads', 'WhatsApp bot'],
  openGraph: {
    title: 'Chatbots com IA e Formulários Inteligentes | NJR Tech',
    description: 'Atendimento 24/7 com chatbots que captam e qualificam leads automaticamente.',
    type: 'website',
  },
};

export default function ChatbotIAService() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroPersonalized showBadge={true} forceVariant="chatbot" />
        <WhatWeDo />
        <Faq />
      </main>
      <Footer />
      <LeadFormModal />
    </div>
  );
}
