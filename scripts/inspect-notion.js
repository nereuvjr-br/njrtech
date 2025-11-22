const { Client } = require('@notionhq/client');

require('dotenv').config({ path: '.env.local' });
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2b3b08f6-2311-8087-9a0c-dda4edd13832';

const notion = new Client({ auth: NOTION_API_KEY });

async function checkDatabase() {
    console.log('🔍 Verificando estrutura do banco de dados...\n');

    try {
        const db = await notion.databases.retrieve({ database_id: DATABASE_ID });

        console.log('📊 Banco de dados:', db.title[0]?.plain_text || 'Sem título');
        console.log('🆔 ID:', db.id);
        console.log('\n📋 Propriedades (Colunas):');

        if (db.properties && Object.keys(db.properties).length > 0) {
            Object.entries(db.properties).forEach(([name, prop]) => {
                console.log(`  ✓ "${name}" (tipo: ${prop.type})`);
            });
        } else {
            console.log('  ⚠️ Nenhuma propriedade encontrada!');
        }

    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

checkDatabase();
