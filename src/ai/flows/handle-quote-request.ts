'use server';
/**
 * @fileOverview This file defines a Genkit flow for handling a quote request from the landing page.
 *
 * - handleQuoteRequest - A function that processes the user's briefing and returns a confirmation.
 * - HandleQuoteRequestInput - The input type for the handleQuoteRequest function.
 * - HandleQuoteRequestOutput - The return type for the handleQuoteRequest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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
    // Validate input with Zod.
    HandleQuoteRequestInputSchema.parse(input);

    const notionApiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID || '2b3b08f6-2311-8087-9a0c-dda4edd13832';

    if (!notionApiKey) {
      console.error('NOTION_API_KEY is not defined');
      throw new Error('Configuration error: Notion API Key missing.');
    }

    const { Client } = await import('@notionhq/client');
    const notion = new Client({ auth: notionApiKey });

    try {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          // Title property
          'Nome': {
            title: [
              {
                text: {
                  content: `${input.protocol || 'SEM-PROTOCOLO'} - ${input.name}`,
                },
              },
            ],
          },
          // Email (note the hyphen!)
          'E-mail': {
            email: input.email,
          },
          // WhatsApp (Phone Number)
          'WhatsApp': {
            phone_number: input.whatsapp || '',
          },
          // Company (Rich Text)
          'Empresa': {
            rich_text: [
              {
                text: {
                  content: input.company || 'Não informada',
                },
              },
            ],
          },
          // Protocol (Rich Text)
          'Protocolo': {
            rich_text: [
              {
                text: {
                  content: input.protocol || '',
                },
              },
            ],
          },
          // Project Description (Rich Text)
          'Descrição do Projeto': {
            rich_text: [
              {
                text: {
                  content: input.projectDescription,
                },
              },
            ],
          },
          // Date
          'Data de Recebimento': {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      });

      console.log('Lead salvo no Notion com sucesso:', input.name);

    } catch (error) {
      console.error('Falha ao salvar no Notion:', error);
      throw error;
    }

    return {
      confirmationMessage: `Recebemos sua solicitação, ${input.name}, e já enviamos para nossa equipe.`,
      followUpSuggestion: 'Entraremos em contato em breve por e-mail.',
    };
  }
);
