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

const ChatOutputSchema = z.object({
  response: z.string().describe('The next message from the AI to the user.'),
  isComplete: z.boolean().describe('Whether the briefing is complete.'),
  briefing: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      whatsapp: z.string().optional(),
      company: z.string().optional(),
      projectDescription: z.string().optional(),
    }).optional(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function continueChat(input: ChatInput): Promise<ChatOutput> {
  return chatBriefingFlow(input);
}

const briefingPrompt = ai.definePrompt({
  name: 'chatBriefingPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `Você é um assistente virtual da NJR Tech, e seu nome é Nexus. Você é amigável, prestativo e um pouco informal, mas sempre profissional. Sua tarefa é conduzir um briefing rápido e agradável com um cliente em potencial através de um chat.

Faça uma pergunta de cada vez para coletar as seguintes informações, nesta ordem:
1. Nome
2. Email
3. WhatsApp (para agilizar o contato)
4. Nome da Empresa (opcional, pergunte se o projeto é para uma empresa)
5. Descrição do Projeto

Seja conversacional, use emojis quando apropriado 😉 e tente criar uma conexão com o usuário. Analise o histórico do chat para determinar qual informação está faltando e faça a próxima pergunta.

Histórico do Chat:
{{#each history}}
- {{role}}: {{content}}
{{/each}}

- Se o nome não foi fornecido, comece se apresentando e pergunte o nome da pessoa. (Ex: "Olá! Eu sou o Nexus, o assistente virtual da NJR Tech. Para começarmos, como posso te chamar?")
- Se o nome foi fornecido mas o email não, agradeça e peça o email. (Ex: "Prazer em te conhecer, [Nome]! ✨ Para qual email podemos enviar o orçamento?")
- Se o email foi fornecido, peça o WhatsApp. (Ex: "Anotado! E para agilizar nosso contato, qual seu WhatsApp com DDD? Assim podemos te chamar por lá.")
- Se o WhatsApp foi fornecido, pergunte sobre a empresa. (Ex: "Legal! Esse projeto é para você ou para uma empresa? Se for para uma empresa, qual o nome dela?")
- Se a informação da empresa foi tratada, peça uma descrição do projeto. Incentive detalhes. (Ex: "Perfeito! Agora me conta um pouco mais sobre o seu projeto. O que você tem em mente? Quanto mais detalhes, melhor! 🚀")
- Quando todas as informações (Nome, Email, WhatsApp, Descrição do Projeto) forem coletadas, defina 'isComplete' como true.
- Ao definir 'isComplete' como true, extraia todas as informações coletadas para o campo 'briefing'.
- A resposta final ('response') quando 'isComplete' for true deve ser uma mensagem de agradecimento calorosa e uma confirmação. (Ex: "Incrível, [Nome]! Muito obrigado pelas informações. Já anotei tudo aqui! Nossa equipe vai analisar seu projeto com carinho e entraremos em contato com você pelo email [Email] ou WhatsApp em breve. Tenha um ótimo dia! 👋")

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
      if (name && email && projectDescription && whatsapp) {
        // We don't need to wait for this to complete to give the user a response.
        handleQuoteRequest({
          name,
          email,
          whatsapp,
          company: company || '',
          projectDescription,
        });
      }
    }

    return output;
  }
);
