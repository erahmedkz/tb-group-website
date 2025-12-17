import express from 'express'
import { Case } from '../models/index.js'
import { protect } from '../middleware/auth.js'
import { Op } from 'sequelize'

const router = express.Router()

// Get all published cases
router.get('/', async (req, res) => {
    try {
        const { type } = req.query
        const where = { isPublished: true }
        if (type && type !== 'all') where.type = type

        const cases = await Case.findAll({
            where,
            order: [['order', 'ASC'], ['createdAt', 'DESC']]
        })
        res.json(cases)
    } catch (error) {
        console.error('Cases error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

// Get all cases (admin)
router.get('/admin', protect, async (req, res) => {
    try {
        const cases = await Case.findAll({
            order: [['order', 'ASC'], ['createdAt', 'DESC']]
        })
        res.json(cases)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Get single case
router.get('/:id', async (req, res) => {
    try {
        const caseItem = await Case.findByPk(req.params.id)
        if (!caseItem) return res.status(404).json({ error: 'Not found' })
        res.json(caseItem)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Create case (admin)
router.post('/', protect, async (req, res) => {
    try {
        const caseItem = await Case.create(req.body)
        res.status(201).json(caseItem)
    } catch (error) {
        console.error('Create case error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

// Update case (admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const caseItem = await Case.findByPk(req.params.id)
        if (!caseItem) return res.status(404).json({ error: 'Not found' })
        await caseItem.update(req.body)
        res.json(caseItem)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Delete case (admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const caseItem = await Case.findByPk(req.params.id)
        if (!caseItem) return res.status(404).json({ error: 'Not found' })
        await caseItem.destroy()
        res.json({ message: 'Deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
