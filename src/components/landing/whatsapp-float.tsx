'use client';

import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WhatsappFloat() {
    const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '5577998094395';
    const message = encodeURIComponent('Olá! Vim pelo site e gostaria de saber mais sobre criação de sites e automação.');

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "fixed bottom-4 left-4 z-50 transition-transform duration-300 hover:scale-110",
                "flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl hover:bg-[#128C7E]"
            )}
            aria-label="Conversar no WhatsApp"
        >
            <MessageSquare className="h-8 w-8 text-white fill-white" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-bounce">
                1
            </span>
        </a>
    );
}
