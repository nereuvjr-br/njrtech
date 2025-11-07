import Link from 'next/link';
import { Mail, MessageSquare, Phone, Linkedin, Github } from 'lucide-react';
import { NjrTechLogo } from '@/components/icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-foreground text-background">
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="flex flex-col gap-4">
          <Link href="/">
            <NjrTechLogo className="text-background" />
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Transformando ideias em resultados digitais com o poder da Inteligência Artificial.
          </p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Contato</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:contato@njr.tech" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <Mail className="h-4 w-4" /> contato@njr.tech
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Termos de Serviço
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} NJR Tech. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
