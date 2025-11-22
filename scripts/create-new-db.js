const { Client } = require('@notionhq/client');

require('dotenv').config({ path: '.env.local' });
const NOTION_API_KEY = process.env.NOTION_API_KEY;

const notion = new Client({ auth: NOTION_API_KEY });

async function createNewDatabase() {
    console.log('🏗️ Criando novo banco de dados completo...\n');

    try {
        const response = await notion.databases.create({
            parent: {
                type: 'page_id',
                page_id: 'SEU_PAGE_ID_AQUI' // Precisamos de um page_id para criar o database
            },
            title: [
                {
                    type: 'text',
                    text: {
                        content: 'Leads do Site - NJR Tech'
                    }
                }
            ],
            properties: {
                'Nome': {
                    title: {} // Coluna de título
                },
                'Email': {
                    email: {}
                },
                'WhatsApp': {
                    phone_number: {}
                },
                'Empresa': {
                    rich_text: {}
                },
                'Protocolo': {
                    rich_text: {}
                },
                'Descrição do Projeto': {
                    rich_text: {}
                },
                'Data de Recebimento': {
                    date: {}
                }
            }
        });

        console.log('✅ Database criado com sucesso!');
        console.log('🆔 Novo ID:', response.id);
        console.log('🔗 URL:', response.url);

    } catch (error) {
        console.error('❌ Erro:', error.message);
        console.log('\n💡 Dica: Para criar um database, precisamos de um page_id pai.');
        console.log('   Você pode criar manualmente no Notion e compartilhar com a integração.');
    }
}

createNewDatabase();
