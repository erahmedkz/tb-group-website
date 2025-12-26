import { sequelize } from '../models/index.js';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

async function testConnection() {
  console.log('Попытка подключения к базе данных...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Установлен (скрыт)' : 'НЕ УСТАНОВЛЕН');
  
  try {
    await sequelize.authenticate();
    console.log('✅ Успешно: Соединение с Supabase установлено.');
    
    // Проверим, можем ли мы выполнить простой запрос
    const [results] = await sequelize.query('SELECT NOW() as current_time');
    console.log('✅ Запрос выполнен успешно. Время в БД:', results[0].current_time);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);
    process.exit(1);
  }
}

testConnection();
