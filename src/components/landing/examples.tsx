import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const exampleProjects = [
  { id: 'example-course', title: 'Página de Cursos', imageId: 'example-course' },
  { id: 'example-law', title: 'Site de Advocacia', imageId: 'example-law' },
  { id: 'example-clinic', title: 'Clínica Médica', imageId: 'example-clinic' },
  { id: 'example-event', title: 'Página de Evento', imageId: 'example-event' },
];

export function Examples() {
  return (
    <section id="examples" className="w-full bg-background py-16 sm:py-20 lg:py-24 fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Nosso Portfólio</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nossos Trabalhos</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Veja alguns exemplos de páginas que criamos para diferentes segmentos.
            </p>
          </div>
        </div>
        <div className="mx-auto grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {exampleProjects.map((project) => {
            const image = PlaceHolderImages.find((img) => img.id === project.imageId);
            return (
              <Card key={project.id} className="group overflow-hidden rounded-xl shadow-lg">
                <CardContent className="relative p-0">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      width={400}
                      height={300}
                      className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-xl font-bold text-white text-center">{project.title}</h3>
                    <Button asChild variant="secondary" className="mt-4">
                      <Link href="#">Ver Demo</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
