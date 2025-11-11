import { MetadataRoute } from 'next';

/**
 * Sitemap XML otimizado
 * 
 * Sitemaps XML são mapas do site que listam todas as URLs importantes.
 * Eles facilitam a descoberta desses endereços pelo Googlebot, acelerando
 * a indexação de novos conteúdos ou alterações.
 * 
 * Prioridades:
 * 1.0 = Página principal (mais importante)
 * 0.8 = Páginas de serviços principais
 * 0.6 = Páginas secundárias
 * 0.4 = Páginas de suporte/blog
 * 
 * Frequência de atualização:
 * - always: Conteúdo muda constantemente
 * - hourly: Atualização horária
 * - daily: Atualização diária
 * - weekly: Atualização semanal
 * - monthly: Atualização mensal
 * - yearly: Atualização anual
 * - never: Conteúdo arquivado
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nereujr.com.br';
  const currentDate = new Date();

  return [
    // Página principal - Máxima prioridade
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Páginas de serviços - Alta prioridade
    {
      url: `${siteUrl}/servicos/landing-page`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/servicos/site-profissional`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/servicos/seo-ia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/servicos/automacao-ia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/servicos/chatbot-ia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Ferramentas/Dashboard - Prioridade alta
    {
      url: `${siteUrl}/seo-optimizer`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/seo-dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
