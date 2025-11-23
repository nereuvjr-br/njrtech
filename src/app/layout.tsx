import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ChatProvider } from '@/hooks/use-chat';
import { organizationSchema, websiteSchema, servicesSchema } from '@/lib/schema-org';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { generateMetadataForRoute } from '@/lib/seo-metadata';
import { AnalyticsProvider } from '@/components/analytics/analytics-provider';

/**
 * Meta tags otimizadas para SEO
 * 
 * Utiliza o gerador de metadados dinâmico para garantir SEO único por rota.
 */
export async function generateMetadata() {
  return generateMetadataForRoute('/');
}

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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

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
        <AnalyticsProvider />
        <ChatProvider>
          {children}
          <Toaster />
        </ChatProvider>
      </body>
    </html>
  );
}
