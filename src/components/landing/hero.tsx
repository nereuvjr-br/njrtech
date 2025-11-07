import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="container grid items-center gap-8 px-4 py-24 text-center md:py-32 lg:gap-16">
        <div className="flex flex-col items-center space-y-6 fade-in-up">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Criação de Landing Pages e Sites que Convertem de Verdade
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            A NJR Tech cria páginas rápidas, otimizadas para Google e prontas para captar clientes, usando inteligência artificial.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#pricing">Quero uma Landing Page</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#pricing">Ver Planos</Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto mt-12 max-w-5xl fade-in-up" style={{ animationDelay: '0.2s' }}>
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
