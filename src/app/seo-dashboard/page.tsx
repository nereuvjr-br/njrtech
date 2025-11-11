/**
 * @fileOverview SEO Dashboard - Monitor status e configuração de SEO
 * Rota: /seo-dashboard
 */

import { Metadata } from 'next';
import { SEO_METADATA, getMetadata } from '@/lib/seo-metadata';
import { SERVICES_EXPANDED } from '@/lib/services-expanded-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SEO Dashboard | NJR Tech',
  description: 'Dashboard de monitoramento de SEO e configuração de otimização',
  robots: {
    index: false,
    follow: false,
  },
};

// Status de verificação
interface CheckItem {
  name: string;
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  value?: string;
}

// Função para verificar status
function getChecks(): CheckItem[] {
  return [
    {
      name: 'Metadados Configurados',
      status: Object.keys(SEO_METADATA).length > 0 ? 'success' : 'error',
      message: `${Object.keys(SEO_METADATA).length} páginas com metadados`,
      value: Object.keys(SEO_METADATA).length.toString(),
    },
    {
      name: 'Serviços Expandidos',
      status: SERVICES_EXPANDED.length === 4 ? 'success' : 'warning',
      message: `${SERVICES_EXPANDED.length} serviços com conteúdo expandido`,
      value: SERVICES_EXPANDED.length.toString(),
    },
    {
      name: 'Schema Markup',
      status: SEO_METADATA['/']?.structuredData ? 'success' : 'warning',
      message: 'Schema.org markup configurado',
      value: SEO_METADATA['/']?.structuredData ? 'ativo' : 'inativo',
    },
    {
      name: 'Analytics Habilitado',
      status: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' ? 'success' : 'warning',
      message: 'Rastreamento de comportamento',
      value: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    },
    {
      name: 'Chatbot Ativo',
      status: process.env.NEXT_PUBLIC_ENABLE_CHATBOT === 'true' ? 'success' : 'info',
      message: 'Nexus chatbot',
      value: process.env.NEXT_PUBLIC_ENABLE_CHATBOT,
    },
    {
      name: 'FAQ Expansão',
      status: process.env.NEXT_PUBLIC_ENABLE_FAQ_EXPANSION === 'true' ? 'warning' : 'info',
      message: 'Feature ainda não habilitada',
      value: process.env.NEXT_PUBLIC_ENABLE_FAQ_EXPANSION || 'disabled',
    },
    {
      name: 'Personalização Hero',
      status: process.env.NEXT_PUBLIC_ENABLE_PERSONALIZATION === 'true' ? 'warning' : 'info',
      message: 'Feature ainda não habilitada',
      value: process.env.NEXT_PUBLIC_ENABLE_PERSONALIZATION || 'disabled',
    },
    {
      name: 'Google Genkit',
      status: process.env.GENKIT_API_KEY ? 'success' : 'error',
      message: 'API de IA configurada',
      value: process.env.GENKIT_API_KEY ? '✓ Configurado' : '✗ Faltando',
    },
  ];
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'warning':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'error':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, any> = {
    success: 'default',
    warning: 'secondary',
    error: 'destructive',
    info: 'outline',
  };
  return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
}

export default function SeoDebugPage() {
  const checks = getChecks();

  const successCount = checks.filter((c) => c.status === 'success').length;
  const warningCount = checks.filter((c) => c.status === 'warning').length;
  const errorCount = checks.filter((c) => c.status === 'error').length;
  const infoCount = checks.filter((c) => c.status === 'info').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">🔍 SEO Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Status de otimização e configuração de SEO
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">✅ Sucesso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{successCount}</div>
              <p className="text-xs text-muted-foreground mt-1">itens otimizados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">⚠️ Avisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{warningCount}</div>
              <p className="text-xs text-muted-foreground mt-1">para melhorar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">❌ Erros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{errorCount}</div>
              <p className="text-xs text-muted-foreground mt-1">críticos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">ℹ️ Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{infoCount}</div>
              <p className="text-xs text-muted-foreground mt-1">desabilitados</p>
            </CardContent>
          </Card>
        </div>

        {/* SEO Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Verificação de SEO</CardTitle>
            <CardDescription>
              Status de todos os componentes de otimização
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {checks.map((check, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <StatusIcon status={check.status} />
                  <div>
                    <p className="font-medium">{check.name}</p>
                    <p className="text-sm text-muted-foreground">{check.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={check.status} />
                  {check.value && (
                    <p className="text-xs text-muted-foreground mt-1">{check.value}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Metadados por Página */}
        <Card>
          <CardHeader>
            <CardTitle>📄 Metadados Configurados</CardTitle>
            <CardDescription>
              Títulos e descrições otimizadas por página
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(SEO_METADATA).map(([path, meta]) => (
              <div key={path} className="p-4 rounded-lg border space-y-2">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {path || '/'}
                  </code>
                  <Badge variant="outline">{meta.title.length} caracteres</Badge>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">Title:</p>
                  <p className="text-sm">{meta.title}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Description:
                  </p>
                  <p className="text-sm">{meta.description}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Keywords:
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {meta.keywords.map((kw) => (
                      <Badge key={kw} variant="secondary">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Serviços Expandidos */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 Serviços com Conteúdo Expandido</CardTitle>
            <CardDescription>
              {SERVICES_EXPANDED.length} serviços com 300+ palavras cada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {SERVICES_EXPANDED.map((service) => (
              <div key={service.id} className="p-4 rounded-lg border space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="text-2xl">{service.icon}</span>
                    {service.title}
                  </h3>
                  <Badge variant="outline">
                    {service.expandedContent.overview.split(' ').length} palavras
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                  <div className="text-xs">
                    <span className="font-semibold">Tecnologias:</span> {service.technologies.length}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">Keywords:</span> {service.keywords.length}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">Links Internos:</span>{' '}
                    {service.internalLinks.length}
                  </div>
                </div>

                {/* Mostrar tags de keywords */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {service.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-xs">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle>⚙️ Variáveis de Ambiente</CardTitle>
            <CardDescription>
              Configurações carregadas do .env.local
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {[
                { key: 'NEXT_PUBLIC_SITE_URL', value: process.env.NEXT_PUBLIC_SITE_URL },
                { key: 'NEXT_PUBLIC_BUSINESS_NAME', value: process.env.NEXT_PUBLIC_BUSINESS_NAME },
                { key: 'NEXT_PUBLIC_ENABLE_ANALYTICS', value: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS },
                { key: 'NEXT_PUBLIC_ENABLE_CHATBOT', value: process.env.NEXT_PUBLIC_ENABLE_CHATBOT },
                { key: 'NEXT_PUBLIC_SEO_ENABLED', value: process.env.NEXT_PUBLIC_SEO_ENABLED },
                { key: 'NEXT_PUBLIC_SCHEMA_ORG_ENABLED', value: process.env.NEXT_PUBLIC_SCHEMA_ORG_ENABLED },
                { key: 'NODE_ENV', value: process.env.NODE_ENV },
                { key: 'GENKIT_MODEL', value: process.env.GENKIT_MODEL },
              ].map(({ key, value }) => (
                <div key={key} className="p-2 rounded bg-muted text-sm font-mono">
                  <span className="text-primary">{key}</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-green-600">{value || 'undefined'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recomendações */}
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 Recomendações de Melhoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {errorCount > 0 && (
              <p className="text-sm">
                ❌ <strong>Crítico:</strong> Configure as variáveis de ambiente faltando
              </p>
            )}
            {warningCount > 0 && (
              <p className="text-sm">
                ⚠️ <strong>Aviso:</strong> Implemente personalização de Hero para melhorar ranking
              </p>
            )}
            <p className="text-sm">
              ✅ <strong>FAQ Expansion:</strong> Já ativado! Acesse{' '}
              <a href="/api/faq/expand" className="text-primary hover:underline font-mono text-xs">
                /api/faq/expand
              </a>
              {' '}ou veja a documentação em{' '}
              <a href="/docs/FAQ_EXPANSION.md" className="text-primary hover:underline font-mono text-xs">
                docs/FAQ_EXPANSION.md
              </a>
            </p>
            <p className="text-sm">
              ✅ <strong>Bom:</strong> Sistema pronto para gerar 15-20 FAQs com long-tail keywords!
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground border-t pt-8">
          <p>
            Dashboard de SEO | Atualizado em{' '}
            <span className="font-mono">{new Date().toLocaleString('pt-BR')}</span>
          </p>
          <p className="text-xs mt-2">
            Este dashboard é apenas para desenvolvimento. Não indexar em produção.
          </p>
        </div>
      </div>
    </div>
  );
}
