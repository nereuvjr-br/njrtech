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

    console.log('Sending to webhook:', webhookUrl);
    console.log('Webhook payload:', JSON.stringify(input, null, 2));

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      
      if (!response.ok) {
        console.error('Webhook response not OK:', { status: response.status, statusText: response.statusText });
        const responseBody = await response.text();
        console.error('Webhook response body:', responseBody);
        throw new Error(`Webhook failed with status ${response.status}`);
      }

      console.log('Webhook sent successfully for:', input.name);
    } catch (error) {
      console.error('Failed to send webhook:', error);
      // Re-throw the error to let the calling flow know something went wrong.
      throw error;
    }
    
    // Return a static confirmation after webhook success.
    return {
      confirmationMessage: `Request for ${input.name} received and sent to webhook.`,
      followUpSuggestion: 'Follow-up via email.',
    };
  }
);