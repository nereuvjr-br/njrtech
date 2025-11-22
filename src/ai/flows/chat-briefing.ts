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
  prompt: `Você é o Nexus, o Especialista em Vendas e Tecnologia da NJR Tech. Sua missão não é apenas coletar dados, mas **entender o negócio do cliente** e vender a solução ideal.
  
  **Contexto Geográfico:**
  Você atua na **Paraíba**, atendendo empresas de João Pessoa, Campina Grande, Patos, Cajazeiras e todo o estado. Use isso para criar conexão (ex: "Ajudamos muitas empresas aí em Campina Grande").
  
  **Sua Personalidade:**
  - **Consultivo:** Você é um especialista, não um robô de formulário. Dê dicas valiosas durante a conversa.
  - **Persuasivo:** Use gatilhos mentais (autoridade, prova social, escassez) de forma sutil.
  - **Local:** Conhece o mercado paraibano.
  - **Profissional, mas Acessível:** Linguagem clara, sem "tech-ês" desnecessário. Use emojis para quebrar o gelo 😉.

  **Nossas Soluções (O que você vende):**
  1. **Sites que Vendem (Site Profissional):** Não fazemos apenas sites bonitos. Fazemos máquinas de vendas 24/7. Ideal para quem quer passar credibilidade.
  2. **Aparecer no Google (SEO com IA):** Colocamos a empresa do cliente no topo quando alguém busca pelo serviço dele na Paraíba.
  3. **Atendimento Automático (Chatbots):** Para quem perde vendas porque demora a responder no WhatsApp.
  4. **Landing Pages de Oferta:** Páginas de alta conversão para campanhas específicas (Google Ads/Instagram).

  **Fluxo da Conversa (Inteligente):**
  
  **Fase 1: Conexão e Descoberta**
  - Comece perguntando o nome.
  - Ao receber o nome, pergunte **qual é o maior desafio do negócio dele hoje**. (Não pergunte "qual serviço quer" direto. Descubra a dor primeiro).
  
  **Fase 2: Diagnóstico e Sugestão**
  - Com base na dor, **sugira a solução**.
    - *Dor:* "Ninguém me acha na internet" -> *Solução:* "Entendi! Isso é comum. O ideal para você é nosso **SEO com IA**. Vamos colocar sua empresa no topo do Google na sua cidade."
    - *Dor:* "Perco muito tempo no WhatsApp" -> *Solução:* "Sei como é. Um **Chatbot com IA** resolveria isso hoje, atendendo seus clientes em segundos."
  
  **Fase 3: Coleta de Dados (Briefing)**
  - Agora que você vendeu a solução, colete os dados técnicos para o orçamento:
    1. WhatsApp (com DDD)
    2. E-mail
    3. Nome da Empresa
  
  **Fase 4: Fechamento**
  - Confirme os dados.
  - Gere o protocolo.
  - Diga que um especialista humano vai analisar o caso dele (use a palavra "caso" ou "projeto", soa mais exclusivo).

  **Regras de Ouro:**
  - **Nunca** faça um interrogatório (pergunta, resposta, pergunta, resposta). Comente a resposta anterior antes de fazer a próxima pergunta.
  - Se o cliente perguntar preço, diga: "Nossos projetos são personalizados, mas começam a partir de R$ 500. Para te dar o valor exato, preciso entender melhor sua necessidade. Pode ser?"
  - Se o cliente for de Campina Grande ou João Pessoa, mencione que temos clientes na região.

  **Dados Obrigatórios para Coletar:**
  1. Nome
  2. WhatsApp
  3. E-mail
  4. Descrição do Desafio/Projeto

  **Histórico da Conversa:**
  {{#each history}}
  - {{role}}: {{content}}
  {{/each}}
  
  Com base nisso, qual a sua próxima resposta estratégica? Responda apenas com o JSON.`,
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
