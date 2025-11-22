import { MetadataRoute } from 'next';

/**
 * robots.txt otimizado para SEO
 * 
 * Controla o acesso dos robôs de busca a áreas específicas do site,
 * evitando o rastreamento de páginas irrelevantes, duplicadas ou privadas.
 * Um robots.txt ajustado otimiza o crawl budget, priorizando o rastreamento
 * das páginas realmente importantes para o seu negócio.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nereujr.com.br';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Bloqueia endpoints de API
          '/admin/',         // Bloqueia área administrativa (se existir)
          '/_next/',         // Bloqueia arquivos internos do Next.js
          '/test-*',         // Bloqueia páginas de teste
          '/*.json',         // Bloqueia arquivos JSON
          '/private/',       // Bloqueia conteúdo privado
          '/docs/',          // Bloqueia documentação interna
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/test-*',
        ],
        crawlDelay: 0,     // Google não precisa de delay
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/test-*',
        ],
        crawlDelay: 1,     // Bing: delay leve para não sobrecarregar
      },
      {
        userAgent: 'AhrefsBot',
        disallow: '/',     // Bloqueia rastreadores de SEO tools (opcional)
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',     // Bloqueia rastreadores de SEO tools (opcional)
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
