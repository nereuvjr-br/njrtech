import Link from 'next/link';
import { Mail, MessageSquare } from 'lucide-react';
import { NjrTechLogo } from '@/components/icons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contato@njr.tech';
  const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '5577998094395';
  const whatsappDisplay = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY || '+55 (77) 99809-4395';

  return (
    <footer className="w-full bg-foreground text-background">
      <div className="container grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-4 md:px-6">
        <div className="flex flex-col gap-4 md:col-span-2">
          <Link href="/">
            <NjrTechLogo className="text-background" />
          </Link>
          <p className="max-w-xs text-sm text-muted">
            Transformando ideias em resultados digitais com o poder da Inteligência Artificial.
          </p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Contato</h3>
          <ul className="space-y-2">
            <li>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm text-muted hover:text-primary">
                <Mail className="h-4 w-4" /> {contactEmail}
              </a>
            </li>
            <li>
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-primary"
              >
                <MessageSquare className="h-4 w-4" /> WhatsApp: {whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted hover:text-primary">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted hover:text-primary">
                Termos de Serviço
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
          <p className="text-sm text-muted">&copy; {currentYear} NJR Tech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
