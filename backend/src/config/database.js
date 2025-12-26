import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import dns from 'dns'
import pg from 'pg'
const pgModule = pg;

// Принудительно используем IPv4 для разрешения имен хостов
dns.setDefaultResultOrder('ipv4first')

dotenv.config()

const sequelize = process.env.DATABASE_URL 
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectModule: pgModule, // Явно передаем драйвер
        logging: console.log,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            prepare: false
        },
        pool: {
            max: 1,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })
    : new Sequelize(
        process.env.DB_NAME || 'tbgroup',
        process.env.DB_USER || 'postgres',
        process.env.DB_PASSWORD || 'postgres',
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            dialectModule: pg, // И здесь тоже
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    )

export default sequelize
