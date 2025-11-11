/**
 * Schema.org Structured Data
 * 
 * Dados estruturados que ajudam o Google a entender melhor o conteúdo
 * e exibir rich snippets nos resultados de busca (estrelas, FAQs, breadcrumbs, etc.)
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NJR Tech',
  alternateName: 'NJR Technology',
  url: 'https://nereujr.com.br',
  logo: 'https://nereujr.com.br/logo.png',
  description: 'Desenvolvimento de landing pages, sites profissionais, SEO com IA, chatbots inteligentes e automação de processos.',
  email: 'contato@njr.tech',
  telephone: '+55-77-99809-4395',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
    addressRegion: 'BA',
  },
  sameAs: [
    // Adicione suas redes sociais aqui quando tiver
    // 'https://www.linkedin.com/company/njrtech',
    // 'https://twitter.com/njrtech',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-77-99809-4395',
    contactType: 'Customer Service',
    availableLanguage: ['Portuguese'],
    areaServed: 'BR',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NJR Tech',
  url: 'https://nereujr.com.br',
  description: 'Landing pages, sites profissionais, SEO com IA, chatbots e automação.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://nereujr.com.br/busca?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Serviços NJR Tech',
  description: 'Soluções digitais personalizadas com inteligência artificial',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'Criação de Landing Page',
      description: 'Páginas focadas em conversão, projetadas para transformar visitantes em clientes.',
      url: 'https://nereujr.com.br/servicos/landing-page',
      provider: {
        '@type': 'Organization',
        name: 'NJR Tech',
      },
      areaServed: 'BR',
      serviceType: 'Web Development',
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Criação de Site Profissional',
      description: 'Sites institucionais modernos, responsivos e que refletem a identidade da sua marca.',
      url: 'https://nereujr.com.br/servicos/site-profissional',
      provider: {
        '@type': 'Organization',
        name: 'NJR Tech',
      },
      areaServed: 'BR',
      serviceType: 'Web Development',
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'SEO Otimizado com IA',
      description: 'Otimização de conteúdo e estrutura com IA, garantindo as melhores posições no Google.',
      url: 'https://nereujr.com.br/servicos/seo-ia',
      provider: {
        '@type': 'Organization',
        name: 'NJR Tech',
      },
      areaServed: 'BR',
      serviceType: 'SEO Services',
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'Criação de Agente de IA e Automação',
      description: 'Agentes inteligentes e fluxos de automação que executam tarefas repetitivas e integram sistemas.',
      url: 'https://nereujr.com.br/servicos/automacao-ia',
      provider: {
        '@type': 'Organization',
        name: 'NJR Tech',
      },
      areaServed: 'BR',
      serviceType: 'Automation Services',
    },
    {
      '@type': 'Service',
      position: 5,
      name: 'Formulários e Chats com IA',
      description: 'Formulários inteligentes e chatbots para capturar leads e oferecer suporte 24/7.',
      url: 'https://nereujr.com.br/servicos/chatbot-ia',
      provider: {
        '@type': 'Organization',
        name: 'NJR Tech',
      },
      areaServed: 'BR',
      serviceType: 'Chatbot Development',
    },
  ],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
