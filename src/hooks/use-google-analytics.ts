/**
 * Google Analytics Event Tracking Hook
 * 
 * Hook para enviar eventos customizados para Google Analytics
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export interface GAEventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export function useGoogleAnalytics() {
  const trackEvent = ({ action, category, label, value, ...params }: GAEventParams) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...params,
      });
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (gaId) {
        window.gtag('config', gaId, {
          page_path: url,
        });
      }
    }
  };

  // Eventos específicos do negócio
  const trackChatOpen = () => {
    trackEvent({
      action: 'chat_open',
      category: 'engagement',
      label: 'Nexus Chat Widget',
    });
  };

  const trackCTAClick = (ctaName: string, location?: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'conversion',
      label: ctaName,
      cta_location: location,
    });
  };

  const trackServiceView = (serviceName: string) => {
    trackEvent({
      action: 'service_view',
      category: 'engagement',
      label: serviceName,
    });
  };

  const trackFormSubmit = (formName: string, success: boolean = true) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'conversion',
      label: formName,
    });
  };

  const trackScrollDepth = (depth: number) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${depth}%`,
      value: depth,
    });
  };

  const trackLinkClick = (linkText: string, linkUrl: string) => {
    trackEvent({
      action: 'link_click',
      category: 'navigation',
      label: linkText,
      link_url: linkUrl,
    });
  };

  const trackWhatsAppClick = () => {
    trackEvent({
      action: 'whatsapp_click',
      category: 'conversion',
      label: 'WhatsApp Contact',
    });
  };

  const trackEmailClick = () => {
    trackEvent({
      action: 'email_click',
      category: 'conversion',
      label: 'Email Contact',
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackChatOpen,
    trackCTAClick,
    trackServiceView,
    trackFormSubmit,
    trackScrollDepth,
    trackLinkClick,
    trackWhatsAppClick,
    trackEmailClick,
  };
}
