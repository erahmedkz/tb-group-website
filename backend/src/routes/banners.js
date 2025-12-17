import express from 'express'
import { Banner } from '../models/index.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get active banners (public)
router.get('/', async (req, res) => {
    try {
        const banners = await Banner.findAll({
            where: { isActive: true },
            order: [['order', 'ASC']]
        })
        res.json(banners)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Get all banners (admin)
router.get('/admin', protect, async (req, res) => {
    try {
        const banners = await Banner.findAll({ order: [['order', 'ASC']] })
        res.json(banners)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Create banner (admin)
router.post('/', protect, async (req, res) => {
    try {
        const banner = await Banner.create(req.body)
        res.status(201).json(banner)
    } catch (error) {
        console.error('Create banner error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

// Update banner (admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id)
        if (!banner) return res.status(404).json({ error: 'Not found' })
        await banner.update(req.body)
        res.json(banner)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Delete banner (admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id)
        if (!banner) return res.status(404).json({ error: 'Not found' })
        await banner.destroy()
        res.json({ message: 'Deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
