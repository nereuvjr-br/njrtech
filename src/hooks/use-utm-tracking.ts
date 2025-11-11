'use client';

import { useEffect, useState } from 'react';

/**
 * Hook para capturar e gerenciar parâmetros UTM
 * Identifica origem do tráfego para personalizar Hero
 *
 * Uso:
 * const { utm, isPersonalized } = useUtmTracking();
 */

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export interface UtmContext {
  utm: UtmParams;
  isPersonalized: boolean;
  heroVariant: 'default' | 'agencies' | 'ecommerce' | 'startups' | 'enterprise' | 'automation' | 'chatbot' | 'seo' | 'landing-page' | 'site-profissional';
  cta: {
    text: string;
    action: string;
  };
}

export function useUtmTracking(): UtmContext {
  const [utm, setUtm] = useState<UtmParams>({});
  const [heroVariant, setHeroVariant] = useState<UtmContext['heroVariant']>('default');

  useEffect(() => {
    // Ler UTM params da URL
    const searchParams = new URLSearchParams(window.location.search);
    
    const utmData: UtmParams = {
      source: searchParams.get('utm_source') || undefined,
      medium: searchParams.get('utm_medium') || undefined,
      campaign: searchParams.get('utm_campaign') || undefined,
      content: searchParams.get('utm_content') || undefined,
      term: searchParams.get('utm_term') || undefined,
    };

    setUtm(utmData);

    // Determinar variante do hero baseado no source/campaign/content
    const source = utmData.source?.toLowerCase() || '';
    const campaign = utmData.campaign?.toLowerCase() || '';
    const content = utmData.content?.toLowerCase() || '';
    const term = utmData.term?.toLowerCase() || '';

    // Prioridade: serviços específicos primeiro
    if (source.includes('automation') || campaign.includes('automacao') || content.includes('automation') || term.includes('agente')) {
      setHeroVariant('automation');
    } else if (source.includes('chatbot') || campaign.includes('chatbot') || content.includes('chat') || term.includes('atendimento')) {
      setHeroVariant('chatbot');
    } else if (source.includes('seo') || campaign.includes('seo') || content.includes('seo') || term.includes('google')) {
      setHeroVariant('seo');
    } else if (source.includes('landing') || campaign.includes('landing-page') || content.includes('landing')) {
      setHeroVariant('landing-page');
    } else if (source.includes('site') || campaign.includes('institucional') || content.includes('website')) {
      setHeroVariant('site-profissional');
    } else if (source.includes('agency') || campaign.includes('agency')) {
      setHeroVariant('agencies');
    } else if (source.includes('ecommerce') || campaign.includes('shop')) {
      setHeroVariant('ecommerce');
    } else if (source.includes('startup') || campaign.includes('startup')) {
      setHeroVariant('startups');
    } else if (source.includes('enterprise') || campaign.includes('enterprise')) {
      setHeroVariant('enterprise');
    } else {
      setHeroVariant('default');
    }

    // Registrar analytics
    if (Object.values(utmData).some(v => v)) {
      console.log('📍 UTM Params detectados:', utmData);
      console.log('🎯 Hero Variant:', heroVariant);

      // Enviar para analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'utm_detected', {
          utm_source: utmData.source,
          utm_medium: utmData.medium,
          utm_campaign: utmData.campaign,
          utm_content: utmData.content,
          hero_variant: heroVariant,
        });
      }
    }
  }, []);

  // Mapear CTA baseado na variante
  const ctaMap: Record<UtmContext['heroVariant'], UtmContext['cta']> = {
    default: {
      text: 'Agendar Briefing',
      action: 'demo',
    },
    agencies: {
      text: 'Integrar com sua agência',
      action: 'demo',
    },
    ecommerce: {
      text: 'Aumentar vendas agora',
      action: 'demo',
    },
    startups: {
      text: 'Validar meu produto',
      action: 'demo',
    },
    enterprise: {
      text: 'Agendar Consulta Enterprise',
      action: 'demo',
    },
    automation: {
      text: 'Automatizar processos',
      action: 'demo',
    },
    chatbot: {
      text: 'Implementar chatbot IA',
      action: 'demo',
    },
    seo: {
      text: 'Melhorar meu ranking',
      action: 'demo',
    },
    'landing-page': {
      text: 'Criar minha landing page',
      action: 'demo',
    },
    'site-profissional': {
      text: 'Desenvolver meu site',
      action: 'demo',
    },
  };

  return {
    utm,
    isPersonalized: heroVariant !== 'default',
    heroVariant,
    cta: ctaMap[heroVariant],
  };
}

export default useUtmTracking;
