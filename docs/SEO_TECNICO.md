# 🚀 SEO Técnico Otimizado - NJR Tech

Este documento descreve todas as otimizações de SEO implementadas no site da NJR Tech.

---

## 📋 Índice

1. [robots.txt](#robotstxt)
2. [Sitemap XML](#sitemap-xml)
3. [Meta Tags](#meta-tags)
4. [Schema.org (Dados Estruturados)](#schemaorg-dados-estruturados)
5. [Verificação e Testes](#verificação-e-testes)

---

## 🤖 robots.txt

**Arquivo:** `src/app/robots.ts`

### O que faz?
O arquivo `robots.txt` controla o acesso dos robôs de busca a áreas específicas do site, evitando o rastreamento de páginas irrelevantes, duplicadas ou privadas. Um `robots.txt` ajustado otimiza o **crawl budget**, priorizando o rastreamento das páginas realmente importantes para o seu negócio.

### Configurações aplicadas:

✅ **Permite rastreamento** de todas as páginas públicas  
✅ **Bloqueia** endpoints de API (`/api/`)  
✅ **Bloqueia** arquivos internos do Next.js (`/_next/`)  
✅ **Bloqueia** páginas de teste (`/test-*`)  
✅ **Bloqueia** rastreadores de SEO tools (Ahrefs, Semrush) para economizar crawl budget  
✅ **Referencia** o sitemap XML para facilitar descoberta de URLs  

### Acesso:
```
https://seusite.com/robots.txt
```

---

## 🗺️ Sitemap XML

**Arquivo:** `src/app/sitemap.ts`

### O que faz?
Sitemaps XML são **mapas do site** que listam todas as URLs importantes. Eles facilitam a descoberta desses endereços pelo **Googlebot**, acelerando a indexação de novos conteúdos ou alterações.

### Estrutura de prioridades:

| Prioridade | Páginas | Frequência |
|-----------|---------|------------|
| **1.0** | Homepage | Semanal |
| **0.9** | Serviços principais | Mensal |
| **0.7** | Ferramentas/Dashboard | Semanal |
| **0.6** | Páginas institucionais | Mensal |
| **0.3** | Páginas legais | Anual |

### URLs incluídas:

- ✅ Página principal (`/`)
- ✅ Serviços: Landing Page, Site Profissional, SEO IA, Automação, Chatbot
- ✅ Ferramentas: SEO Optimizer, SEO Dashboard
- ✅ Institucionais: Sobre, Contato, Portfolio
- ✅ Legais: Privacidade, Termos

### Acesso:
```
https://seusite.com/sitemap.xml
```

---

## 🏷️ Meta Tags

**Arquivo:** `src/app/layout.tsx`

### O que faz?
Meta tags, especialmente as de **descrição** (`description`) e de **controle de indexação** (`robots`, `noindex`, `nofollow`), ajudam mecanismos de busca a entender como cada página deve aparecer nos resultados ou se deve ser ignorada.

### Otimizações aplicadas:

✅ **Title otimizado** com palavras-chave primárias  
✅ **Description** persuasiva (limite de 160 caracteres)  
✅ **Keywords** relevantes para o negócio  
✅ **Open Graph** para compartilhamento em redes sociais (Facebook, LinkedIn, WhatsApp)  
✅ **Twitter Card** para melhor visualização no Twitter/X  
✅ **Canonical URL** para evitar conteúdo duplicado  
✅ **Robots meta tag** para controle de indexação  
✅ **Verificação** do Google Search Console (adicione seu código)  

### Meta tags principais:

```html
<title>NJR Tech - Landing Pages, Sites e Automação com IA | SEO Otimizado</title>
<meta name="description" content="Desenvolvemos landing pages de alta conversão, sites profissionais, SEO com IA, chatbots inteligentes e automação sob medida." />
<meta name="keywords" content="landing page, SEO otimizado, chatbot IA, automação..." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://seusite.com/" />
```

### Open Graph (redes sociais):

```html
<meta property="og:title" content="NJR Tech - Landing Pages, Sites e Automação com IA" />
<meta property="og:description" content="Soluções digitais personalizadas..." />
<meta property="og:image" content="https://seusite.com/og-image.jpg" />
<meta property="og:type" content="website" />
```

---

## 🔍 Schema.org (Dados Estruturados)

**Arquivo:** `src/lib/schema-org.ts`

### O que faz?
Dados estruturados usando **Schema.org** ajudam o Google a entender melhor o conteúdo e exibir **rich snippets** nos resultados de busca, como:

- ⭐ Avaliações com estrelas
- ❓ FAQs expandidos
- 🍞 Breadcrumbs (migalhas de pão)
- 📞 Informações de contato
- 🏢 Dados da empresa

### Schemas implementados:

#### 1. **Organization Schema**
Informações sobre a empresa:
- Nome, logo, descrição
- Email, telefone
- Endereço
- Redes sociais

#### 2. **Website Schema**
Dados do site:
- Nome, URL
- Descrição
- Search Action (busca interna)

#### 3. **Services Schema**
Lista de serviços oferecidos:
- Landing Pages
- Sites Profissionais
- SEO com IA
- Automação
- Chatbots

#### 4. **FAQ Schema**
Perguntas frequentes (aplicado no componente FAQ):
- Exibe FAQs expandidos no Google
- Melhora CTR nos resultados de busca

#### 5. **Breadcrumb Schema** (pronto para uso)
Navegação hierárquica:
- Melhora UX nos resultados
- Facilita navegação

---

## ✅ Verificação e Testes

### Ferramentas para validar SEO:

1. **Google Search Console**
   - Envie o sitemap: `https://seusite.com/sitemap.xml`
   - Verifique indexação
   - Monitore erros de rastreamento

2. **Rich Results Test** (Google)
   - URL: https://search.google.com/test/rich-results
   - Teste dados estruturados (Schema.org)

3. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Teste Core Web Vitals

4. **Lighthouse** (Chrome DevTools)
   - Teste SEO, Performance, Acessibilidade
   - Meta tags, structured data

5. **Validador de Schema.org**
   - URL: https://validator.schema.org/
   - Valide JSON-LD

---

## 📊 Checklist de SEO Técnico

- [x] robots.txt configurado e otimizado
- [x] Sitemap XML gerado dinamicamente
- [x] Meta tags completas (title, description, keywords)
- [x] Open Graph para redes sociais
- [x] Twitter Card
- [x] Canonical URLs
- [x] Schema.org: Organization
- [x] Schema.org: Website
- [x] Schema.org: Services
- [x] Schema.org: FAQ
- [ ] Google Search Console configurado (adicione seu código)
- [ ] Google Analytics 4 configurado
- [ ] Core Web Vitals otimizados
- [ ] HTTPS habilitado
- [ ] Imagens otimizadas (WebP, lazy loading)
- [ ] OG Image criada (1200x630px)

---

## 🚀 Próximos Passos

1. **Adicione seu código do Google Search Console** em `src/app/layout.tsx`:
   ```typescript
   verification: {
     google: 'SEU-CODIGO-AQUI',
   }
   ```

2. **Crie a imagem Open Graph** (`/public/og-image.jpg`):
   - Tamanho: 1200x630px
   - Formato: JPG ou PNG
   - Conteúdo: Logo + texto persuasivo

3. **Configure Google Analytics 4** no `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Envie o sitemap** no Google Search Console:
   - Acesse: https://search.google.com/search-console
   - Adicione propriedade
   - Envie sitemap: `https://seusite.com/sitemap.xml`

5. **Monitore performance** com ferramentas:
   - Google Search Console (indexação, erros)
   - PageSpeed Insights (velocidade)
   - Lighthouse (SEO score)

---

## 📝 Atualizações Necessárias

Quando adicionar novas páginas, atualize:

1. **Sitemap** (`src/app/sitemap.ts`):
   - Adicione nova URL
   - Defina prioridade e frequência

2. **robots.txt** (`src/app/robots.ts`):
   - Se necessário, bloqueie URLs específicas

3. **Schema.org** (`src/lib/schema-org.ts`):
   - Adicione novos serviços
   - Atualize FAQs

---

## 🎯 Resultados Esperados

Com todas essas otimizações implementadas, você pode esperar:

✅ **Indexação mais rápida** no Google  
✅ **Melhor posicionamento** para palavras-chave estratégicas  
✅ **Rich snippets** nos resultados (FAQs, dados da empresa)  
✅ **Maior CTR** (taxa de cliques) nos resultados de busca  
✅ **Melhor compartilhamento** em redes sociais (Open Graph)  
✅ **Crawl budget otimizado** (Google prioriza páginas importantes)  

---

**Desenvolvido por NJR Tech** 🚀  
Última atualização: Novembro 2025
