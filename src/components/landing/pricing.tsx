import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const plans = [
  {
    title: 'Start',
    price: 'Ideal para começar',
    features: [
      'Landing Page de 1 seção',
      'Design Responsivo',
      'Formulário de Contato',
      'Otimização de SEO Básica',
    ],
    isFeatured: false,
  },
  {
    title: 'Business',
    price: 'O mais popular',
    features: [
      'Landing Page com até 5 seções',
      'SEO Otimizado com IA',
      'Integração com Chatbot de IA',
      'Analytics e Relatórios',
    ],
    isFeatured: true,
  },
  {
    title: 'Performance',
    price: 'Para máxima conversão',
    features: [
      'Site com múltiplas páginas',
      'Testes A/B de conversão',
      'Suporte Prioritário',
      'Consultoria de Performance',
    ],
    isFeatured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="w-full bg-muted py-16 sm:py-20 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Planos flexíveis para o seu negócio</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Escolha o plano que melhor se adapta às suas necessidades e comece a converter.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-md items-start gap-8 py-12 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.title} className={cn('flex flex-col', plan.isFeatured && 'border-2 border-primary shadow-2xl relative scale-105')}>
              {plan.isFeatured && <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">Popular</div>}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                <CardDescription>{plan.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.isFeatured ? 'default' : 'outline'}>
                  <Link href="#">Solicitar Orçamento</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
