'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useChat } from '@/hooks/use-chat';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');
  const { setOpen: setChatOpen } = useChat();
  
  const openChat = () => setChatOpen(true);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="container grid lg:grid-cols-2 items-center gap-12 px-4 py-24 md:py-32">
        <div className="flex flex-col items-center lg:items-start space-y-6 fade-in-up text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Confiança e resultados que falam por si
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground md:text-xl">
            A NJR Tech cria páginas rápidas, otimizadas para Google e prontas para captar clientes, usando inteligência artificial.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" onClick={openChat}>Quero uma Landing Page</Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#why-us">Nossos Diferenciais</Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto max-w-5xl fade-in-up" style={{ animationDelay: '0.2s' }}>
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              width={1000}
              height={571}
              className="rounded-xl shadow-2xl shadow-primary/10"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
