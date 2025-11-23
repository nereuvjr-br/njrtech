import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  searchVolume: 'baixo' | 'médio' | 'alto';
  difficulty: 'baixo' | 'médio' | 'alto';
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
  searchVolume: z.enum(['baixo', 'médio', 'alto']),
  difficulty: z.enum(['baixo', 'médio', 'alto']),
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
  const promptTemplate = `Você é especialista em SEO. Gere {numberOfQuestions} perguntas FAQ com long-tail keywords para: {context}. Público: {targetAudience}. Keywords: {keywords}. Retorne JSON: {"questions": [...]}.`;

  return promptTemplate
    .replace('{context}', input.context)
    .replace('{numberOfQuestions}', String(input.numberOfQuestions || 15))
    .replace('{targetAudience}', input.targetAudience || 'Geral')
    .replace('{keywords}', (input.keywords || []).join(', ') || 'Não especificadas');
}

export const expandFaqWithLongtail = ai.defineFlow(
  {
    name: 'expandFaqWithLongtail',
    inputSchema: ExpandFaqInputSchema,
    outputSchema: ExpandFaqOutputSchema,
  },
  async (input: ExpandFaqInput): Promise<ExpandFaqOutput> => {
    console.log('FAQ Expansion iniciado');
    try {
      const prompt = generatePrompt(input);
      const response = await ai.generate({
        prompt,
      });

      const responseText = response.text;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('JSON não encontrado');

      const data = JSON.parse(jsonMatch[0]);
      const questions = data.questions.map((q: any) => ({
        id: q.id || `faq-${Math.random().toString(36).substr(2, 9)}`,
        question: q.question,
        answer: q.answer,
        keywords: q.keywords || [],
        searchVolume: q.searchVolume || 'médio',
        difficulty: q.difficulty || 'médio',
        category: q.category || 'Geral',
        internalLinks: q.internalLinks || [],
      }));

      return {
        questions,
        summary: {
          totalGenerated: questions.length,
          topKeywords: questions.flatMap((q: FaqQuestion) => q.keywords).filter((v: string, i: number, a: string[]) => a.indexOf(v) === i).slice(0, 10),
          recommendedLinks: {},
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          model: 'googleai/gemini-2.5-flash',
        },
      };
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
);

export default expandFaqWithLongtail;
