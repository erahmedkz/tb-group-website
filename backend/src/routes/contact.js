import express from 'express'
import { Contact } from '../models/index.js'
import { protect } from '../middleware/auth.js'
import { antiSpam, validateContactForm } from '../middleware/antispam.js'
import { sendToBitrix24, sendEmailNotification } from '../utils/integrations.js'

const router = express.Router()

// Submit contact form (public with anti-spam)
router.post('/', antiSpam, validateContactForm, async (req, res) => {
    try {
        // Remove honeypot fields before saving
        const { website, honeypot, ...formData } = req.body

        const contact = await Contact.create(formData)

        // Send to Bitrix24 CRM (if configured)
        try {
            const bitrixLeadId = await sendToBitrix24(formData)
            if (bitrixLeadId) {
                await contact.update({ bitrixLeadId })
            }
        } catch (err) {
            console.error('Bitrix24 error:', err.message)
        }

        // Send email notification (if configured)
        try {
            await sendEmailNotification(formData)
        } catch (err) {
            console.error('Email error:', err.message)
        }

        res.status(201).json({
            message: 'Request submitted successfully',
            id: contact.id
        })
    } catch (error) {
        console.error('Contact error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

// Get all contacts (admin)
router.get('/', protect, async (req, res) => {
    try {
        const { status } = req.query
        const where = status ? { status } : {}
        const contacts = await Contact.findAll({ where, order: [['createdAt', 'DESC']] })
        res.json(contacts)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Get single contact (admin)
router.get('/:id', protect, async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id)
        if (!contact) return res.status(404).json({ error: 'Not found' })
        res.json(contact)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Update contact status (admin)
router.patch('/:id', protect, async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id)
        if (!contact) return res.status(404).json({ error: 'Not found' })
        await contact.update(req.body)
        res.json(contact)
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

// Delete contact (admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id)
        if (!contact) return res.status(404).json({ error: 'Not found' })
        await contact.destroy()
        res.json({ message: 'Deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
