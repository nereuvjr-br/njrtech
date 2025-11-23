import Link from 'next/link';
import { Mail, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react';
import { NjrTechLogo } from '@/components/icons';
import { StatusBadge } from '@/components/ui/industrial-ui';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contato@njr.tech';
  const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '5577998094395';
  const whatsappDisplay = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY || '+55 (77) 99809-4395';

  return (
    <footer className="w-full bg-black border-t border-white/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container grid grid-cols-1 gap-12 px-4 py-16 md:grid-cols-4 md:px-6 relative z-10">
        <div className="flex flex-col gap-6 md:col-span-2">
          <Link href="/" className="group w-fit">
            <NjrTechLogo className="text-white group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-300" />
          </Link>

          <div className="space-y-4">
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              Transformando ideias em resultados digitais com o poder da Inteligência Artificial.
            </p>

            <div className="p-3 border border-white/10 bg-white/5 rounded-lg max-w-xs backdrop-blur-sm">
              <p className="text-xs font-mono text-primary mb-1">LOCALIZAÇÃO_SISTEMA:</p>
              <p className="text-sm font-bold text-white">Brasil</p>
              <p className="text-xs text-muted-foreground mt-1">Atendendo todo o mundo.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <h3 className="text-sm font-mono font-bold text-primary tracking-wider">CONEXÃO</h3>
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors group">
                <div className="p-1.5 rounded bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                {contactEmail}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors group"
              >
                <div className="p-1.5 rounded bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                WhatsApp: {whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div className="grid gap-6">
          <h3 className="text-sm font-mono font-bold text-primary tracking-wider">LEGAL_INFO</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4">
                Termos de Serviço
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row md:px-6">
          <p className="text-xs font-mono text-muted-foreground">
            &copy; {currentYear} NJR Tech. SYSTEM_ALL_RIGHTS_RESERVED.
          </p>

          <div className="flex items-center gap-6">
            <StatusBadge status="online" />
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-4 w-4" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
