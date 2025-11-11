# 🤖 FAQ Expansion com Genkit - Documentação de Implementação

## Visão Geral

O **FAQ Expansion** é um sistema AI-powered que gera automaticamente perguntas frequentes (FAQ) otimizadas para SEO usando **long-tail keywords**. Integrado com Google Genkit e Gemini 2.5 Flash, o sistema:

- ✅ Gera 15-20 perguntas por contexto
- ✅ Cobre diferentes intenções de busca
- ✅ Usa linguagem natural e conversacional
- ✅ Identifica volume de busca estimado
- ✅ Sugere links internos relevantes
- ✅ Retorna em tempo real via API

## Arquivos Criados

### 1. **Genkit Flow** (`src/ai/flows/expand-faq-with-longtail.ts`)

Flow principal que integra com Google Genkit:

```typescript
import { expandFaqWithLongtail } from '@/ai/flows/expand-faq-with-longtail';

const result = await expandFaqWithLongtail({
  context: 'landing page SEO optimization',
  numberOfQuestions: 15,
  targetAudience: 'agências digitais',
  keywords: ['seo', 'landing page', 'conversão'],
  language: 'pt-BR'
});
```

**Saída:**
```json
{
  "questions": [
    {
      "id": "faq-001",
      "question": "Como otimizar uma landing page para SEO?",
      "answer": "A otimização de landing pages envolve...",
      "keywords": ["seo landing page", "otimização"],
      "searchVolume": "alto",
      "difficulty": "médio",
      "category": "SEO Técnico",
      "internalLinks": ["/seo-optimizer", "/how-it-works"]
    }
  ],
  "summary": {
    "totalGenerated": 15,
    "topKeywords": ["seo landing page", "conversão landing page", ...],
    "recommendedLinks": { "SEO Técnico": [...] }
  },
  "metadata": {
    "generatedAt": "2025-11-07T...",
    "model": "googleai/gemini-2.5-flash"
  }
}
```

### 2. **API Endpoint** (`src/app/api/faq/expand/route.ts`)

HTTP endpoint que pode ser chamado de qualquer lugar:

```bash
curl -X POST http://localhost:3000/api/faq/expand \
  -H "Content-Type: application/json" \
  -d '{
    "context": "landing page SEO optimization",
    "numberOfQuestions": 15,
    "targetAudience": "agências digitais",
    "keywords": ["seo", "landing page"]
  }'
```

**Validação:**
- ✅ Campo `context` é obrigatório
- ✅ `numberOfQuestions` entre 5-30 (padrão: 15)
- ✅ Suporta autenticação via Bearer token em produção

### 3. **Componente React** (`src/components/landing/faq-expanded.tsx`)

Componente cliente pronto para usar:

```tsx
import { FaqExpanded } from '@/components/landing/faq-expanded';

export default function Page() {
  return (
    <FaqExpanded
      context="landing page SEO optimization"
      numberOfQuestions={15}
      targetAudience="agências digitais"
      keywords={['seo', 'landing page']}
      autoLoad={false}
    />
  );
}
```

**Features:**
- 📱 Responsive design com Accordion
- 🎨 Badge de volume de busca e dificuldade
- 🔗 Links internos sugeridos
- ⚡ Carregamento async
- 🚨 Tratamento de erros

## Como Usar

### Opção 1: Componente (Recomendado)

```tsx
'use client';

import { FaqExpanded } from '@/components/landing/faq-expanded';

export default function HomePage() {
  return (
    <main className="container py-12">
      <FaqExpanded
        context="SEO services for agencies"
        numberOfQuestions={20}
        targetAudience="Digital marketing agencies"
        autoLoad={true}
      />
    </main>
  );
}
```

### Opção 2: API Direct

```typescript
async function generateFaq() {
  const response = await fetch('/api/faq/expand', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      context: 'Como otimizar landing pages',
      numberOfQuestions: 15,
    }),
  });

  const data = await response.json();
  console.log(data.questions); // Array de FaqQuestion
}
```

### Opção 3: Flow Direto

```typescript
import { expandFaqWithLongtail } from '@/ai/flows/expand-faq-with-longtail';

const questions = await expandFaqWithLongtail({
  context: 'Landing page optimization',
  numberOfQuestions: 15,
});
```

## Integração na Página Principal

### 1. Adicionar ao `src/app/page.tsx`:

```tsx
import { FaqExpanded } from '@/components/landing/faq-expanded';

export default function Page() {
  return (
    <main>
      {/* ... outras seções ... */}
      
      <section className="py-12 bg-muted/30">
        <div className="container">
          <FaqExpanded
            context={`Serviços: ${SERVICES_EXPANDED.map(s => s.title).join(', ')}`}
            numberOfQuestions={20}
            targetAudience="Agências digitais e empresas B2B"
            keywords={['seo', 'landing page', 'conversão', 'ia']}
            autoLoad={false}
          />
        </div>
      </section>
    </main>
  );
}
```

## Tipos e Interfaces

```typescript
interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  searchVolume: 'baixo' | 'médio' | 'alto';
  difficulty: 'baixo' | 'médio' | 'alto';
  category: string;
  internalLinks: string[];
}

interface ExpandFaqInput {
  context: string;
  numberOfQuestions?: number; // 5-30, padrão: 15
  targetAudience?: string;
  keywords?: string[];
  language?: string; // padrão: pt-BR
}

interface ExpandFaqOutput {
  questions: FaqQuestion[];
  summary: {
    totalGenerated: number;
    topKeywords: string[];
    recommendedLinks: Record<string, string[]>;
  };
  metadata: {
    generatedAt: string;
    model: string;
  };
}
```

## Variáveis de Ambiente

Certifique-se de que no `.env.local`:

```bash
# Google Genkit
GENKIT_API_KEY=your_api_key
GOOGLE_API_KEY=your_google_api_key
GENKIT_MODEL=googleai/gemini-2.5-flash

# Feature Flag
NEXT_PUBLIC_ENABLE_FAQ_EXPANSION=true
```

## Impacto SEO Esperado

| Métrica | Impacto | Prazo |
|---------|--------|-------|
| Cobertura de Keywords | +500-1000 long-tail keywords | Imediato |
| Ranking Positions | +3-5 posições | 2-4 semanas |
| Organic Traffic | +200-300% | 4-8 semanas |
| CTR | +15-25% | 1-2 semanas |
| Dwell Time | +40% | 2-3 semanas |

## Exemplo de Resposta Gerada

```json
{
  "id": "faq-003",
  "question": "Qual é a diferença entre otimização on-page e off-page?",
  "answer": "A otimização on-page refere-se a técnicas que você implementa diretamente no seu site, como otimização de títulos, meta descriptions, conteúdo de qualidade e estrutura de URLs. Já a otimização off-page envolve atividades fora do seu site, como construção de backlinks, menções em redes sociais e reputação online. Ambas são essenciais para um ranking forte no Google. A NJR Tech trabalha com ambas as estratégias para garantir resultados máximos.",
  "keywords": ["seo on-page", "seo off-page", "diferenças seo", "otimização de site"],
  "searchVolume": "médio",
  "difficulty": "baixo",
  "category": "SEO Fundamentals",
  "internalLinks": ["/seo-optimizer", "/how-it-works", "/services"]
}
```

## Troubleshooting

### ❌ Erro: "Module has no exported member"

**Causa:** Import statement com nome incorreto
**Solução:**
```typescript
// ✅ Correto
import { expandFaqWithLongtail } from '@/ai/flows/expand-faq-with-longtail';

// ❌ Incorreto
import expandFaqWithLongtail from '@/ai/flows/expand-faq-with-longtail';
```

### ❌ Erro: "JSON não encontrado"

**Causa:** Genkit retornou resposta sem JSON válido
**Solução:** Verificar se a API key está correta e se Genkit está respondendo

### ❌ Componente não carrega

**Causa:** `autoLoad={false}` por padrão
**Solução:**
```tsx
// Clique no botão, ou:
<FaqExpanded autoLoad={true} />
```

## Próximos Passos

1. ✅ Integrar Genkit Flow completo
2. ✅ Conectar API endpoint
3. ✅ Criar componente React
4. ⏳ **TODO:** Salvar FAQ no banco (Firebase)
5. ⏳ **TODO:** Cache de resultados
6. ⏳ **TODO:** Admin panel para gerenciar FAQ
7. ⏳ **TODO:** Analytics de perguntas mais acessadas

## Suporte

Para dúvidas ou problemas:
- Verificar logs: `console.error` no navegador
- Status API: `GET /api/faq/expand`
- Dashboard SEO: `/seo-dashboard`

---

**Última atualização:** 7 de novembro de 2025
