import express from 'express'
import { protect } from '../middleware/auth.js'
import { uploadImage, uploadVideo, deleteFile } from '../middleware/upload.js'

const router = express.Router()

// Upload single image
router.post('/image', protect, uploadImage.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }
        const fileUrl = `/uploads/images/${req.file.filename}`
        res.json({
            message: 'Image uploaded successfully',
            url: fileUrl,
            filename: req.file.filename
        })
    } catch (error) {
        res.status(500).json({ error: 'Upload failed' })
    }
})

// Upload multiple images
router.post('/images', protect, uploadImage.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' })
        }
        const files = req.files.map(file => ({
            url: `/uploads/images/${file.filename}`,
            filename: file.filename
        }))
        res.json({
            message: 'Images uploaded successfully',
            files
        })
    } catch (error) {
        res.status(500).json({ error: 'Upload failed' })
    }
})

// Upload video
router.post('/video', protect, uploadVideo.single('video'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }
        const fileUrl = `/uploads/videos/${req.file.filename}`
        res.json({
            message: 'Video uploaded successfully',
            url: fileUrl,
            filename: req.file.filename
        })
    } catch (error) {
        res.status(500).json({ error: 'Upload failed' })
    }
})

// Delete file
router.delete('/:type/:filename', protect, (req, res) => {
    try {
        const { type, filename } = req.params
        if (!['images', 'videos'].includes(type)) {
            return res.status(400).json({ error: 'Invalid file type' })
        }
        const filePath = `uploads/${type}/${filename}`
        deleteFile(filePath)
        res.json({ message: 'File deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Delete failed' })
    }
})

export default router
