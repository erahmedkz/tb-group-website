import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import dns from 'dns'

// Принудительно используем IPv4 для разрешения имен хостов
dns.setDefaultResultOrder('ipv4first')

dotenv.config()

const sequelize = process.env.DATABASE_URL 
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: console.log, // Включаем логи SQL для отладки в Vercel
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            prepare: false
        },
        pool: {
            max: 1, // В Serverless лучше использовать маленькое число
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
