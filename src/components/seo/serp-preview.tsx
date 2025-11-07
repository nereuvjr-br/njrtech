'use client';

import { Globe } from 'lucide-react';
import React from 'react';

interface SERPPreviewProps {
  htmlContent: string;
  title: string;
}

function parseHtml(html: string): { title: string; description: string } {
  try {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    
    return {
      title: titleMatch ? titleMatch[1] : 'Título não encontrado',
      description: descriptionMatch ? descriptionMatch[1] : 'Descrição não encontrada.',
    };
  } catch (e) {
    console.error("Error parsing HTML for SERP preview:", e);
    return {
      title: 'Erro ao ler título',
      description: 'Erro ao ler a descrição da página.'
    }
  }
}

export function SERPPreview({ htmlContent, title }: SERPPreviewProps) {
  const { title: pageTitle, description } = parseHtml(htmlContent);

  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
            <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-sm font-medium">www.seusite.com.br</div>
            <div className="text-xs text-muted-foreground">https://www.seusite.com.br</div>
          </div>
        </div>
        <h3 className="mt-2 text-xl font-medium text-blue-800 hover:underline cursor-pointer truncate">
          {pageTitle}
        </h3>
        <p className="mt-1 text-sm text-gray-700 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
