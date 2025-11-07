
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
<html>
<head>
  <title>Minha Landing Page</title>
</head>
<body>
  <h1>Bem-vindo à nossa empresa</h1>
  <p>Oferecemos os melhores serviços para você.</p>
  <img src="/placeholder.jpg" alt="">
</body>
</html>
`;

export default function SEOOptimizerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState(exampleContent.trim());
  const [targetKeywords, setTargetKeywords] = useState('landing page, conversão, marketing digital');
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
                Cole o conteúdo HTML da sua página e informe as palavras-chave para que a IA possa otimizá-lo.
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
                    Otimizar SEO
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
