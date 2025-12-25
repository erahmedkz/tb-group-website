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
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:5173'],
    credentials: true
}))
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
app.get('/api/health', (req, res) => res.json({
    status: 'ok',
    timestamp: new Date(),
    version: '1.0.0'
}))

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
        await sequelize.authenticate()
        console.log('✅ PostgreSQL connected')
        await sequelize.sync({ alter: true })
        console.log('✅ Database synced')
    } catch (error) {
        console.error('❌ Database connection error:', error.message)
    }
}

// Start server if not in production (Vercel) or if executed directly
if (process.env.NODE_ENV !== 'production') {
    const startServer = async () => {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`)
            console.log(`📁 Uploads: http://localhost:${PORT}/uploads`)
            console.log(`📋 API Health: http://localhost:${PORT}/api/health`)
        })
    }
    startServer()
} else {
    // For Vercel, we need to ensure DB is connected on requests
    connectDB()
}

export default app
