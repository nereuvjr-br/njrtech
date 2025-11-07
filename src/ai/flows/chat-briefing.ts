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
  prompt: `Você é um assistente amigável e profissional da NJR Tech. Sua tarefa é conduzir um briefing rápido com um cliente em potencial através de um chat.

Faça uma pergunta de cada vez para coletar as seguintes informações:
1. Nome
2. Email
3. Nome da Empresa (opcional, pergunte se o projeto é para uma empresa)
4. Descrição do Projeto

Analise o histórico do chat para determinar qual informação está faltando e faça a próxima pergunta. Seja conversacional e amigável.

Histórico do Chat:
{{#each history}}
- {{role}}: {{content}}
{{/each}}

- Se o nome não foi fornecido, pergunte o nome.
- Se o nome foi fornecido mas o email não, peça o email.
- Se o email foi fornecido, pergunte se o projeto é para uma empresa. Se sim, peça o nome da empresa. Se não, pule para a descrição do projeto.
- Se as informações da empresa foram tratadas, peça uma descrição detalhada do projeto.
- Quando todas as informações (Nome, Email, Descrição do Projeto) forem coletadas, defina 'isComplete' como true.
- Ao definir 'isComplete' como true, extraia todas as informações coletadas para o campo 'briefing'.
- A resposta final ('response') quando 'isComplete' for true deve ser uma mensagem de agradecimento e confirmação, informando que a equipe entrará em contato em breve.

Exemplo de resposta final: "Muito obrigado, [Nome]! Recebemos suas informações. Nossa equipe analisará seu projeto e entrará em contato com você pelo email [Email] em breve. Tenha um ótimo dia!"

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
      const { name, email, company, projectDescription } = output.briefing;
      if (name && email && projectDescription) {
        // We don't need to wait for this to complete to give the user a response.
        handleQuoteRequest({
          name,
          email,
          company: company || '',
          projectDescription,
        });
      }
    }

    return output;
  }
);
