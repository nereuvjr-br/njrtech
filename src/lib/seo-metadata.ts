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
    title: `${BUSINESS_NAME}: Crie Landing Pages com IA Focadas em Conversão`,
    description:
      'Agência especializada em landing pages otimizadas para conversão. Serviços de SEO com IA, design responsivo e chatbot inteligente para seu negócio crescer.',
    keywords: [
      'landing page com IA',
      'sites otimizados para conversão',
      'agência de SEO',
      'landing page design',
      'chatbot IA',
    ],
    ogImage: `${SITE_URL}/og-home.jpg`,
    ogTitle: `Landing Pages com IA | ${BUSINESS_NAME}`,
    ogDescription:
      'Transforme visitantes em clientes com landing pages inteligentes e otimizadas para conversão.',
    canonical: `${SITE_URL}/`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      description: 'Agência de landing pages com IA focada em conversão',
      url: SITE_URL,
      telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+55 (11) XXXXX-XXXX',
      email: BUSINESS_EMAIL,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
      },
      areaServed: 'BR',
      priceRange: 'R$ 500 - R$ 5000',
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
