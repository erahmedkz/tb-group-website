import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import dns from 'dns'
import * as pg from 'pg'

dns.setDefaultResultOrder('ipv4first')
dotenv.config()

const sequelize = process.env.DATABASE_URL 
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectModule: pg.default || pg,
        logging: false,
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
            dialectModule: pg.default || pg,
            logging: false
        }
    )

export default sequelize