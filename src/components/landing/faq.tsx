import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Quanto tempo leva para criar uma landing page?',
    answer: 'Nosso processo otimizado com IA permite entregar uma landing page de alta qualidade em até 7 dias úteis após o briefing, dependendo da complexidade.',
  },
  {
    question: 'Eu preciso ter um domínio e hospedagem?',
    answer: 'Não se preocupe com isso. Podemos cuidar de todo o processo de registro de domínio e configuração da hospedagem para você, como parte dos nossos planos.',
  },
  {
    question: 'As páginas são realmente otimizadas para o Google (SEO)?',
    answer: 'Sim. Usamos inteligência artificial para analisar palavras-chave e garantir que toda a estrutura da página (títulos, textos, imagens) seja otimizada para os mecanismos de busca desde o início.',
  },
  {
    question: 'O que acontece após a entrega do site?',
    answer: 'Você terá acesso a um painel para acompanhar as estatísticas. Oferecemos planos de manutenção e suporte contínuo para garantir que seu site esteja sempre atualizado e performando bem.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="w-full bg-background py-16 sm:py-20 lg:py-24 fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Dúvidas?</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Perguntas Frequentes</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tire suas dúvidas sobre nossos serviços.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="pt-2 text-base text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
