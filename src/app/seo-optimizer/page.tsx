
'use client';

import { useState } from 'react';
import { optimizeLandingPageSEO } from '@/ai/flows/optimize-landing-page-seo';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const exampleContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NJR Tech - Landing Pages e Sites com IA</title>
  <meta name="description" content="Criação de Landing Pages e Sites que Convertem de Verdade. A NJR Tech cria páginas rápidas, otimizadas para Google e prontas para captar clientes, usando inteligência artificial.">
</head>
<body>
  <header>
    <nav>
      <a href="#services">O que fazemos</a>
      <a href="#why-us">Por que nós?</a>
      <a href="#pricing">Planos</a>
      <a href="#faq">FAQ</a>
    </nav>
  </header>
  <main>
    <section id="hero">
      <h1>Confiança e resultados que falam por si</h1>
      <p>A NJR Tech cria páginas rápidas, otimizadas para Google e prontas para captar clientes, usando inteligência artificial.</p>
      <img src="https://images.unsplash.com/photo-1707836885248-2b0e3cb0c76e" alt="Mockup de um site em um laptop">
    </section>
    <section id="services">
      <h2>O que fazemos</h2>
      <div>
        <h3>Criação de Landing Page</h3>
        <p>Páginas focadas em conversão, projetadas para transformar visitantes em clientes.</p>
      </div>
      <div>
        <h3>Criação de Site Profissional</h3>
        <p>Desenvolvemos sites institucionais modernos, responsivos e que refletem a identidade da sua marca.</p>
      </div>
      <div>
        <h3>SEO Otimizado com IA</h3>
        <p>Utilizamos IA para otimizar seu conteúdo e estrutura, garantindo as melhores posições no Google.</p>
      </div>
      <div>
        <h3>Formulários e Chats com IA</h3>
        <p>Implementamos formulários inteligentes e chatbots para capturar leads e oferecer suporte 24/7.</p>
      </div>
    </section>
    <section id="why-us">
      <h2>Por que escolher a NJR Tech?</h2>
      <p>Combinamos o melhor da tecnologia e da expertise humana para entregar resultados excepcionais.</p>
    </section>
     <section id="pricing">
      <h2>Planos flexíveis para o seu negócio</h2>
        <p>Escolha o plano que melhor se adapta às suas necessidades e comece a converter.</p>
    </section>
    <section id="faq">
      <h2>Perguntas Frequentes</h2>
      <p>Tire suas dúvidas sobre nossos serviços.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2024 NJR Tech. Todos os direitos reservados.</p>
  </footer>
</body>
</html>
`;

export default function SEOOptimizerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState(exampleContent.trim());
  const [targetKeywords, setTargetKeywords] = useState('landing page, site com IA, SEO com IA, NJR Tech, conversão');
  const [optimizedResult, setOptimizedResult] = useState<{
    optimizedLandingPageContent: string;
    keywordSuggestions?: string;
  } | null>(null);

  const handleOptimize = async () => {
    setLoading(true);
    setError(null);
    setOptimizedResult(null);

    try {
      const result = await optimizeLandingPageSEO({
        landingPageContent: originalContent,
        targetKeywords: targetKeywords,
      });
      setOptimizedResult(result);
    } catch (e: any) {
      console.error('Error optimizing SEO:', e);
      setError(e.message || 'Ocorreu um erro desconhecido ao otimizar o SEO.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted">
      <header className="sticky top-0 z-10 flex h-[60px] items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Otimizador de SEO com IA</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Teste a Otimização de SEO</CardTitle>
              <CardDescription>
                Cole o conteúdo HTML da sua página e informe as palavras-chave para que a IA possa otimizá-lo. O conteúdo abaixo simula sua página principal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleOptimize(); }} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="content">Conteúdo da Landing Page (HTML)</Label>
                  <Textarea
                    id="content"
                    value={originalContent}
                    onChange={(e) => setOriginalContent(e.target.value)}
                    placeholder="Cole o código HTML da sua página aqui..."
                    className="min-h-[200px] font-mono text-xs"
                    rows={15}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="keywords">Palavras-chave Alvo (separadas por vírgula)</Label>
                  <Input
                    id="keywords"
                    value={targetKeywords}
                    onChange={(e) => setTargetKeywords(e.target.value)}
                    placeholder="Ex: landing page, conversão, marketing"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Otimizar SEO da Página Principal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {error && (
            <Card className="border-red-500 bg-red-50/50">
                <CardHeader>
                    <CardTitle className="text-red-700">Erro na Otimização</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-red-600">{error}</p>
                </CardContent>
            </Card>
          )}

          {optimizedResult && (
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Conteúdo Original</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="w-full overflow-auto rounded-md bg-muted p-4 text-xs">
                    <code>{originalContent}</code>
                  </pre>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Conteúdo Otimizado pela IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="w-full overflow-auto rounded-md bg-primary/10 p-4 text-xs">
                    <code>{optimizedResult.optimizedLandingPageContent}</code>
                  </pre>
                </CardContent>
              </Card>
               {optimizedResult.keywordSuggestions && (
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Sugestões de Palavras-chave</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{optimizedResult.keywordSuggestions}</p>
                    </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
