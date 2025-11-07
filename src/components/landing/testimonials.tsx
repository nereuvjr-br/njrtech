import Image from 'next/image';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'João Silva',
    title: 'CEO da Startup X',
    testimonial: 'A NJR Tech transformou nossa presença online. A nova landing page aumentou nossas conversões em 50% em apenas um mês!',
    avatarId: 'avatar-1',
  },
  {
    name: 'Maria Oliveira',
    title: 'Advogada',
    testimonial: 'O processo foi incrivelmente rápido e profissional. O site ficou moderno e passa a credibilidade que eu precisava.',
    avatarId: 'avatar-2',
  },
  {
    name: 'Carlos Santos',
    title: 'Organizador de Eventos',
    testimonial: 'Graças à página criada pela NJR, vendemos todos os ingressos para nosso evento em tempo recorde. Recomendo!',
    avatarId: 'avatar-3',
  },
];

const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
    ))}
  </div>
);

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-muted py-16 sm:py-20 lg:py-24 fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Depoimentos</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">O que nossos clientes dizem</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Confiança e resultados que falam por si.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => {
            const avatarImage = PlaceHolderImages.find((img) => img.id === item.avatarId);
            return (
              <Card key={index} className="flex flex-col justify-between bg-background rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <StarRating />
                  <p className="mt-4 text-muted-foreground italic">"{item.testimonial}"</p>
                </CardContent>
                <div className="flex items-center gap-4 border-t p-6">
                  {avatarImage && (
                    <Avatar>
                      <AvatarImage src={avatarImage.imageUrl} alt={item.name} data-ai-hint={avatarImage.imageHint} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
