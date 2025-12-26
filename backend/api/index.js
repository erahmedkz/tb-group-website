import pg from 'pg'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { sequelize } from '../src/models/index.js'

import authRoutes from '../src/routes/auth.js'
import casesRoutes from '../src/routes/cases.js'
import reviewsRoutes from '../src/routes/reviews.js'
import contactRoutes from '../src/routes/contact.js'
import servicesRoutes from '../src/routes/services.js'
import settingsRoutes from '../src/routes/settings.js'
import uploadRoutes from '../src/routes/upload.js'
import bannersRoutes from '../src/routes/banners.js'
import contentRoutes from '../src/routes/content.js'
import adminRoutes from '../src/routes/admin.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// Custom CORS middleware
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

// Health check
app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate()
        res.json({ status: 'ok', database: 'connected', env: process.env.NODE_ENV })
    } catch (e) {
        res.status(500).json({ status: 'error', database: e.message })
    }
})

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

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: err.message || 'Internal Server Error' })
})

export default app