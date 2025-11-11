'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Loader2 } from 'lucide-react';

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

interface FaqExpandedProps {
  context?: string;
  numberOfQuestions?: number;
  targetAudience?: string;
  keywords?: string[];
  autoLoad?: boolean;
}

export function FaqExpanded({
  context = 'SEO optimization for landing pages',
  numberOfQuestions = 15,
  targetAudience = 'Digital agencies',
  keywords = [],
  autoLoad = false,
}: FaqExpandedProps) {
  const [questions, setQuestions] = useState<FaqQuestion[]>([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{
    totalGenerated: number;
    topKeywords: string[];
  } | null>(null);

  useEffect(() => {
    if (autoLoad) {
      generateFaq();
    }
  }, [autoLoad]);

  const generateFaq = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/faq/expand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context,
          numberOfQuestions,
          targetAudience,
          keywords,
          language: 'pt-BR',
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar FAQ');
      }

      const data = await response.json();
      setQuestions(data.questions || []);
      setSummary({
        totalGenerated: data.summary?.totalGenerated || 0,
        topKeywords: data.summary?.topKeywords || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao gerar FAQ:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSearchVolumeBadgeVariant = (volume: string) => {
    switch (volume) {
      case 'alto':
        return 'default';
      case 'médio':
        return 'secondary';
      case 'baixo':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'baixo':
        return 'text-green-600';
      case 'médio':
        return 'text-yellow-600';
      case 'alto':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            Erro ao gerar FAQ
          </CardTitle>
        </CardHeader>
        <CardContent className="text-red-600">
          <p>{error}</p>
          <button
            onClick={generateFaq}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Tentar Novamente
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">❓ Perguntas Frequentes</h2>
          <p className="text-muted-foreground text-sm">
            Expandidas com IA para cobrir long-tail keywords
          </p>
        </div>
        <button
          onClick={generateFaq}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              🤖 Gerar novas perguntas
            </>
          )}
        </button>
      </div>

      {/* Loading State */}
      {loading && questions.length === 0 && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {/* Summary */}
      {summary && summary.totalGenerated > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">📊 Resumo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <strong>{summary.totalGenerated}</strong> perguntas geradas
            </p>
            <div className="flex flex-wrap gap-1">
              {summary.topKeywords.slice(0, 5).map((keyword) => (
                <Badge key={keyword} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ Accordion */}
      {questions.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => (
            <AccordionItem key={question.id || index} value={question.id || index.toString()}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex-1 text-left">
                  <p className="font-medium text-base">{question.question}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      variant={getSearchVolumeBadgeVariant(question.searchVolume)}
                      className="text-xs"
                    >
                      {question.searchVolume === 'alto' && '📈'}
                      {question.searchVolume === 'médio' && '📊'}
                      {question.searchVolume === 'baixo' && '📉'}
                      {question.searchVolume}
                    </Badge>
                    <span className={`text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      Dificuldade: {question.difficulty}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {question.category}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-4">
                {/* Answer */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Resposta:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{question.answer}</p>
                </div>

                {/* Keywords */}
                {question.keywords.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Keywords relacionadas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {question.keywords.map((kw) => (
                        <Badge key={kw} variant="secondary" className="text-xs">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internal Links */}
                {question.internalLinks.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Leitura recomendada:</h4>
                    <ul className="space-y-1">
                      {question.internalLinks.map((link) => (
                        <li key={link}>
                          <a
                            href={link}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            → {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Empty State */}
      {!loading && questions.length === 0 && !error && (
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Nenhuma pergunta gerada ainda</p>
            <button
              onClick={generateFaq}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              🤖 Gerar FAQ com IA
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default FaqExpanded;
