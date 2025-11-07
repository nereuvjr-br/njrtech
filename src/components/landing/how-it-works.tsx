import { FileText, Laptop2, Rocket, Share2 } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: '1. Briefing Rápido',
    description: 'Entendemos suas metas e público em uma conversa rápida e objetiva.',
  },
  {
    icon: <Laptop2 className="h-8 w-8" />,
    title: '2. Criação da Página',
    description: 'Nossa IA e designers criam o layout perfeito para sua aprovação.',
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: '3. Integração com Canais',
    description: 'Conectamos sua página com suas ferramentas de marketing e vendas.',
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: '4. Lançamento',
    description: 'Com tudo pronto, você pode lançar suas campanhas e captar clientes.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-background py-16 sm:py-20 lg:py-24 fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nosso Processo</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Como funciona</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nosso processo é simples, rápido e transparente, do início ao fim.
            </p>
          </div>
        </div>
        <div className="mx-auto grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">
            {steps.map((step) => (
              <div key={step.title} className="flex flex-col items-center text-center gap-4">
                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
