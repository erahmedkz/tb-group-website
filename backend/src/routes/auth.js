import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        if (!user.isActive) return res.status(401).json({ error: 'Account is disabled' })

        res.json({
            token: generateToken(user.id),
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

// Get current user
router.get('/me', protect, (req, res) => {
    res.json({ user: { id: req.user.id, email: req.user.email, name: req.user.name, role: req.user.role } })
})

// Create initial admin (run once)
router.post('/setup', async (req, res) => {
    try {
        const adminExists = await User.findOne({ where: { role: 'admin' } })
        if (adminExists) return res.status(400).json({ error: 'Admin already exists' })

        const admin = await User.create({
            email: process.env.ADMIN_EMAIL || 'admin@tbgroup.kz',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            name: 'Administrator',
            role: 'admin'
        })
        res.json({ message: 'Admin created', email: admin.email })
    } catch (error) {
        console.error('Setup error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
