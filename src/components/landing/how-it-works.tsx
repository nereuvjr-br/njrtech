import { FileText, Laptop2, Rocket, Share2 } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Briefing Rápido',
    description: 'Entendemos suas metas e público em uma conversa rápida e objetiva.',
  },
  {
    icon: <Laptop2 className="h-8 w-8" />,
    title: 'Criação da Página',
    description: 'Nossa IA e designers criam o layout perfeito para sua aprovação.',
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: 'Integração com Canais',
    description: 'Conectamos sua página com suas ferramentas de marketing e vendas.',
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: 'Você começa a anunciar',
    description: 'Com tudo pronto, você pode lançar suas campanhas e captar clientes.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-background py-16 sm:py-20 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Como funciona</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nosso processo é simples, rápido e transparente, do início ao fim.
            </p>
          </div>
        </div>
        <div className="relative mx-auto max-w-5xl py-12">
          <div className="absolute left-1/2 top-12 hidden h-[calc(100%-6rem)] w-0.5 -translate-x-1/2 bg-border md:block"></div>
          <div className="grid gap-12 md:grid-cols-1">
            {steps.map((step, index) => (
              <div key={index} className={`flex items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                <div className="relative flex h-full flex-1 flex-col items-center md:items-stretch">
                   <div className={`flex w-full items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse md:text-right' : 'md:text-left'}`}>
                    <div className="z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                         <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3 text-primary md:hidden">
                            {step.icon}
                          </div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </div>
                     <div className="hidden flex-shrink-0 rounded-lg bg-primary/10 p-4 text-primary md:flex">
                        {step.icon}
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
