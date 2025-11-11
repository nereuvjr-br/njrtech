# 📋 Como Integrar FAQ Expansion na Página Principal

## Adição Rápida (5 minutos)

### 1. Edite `src/app/page.tsx`

Adicione estas linhas no seu arquivo:

```tsx
// Adicione no topo do arquivo:
import { FaqExpanded } from '@/components/landing/faq-expanded';

// Adicione na renderização principal (entre outras seções):
export default function Page() {
  return (
    <main>
      {/* ... outras seções ... */}

      {/* Nova seção FAQ */}
      <section id="faq" className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Perguntas Frequentes</h2>
            <p className="text-muted-foreground">
              Tire suas dúvidas sobre SEO, landing pages e otimização com IA
            </p>
          </div>
          
          <FaqExpanded
            context={`Serviços de SEO, landing pages, chatbots e analytics com IA`}
            numberOfQuestions={18}
            targetAudience="Agências digitais e empresas B2B"
            keywords={['seo', 'landing page', 'conversão', 'ai', 'ranking google']}
          />
        </div>
      </section>

      {/* ... resto da página ... */}
    </main>
  );
}
```

### 2. Adicione no Menu de Navegação

Se tiver menu em `src/components/landing/header.tsx`:

```tsx
// No menu, adicione:
<a href="#faq" className="hover:text-primary">
  FAQ
</a>
```

## Customização

### Props Disponíveis

```tsx
<FaqExpanded
  context="Seu contexto aqui"              // Descrição do negócio
  numberOfQuestions={15}                   // 5-30, padrão 15
  targetAudience="Seu público"             // Quem deve ver
  keywords={['palavra1', 'palavra2']}      // Keywords para focar
  autoLoad={false}                         // Carregar ao mount?
/>
```

### Estilos Personalizados

```tsx
<div className="py-16 bg-gradient-to-b from-background to-primary/5">
  <div className="container max-w-4xl">
    <FaqExpanded {...props} />
  </div>
</div>
```

### Botão Manual em Lugar Diferente

```tsx
'use client';

import { useState } from 'react';
import { FaqExpanded } from '@/components/landing/faq-expanded';

export default function CustomFaq() {
  const [showFaq, setShowFaq] = useState(false);

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowFaq(!showFaq)}
        className="px-6 py-2 bg-primary text-white rounded-lg"
      >
        {showFaq ? 'Ocultar' : 'Mostrar'} FAQ
      </button>

      {showFaq && <FaqExpanded />}
    </div>
  );
}
```

## Testando

### 1. Teste no localhost

```bash
npm run dev
# Acesse http://localhost:3000/seo-dashboard
# Verifique que NEXT_PUBLIC_ENABLE_FAQ_EXPANSION=true
```

### 2. Teste a API

```bash
curl -X POST http://localhost:3000/api/faq/expand \
  -H "Content-Type: application/json" \
  -d '{
    "context": "landing page SEO",
    "numberOfQuestions": 5
  }'
```

### 3. Teste o Componente

```bash
# No console do navegador:
fetch('/api/faq/expand', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ context: 'test' })
}).then(r => r.json()).then(console.log);
```

## Troubleshooting

### ❌ "Componente não aparece"

1. Verifique se `NEXT_PUBLIC_ENABLE_FAQ_EXPANSION=true` no `.env.local`
2. Verifique se o arquivo `faq-expanded.tsx` existe
3. Reinicie o servidor: `npm run dev`

### ❌ "Botão 'Gerar' não funciona"

1. Verifique console do navegador (F12 → Console)
2. Veja se a requisição vai para `/api/faq/expand`
3. Teste diretamente a API com curl

### ❌ "Nenhuma pergunta aparece"

1. Clique no botão "Gerar novas perguntas"
2. Aguarde o carregamento (pode levar 10-30 segundos)
3. Verifique console para erros

## Próximos Passos

1. ✅ Adicionar componente
2. ⏳ Integrar com Firebase para salvar FAQ
3. ⏳ Cache de 24h para perguntas
4. ⏳ Admin panel para editar/deletar
5. ⏳ Analytics de FAQ mais acessadas

## Suporte

- 📖 Docs completos: `docs/FAQ_EXPANSION.md`
- 🔍 Dashboard SEO: `/seo-dashboard`
- 🧪 Teste a API: `GET /api/faq/expand`

---

**Criado:** 7 de novembro de 2025
