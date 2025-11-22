import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqSchema } from '@/lib/schema-org';
import { SectionHeader, TechCard } from '@/components/ui/industrial-ui';
import { Terminal } from 'lucide-react';

const faqs = [
  {
    question: 'Qual a diferença entre Landing Page e Site Profissional?',
    answer: 'Uma Landing Page é focada em uma única ação (captar leads, vender produto específico) com design persuasivo e conversão otimizada. Já o Site Profissional é institucional, com múltiplas páginas para apresentar sua empresa, serviços, portfolio e história completa da marca.',
  },
  {
    question: 'Como funciona o SEO com IA que vocês oferecem?',
    answer: 'Utilizamos inteligência artificial para análise técnica completa do seu site, pesquisa de palavras-chave long-tail, otimização de conteúdo semântico e Core Web Vitals. A IA identifica oportunidades que ferramentas convencionais não detectam, garantindo melhores posições no Google de forma mais rápida e sustentável.',
  },
  {
    question: 'Quais tarefas podem ser automatizadas com Agentes de IA?',
    answer: 'Desenvolvemos agentes que automatizam processos repetitivos como: atualização de CRM, envio de emails personalizados, geração de relatórios, integração entre sistemas (ex: formulário → planilha → notificação), classificação de leads, extração de dados de documentos e muito mais. Cada agente é personalizado para suas necessidades específicas.',
  },
  {
    question: 'O chatbot com IA realmente entende as perguntas dos clientes?',
    answer: 'Sim! Nossos chatbots usam modelos de linguagem avançados (IA Generativa) que compreendem intenção e contexto. Eles são treinados com informações da sua empresa (FAQ, produtos, serviços) e conseguem responder de forma natural, qualificar leads automaticamente e até coletar dados estruturados para briefing.',
  },
  {
    question: 'Quanto tempo leva para desenvolver um projeto?',
    answer: 'Depende do escopo: Landing Pages simples levam 2-3 semanas, Sites Profissionais completos 4-6 semanas, implementação de SEO técnico 3-4 semanas, Chatbots 2-3 semanas e Agentes de Automação 3-8 semanas. Tudo é 100% personalizado e desenvolvido sob medida para seu negócio.',
  },
  {
    question: 'Vocês oferecem suporte após a entrega do projeto?',
    answer: 'Sim! Todos os projetos incluem período de garantia e ajustes pós-entrega. Também oferecemos planos de manutenção contínua, otimização de SEO mensal, monitoramento de performance e suporte técnico prioritário. Você nunca fica sozinho após o lançamento.',
  },
  {
    question: 'Preciso ter conhecimento técnico para usar as soluções?',
    answer: 'Não! Desenvolvemos tudo de forma intuitiva. Landing pages e sites vêm com painel de analytics fácil de entender, chatbots são configurados para funcionar de forma autônoma, e agentes de automação trabalham em background sem necessidade de intervenção. Fornecemos treinamento completo quando necessário.',
  },
  {
    question: 'Como funciona o processo de briefing e orçamento?',
    answer: 'Inicie uma conversa com nosso assistente virtual Nexus (botão de chat no canto da tela) ou entre em contato por email/WhatsApp. Coletamos informações sobre seu negócio e objetivos, geramos um protocolo e nossa equipe retorna em até 24h com proposta personalizada e prazo de entrega.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative w-full bg-black py-24 overflow-hidden border-t border-white/5">
      {/* FAQ Schema for rich snippets in Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <SectionHeader
          title="BASE DE CONHECIMENTO"
          subtitle="Respostas para suas dúvidas técnicas e comerciais."
          className="mb-16"
        />

        <div className="mx-auto max-w-4xl">
          <TechCard className="bg-black/50 backdrop-blur-md border-primary/20">
            <div className="flex items-center gap-2 p-4 border-b border-white/10 bg-white/5">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">user@njr-tech:~/faq$ cat questions.log</span>
            </div>

            <div className="p-6">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-white/5 rounded-lg bg-white/5 px-4 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/5 transition-all duration-300">
                    <AccordionTrigger className="text-left text-base font-mono hover:no-underline hover:text-primary py-4">
                      <span className="mr-2 text-primary/50">{`>`}</span> {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground font-sans leading-relaxed border-t border-white/5 pt-4 mt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TechCard>
        </div>
      </div>
    </section>
  );
}
