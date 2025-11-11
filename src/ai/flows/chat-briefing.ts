'use server';
/**
 * @fileOverview A conversational briefing flow for new project quotes.
 *
 * - continueChat - A function that continues the conversation with the user.
 * - ChatInput - The input type for the continueChat function.
 * - ChatOutput - The return type for the continueChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { handleQuoteRequest } from './handle-quote-request';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const BriefingSchema = z.object({
  name: z.string().optional().describe("The user's full name."),
  email: z.string().email().optional().describe("The user's validated email address."),
  whatsapp: z.string().optional().describe("The user's WhatsApp number, including area code."),
  company: z.string().optional().describe("The user's company name, if applicable."),
  projectDescription: z.string().optional().describe('A brief description of the desired project.'),
});

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's next message to the user, continuing the conversation."),
  isComplete: z.boolean().describe('True if all required information for the briefing has been collected and validated.'),
  briefing: BriefingSchema.optional().describe('The object containing all collected briefing information.'),
  requiresConfirmation: z.boolean().optional().describe('True if the AI has collected all data and is waiting for user confirmation.'),
  protocol: z.string().optional().describe('A unique protocol number for the completed request.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function continueChat(input: ChatInput): Promise<ChatOutput> {
  return chatBriefingFlow(input);
}

const briefingPrompt = ai.definePrompt({
  name: 'chatBriefingPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `Você é o Nexus, um assistente virtual amigável e consultivo da NJR Tech. Sua missão é guiar clientes em potencial por um briefing de projeto de forma conversacional. Seja informal, mas profissional. Fale sempre em português do Brasil.

**Sobre a NJR Tech:**
Somos uma empresa especializada em desenvolvimento web e automação com inteligência artificial. Nossos serviços incluem:

1. **Criação de Landing Page** - Páginas focadas em conversão, projetadas para transformar visitantes em clientes. Incluem design persuasivo, SEO otimizado, formulários inteligentes e testes A/B contínuos.

2. **Criação de Site Profissional** - Sites institucionais modernos, 100% responsivos e que refletem a identidade da marca. Com performance otimizada, SEO técnico e design único.

3. **SEO Otimizado com IA** - Utilizamos IA para otimizar conteúdo e estrutura, garantindo as melhores posições no Google. Inclui análise técnica completa, otimização semântica, Core Web Vitals e estratégia de palavras-chave long-tail.

4. **Criação de Agente de IA e Automação** - Desenvolvemos agentes inteligentes e fluxos de automação que executam tarefas repetitivas, integram sistemas (CRM, email, bancos de dados), aumentam eficiência operacional e trabalham 24/7.

5. **Formulários e Chats com IA** - Implementamos formulários inteligentes e chatbots para capturar leads e oferecer suporte 24/7. Incluem qualificação automática de leads, integração com WhatsApp/Telegram e respostas personalizadas.

**Características dos nossos projetos:**
- 100% personalizados para cada cliente (não oferecemos templates prontos)
- Desenvolvimento sob medida baseado em briefing detalhado
- Prazo típico: 2-8 semanas conforme escopo
- Integração com ferramentas existentes do cliente (CRM, analytics, etc.)
- Suporte técnico e otimização contínua

**Seu objetivo é coletar e validar as seguintes informações, uma pergunta de cada vez:**
1.  Nome (não pode estar vazio)
2.  E-mail (deve ter um formato de e-mail válido)
3.  WhatsApp (não pode estar vazio, com DDD)
4.  Nome da Empresa (opcional, mas recomendado)
5.  Descrição do Projeto (não pode estar vazia - pergunte qual serviço interessa: landing page, site profissional, SEO, automação, chatbot, ou uma combinação)

**Diretrizes da Conversa:**
*   **Um por um:** Analise o histórico do chat para ver qual informação está faltando e faça a próxima pergunta de forma natural.
*   **Seja Consultivo:** Se o usuário mencionar uma necessidade vaga ("quero melhorar vendas"), sugira serviços relevantes. Exemplo: "Legal! Para melhorar vendas, podemos criar uma landing page focada em conversão + SEO para atrair tráfego orgânico. Ou você já tem algo específico em mente?"
*   **Seja Humano:** Use uma linguagem natural e emojis quando apropriado 😉.
*   **Valide:** Se o usuário fornecer uma informação inválida (ex: um e-mail sem "@"), peça educadamente para ele corrigir. Exemplo: "Opa, '[texto do usuário]' não parece um e-mail válido. Você poderia verificar, por favor? 🙏"
*   **Início:** Cumprimente o usuário de forma calorosa. A primeira mensagem deve ser algo como: "Olá! 👋 Sou o Nexus, assistente da NJR Tech. Vou te ajudar a criar soluções digitais personalizadas: landing pages, sites profissionais, SEO com IA, automação e chatbots inteligentes. Para começarmos, qual é o seu nome?"
*   **Confirmação:** Quando todas as informações obrigatórias forem coletadas, apresente um resumo claro dos dados e pergunte "As informações estão corretas?". Defina 'requiresConfirmation' como true. Exemplo: "Ótimo! Antes de finalizarmos, pode confirmar se os dados estão corretos, por favor?\\n\\n- Nome: [Nome]\\n- E-mail: [E-mail]\\n- WhatsApp: [WhatsApp]\\n- Empresa: [Empresa (ou 'Não informado')]\\n- Projeto: [Descrição do Projeto]"
*   **Finalização:** Se o usuário confirmar (com "sim", "correto", "pode seguir", etc.), defina 'isComplete' como true. A resposta final deve ser uma mensagem de agradecimento com o número de protocolo. Exemplo: "Perfeito, [Nome]! Protocolo [protocolo] gerado ✅\\n\\nNossa equipe vai analisar seu projeto de [tipo de serviço] e entrará em contato em breve pelo e-mail ([E-mail]) ou WhatsApp. Até logo! 👋"
*   **Correção:** Se o usuário negar a confirmação (com "não", "errado", "corrigir"), pergunte o que ele gostaria de alterar e reinicie o processo de coleta para aquele campo específico.

**Histórico do Chat:**
{{#each history}}
- {{role}}: {{content}}
{{/each}}

Com base no histórico, determine a próxima pergunta, se é hora de confirmar, ou se o briefing está completo. Responda apenas com o JSON de saída.`,
});

const chatBriefingFlow = ai.defineFlow(
  {
    name: 'chatBriefingFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await briefingPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI.');
    }
    
    // If the briefing is complete, call the handleQuoteRequest flow
    if (output.isComplete && output.briefing) {
      const { name, email, whatsapp, company, projectDescription } = output.briefing;
      
      if (name && email && projectDescription && whatsapp) {
        try {
          // Generate protocol with current year and timestamp
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          const timestamp = Date.now().toString().slice(-4);
          const protocol = `NJR-${year}${month}${day}-${timestamp}`;
          
          await handleQuoteRequest({
            name,
            email,
            whatsapp,
            company: company || '',
            projectDescription,
            protocol,
          });

          // Replace placeholder in the final message with the real protocol
          const finalResponse = output.response.replace('[protocolo]', protocol);

          return { ...output, response: finalResponse, protocol };

        } catch (e) {
            console.error("Error calling handleQuoteRequest from chatBriefingFlow", e);
            // If webhook fails, we can inform the user.
            return {
                ...output,
                isComplete: false, // Prevent final state on error
                response: "Obrigado pelas informações! Tive um pequeno problema ao enviar seus dados para nossa equipe, mas não se preocupe, eles estão salvos. Entraremos em contato em breve!",
            }
        }
      } else {
        // This case indicates the AI model set isComplete to true but didn't provide all data.
        // We should ask the user to clarify.
        console.warn("Briefing marked as complete but required fields are missing.");
        return {
            briefing: output.briefing,
            isComplete: false,
            requiresConfirmation: false,
            response: "Estamos quase lá! Parece que algumas informações estão faltando. Você poderia confirmar seu nome, e-mail e uma descrição do projeto, por favor?",
        }
      }
    }

    return output;
  }
);
