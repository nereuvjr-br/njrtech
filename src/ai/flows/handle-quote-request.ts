'use server';
/**
 * @fileOverview This file defines a Genkit flow for handling a quote request from the landing page.
 *
 * - handleQuoteRequest - A function that processes the user's briefing and returns a confirmation.
 * - HandleQuoteRequestInput - The input type for the handleQuoteRequest function.
 * - HandleQuoteRequestOutput - The return type for the handleQuoteRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HandleQuoteRequestInputSchema = z.object({
  name: z.string().describe('The name of the person requesting the quote.'),
  email: z.string().email().describe('The email of the person.'),
  whatsapp: z.string().optional().describe('The WhatsApp number of the person.'),
  company: z.string().optional().describe('The company name.'),
  projectDescription: z
    .string()
    .describe('A brief description of the project or the desired service.'),
  protocol: z.string().optional().describe('A unique protocol number for the request.'),
});
export type HandleQuoteRequestInput = z.infer<
  typeof HandleQuoteRequestInputSchema
>;

const HandleQuoteRequestOutputSchema = z.object({
  confirmationMessage: z
    .string()
    .describe('A confirmation message to be shown to the user.'),
  followUpSuggestion: z
    .string()
    .describe('A suggestion for the next step.'),
});
export type HandleQuoteRequestOutput = z.infer<
  typeof HandleQuoteRequestOutputSchema
>;

export async function handleQuoteRequest(
  input: HandleQuoteRequestInput
): Promise<HandleQuoteRequestOutput> {
  return handleQuoteRequestFlow(input);
}

const handleQuoteRequestFlow = ai.defineFlow(
  {
    name: 'handleQuoteRequestFlow',
    inputSchema: HandleQuoteRequestInputSchema,
    outputSchema: HandleQuoteRequestOutputSchema,
  },
  async input => {
    // Validate input with Zod. This will throw an error if the data is invalid.
    HandleQuoteRequestInputSchema.parse(input);
    
    const webhookUrl = 'https://n8n.nereujr.com.br/webhook/51b16be5-e345-4623-ba91-33dc2bcc5c20';

    const payload = {
      ...input,
      timestamp: new Date().toISOString(),
    };

    console.log('Enviando para o webhook:', webhookUrl);
    console.log('Payload do Webhook:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const responseBody = await response.text();
        console.error('Resposta do webhook não foi OK:', { status: response.status, statusText: response.statusText, body: responseBody });
        throw new Error(`Webhook falhou com status ${response.status}`);
      }

      console.log('Webhook enviado com sucesso para:', input.name);
    } catch (error) {
      console.error('Falha ao enviar webhook:', error);
      // Re-throw the error to let the calling flow know something went wrong.
      throw error;
    }
    
    // Return a static confirmation after webhook success.
    return {
      confirmationMessage: `Recebemos sua solicitação, ${input.name}, e já enviamos para nossa equipe.`,
      followUpSuggestion: 'Entraremos em contato em breve por e-mail.',
    };
  }
);
