import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqSchema } from '@/lib/schema-org';

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
    <section id="faq" className="w-full bg-background py-16 sm:py-20 lg:py-24 fade-in">
      {/* FAQ Schema for rich snippets in Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      
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
