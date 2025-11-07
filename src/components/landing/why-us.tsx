import { BrainCircuit, GaugeCircle, Scaling, TrendingUp, Users } from 'lucide-react';

const benefits = [
  {
    icon: <GaugeCircle className="h-8 w-8" />,
    title: 'Performance',
    description: 'Sites ultra-rápidos que garantem a melhor experiência para o usuário.',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Conversão',
    description: 'Design e copywriting focados em transformar visitantes em leads qualificados.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: 'IA na Produção',
    description: 'Processos otimizados com IA para entregas mais rápidas e eficientes.',
  },
  {
    icon: <Scaling className="h-8 w-8" />,
    title: 'Escalabilidade',
    description: 'Soluções prontas para crescer junto com o seu negócio, sem limitações.',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Suporte Humano',
    description: 'Inteligência artificial na produção, mas suporte humanizado e dedicado a você.',
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="w-full bg-muted py-16 sm:py-20 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Por que escolher a NJR Tech?</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Combinamos o melhor da tecnologia e da expertise humana para entregar resultados excepcionais.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          {benefits.slice(0,3).map((benefit, index) => (
             <div key={index} className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
         <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 lg:px-20">
          {benefits.slice(3,5).map((benefit, index) => (
             <div key={index} className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
