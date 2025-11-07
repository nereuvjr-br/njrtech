import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary/10 via-background to-muted/50">
      <div className="container grid items-center gap-8 px-4 py-24 md:grid-cols-2 md:py-32 lg:gap-16">
        <div className="flex flex-col items-start space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Criação de Landing Pages e Sites que Convertem de Verdade
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
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
        <div className="flex justify-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
