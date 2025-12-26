import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

async function testDirect() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Попытка прямого подключения через node-postgres...');
        await client.connect();
        console.log('✅ Успешно! База данных Supabase доступна напрямую.');
        
        const res = await client.query('SELECT NOW()');
        console.log('Время на сервере БД:', res.rows[0].now);
        
        await client.end();
    } catch (err) {
        console.error('❌ Ошибка прямого подключения:', err.message);
        console.log('\nСовет: Если ошибка ETIMEDOUT, попробуйте сменить порт в DATABASE_URL с 6543 на 5432 или наоборот.');
    }
}

testDirect();
