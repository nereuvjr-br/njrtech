'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing landing page SEO using AI.
 *
 * - `optimizeLandingPageSEO` - A function that takes landing page content as input and returns SEO-optimized content.
 * - `OptimizeLandingPageSEOInput` - The input type for the `optimizeLandingPageSEO` function.
 * - `OptimizeLandingPageSEOOutput` - The output type for the `optimizeLandingPageSEO` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeLandingPageSEOInputSchema = z.object({
  landingPageContent: z
    .string()
    .describe('The current HTML content of the landing page.'),
  targetKeywords: z
    .string()
    .optional()
    .describe('Optional. Comma separated list of target keywords for SEO optimization.'),
});
export type OptimizeLandingPageSEOInput = z.infer<typeof OptimizeLandingPageSEOInputSchema>;

const OptimizeLandingPageSEOOutputSchema = z.object({
  optimizedLandingPageContent: z
    .string()
    .describe('The SEO-optimized HTML content of the landing page.'),
  keywordSuggestions: z
    .string()
    .optional()
    .describe('Optional. Suggested keywords for improving SEO.'),
});
export type OptimizeLandingPageSEOOutput = z.infer<typeof OptimizeLandingPageSEOOutputSchema>;

export async function optimizeLandingPageSEO(input: OptimizeLandingPageSEOInput): Promise<OptimizeLandingPageSEOOutput> {
  return optimizeLandingPageSEOFlow(input);
}

const optimizeLandingPageSEOPrompt = ai.definePrompt({
  name: 'optimizeLandingPageSEOPrompt',
  input: {schema: OptimizeLandingPageSEOInputSchema},
  output: {schema: OptimizeLandingPageSEOOutputSchema},
  prompt: `You are an expert SEO specialist. Your task is to optimize the provided landing page content for better search engine ranking.

  Here is the landing page content: {{{landingPageContent}}}
  {% if targetKeywords %}Optimize for the following keywords: {{{targetKeywords}}}{% endif %}

  Optimize the landing page by:
  - Improving keyword density in a natural way.
  - Adding relevant keywords to title and meta descriptions.
  - Improving header tags.
  - Adding alt text to images.
  - Optimizing internal and external links.
  - Suggesting related keywords.

  Return the optimized landing page content and a list of keyword suggestions.
  Follow the schema provided. Ensure to return valid HTML.
  `,
});

const optimizeLandingPageSEOFlow = ai.defineFlow(
  {
    name: 'optimizeLandingPageSEOFlow',
    inputSchema: OptimizeLandingPageSEOInputSchema,
    outputSchema: OptimizeLandingPageSEOOutputSchema,
  },
  async input => {
    const {output} = await optimizeLandingPageSEOPrompt(input);
    return output!;
  }
);
