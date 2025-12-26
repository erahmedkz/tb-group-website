import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { sequelize } from './models/index.js'

import authRoutes from './routes/auth.js'
import casesRoutes from './routes/cases.js'
import reviewsRoutes from './routes/reviews.js'
import contactRoutes from './routes/contact.js'
import servicesRoutes from './routes/services.js'
import settingsRoutes from './routes/settings.js'
import uploadRoutes from './routes/upload.js'
import bannersRoutes from './routes/banners.js'
import contentRoutes from './routes/content.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// Custom CORS middleware to be absolutely sure
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { error: 'Too many requests' }
})
app.use('/api/', limiter)

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/cases', casesRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/banners', bannersRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', async (req, res) => {
    let dbStatus = 'ok'
    try {
        await sequelize.authenticate()
    } catch (e) {
        dbStatus = 'error: ' + e.message
    }

    res.json({
        status: 'ok',
        database: dbStatus,
        timestamp: new Date(),
        version: '1.0.0'
    })
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)

    // Multer errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large' })
    }

    res.status(500).json({ error: err.message || 'Something went wrong!' })
})

// Connect to PostgreSQL
const connectDB = async () => {
    try {
        console.log('🔄 Connecting to database...');
        await sequelize.authenticate()
        console.log('✅ PostgreSQL connected')
        
        // В Vercel лучше не делать alter: true при каждом запросе
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ alter: true })
            console.log('✅ Database synced')
        }
    } catch (error) {
        console.error('❌ Database connection error:', error.message)
        // Не завершаем процесс, чтобы API могло ответить ошибкой, а не просто упасть
    }
}

// Статические файлы (только если папка существует)
const uploadsPath = path.join(__dirname, '../uploads')
app.use('/uploads', express.static(uploadsPath))

// Инициализация БД
connectDB()

// Health check с расширенной инфой об ошибке
app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate()
        res.json({ status: 'ok', database: 'connected' })
    } catch (e) {
        res.status(500).json({ status: 'error', database: e.message })
    }
})

// Старт сервера для локальной разработки
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
}

export default app
