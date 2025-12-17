import express from 'express'
import { Settings } from '../models/index.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

const defaultSettings = {
    phone: '+7 (700) 123-45-67',
    email: 'info@tbgroup.kz',
    address: 'г. Алматы, ул. Примерная, 123',
    telegram: 'https://t.me/tbgroup',
    whatsapp: 'https://wa.me/77001234567',
    workingHours: 'Пн-Пт: 9:00 - 18:00'
}

// Get public settings
router.get('/', async (req, res) => {
    try {
        const settings = await Settings.findAll()
        const result = { ...defaultSettings }
        settings.forEach(s => { result[s.key] = s.value })
        res.json(result)
    } catch (error) {
        res.json(defaultSettings)
    }
})

// Update single setting (admin)
router.put('/:key', protect, async (req, res) => {
    try {
        const [setting, created] = await Settings.findOrCreate({
            where: { key: req.params.key },
            defaults: { key: req.params.key, value: req.body.value }
        })
        if (!created) {
            await setting.update({ value: req.body.value })
        }
        res.json(setting)
    } catch (error) {
        console.error('Settings error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

// Bulk update settings (admin)
router.post('/bulk', protect, async (req, res) => {
    try {
        const updates = req.body
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined && value !== null) {
                await Settings.findOrCreate({
                    where: { key },
                    defaults: { key, value: String(value) }
                }).then(([setting, created]) => {
                    if (!created) {
                        return setting.update({ value: String(value) })
                    }
                })
            }
        }
        res.json({ message: 'Settings saved successfully' })
    } catch (error) {
        console.error('Bulk settings error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
