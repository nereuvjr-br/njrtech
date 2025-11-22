const { Client } = require('@notionhq/client');

require('dotenv').config({ path: '.env.local' });
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2b3b08f6-2311-8087-9a0c-dda4edd13832';

const notion = new Client({ auth: NOTION_API_KEY });

async function setupDatabase() {
    console.log('🔧 Configurando colunas do banco de dados...');

    try {
        await notion.databases.update({
            database_id: DATABASE_ID,
            properties: {
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

        console.log('✅ Colunas criadas com sucesso!');
        console.log('\n📋 Colunas adicionadas:');
        console.log('  - Email (tipo: email)');
        console.log('  - WhatsApp (tipo: phone_number)');
        console.log('  - Empresa (tipo: rich_text)');
        console.log('  - Protocolo (tipo: rich_text)');
        console.log('  - Descrição do Projeto (tipo: rich_text)');
        console.log('  - Data de Recebimento (tipo: date)');

    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

setupDatabase();
