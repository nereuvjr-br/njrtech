import { Bot, BrainCircuit, FileCode2, MonitorSmartphone, Cpu } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

const services = [
  {
    icon: <FileCode2 className="h-8 w-8 text-primary" />,
    title: 'Criação de Landing Page',
    description: 'Páginas focadas em conversão, projetadas para transformar visitantes em clientes.',
    href: '/servicos/landing-page',
  },
  {
    icon: <MonitorSmartphone className="h-8 w-8 text-primary" />,
    title: 'Criação de Site Profissional',
    description: 'Desenvolvemos sites institucionais modernos, responsivos e que refletem a identidade da sua marca.',
    href: '/servicos/site-profissional',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'SEO Otimizado com IA',
    description: 'Utilizamos IA para otimizar seu conteúdo e estrutura, garantindo as melhores posições no Google.',
    href: '/servicos/seo-ia',
  },
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: 'Criação de Agente de IA e Automação',
    description:
      'Desenvolvemos agentes inteligentes e fluxos de automação que executam tarefas repetitivas, integram sistemas e aumentam eficiência operacional.',
    href: '/servicos/automacao-ia',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Formulários e Chats com IA',
    description: 'Implementamos formulários inteligentes e chatbots para capturar leads e oferecer suporte 24/7.',
    href: '/servicos/chatbot-ia',
  },
];

export function WhatWeDo() {
  return (
    <section id="services" className="w-full bg-background py-16 sm:py-20 lg:py-24 fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nossos Serviços</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">O que fazemos</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Soluções completas para sua presença digital, impulsionadas por Inteligência Artificial.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group">
              <Card className="flex transform flex-col items-center justify-start p-6 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-transparent hover:border-primary/20 bg-muted/50 rounded-xl h-full">
                <CardHeader className="p-0 items-center">
                  {service.icon}
                  <CardTitle className="mt-4 text-lg group-hover:text-primary transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardDescription className="mt-2 text-sm">{service.description}</CardDescription>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
