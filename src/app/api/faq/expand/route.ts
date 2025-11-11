/**
 * API Route: POST /api/faq/expand
 * Expande FAQ com long-tail keywords usando Genkit
 */

import { NextRequest, NextResponse } from 'next/server';

// Tipos locais
interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  searchVolume: 'baixo' | 'médio' | 'alto';
  difficulty: 'baixo' | 'médio' | 'alto';
  category: string;
  internalLinks: string[];
}

interface ExpandFaqInput {
  context: string;
  numberOfQuestions?: number;
  targetAudience?: string;
  keywords?: string[];
  language?: string;
}

interface ExpandFaqOutput {
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

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const authHeader = request.headers.get('authorization');
    if (!authHeader && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validar
    if (!body.context) {
      return NextResponse.json(
        { error: 'Campo "context" é obrigatório' },
        { status: 400 }
      );
    }

    // Preparar input
    const input: ExpandFaqInput = {
      context: body.context,
      numberOfQuestions: body.numberOfQuestions || 15,
      targetAudience: body.targetAudience || 'Geral',
      keywords: body.keywords || [],
      language: body.language || 'pt-BR',
    };

    console.log('📝 Requisição FAQ Expansion:', input);

    // Placeholder - retornar exemplo
    // TODO: Integrar com expandFaqWithLongtail quando Genkit estiver configurado
    const mockResult: ExpandFaqOutput = {
      questions: [
        {
          id: 'faq-001',
          question: 'Como otimizar uma landing page para SEO?',
          answer: 'A otimização de landing pages envolve...',
          keywords: ['seo landing page', 'otimização seo', 'landing page ranking'],
          searchVolume: 'alto',
          difficulty: 'médio',
          category: 'SEO Técnico',
          internalLinks: ['/seo-optimizer', '/how-it-works'],
        },
      ],
      summary: {
        totalGenerated: 1,
        topKeywords: ['seo landing page', 'otimização seo'],
        recommendedLinks: {
          'SEO Técnico': ['/seo-optimizer', '/how-it-works'],
        },
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        model: process.env.GENKIT_MODEL || 'googleai/gemini-2.5-flash',
      },
    };

    console.log(`✅ FAQ Expansion: ${mockResult.questions.length} perguntas`);

    return NextResponse.json(mockResult, { status: 200 });
  } catch (error) {
    console.error('❌ Erro:', error);
    return NextResponse.json(
      {
        error: 'Erro ao gerar FAQ',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'FAQ Expansion API - Use POST',
    endpoint: '/api/faq/expand',
    method: 'POST',
  });
}
