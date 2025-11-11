'use client';

import { SERVICES_EXPANDED } from '@/lib/services-expanded-content';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Enhanced WhatWeDo component with expandable service content
 * Adds 750+ words of SEO-optimized content without cluttering the UI
 */
export function WhatWeDoEnhanced() {
  return (
    <section id="what-we-do" className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Que Fazemos: Landing Pages com IA Focadas em Conversão
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Serviços completos de design, SEO e inteligência artificial para transformar
            visitantes em clientes
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {SERVICES_EXPANDED.map((service) => (
            <AccordionItem
              key={service.id}
              value={service.id}
              className="border rounded-lg px-6 bg-background"
            >
              <AccordionTrigger className="text-lg font-semibold hover:text-primary py-4">
                <span className="text-2xl mr-3">{service.icon}</span>
                {service.title}
              </AccordionTrigger>

              <AccordionContent className="pb-6 space-y-6">
                {/* Descrição curta (visível por padrão) */}
                <p className="text-muted-foreground">{service.shortDescription}</p>

                {/* Conteúdo expandido em abas */}
                <div className="mt-6 space-y-4">
                  {/* Overview */}
                  <div className="pl-4 border-l-2 border-primary">
                    <h4 className="font-semibold text-sm mb-2">O que é</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.expandedContent.overview}
                    </p>
                  </div>

                  {/* Process */}
                  <div className="pl-4 border-l-2 border-primary">
                    <h4 className="font-semibold text-sm mb-2">Como fazemos</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.expandedContent.process}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="pl-4 border-l-2 border-primary">
                    <h4 className="font-semibold text-sm mb-2">Benefícios</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.expandedContent.benefits}
                    </p>
                  </div>

                  {/* Technologies */}
                  {service.technologies.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm mb-3">Tecnologias</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Internal Links */}
                  {service.internalLinks.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-sm mb-3">Saiba mais</h4>
                      <div className="space-y-2">
                        {service.internalLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center text-primary hover:underline text-sm"
                            data-analytics={`link-${service.id}`}
                          >
                            <span className="mr-1">→</span>
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="mt-6 pt-4 border-t">
                    <Button
                      asChild
                      className="w-full sm:w-auto"
                      data-analytics={`button-${service.title}`}
                    >
                      <Link href="#chat-widget">
                        Solicitar Orçamento
                      </Link>
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* SEO-optimized structured data hint */}
        <div className="mt-12 p-4 bg-background/50 rounded-lg border text-center text-sm text-muted-foreground">
          <p>
            Todos os nossos serviços combinam expertise em design, desenvolvimento e
            inteligência artificial para resultados mensuráveis e ROI comprovado.
          </p>
        </div>
      </div>
    </section>
  );
}
