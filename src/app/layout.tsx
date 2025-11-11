import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ChatProvider } from '@/hooks/use-chat';
import { organizationSchema, websiteSchema, servicesSchema } from '@/lib/schema-org';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';

/**
 * Meta tags otimizadas para SEO
 * 
 * Meta tags, especialmente as de descrição (description) e de controle de indexação
 * (robots, noindex, nofollow), ajudam mecanismos de busca a entender como cada página
 * deve aparecer nos resultados ou se deve ser ignorada.
 * 
 * Otimizações aplicadas:
 * - Title otimizado com palavras-chave primárias
 * - Description persuasiva com limite de 160 caracteres
 * - Open Graph para compartilhamento em redes sociais
 * - Twitter Card para melhor visualização no Twitter/X
 * - Canonical URL para evitar conteúdo duplicado
 * - Robots meta tag para controle de indexação
 * - Verificação do Google Search Console
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nereujr.com.br'),
  
  // SEO básico otimizado
  title: {
    default: 'NJR Tech - Landing Pages, Sites e Automação com IA | SEO Otimizado',
    template: '%s | NJR Tech',
  },
  description: 'Desenvolvemos landing pages de alta conversão, sites profissionais, SEO com IA, chatbots inteligentes e automação sob medida. Transforme visitantes em clientes com soluções personalizadas.',
  
  // Keywords (ainda relevante para alguns buscadores)
  keywords: [
    'landing page',
    'criação de landing page',
    'site profissional',
    'desenvolvimento web',
    'SEO otimizado',
    'SEO com IA',
    'chatbot inteligente',
    'chatbot IA',
    'automação de processos',
    'agente de IA',
    'marketing digital',
    'conversão de leads',
    'Google ranking',
    'otimização de sites',
    'NJR Tech',
  ],
  
  // Informações do autor/empresa
  authors: [{ name: 'NJR Tech', url: 'https://nereujr.com.br' }],
  creator: 'NJR Tech',
  publisher: 'NJR Tech',
  
  // Controle de indexação e rastreamento
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'NJR Tech',
    title: 'NJR Tech - Landing Pages, Sites e Automação com IA',
    description: 'Soluções digitais personalizadas: landing pages de alta conversão, sites profissionais, SEO com IA, chatbots e automação. Desenvolvemos sob medida para seu negócio.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NJR Tech - Desenvolvimento Web e Automação com IA',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'NJR Tech - Landing Pages, Sites e Automação com IA',
    description: 'Desenvolvemos landing pages, sites profissionais, SEO com IA, chatbots e automação sob medida.',
    images: ['/og-image.jpg'],
    creator: '@njrtech',
  },
  
  // Verificação de ferramentas (adicione seus códigos reais)
  verification: {
    google: 'seu-codigo-google-search-console',
    // yandex: 'seu-codigo-yandex',
    // bing: 'seu-codigo-bing-webmaster',
  },
  
  // Canonical URL (evita duplicação)
  alternates: {
    canonical: '/',
  },
  
  // Informações de categoria
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Schema.org Structured Data - Ajuda Google a entender o conteúdo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <GoogleAnalytics />
        <ChatProvider>
          {children}
          <Toaster />
        </ChatProvider>
      </body>
    </html>
  );
}
