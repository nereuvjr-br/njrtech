const { Client } = require('@notionhq/client');

require('dotenv').config({ path: '.env.local' });
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2b3b08f6-2311-8087-9a0c-dda4edd13832';

const notion = new Client({ auth: NOTION_API_KEY });

const sampleLeads = [
    {
        name: 'João Silva',
        email: 'joao.silva@exemplo.com',
        whatsapp: '5583999991234',
        company: 'Silva Tech Solutions',
        project: 'Criação de site institucional com blog integrado',
        protocol: 'LEAD-001'
    },
    {
        name: 'Maria Santos',
        email: 'maria@padarianova.com',
        whatsapp: '5583988887654',
        company: 'Padaria Nova Era',
        project: 'Sistema de pedidos online via WhatsApp',
        protocol: 'LEAD-002'
    },
    {
        name: 'Carlos Oliveira',
        email: 'carlos@advocaciadigital.com.br',
        whatsapp: '5583977776543',
        company: 'Oliveira Advocacia Digital',
        project: 'SEO para aparecer nas buscas de Campina Grande',
        protocol: 'LEAD-003'
    },
    {
        name: 'Ana Paula Costa',
        email: 'ana@belezamoderna.com',
        whatsapp: '5583966665432',
        company: 'Beleza Moderna Estética',
        project: 'Landing page para campanha de Black Friday',
        protocol: 'LEAD-004'
    },
    {
        name: 'Roberto Ferreira',
        email: 'roberto@autoescolarapida.com',
        whatsapp: '5583955554321',
        company: 'Auto Escola Rápida',
        project: 'Chatbot para agendamento de aulas',
        protocol: 'LEAD-005'
    }
];

async function runTest() {
    console.log('🚀 Iniciando teste de inserção no Notion...');
    console.log(`📅 Database: Leads do Site`);
    console.log(`🆔 ID: ${DATABASE_ID}\n`);

    for (const lead of sampleLeads) {
        try {
            console.log(`📝 Inserindo: ${lead.name} (${lead.company})...`);

            await notion.pages.create({
                parent: { database_id: DATABASE_ID },
                properties: {
                    'Nome': {
                        title: [
                            {
                                text: {
                                    content: `${lead.protocol} - ${lead.name}`,
                                },
                            },
                        ],
                    },
                    'E-mail': {
                        email: lead.email,
                    },
                    'WhatsApp': {
                        phone_number: lead.whatsapp,
                    },
                    'Empresa': {
                        rich_text: [
                            {
                                text: {
                                    content: lead.company,
                                },
                            },
                        ],
                    },
                    'Protocolo': {
                        rich_text: [
                            {
                                text: {
                                    content: lead.protocol,
                                },
                            },
                        ],
                    },
                    'Descrição do Projeto': {
                        rich_text: [
                            {
                                text: {
                                    content: lead.project,
                                },
                            },
                        ],
                    },
                    'Data de Recebimento': {
                        date: {
                            start: new Date().toISOString(),
                        },
                    },
                },
            });

            console.log(`   ✅ Sucesso!`);
        } catch (error) {
            console.error(`   ❌ Erro: ${error.message}`);
        }
    }

    console.log('\n🏁 Teste finalizado!');
    console.log('🔗 Verifique seu Notion: https://www.notion.so/2b3b08f6231180879a0cdda4edd13832');
}

runTest();
