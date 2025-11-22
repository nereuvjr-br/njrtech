import { BrainCircuit, GaugeCircle, Scaling, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { TechCard, SectionHeader } from '@/components/ui/industrial-ui';

const benefits = [
  {
    icon: <GaugeCircle className="h-6 w-6" />,
    title: 'PERFORMANCE_MAX',
    description: 'Sites ultra-rápidos otimizados para Core Web Vitals.',
    stat: '100/100'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'CONVERSÃO_ALTA',
    description: 'Design e copy focados em transformar visitantes em leads.',
    stat: '+40%'
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: 'IA_NATIVA',
    description: 'Processos otimizados com IA para entregas mais rápidas.',
    stat: 'AUTO'
  },
  {
    icon: <Scaling className="h-6 w-6" />,
    title: 'ESCALABILIDADE',
    description: 'Arquitetura pronta para crescer sem limitações.',
    stat: 'INF'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'SUPORTE_HUMANO',
    description: 'Tecnologia de ponta com atendimento dedicado.',
    stat: '24/7'
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'SEGURANÇA_TOTAL',
    description: 'Proteção avançada contra ataques e backups automáticos.',
    stat: 'SECURE'
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative w-full bg-black py-24 overflow-hidden border-t border-white/5">

      <div className="container relative z-10 px-4 md:px-6">
        <SectionHeader
          title="DIFERENCIAIS DO SISTEMA"
          subtitle="Por que a NJR Tech é a escolha lógica para seu crescimento."
          className="mb-16"
        />

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <TechCard key={index} className="group relative p-6 hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-primary/30">
              <div className="absolute top-4 right-4 font-mono text-xs text-primary/40 group-hover:text-primary transition-colors">
                [{benefit.stat}]
              </div>

              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                {benefit.icon}
              </div>

              <div>
                <h3 className="text-lg font-bold font-headline tracking-tight text-white mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </TechCard>
          ))}
        </div>
      </div>
    </section>
  );
}
