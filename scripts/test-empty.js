const { Client } = require('@notionhq/client');

require('dotenv').config({ path: '.env.local' });
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2b3b08f6-2311-8087-9a0c-dda4edd13832';

const notion = new Client({ auth: NOTION_API_KEY });

async function testEmptyInsert() {
    console.log('🧪 Tentando criar página vazia...\n');

    try {
        const result = await notion.pages.create({
            parent: { database_id: DATABASE_ID },
            properties: {}
        });

        console.log('✅ Página criada com sucesso!');
        console.log('🆔 ID:', result.id);
        console.log('🔗 URL:', result.url);
        console.log('\n📋 Propriedades retornadas:');
        console.log(JSON.stringify(result.properties, null, 2));

    } catch (error) {
        console.error('❌ Erro:', error.message);
        console.log('Código:', error.code);
    }
}

testEmptyInsert();
