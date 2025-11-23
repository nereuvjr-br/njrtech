import { Bot, BrainCircuit, FileCode2, MonitorSmartphone } from 'lucide-react';
import { TechCard, GlitchText, SectionHeader } from '@/components/ui/industrial-ui';
import Link from 'next/link';

const services = [
  {
    icon: <FileCode2 className="h-8 w-8 text-primary" />,
    title: 'SITES QUE VENDEM',
    description: 'Não basta ser bonito. Criamos sites rápidos e otimizados para transformar visitantes em clientes reais.',
    href: '/servicos/site-profissional',
    code: 'MODULE_WEB_01'
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'APAREÇA NO GOOGLE',
    description: 'Seu cliente está procurando por você agora. Usamos IA para colocar sua empresa no topo das buscas locais.',
    href: '/servicos/seo-ia',
    code: 'MODULE_SEO_02'
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'ATENDIMENTO AUTOMÁTICO',
    description: 'Nunca mais perca uma venda por demora no WhatsApp. Nossos robôs atendem seus clientes 24h por dia.',
    href: '/servicos/chatbot-ia',
    code: 'MODULE_BOT_03'
  },
  {
    icon: <MonitorSmartphone className="h-8 w-8 text-primary" />,
    title: 'LANDING PAGES DE OFERTA',
    description: 'Páginas específicas para suas promoções. Ideal para tráfego pago e campanhas de vendas rápidas.',
    href: '/servicos/landing-page',
    code: 'MODULE_LP_04'
  },
];

export function WhatWeDo() {
  return (
    <section id="services" className="relative w-full bg-black py-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

      <div className="container relative z-10 px-4 md:px-6">
        <SectionHeader
          title="NOSSAS CAPACIDADES"
          subtitle="Soluções de alta performance para dominar o mercado digital."
          className="mb-16"
        />

        <div className="mx-auto grid max-w-6xl items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group h-full">
              <TechCard className="h-full flex flex-col items-center text-center p-6 hover:bg-white/5 transition-colors duration-300 group-hover:border-primary/50">
                <div className="mb-6 p-4 rounded-full bg-primary/5 border border-primary/20 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>

                <div className="mb-2 font-mono text-xs text-primary/60 tracking-widest">{service.code}</div>

                <h3 className="mb-3 text-xl font-bold font-headline tracking-tight text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </TechCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
