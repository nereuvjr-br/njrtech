/**
 * @fileOverview SEO Metadata configuration for each page
 * Allows unique titles and descriptions for better SERP CTR
 * Uses environment variables for configuration
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://njrtech.com';
const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'NJR Tech';
const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contato@njrtech.com';
const SEO_ENABLED = process.env.NEXT_PUBLIC_SEO_ENABLED === 'true';

export interface PageMetadata {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  canonical?: string;
  structuredData?: Record<string, any>;
}

export const SEO_METADATA: Record<string, PageMetadata> = {
  '/': {
    path: '/',
    title: `Criação de Sites e Automação com IA na Paraíba | ${BUSINESS_NAME}`,
    description:
      'Transforme seu Negócio na Paraíba com Sites de Alta Performance e Inteligência Artificial. Ajudamos empresas de João Pessoa, Campina Grande e toda região a venderem mais.',
    keywords: [
      'criação de sites paraíba',
      'automação com ia paraíba',
      'agência de marketing paraíba',
      'desenvolvimento web joão pessoa',
      'desenvolvimento web campina grande',
      'sites otimizados para conversão',
      'chatbot IA',
    ],
    ogImage: `${SITE_URL}/og-home.jpg`,
    ogTitle: `Sites e Automação na Paraíba | ${BUSINESS_NAME}`,
    ogDescription:
      'Transforme seu Negócio na Paraíba com Sites de Alta Performance e Inteligência Artificial. Ajudamos empresas de todo o estado a venderem mais.',
    canonical: `${SITE_URL}/`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      description: 'Agência de criação de sites e automação com IA na Paraíba',
      url: SITE_URL,
      telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+55 (83) 99809-4395',
      email: BUSINESS_EMAIL,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'PB',
        addressCountry: 'BR',
      },
      areaServed: ['Paraíba', 'João Pessoa', 'Campina Grande', 'Patos', 'BR'],
      priceRange: 'R$ 500 - R$ 10000',
    },
  },

  '/seo-optimizer': {
    path: '/seo-optimizer',
    title: `Otimizador de SEO com IA Gratuito | Análise Completa | ${BUSINESS_NAME}`,
    description:
      'Ferramenta gratuita de auditoria SEO com IA. Analise sua landing page, descubra oportunidades de otimização e receba recomendações personalizadas em segundos.',
    keywords: [
      'otimizador SEO grátis',
      'auditoria SEO com IA',
      'análise de landing page',
      'ferramenta SEO',
      'checker de SEO',
    ],
    ogImage: `${SITE_URL}/og-seo-tool.jpg`,
    ogTitle: `Otimizador de SEO Grátis | ${BUSINESS_NAME}`,
    ogDescription:
      'Analise e otimize sua landing page com IA em segundos. Descubra problemas de SEO e receba recomendações acionáveis.',
    canonical: `${SITE_URL}/seo-optimizer`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Otimizador de SEO NJR Tech',
      description: 'Ferramenta gratuita de análise SEO com IA',
      url: 'https://njrtech.com/seo-optimizer',
      applicationCategory: 'Utility',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
      },
    },
  },
};

/**
 * Get metadata for a specific route
 * Falls back to home metadata if route not found
 */
export function getMetadata(pathname: string): PageMetadata {
  return SEO_METADATA[pathname] || SEO_METADATA['/'];
}

/**
 * Generate metadata for Next.js Metadata API
 */
export function generateMetadataForRoute(pathname: string) {
  const meta = getMetadata(pathname);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(', '),
    openGraph: {
      type: 'website' as const,
      url: `https://njrtech.com${meta.path}`,
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        {
          url: meta.ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [meta.ogImage],
    },
    alternates: {
      canonical: meta.canonical || `https://njrtech.com${meta.path}`,
    },
  };
}
