# NJR Tech - Project Overview

## 📋 Sobre o Projeto

**NJR Tech** é uma aplicação web desenvolvida com **Next.js**, focada em criar uma landing page de alta performance e otimizada para SEO. O projeto visa transformar a presença digital da NJR Tech (provavelmente uma agência de tecnologia/landing pages) utilizando Inteligência Artificial para otimização de conteúdo e análise de comportamento do usuário.

O projeto se destaca pelo uso de **Genkit** (SDK de IA do Google) para gerar conteúdo dinâmico (como FAQs expandidas) e uma estratégia robusta de SEO técnico.

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 15.3.3 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS, Tailwind Merge, CLSX
- **Componentes UI:** Radix UI (primitivos acessíveis), Lucide React (ícones)

### Backend & AI
- **Plataforma:** Firebase
- **AI SDK:** Genkit (`@genkit-ai/google-genai`, `@genkit-ai/next`)
- **Validação:** Zod

### Funcionalidades Chave
- **SEO Avançado:**
  - Geração dinâmica de metadados (`src/lib/seo-metadata.ts`).
  - Conteúdo expandido para serviços para aumentar autoridade tópica.
  - Schema Markup e Open Graph tags.
- **Analytics Customizado:**
  - Hook `use-analytics` para rastrear dwell time, scroll depth e interações.
  - Foco em "UX Signals" para melhor ranqueamento no Google.
- **AI Integration:**
  - Fluxos do Genkit para expansão de FAQ (`src/ai/flows/expand-faq-with-longtail.ts`).
  - Planejamento para chatbot com detecção de intenção.

## 📂 Estrutura de Pastas Importante

- `src/app`: Rotas e páginas da aplicação (Next.js App Router).
- `src/components`: Componentes React reutilizáveis (baseados em Radix UI).
- `src/lib`: Utilitários, configurações de SEO e dados estáticos expandidos.
- `src/ai`: Lógica de Inteligência Artificial e fluxos do Genkit.
- `src/hooks`: Hooks customizados (ex: analytics).
- `docs/`: Documentação adicional do projeto.

## 🚀 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento Next.js (com Turbopack).
- `npm run genkit:dev`: Inicia o ambiente de desenvolvimento do Genkit.
- `npm run build`: Compila a aplicação para produção.
- `npm start`: Inicia o servidor de produção.

## 📚 Documentação Relevante

O projeto contém arquivos de documentação detalhados na raiz:
- `IMPLEMENTATION_GUIDE.md`: Guia passo-a-passo das implementações de SEO e IA.
- `SEO_AI_STRATEGY.md`: Estratégia completa de SEO e uso de IA.
- `FILES_CREATED.md`: Registro dos arquivos gerados e seus propósitos.
