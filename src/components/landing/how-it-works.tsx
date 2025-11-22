import { FileText, Laptop2, Rocket, Share2, ArrowRight } from 'lucide-react';
import { TechCard, SectionHeader } from '@/components/ui/industrial-ui';

const steps = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: '01. BRIEFING_DATA',
    description: 'Coleta de dados e análise de requisitos do sistema.',
  },
  {
    icon: <Laptop2 className="h-6 w-6" />,
    title: '02. DEVELOPMENT',
    description: 'Construção da arquitetura e interface com IA.',
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: '03. INTEGRATION',
    description: 'Conexão com APIs e ferramentas de marketing.',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: '04. DEPLOYMENT',
    description: 'Lançamento oficial e monitoramento de performance.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full bg-black py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)]" />

      <div className="container relative z-10 px-4 md:px-6">
        <SectionHeader
          title="PROTOCOLO DE EXECUÇÃO"
          subtitle="Metodologia ágil para resultados consistentes."
          className="mb-20"
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden md:block" />

          <div className="grid gap-8 md:grid-cols-4 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Node Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-primary rounded-full z-10 hidden md:block group-hover:scale-150 group-hover:bg-primary transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />

                <TechCard className="flex flex-col items-center text-center p-6 bg-black/80 backdrop-blur-sm border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 h-full z-20 relative">
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 text-primary group-hover:text-white group-hover:bg-primary transition-colors duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-sm font-mono font-bold text-primary mb-2 tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </TechCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
