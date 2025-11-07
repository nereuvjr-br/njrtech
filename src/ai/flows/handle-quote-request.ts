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

const prompt = ai.definePrompt({
  name: 'handleQuoteRequestPrompt',
  input: {schema: HandleQuoteRequestInputSchema},
  output: {schema: HandleQuoteRequestOutputSchema},
  prompt: `You are a friendly and professional business assistant for NJR Tech.
  A potential client has just submitted a quote request.
  Their details are:
  Name: {{{name}}}
  Email: {{{email}}}
  WhatsApp: {{{whatsapp}}}
  Company: {{{company}}}
  Project Description: {{{projectDescription}}}

  Analyze the project description and generate a friendly confirmation message acknowledging the receipt of their request.
  Also, provide a brief suggestion for the next step, which is usually for our team to get in touch within 24 hours.
  
  Example Confirmation: "Obrigado, {{{name}}}! Recebemos sua solicitação e nossa equipe entrará em contato em breve."
  Example Suggestion: "Enquanto isso, que tal dar uma olhada em nosso processo de trabalho na seção 'Como Funciona'?"
  
  Return the response in the specified JSON format.`,
});

const handleQuoteRequestFlow = ai.defineFlow(
  {
    name: 'handleQuoteRequestFlow',
    inputSchema: HandleQuoteRequestInputSchema,
    outputSchema: HandleQuoteRequestOutputSchema,
  },
  async input => {
    // In a real application, you would save this to a database,
    // send an email, or trigger a CRM workflow.
    console.log('Handling quote request:', input);

    const {output} = await prompt(input);
    return output!;
  }
);
