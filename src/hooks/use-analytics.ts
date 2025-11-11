'use client';

import { useEffect, useRef } from 'react';

interface AnalyticsEvent {
  timestamp: Date;
  eventType: 'scroll' | 'click' | 'time' | 'interaction';
  section?: string;
  value?: number;
}

interface AnalyticsData {
  dwellTime: number;
  scrollDepth: number;
  events: AnalyticsEvent[];
}

/**
 * Hook para rastrear sinais comportamentais do usuário
 * - Dwell Time (tempo na página)
 * - Scroll Depth (profundidade de scroll)
 * - Cliques em elementos importantes
 * - Interações com componentes
 */
export function useAnalytics() {
  const eventsRef = useRef<AnalyticsEvent[]>([]);
  const scrollDepthRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const scrollMarkersRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Rastrear scroll depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollDepth = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

      scrollDepthRef.current = Math.max(scrollDepthRef.current, scrollDepth);

      // Registrar quando passar por marcos importantes (25%, 50%, 75%, 100%)
      const milestone = Math.floor(scrollDepth / 25) * 25;

      if (milestone > 0 && !scrollMarkersRef.current.has(milestone)) {
        scrollMarkersRef.current.add(milestone);
        eventsRef.current.push({
          timestamp: new Date(),
          eventType: 'scroll',
          section: `scroll-${milestone}%`,
          value: scrollDepth,
        });

        // Enviar para servidor quando atinge marcos
        if (milestone >= 50) {
          sendAnalytics();
        }
      }
    };

    // Rastrear cliques em elementos importantes
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Clicar em elemento com data-analytics
      const analyticsElement = target.closest('[data-analytics]');
      if (analyticsElement) {
        const eventName = analyticsElement.getAttribute('data-analytics');
        eventsRef.current.push({
          timestamp: new Date(),
          eventType: 'click',
          section: eventName || 'unknown',
        });
      }

      // Clicar em chat widget
      if (target.id === 'chat-widget' || target.closest('#chat-widget')) {
        eventsRef.current.push({
          timestamp: new Date(),
          eventType: 'interaction',
          section: 'chat-widget-open',
        });
      }

      // Clicar em links internos
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && (href.startsWith('#') || href.startsWith('/'))) {
          eventsRef.current.push({
            timestamp: new Date(),
            eventType: 'click',
            section: `link-${href}`,
          });
        }
      }

      // Clicar em botões CTA
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button')
      ) {
        const buttonText = target.textContent || 'unknown';
        eventsRef.current.push({
          timestamp: new Date(),
          eventType: 'click',
          section: `button-${buttonText.slice(0, 30)}`,
        });
      }
    };

    // Enviar dados para servidor
    const sendAnalytics = async () => {
      if (eventsRef.current.length === 0) return;

      const dwellTime = (Date.now() - startTimeRef.current) / 1000; // em segundos
      const scrollDepth = scrollDepthRef.current;

      const payload: AnalyticsData = {
        dwellTime,
        scrollDepth,
        events: eventsRef.current.slice(), // cópia
      };

      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {
          // Silenciosamente falhar se endpoint não existir ainda
        });
      } catch (error) {
        console.debug('Analytics error:', error);
      }
    };

    // Enviar dados periodicamente (30 segundos)
    const interval = setInterval(() => {
      sendAnalytics();
    }, 30000);

    // Enviar dados ao descarregar página
    const handleBeforeUnload = () => {
      sendAnalytics();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(interval);

      // Enviar dados finais
      sendAnalytics();
    };
  }, []);

  return {
    events: eventsRef.current,
    scrollDepth: scrollDepthRef.current,
    dwellTime: (Date.now() - startTimeRef.current) / 1000,
  };
}
