import express from 'express'
import { Review } from '../models/index.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get approved reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { isApproved: true },
            order: [['order', 'ASC'], ['createdAt', 'DESC']]
        })
        res.json(reviews)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Get all reviews (admin)
router.get('/admin', protect, async (req, res) => {
    try {
        const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] })
        res.json(reviews)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Submit review (public)
router.post('/submit', async (req, res) => {
    try {
        await Review.create({ ...req.body, isFromUser: true, isApproved: false })
        res.status(201).json({ message: 'Review submitted for moderation' })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Create review (admin)
router.post('/', protect, async (req, res) => {
    try {
        const review = await Review.create({ ...req.body, isApproved: true })
        res.status(201).json(review)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Update review (admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id)
        if (!review) return res.status(404).json({ error: 'Not found' })
        await review.update(req.body)
        res.json(review)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Approve review (admin)
router.patch('/:id/approve', protect, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id)
        if (!review) return res.status(404).json({ error: 'Not found' })
        await review.update({ isApproved: true })
        res.json(review)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Delete review (admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id)
        if (!review) return res.status(404).json({ error: 'Not found' })
        await review.destroy()
        res.json({ message: 'Deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
