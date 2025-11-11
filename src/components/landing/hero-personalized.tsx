'use client';

import { useUtmTracking } from '@/hooks/use-utm-tracking';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * Hero Personalizado com UTM Tracking
 * Muda conteúdo baseado em parametros de origem do tráfego ou variante fixa
 */

interface HeroPersonalizedProps {
  defaultCta?: string;
  showBadge?: boolean;
  forceVariant?: 'default' | 'agencies' | 'ecommerce' | 'startups' | 'enterprise' | 'automation' | 'chatbot' | 'seo' | 'landing-page' | 'site-profissional';
}

function HeroContent({ variant }: { variant: string }) {
  const contentMap: Record<string, { title: ReactNode; subtitle: string; badge: string }> = {
    // Segmentação por público
    agencies: {
      title: (
        <>
          Landing Pages com <span className="text-primary">IA + SEO</span>
        </>
      ),
      subtitle:
        'Desenvolvemos landing pages exclusivas para sua agência: SEO técnico, chatbots inteligentes e analytics que provam ROI para seus clientes.',
      badge: '🚀 Para Agências',
    },
    ecommerce: {
      title: (
        <>
          Landing Pages com <span className="text-primary">SEO Inteligente</span>
        </>
      ),
      subtitle:
        'Transforme visitantes em clientes com páginas otimizadas para vendas: checkout fluido, SEO poderoso e automação que trabalha 24/7.',
      badge: '💰 E-commerce de Alta Conversão',
    },
    startups: {
      title: (
        <>
          Landing Pages com <span className="text-primary">IA para Startups</span>
        </>
      ),
      subtitle:
        'Valide seu produto rápido: landing pages que captam leads qualificados, testes A/B automáticos e métricas que guiam seu pivô.',
      badge: '⚡ Startups - Validação Rápida',
    },
    enterprise: {
      title: (
        <>
          Landing Pages <span className="text-primary">Enterprise com IA</span>
        </>
      ),
      subtitle:
        'Arquitetura enterprise escalável: integração com seu CRM, compliance garantido, suporte dedicado e otimização contínua com IA.',
      badge: '🏢 Enterprise',
    },

    // Segmentação por serviço
    automation: {
      title: (
        <>
          Automação e <span className="text-primary">Agentes de IA</span>
        </>
      ),
      subtitle:
        'Desenvolvemos agentes inteligentes que executam tarefas repetitivas, integram seus sistemas e aumentam produtividade: CRM, emails, relatórios automatizados 24/7.',
      badge: '🤖 Automação Inteligente',
    },
    chatbot: {
      title: (
        <>
          Chatbots com <span className="text-primary">IA Generativa</span>
        </>
      ),
      subtitle:
        'Capte leads e atenda clientes 24/7 com chatbots inteligentes: respostas personalizadas, integração com WhatsApp/Telegram e qualificação automática de leads.',
      badge: '💬 Chatbot IA',
    },
    seo: {
      title: (
        <>
          SEO Otimizado com <span className="text-primary">Inteligência Artificial</span>
        </>
      ),
      subtitle:
        'Rankear no Google com IA: análise técnica completa, otimização de conteúdo semântico, Core Web Vitals perfeitos e estratégia de palavras-chave long-tail.',
      badge: '📈 SEO + IA',
    },
    'landing-page': {
      title: (
        <>
          Landing Pages <span className="text-primary">Focadas em Conversão</span>
        </>
      ),
      subtitle:
        'Páginas de alta conversão com design persuasivo, copywriting otimizado, formulários inteligentes e testes A/B contínuos — desenvolvidas para transformar visitantes em clientes.',
      badge: '🎯 Alta Conversão',
    },
    'site-profissional': {
      title: (
        <>
          Sites Profissionais <span className="text-primary">Modernos e Responsivos</span>
        </>
      ),
      subtitle:
        'Sites institucionais que refletem a identidade da sua marca: design moderno, 100% responsivo, performance otimizada e SEO técnico para rankear no Google.',
      badge: '🌐 Site Profissional',
    },

    // Default
    default: {
      title: (
        <>
          Landing Pages com <span className="text-primary">IA + SEO</span>
        </>
      ),
      subtitle:
        'Desenvolvemos landing pages e automações exclusivas para seu negócio: SEO que rankeia, chatbots que captam leads e analytics que provam resultados.',
      badge: '✨ Desenvolvimento Exclusivo',
    },
  };

  return contentMap[variant] || contentMap.default;
}

export function HeroPersonalized({ defaultCta, showBadge = true, forceVariant }: HeroPersonalizedProps) {
  const { heroVariant, cta, isPersonalized, utm } = useUtmTracking();
  
  // Se forceVariant estiver definido, usa ele; senão usa o UTM tracking
  const activeVariant = forceVariant || heroVariant;
  const content = HeroContent({ variant: activeVariant });
  const showPersonalizationBadge = showBadge && !forceVariant; // Não mostra badge se variante é forçada

  const handleCta = () => {
    // Abrir chat widget para falar com vendas
    const chatButton = document.querySelector('[data-chat-button]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    } else {
      // Fallback: tentar abrir chat pelo atributo data
      const chatWidget = document.querySelector('[data-chat-widget]');
      if (chatWidget) {
        (chatWidget as any).openChat?.();
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5 px-4 py-20 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Badge com indicador de personalização */}
        {showPersonalizationBadge && (
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              {isPersonalized && <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />}
              <span className="text-sm font-medium text-muted-foreground">{content.badge}</span>
              {isPersonalized && (
                <span className="ml-2 text-xs text-primary">
                  Personalizado para você ({utm.source || 'direto'})
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Badge simples para variantes forçadas */}
        {forceVariant && (
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="text-sm font-medium text-muted-foreground">{content.badge}</span>
            </div>
          </div>
        )}

        {/* Título */}
        <h1
          className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-center transition-all duration-500"
          style={{
            animation: 'fadeInUp 0.8s ease-out',
          }}
        >
          {content.title}
        </h1>

        {/* Subtítulo */}
        <p
          className="mb-10 text-lg sm:text-xl text-muted-foreground text-center max-w-2xl mx-auto transition-all duration-500"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.1s both',
          }}
        >
          {content.subtitle}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.2s both',
          }}
        >
          <Button
            size="lg"
            onClick={handleCta}
            className="group px-8 py-6 text-lg font-semibold"
          >
            Agendar Briefing
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleCta}
            className="px-8 py-6 text-lg font-semibold"
          >
            Solicitar Orçamento
          </Button>
        </div>

        {/* Metrics */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t border-border pt-8">
          <div>
            <div className="text-3xl font-bold text-primary">100% Personalizado</div>
            <p className="text-sm text-muted-foreground">Cada linha de código pensada para o seu negócio</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">SEO + IA</div>
            <p className="text-sm text-muted-foreground">Otimização técnica e automação inteligente integradas</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">ROI Comprovado</div>
            <p className="text-sm text-muted-foreground">Analytics e métricas que mostram retorno do investimento</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}

export default HeroPersonalized;
