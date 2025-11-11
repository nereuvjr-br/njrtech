import { defineFlow, defineTool } from '@genkit-ai/flow';
import { generate } from '@genkit-ai/ai';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

export interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  searchVolume: 'baixo' | 'm�dio' | 'alto';
  difficulty: 'baixo' | 'm�dio' | 'alto';
  category: string;
  internalLinks: string[];
}

export interface ExpandFaqInput {
  context: string;
  numberOfQuestions?: number;
  targetAudience?: string;
  keywords?: string[];
  language?: string;
}

export interface ExpandFaqOutput {
  questions: FaqQuestion[];
  summary: {
    totalGenerated: number;
    topKeywords: string[];
    recommendedLinks: Record<string, string[]>;
  };
  metadata: {
    generatedAt: string;
    model: string;
  };
}

const FaqQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  keywords: z.array(z.string()),
  searchVolume: z.enum(['baixo', 'm�dio', 'alto']),
  difficulty: z.enum(['baixo', 'm�dio', 'alto']),
  category: z.string(),
  internalLinks: z.array(z.string()),
});

const ExpandFaqInputSchema = z.object({
  context: z.string(),
  numberOfQuestions: z.number().min(5).max(30).default(15),
  targetAudience: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  language: z.string().default('pt-BR'),
});

const ExpandFaqOutputSchema = z.object({
  questions: z.array(FaqQuestionSchema),
  summary: z.object({
    totalGenerated: z.number(),
    topKeywords: z.array(z.string()),
    recommendedLinks: z.record(z.array(z.string())),
  }),
  metadata: z.object({
    generatedAt: z.string(),
    model: z.string(),
  }),
});

function generatePrompt(input: ExpandFaqInput): string {
  const promptTemplate = Voc� � especialista em SEO. Gere {numberOfQuestions} perguntas FAQ com long-tail keywords para: {context}. P�blico: {targetAudience}. Keywords: {keywords}. Retorne JSON: {"questions": [...]}.;
  
  return promptTemplate
    .replace('{context}', input.context)
    .replace('{numberOfQuestions}', String(input.numberOfQuestions || 15))
    .replace('{targetAudience}', input.targetAudience || 'Geral')
    .replace('{keywords}', (input.keywords || []).join(', ') || 'N�o especificadas');
}

export const expandFaqWithLongtail = defineFlow(
  {
    name: 'expandFaqWithLongtail',
    inputSchema: ExpandFaqInputSchema,
    outputSchema: ExpandFaqOutputSchema,
  },
  async (input: ExpandFaqInput): Promise<ExpandFaqOutput> => {
    console.log(' FAQ Expansion iniciado');
    try {
      const prompt = generatePrompt(input);
      const response = await generate({
        model: googleAI.model(process.env.GENKIT_MODEL || 'googleai/gemini-2.5-flash'),
        prompt,
      });

      const responseText = typeof response.text === 'function' ? response.text() : String(response.text);
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('JSON n�o encontrado');

      const data = JSON.parse(jsonMatch[0]);
      const questions = data.questions.map((q: any) => ({
        id: q.id || aq-,
        question: q.question,
        answer: q.answer,
        keywords: q.keywords || [],
        searchVolume: q.searchVolume || 'm�dio',
        difficulty: q.difficulty || 'm�dio',
        category: q.category || 'Geral',
        internalLinks: q.internalLinks || [],
      }));

      return {
        questions,
        summary: {
          totalGenerated: questions.length,
          topKeywords: questions.flatMap(q => q.keywords).filter((v, i, a) => a.indexOf(v) === i).slice(0, 10),
          recommendedLinks: {},
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          model: process.env.GENKIT_MODEL || 'googleai/gemini-2.5-flash',
        },
      };
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
);

export default expandFaqWithLongtail;
