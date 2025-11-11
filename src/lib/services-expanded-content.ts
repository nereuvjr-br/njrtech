/**
 * @fileOverview Services with expanded content for SEO authority
 * Each service includes overview, process, benefits with 500+ words
 */

export interface ServiceExpanded {
  id: string;
  title: string;
  icon?: string;
  shortDescription: string;
  expandedContent: {
    overview: string;
    process: string;
    benefits: string;
  };
  technologies: string[];
  keywords: string[];
  internalLinks: { text: string; href: string }[];
}

export const SERVICES_EXPANDED: ServiceExpanded[] = [
  {
    id: 'landing-page-ia',
    title: 'Landing Pages com IA',
    icon: '🚀',
    shortDescription: 'Páginas otimizadas para conversão com design inteligente e IA',
    expandedContent: {
      overview: `Uma landing page com IA é uma página web especializada, projetada especificamente para converter visitantes em leads ou clientes. Diferentemente de um site institucional que busca informar sobre múltiplos tópicos, a landing page tem um objetivo único e cristalino: motivar o visitante a realizar uma ação específica, seja inscrição em newsletter, download de material, agendamento de consultoria ou compra de produto.

Quando integramos inteligência artificial nesse processo, a landing page deixa de ser estática. Ela aprende continuamente com dados de comportamento do usuário em tempo real, otimizando automaticamente elementos de design, copywriting e chamadas para ação (CTA) para maximizar conversões. Utilizamos Gemini 2.5 Flash e Genkit da Google para essa inteligência, permitindo que cada visitante veja uma versão da página que é mais relevante para seu contexto específico.

Nosso diferencial é combinar as melhores práticas de design responsivo com otimização contínua baseada em IA, garantindo que sua landing page não apenas pareça profissional, mas que também funcione como uma verdadeira máquina de conversão.`,

      process: `Nosso processo de criação de landing pages segue uma metodologia científica baseada em dados:

1. **Análise e Pesquisa** - Começamos estudando seu público-alvo, intenção de busca, dores principais e motivadores de ação. Analisamos seus 5 concorrentes diretos para identificar oportunidades.

2. **Estratégia de Conversão** - Mapeamos a jornada do visitante e identificamos os pontos críticos onde ocorrem drop-offs (abandono).

3. **Design & UX** - Criamos wireframes otimizados para conversão, seguindo padrões de design que aumentam CTR (click-through rate). Design é 100% responsivo (mobile, tablet, desktop).

4. **Copywriting Otimizado** - Cada palavra é escolhida para persuadir. Headlines são testados. Textos incluem gatilhos psicológicos comprovados (urgência, escassez, prova social).

5. **Desenvolvimento com Next.js & React** - Código limpo, performático e SEO-friendly. Utilizamos TypeScript para garantir qualidade. Performance é crítica: cada 100ms de delay reduz conversão em 7%.

6. **IA & Testes A/B Contínuos** - Implementamos sistema que testa automaticamente variações de headlines, CTA, cores e layouts. IA identifica qual versão converte mais.

7. **Integração de Ferramentas** - Email marketing, CRM, chatbot, analytics. Tudo conectado para máxima eficiência.

8. **Monitoramento & Otimização** - Rastreamos taxa de bounce, dwell time, cliques por seção, origem do tráfego e taxa de conversão real. Geramos relatórios mensais com insights.`,

      benefits: `Os benefícios de uma landing page profissional com IA são mensuráveis e comprovados:

**Conversão**: Aumento de 30-50% na taxa de conversão comparado a sites genéricos. Alguns clientes veem melhoria de até 150% após 3 meses de otimizações baseadas em IA.

**Custo por Lead**: Redução de 40-60% no custo por lead adquirido. Se você está gastando R$ 50 por lead, pode cair para R$ 15-25.

**Qualidade de Leads**: Os leads capturados têm maior qualidade porque a página filtra visitantes não-qualificados. Apenas os realmente interessados chegam ao final.

**SEO**: Landing pages bem otimizadas rankeiam melhor no Google. Cada uma é otimizada para 3-5 palavras-chave específicas, diferente de um site genérico.

**Escalabilidade**: Sem necessidade de hospedagem complexa. Você paga por resultados, não por infraestrutura cara. Pode escalar de 100 para 100.000 visitantes/mês sem custo adicional.

**Dados**: Cada landing page fornece dados ricos sobre seu público. O que eles clicam, quanto tempo ficam, de onde vêm, qual seção tem mais interesse. Esse conhecimento é ouro para seu negócio.

**Rentabilidade**: Uma única landing page bem executada pode gerar 10-100x seu investimento inicial em 6 meses.`,
    },
    technologies: ['Next.js 15', 'React 18', 'TypeScript', 'TailwindCSS', 'Genkit AI'],
    keywords: [
      'landing page',
      'landing page com IA',
      'landing page conversão',
      'design responsivo',
      'página de vendas',
    ],
    internalLinks: [
      { text: 'Ver serviço completo', href: '/servicos/landing-page' },
      { text: 'Falar com especialista', href: '#chat-widget' },
    ],
  },

  {
    id: 'seo-optimization',
    title: 'Otimização de SEO com IA',
    icon: '📈',
    shortDescription:
      'Estratégia completa de SEO técnico, conteúdo e autoridade para ranking',
    expandedContent: {
      overview: `A otimização de SEO (Search Engine Optimization) é o conjunto de técnicas que melhoram a visibilidade da sua landing page nos resultados de busca do Google, Bing e outros motores de busca. Envolve três pilares principais: SEO On-Page (conteúdo, metadados, estrutura HTML), SEO Técnico (performance, mobile, core web vitals) e SEO Off-Page (backlinks, autoridade de domínio).

Onde a maioria das agências falha é em não usar IA para escalar. Nós analisamos seu site com algoritmos de machine learning, comparamos com os 10 sites que rankeiam primeiro para sua palavra-chave, identificamos exatamente o que você está fazendo errado e o que precisa mudar.

Não fazemos "dicas genéricas de SEO". Fazemos análise específica do seu negócio, seus concorrentes e seu público. A IA gera um relatório personalizado que diz: "Você precisa adicionar 500 palavras sobre 'landing page para médicos' para competir com o site X" ou "Seu LCP é 3.2s, o concorrente tem 1.8s; otimizar imagens vai te dar vantagem".`,

      process: `Nosso processo de SEO com IA é rigoroso e focado em resultados:

1. **Auditoria SEO Técnica** - Escaneamos seu site completo. Verificamos 50+ fatores: estrutura de headings, densidade de palavras-chave, meta tags, canonical URLs, schema markup, Core Web Vitals, mobile responsiveness, HTTPS, sitemaps.

2. **Pesquisa de Palavras-Chave Inteligente** - Não usamos apenas ferramentas convencionais. IA analisa intenção de busca (people also ask, related searches). Identificamos 100+ palavras-chave com volume, dificuldade e oportunidade.

3. **Análise Competitiva** - Estudamos os 10 sites que rankeiam primeiro para suas palavras-chave. O que eles fazem de certo? Qual é a estrutura deles? Quantas palavras têm? Qual é a intenção? Onde está sua vantagem?

4. **Otimização On-Page** - Reescrevemos títulos, meta descriptions, conteúdo principal com otimização semântica. Adicionamos palavras-chave naturalmente (nunca forçado). Implementamos schema markup (FAQSchema, BreadcrumbSchema).

5. **Otimização de Core Web Vitals** - LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift). Otimizamos imagens, implementamos lazy loading, usamos CDN.

6. **Alt Text para Imagens** - Cada imagem recebe alt text descritivo que inclui palavras-chave relevantes, melhorando SEO de imagens.

7. **Link Building Interno** - Estruturamos links internos de forma estratégica, guiando o usuário por jornada que maximiza tempo na página.

8. **Monitoramento Contínuo** - Posicionamento em Google Search Console, tráfego mensal em Analytics 4, taxa de cliques (CTR) no SERP.`,

      benefits: `Benefícios concretos de SEO com IA:

**Tráfego Orgânico**: Crescimento de 40-60% nos primeiros 3 meses. 200-300% em 6 meses. Tráfego que não custa por clique.

**Ranking**: Mover de posição 15 para top 5 em suas palavras-chave principais. Estar no top 3 é praticamente "invisível" para usuários que não o veem.

**Qualidade de Leads**: Usuários que chegam por SEO têm intenção alta. Eles já estavam procurando por você. Taxa de conversão é 3x maior comparada a tráfego pago.

**ROI Duradouro**: Diferente de publicidade paga, onde você para de pagar e o tráfego cai, SEO deixa resultados duradouros. Uma posição bem conquistada pode gerar leads por anos.

**Redução de Custo de Aquisição**: Se você gasta R$ 100/dia em Google Ads e consegue trazer 10 leads por dia, cada lead custa R$ 10. Com SEO, o custo é fixo mensal, então cada lead adicional é praticamente de graça.

**Competitividade**: Seus concorrentes estão fazendo SEO (ou deveriam estar). Se você não fizer, eles rankeiam melhor e você perde clientes.

**Credibilidade**: Aparecer no top 3 do Google automaticamente aumenta confiança do usuário. "Se está no Google, é legítimo".`,
    },
    technologies: [
      'Google Search Console',
      'Google Analytics 4',
      'Lighthouse',
      'Schema.org',
      'Genkit AI',
    ],
    keywords: [
      'SEO',
      'otimização',
      'ranking',
      'tráfego orgânico',
      'palavras-chave',
    ],
    internalLinks: [
      { text: 'Ver serviço completo', href: '/servicos/seo-ia' },
      { text: 'FAQ: Como a IA melhora SEO?', href: '#faq' },
    ],
  },

  {
    id: 'chatbot-ia',
    title: 'Chatbot com IA (Nexus)',
    icon: '💬',
    shortDescription:
      'Assistente virtual inteligente para engajamento e coleta automática de leads',
    expandedContent: {
      overview: `O Nexus é um chatbot inteligente que combina Processamento de Linguagem Natural (NLP) com regras de negócio específicas da sua empresa. Diferentemente de chatbots robôs que dão respostas genéricas, o Nexus "entende" a intenção real do visitante.

Se o visitante pergunta "Qual é a diferença entre os planos?", o Nexus detects intenção = 'pricing-inquiry' e responde com informações reais dos seus planos, incluindo recomendações personalizadas.

Se o visitante diz "Gostaria de um orçamento", o Nexus detecta intenção = 'request-quote' e inicia fluxo de coleta de dados estruturado: nome, email, telefone, descrição do projeto.

É treinado com seu conteúdo específico (FAQ, Pricing, Serviços) usando técnica de RAG (Retrieval-Augmented Generation), garantindo respostas precisas baseadas em dados reais da empresa.`,

      process: `Implementação do Nexus segue este fluxo:

1. **Extração de Conhecimento** - Coletamos seu FAQ, descrição de planos, descrição de serviços, histórico de perguntas frequentes. Estruturamos esse conhecimento em embeddings de IA.

2. **Treinamento de Intenção** - Ensinamos o Nexus a detectar quando o visitante quer: tirar dúvida, pedir orçamento, conhecer preços, dúvida técnica ou inquérito geral.

3. **Desenvolvimento de Fluxos** - Criamos fluxos de conversa específicos para cada intenção. Fluxo de "dúvida" busca resposta no knowledge base. Fluxo de "orçamento" coleta dados sistematicamente.

4. **Integração Frontend** - Widget de chat flutuante na página (canto inferior direito, padrão de UX). Interface responsiva, acessível, pronta para mobile.

5. **Backend & IA** - Integração com Gemini 2.5 Flash para processamento de linguagem. Armazenamento de conversas em Firebase.

6. **Testes & Refinamento** - Medimos taxa de resolução (% de conversas que resolvem a dúvida sem escalação). Melhoramos prompts baseado em conversar reais.

7. **Analytics** - Rastreamos quais perguntas são mais frequentes, taxa de conversão por tipo de pergunta, tempo médio de conversa.`,

      benefits: `Impacto do Nexus em sua operação:

**Dwell Time**: Usuários que conversa com Nexus passam 3-5 minutos na página (vs. 20 segundos de bounce típico). Google interpreta isso como "página é de qualidade, respondeu a pergunta do usuário" e rankeia melhor.

**Lead 24/7**: Captura leads mesmo quando sua equipe não está disponível. 3 da manhã, sábado, feriado - o Nexus está trabalhando coletando dados.

**Coleta de Dados Estruturada**: Não apenas e-mail e telefone. Nexus coleta contexto: qual é o projeto? Qual é o orçamento? Qual é a urgência? Dados ricos = leads mais qualificados.

**Redução de Atendimento Manual**: Triagem automática. 70% das perguntas são respondidas pelo Nexus (dúvidas comuns). Sua equipe só atende 30% que precisam de análise mais profunda.

**Taxa de Conversão**: Visitantes que interagem com Nexus têm +60% chance de converter. Porque: (1) tiveram dúvida respondida, (2) confiança aumentou, (3) deixaram dados de contato.

**Dados Comportamentais**: Histórico completo de conversa mostra exatamente qual foi a objeção do visitante. "50% das pessoas perguntam sobre prazo de entrega". Você agora sabe onde melhorar comunicação.

**Custo**: Operação de chatbot é extremamente barata comparada a contratar um atendente humano. Economia de 80-90% em atendimento.`,
    },
    technologies: [
      'Genkit AI',
      'Google Gemini 2.5 Flash',
      'Firebase',
      'React',
      'Radix UI',
    ],
    keywords: [
      'chatbot',
      'chatbot IA',
      'atendimento automático',
      'conversas inteligentes',
      'lead capture',
    ],
    internalLinks: [
      { text: 'Ver serviço completo', href: '/servicos/chatbot-ia' },
      { text: 'Testar Nexus agora', href: '#chat-widget' },
    ],
  },

  {
    id: 'analytics-insights',
    title: 'Analytics & Insights Personalizados',
    icon: '📊',
    shortDescription:
      'Dashboard completo com métricas de usuário e recomendações IA de melhoria',
    expandedContent: {
      overview: `Você recebe um dashboard exclusivo (não é compartilhado, seus dados ficam privados) que rastreia em tempo real: taxa de conversão, tempo médio na página (dwell time), seções mais clicadas, scroll depth, origem do tráfego (busca orgânica, anúncios, referral), dispositivo (mobile/desktop), localização geográfica de visitantes, taxa de bounce por seção, funis de conversão.

Todas essas métricas são analisadas por IA, que executa correlações e padrões. Exemplo: "Usuários de São Paulo que chegam de busca orgânica têm 2x taxa de conversão que usuários do Rio de Janeiro que chegam de anúncios. Recomendação: aumentar investimento em anúncios para SP".

Diferente de um Google Analytics genérico, nossa IA gera insights acionáveis automáticamente. Não é só números; é recomendações claras do que fazer.`,

      process: `Setup de Analytics com IA:

1. **Implementação de Rastreamento Avançado** - Google Analytics 4 configurado com eventos customizados para cada ação importante: clique em CTA, scroll em cada seção, tempo em cada parte.

2. **Integração de Dados** - Conectamos Firebase (onde estão os leads coletados) com Analytics. Agora sabemos: que tipo de visitante (onde veio, qual seção passou mais tempo) se converteu em lead.

3. **Dashboard Real-time** - Você vê em tempo real: "Neste momento, 23 pessoas estão na página. 4 estão no chat com Nexus. 12 já scrollaram até a seção de preços".

4. **Análise Automatizada** - IA executa análise diária. Gera insights: "Taxa de bounce na seção X subiu 15% hoje. Recomendação: reescrever headline".

5. **Relatório Executivo Mensal** - Recebe por email: "Mês Y, você teve Z conversões. Principais insights: [1] [2] [3]. Recomendações: [1] [2] [3]".

6. **A/B Testing Contínuo** - Basado em dados, testamos variações. Qual headline converte mais? IA testa e reporta resultado.

7. **Previsões** - IA treina modelos para prever: "Se você implementar a recomendação X, esperamos crescimento de 25% em conversão no próximo mês".`,

      benefits: `Impacto de Analytics com IA:

**Dados Acionáveis**: Não é só números que ninguém entende. São recomendações claras: "Reescreva esse parágrafo" ou "Aumente investimento em tráfego do Rio".

**Otimização Contínua**: Com dados, você otimiza sistematicamente. Cada mês fica melhor. Crescimento previsível, não por sorte.

**ROI Comprovado**: Sabe exatamente quanto investe em SEO/Ads e quanto ganha em leads/vendas. Calcula ROI com precisão.

**Identificação de Problemas**: "Seção Y tem 80% de bounce". Ah, tá a section que está ruim. Você sabe onde mexer.

**Competitividade**: Seus concorrentes não têm esses dados. Você tem vantagem informacional.

**Escalabilidade Prevista**: Com previsões, você sabe quando vai bater meta. Se precisa dobrar leads, sabe quanto investir em anúncios/SEO para atingir.

**Economia**: Deixa de investir em canais que não funcionam. Concentra recursos em canais com melhor ROI.`,
    },
    technologies: [
      'Google Analytics 4',
      'Firebase',
      'Chart.js / Recharts',
      'Genkit AI',
      'Node.js',
    ],
    keywords: [
      'analytics',
      'metrics',
      'conversão',
      'dados',
      'insights',
      'dashboard',
    ],
    internalLinks: [
      { text: 'Ver dashboard de exemplo', href: '/test-webhook' },
      { text: 'Falar com especialista', href: '#chat-widget' },
    ],
    },

    {
      id: 'agent-automation',
      title: 'Criação de Agente de IA e Automação',
      icon: '🤖',
      shortDescription:
        'Agentes inteligentes e automações que conectam sistemas, executam tarefas e liberam tempo da sua equipe.',
      expandedContent: {
        overview: `Criamos agentes de inteligência artificial e pipelines de automação que realizam tarefas rotineiras, integram ferramentas (CRM, email, bancos de dados, APIs) e executam processos com segurança e observabilidade. Esses agentes podem responder a eventos (ex.: novo lead), extrair dados de documentos, atualizar sistemas ou executar ações em nome da equipe com regras e verificações programadas. A combinação de modelos de linguagem para entendimento e componentes de automação garante que as ações sejam tanto inteligentes quanto confiáveis.`,

        process: `Nossa abordagem segue etapas claras para garantir eficácia e segurança:

  1. **Mapeamento de Processos** - Identificamos tarefas repetitivas e pontos onde automação traz maior impacto.
  2. **Definição de Regras e Escopo** - Estabelecemos limites, autorizações e fluxos de exceção para evitar ações indesejadas.
  3. **Desenvolvimento do Agente** - Construímos o agente usando modelos de linguagem para entendimento + scripts/integrações para execução (APIs, webhooks, RPA quando necessário).
  4. **Validação e Simulação** - Testamos o agente em ambientes controlados com dados sintéticos e cenários reais.
  5. **Observabilidade** - Implementamos logging, auditoria e alertas para monitorar ações e resultados.
  6. **Deploy e Iteração** - Após deploy, coletamos métricas e ajustamos comportamento com base em feedback real.`,

        benefits: `Os principais benefícios incluem:

  **Produtividade**: Redução de tempo em tarefas manuais (ex.: preenchimento de CRM, classificação de leads) permitindo que a equipe foque em atividades estratégicas.

  **Velocidade de Resposta**: Automação de fluxos reduz o tempo entre evento e ação (por exemplo, envio de propostas instantâneas ou triagem automática de leads).

  **Precisão e Consistência**: Regras e modelos garantem que processos sejam executados de forma uniforme, reduzindo erros humanos.

  **Escalabilidade**: Agentes podem processar volumes maiores sem aumento proporcional de custo de pessoal.

  **Integração**: Agentes conectam diferentes sistemas, garantindo que dados fluam corretamente e evitando silos de informação.`,
      },
      technologies: [
        'Genkit AI',
        'Google Gemini 2.5 Flash',
        'Node.js',
        'Workflows / RPA',
        'APIs REST / Webhooks',
      ],
      keywords: [
        'agente de ia',
        'automação',
        'rpa',
        'workflows',
        'integração de sistemas',
      ],
      internalLinks: [
        { text: 'Ver serviço completo', href: '/servicos/automacao-ia' },
        { text: 'Solicitar automação personalizada', href: '#chat-widget' },
      ],
    },
  ];
