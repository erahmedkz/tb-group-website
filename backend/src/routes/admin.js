import express from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import { Case, Review, Contact, Settings, PageContent, Banner } from '../models/index.js'
import fs from 'fs'
import path from 'path'

const router = express.Router()

// Create JSON backup (works without pg_dump)
router.post('/backup', protect, adminOnly, async (req, res) => {
    try {
        const backupDir = path.join(process.cwd(), 'backups')
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true })
        }

        // Collect all data
        const data = {
            timestamp: new Date().toISOString(),
            cases: await Case.findAll(),
            reviews: await Review.findAll(),
            contacts: await Contact.findAll(),
            settings: await Settings.findAll(),
            content: await PageContent.findAll(),
            banners: await Banner.findAll()
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const filename = `backup-${timestamp}.json`
        const filepath = path.join(backupDir, filename)

        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8')

        res.json({
            message: 'Бэкап успешно создан!',
            file: filename
        })
    } catch (error) {
        console.error('Backup error:', error)
        res.status(500).json({ error: 'Ошибка создания бэкапа' })
    }
})

// List backups
router.get('/backups', protect, adminOnly, (req, res) => {
    try {
        const backupDir = path.join(process.cwd(), 'backups')

        if (!fs.existsSync(backupDir)) {
            return res.json([])
        }

        const files = fs.readdirSync(backupDir)
            .filter(f => f.endsWith('.json') || f.endsWith('.sql'))
            .map(f => {
                const stats = fs.statSync(path.join(backupDir, f))
                return {
                    name: f,
                    size: stats.size,
                    created: stats.birthtime
                }
            })
            .sort((a, b) => new Date(b.created) - new Date(a.created))

        res.json(files)
    } catch (error) {
        res.status(500).json({ error: 'Failed to list backups' })
    }
})

// Download backup
router.get('/backup/:filename', protect, adminOnly, (req, res) => {
    try {
        const filepath = path.join(process.cwd(), 'backups', req.params.filename)

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'Backup not found' })
        }

        res.download(filepath)
    } catch (error) {
        res.status(500).json({ error: 'Download failed' })
    }
})

// Delete backup
router.delete('/backup/:filename', protect, adminOnly, (req, res) => {
    try {
        const filepath = path.join(process.cwd(), 'backups', req.params.filename)

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'Backup not found' })
        }

        fs.unlinkSync(filepath)
        res.json({ message: 'Backup deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Delete failed' })
    }
})

export default router
