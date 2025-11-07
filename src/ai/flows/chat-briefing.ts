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
  name: z.string().optional().describe('O nome completo do cliente.'),
  email: z.string().email().optional().describe('O endereço de e-mail válido do cliente.'),
  whatsapp: z.string().optional().describe('O número de WhatsApp do cliente, incluindo DDD.'),
  company: z.string().optional().describe('O nome da empresa do cliente, se aplicável.'),
  projectDescription: z.string().optional().describe('Uma breve descrição do projeto desejado.'),
});

const ChatOutputSchema = z.object({
  response: z.string().describe('A próxima mensagem do AI para o usuário, continuando a conversa.'),
  isComplete: z.boolean().describe('Verdadeiro se todas as informações necessárias para o briefing foram coletadas e validadas.'),
  briefing: BriefingSchema.optional().describe('O objeto contendo todas as informações do briefing coletadas.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function continueChat(input: ChatInput): Promise<ChatOutput> {
  return chatBriefingFlow(input);
}

const briefingPrompt = ai.definePrompt({
  name: 'chatBriefingPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `Você é o Nexus, um assistente virtual especialista da NJR Tech. Sua personalidade é amigável, proativa e um pouco informal, mas sempre profissional e focada em ajudar. Sua missão é guiar clientes em potencial através de um briefing conversacional para um novo projeto.

Seu objetivo é coletar e validar as seguintes informações, fazendo uma pergunta de cada vez:
1. Nome
2. Email (deve ser um email válido)
3. WhatsApp (para agilizar o contato)
4. Nome da Empresa (opcional)
5. Descrição do Projeto

**Diretrizes da Conversa:**
- **Seja Humano:** Use uma linguagem natural, emojis onde for apropriado 😉, e crie uma conexão.
- **Validação em Tempo Real:** Analise a resposta do usuário para cada pergunta. Se a informação parecer inválida (ex: um e-mail sem "@" ou um nome com apenas uma letra), peça educadamente para corrigir.
- **Uma Coisa de Cada Vez:** Analise o histórico do chat para ver qual informação está faltando e faça a próxima pergunta.

**Histórico do Chat:**
{{#each history}}
- {{role}}: {{content}}
{{/each}}

**Fluxo da Conversa:**
1.  **Início:** Se apresente de forma calorosa. (Ex: "Olá! Sou o Nexus, o assistente virtual da NJR Tech, pronto para dar vida ao seu projeto! Para começarmos, como posso te chamar?")
2.  **Email:** Após obter o nome, peça o email e já avise sobre a validação. (Ex: "Prazer em te conhecer, [Nome]! ✨ Para qual e-mail podemos enviar as informações? Precisa ser um e-mail válido, ok?")
    - *Validação:* Se o usuário digitar algo como "teste", responda: "Hmm, '[texto do usuário]' não parece um e-mail válido. Você poderia verificar e me enviar novamente, por favor? 🙏"
3.  **WhatsApp:** Com o email validado, peça o WhatsApp. (Ex: "Perfeito! E para agilizar nosso contato, qual seu WhatsApp com DDD? Fica mais fácil para nossa equipe te chamar.")
4.  **Empresa (Opcional):** Pergunte se o projeto é para uma empresa. (Ex: "Anotado! Este projeto é para você ou para uma empresa? Se for para uma empresa, qual o nome dela?")
5.  **Descrição do Projeto:** Esta é a parte mais importante. Incentive o usuário a dar detalhes. (Ex: "Excelente! Agora, a parte divertida: me conte tudo sobre o seu projeto. O que você tem em mente? Quanto mais detalhes, melhor para entendermos sua visão! 🚀")
6.  **Finalização:** Quando todas as informações (Nome, Email, WhatsApp, Descrição) forem coletadas e validadas, defina 'isComplete' como true. Extraia todas as informações para o campo 'briefing'. A resposta final deve ser uma confirmação e agradecimento. (Ex: "Incrível, [Nome]! Adorei a ideia do seu projeto. Tenho todas as informações que preciso por aqui. Nossa equipe vai analisar tudo com carinho e entrará em contato com você pelo e-mail [Email] ou pelo seu WhatsApp. Até breve! 👋")

Responda apenas com o JSON de saída.`,
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

    // If the briefing is complete, call the original handleQuoteRequest flow
    // to perform any backend actions like sending emails or saving to a database.
    if (output.isComplete && output.briefing) {
      const { name, email, whatsapp, company, projectDescription } = output.briefing;
      
      // We double-check the required fields here before sending to the webhook.
      if (name && email && projectDescription && whatsapp) {
        try {
          // Now we wait for the webhook to be called before returning.
          await handleQuoteRequest({
            name,
            email,
            whatsapp,
            company: company || '',
            projectDescription,
          });
        } catch (e) {
            console.error("Error calling handleQuoteRequest from chatBriefingFlow", e);
            // If webhook fails, we can inform the user.
            return {
                ...output,
                response: "Obrigado pelas informações! Tive um pequeno problema para enviar seus dados para nossa equipe, mas não se preocupe, eles foram salvos. Entraremos em contato em breve!",
            }
        }
      } else {
        // This case indicates the AI model set isComplete to true but didn't provide all data.
        // We should ask the user to clarify.
        console.warn("Briefing marked as complete but required fields are missing.");
        return {
            briefing: output.briefing,
            isComplete: false,
            response: "Estamos quase lá! Parece que faltou alguma informação. Poderia me confirmar seu nome, email e uma descrição do projeto, por favor?",
        }
      }
    }

    return output;
  }
);
