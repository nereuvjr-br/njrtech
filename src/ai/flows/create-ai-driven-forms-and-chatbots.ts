// src/ai/flows/create-ai-driven-forms-and-chatbots.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow that creates AI-driven forms and chatbots for a landing page.
 *
 * - createAIDrivenFormsAndChatbots - A function that generates AI-driven forms and chatbots.
 * - CreateAIDrivenFormsAndChatbotsInput - The input type for the createAIDrivenFormsAndChatbots function.
 * - CreateAIDrivenFormsAndChatbotsOutput - The return type for the createAIDrivenFormsAndChatbots function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateAIDrivenFormsAndChatbotsInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('A detailed description of the business and its goals.'),
  targetAudience: z
    .string()
    .describe('Description of the target audience for the landing page.'),
  tone: z
    .string()
    .describe(
      'The desired tone and style for the forms and chatbot interactions (e.g., professional, friendly, humorous).'
    ),
});
export type CreateAIDrivenFormsAndChatbotsInput = z.infer<
  typeof CreateAIDrivenFormsAndChatbotsInputSchema
>;

const CreateAIDrivenFormsAndChatbotsOutputSchema = z.object({
  formCode: z
    .string()
    .describe(
      'The HTML code for the AI-driven form, designed to capture leads effectively.'
    ),
  chatbotCode: z
    .string()
    .describe(
      'The code for the AI-driven chatbot, ready to be integrated into the landing page for instant customer support.'
    ),
});
export type CreateAIDrivenFormsAndChatbotsOutput = z.infer<
  typeof CreateAIDrivenFormsAndChatbotsOutputSchema
>;

export async function createAIDrivenFormsAndChatbots(
  input: CreateAIDrivenFormsAndChatbotsInput
): Promise<CreateAIDrivenFormsAndChatbotsOutput> {
  return createAIDrivenFormsAndChatbotsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createAIDrivenFormsAndChatbotsPrompt',
  input: {schema: CreateAIDrivenFormsAndChatbotsInputSchema},
  output: {schema: CreateAIDrivenFormsAndChatbotsOutputSchema},
  prompt: `You are an expert in generating code for AI-driven forms and chatbots.

  Based on the business description, target audience, and desired tone, create the HTML code for a form and the code for a chatbot.

  Business Description: {{{businessDescription}}}
  Target Audience: {{{targetAudience}}}
  Tone: {{{tone}}}

  Form Code:
  <form>
  {{formCode}}
  </form>

  Chatbot Code:
  <div>
  {{chatbotCode}}
  </div>`,
});

const createAIDrivenFormsAndChatbotsFlow = ai.defineFlow(
  {
    name: 'createAIDrivenFormsAndChatbotsFlow',
    inputSchema: CreateAIDrivenFormsAndChatbotsInputSchema,
    outputSchema: CreateAIDrivenFormsAndChatbotsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
