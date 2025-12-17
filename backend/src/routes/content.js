import express from 'express'
import { PageContent } from '../models/index.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get page content (public)
router.get('/:page', async (req, res) => {
    try {
        const contents = await PageContent.findAll({
            where: { page: req.params.page }
        })
        // Convert to object format
        const result = {}
        contents.forEach(c => {
            if (!result[c.section]) result[c.section] = {}
            result[c.section][c.key] = c.value
        })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Get all content (admin)
router.get('/', protect, async (req, res) => {
    try {
        const contents = await PageContent.findAll({
            order: [['page', 'ASC'], ['section', 'ASC']]
        })
        res.json(contents)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Update or create content (admin)
router.put('/:page/:section/:key', protect, async (req, res) => {
    try {
        const { page, section, key } = req.params
        const { value, type } = req.body

        const [content, created] = await PageContent.findOrCreate({
            where: { page, section, key },
            defaults: { page, section, key, value, type: type || 'text' }
        })

        if (!created) {
            await content.update({ value, type: type || content.type })
        }

        res.json(content)
    } catch (error) {
        console.error('Content update error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

// Bulk update (admin)
router.post('/bulk', protect, async (req, res) => {
    try {
        const { contents } = req.body // Array of {page, section, key, value, type}

        for (const item of contents) {
            await PageContent.upsert({
                page: item.page,
                section: item.section,
                key: item.key,
                value: item.value,
                type: item.type || 'text'
            })
        }

        res.json({ message: 'Contents updated' })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
