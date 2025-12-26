import express from 'express'
import { protect } from '../middleware/auth.js'
import { uploadImage, uploadVideo, uploadToSupabase, deleteFile } from '../middleware/upload.js'

const router = express.Router()

// Upload single image
router.post('/image', protect, uploadImage.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }
        
        const result = await uploadToSupabase(req.file, 'images')
        
        res.json({
            message: 'Image uploaded successfully',
            url: result.url,
            filename: result.filename
        })
    } catch (error) {
        console.error('Upload error:', error)
        res.status(500).json({ error: 'Upload failed: ' + error.message })
    }
})

// Upload multiple images
router.post('/images', protect, uploadImage.array('images', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' })
        }
        
        const uploadPromises = req.files.map(file => uploadToSupabase(file, 'images'))
        const results = await Promise.all(uploadPromises)
        
        res.json({
            message: 'Images uploaded successfully',
            files: results.map(r => ({ url: r.url, filename: r.filename }))
        })
    } catch (error) {
        console.error('Upload error:', error)
        res.status(500).json({ error: 'Upload failed' })
    }
})

// Upload video
router.post('/video', protect, uploadVideo.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }
        
        const result = await uploadToSupabase(req.file, 'videos')
        
        res.json({
            message: 'Video uploaded successfully',
            url: result.url,
            filename: result.filename
        })
    } catch (error) {
        console.error('Upload error:', error)
        res.status(500).json({ error: 'Upload failed' })
    }
})

// Delete file
router.delete('/', protect, async (req, res) => {
    try {
        const { filename } = req.body
        if (!filename) {
            return res.status(400).json({ error: 'Filename is required' })
        }
        await deleteFile(filename)
        res.json({ message: 'File deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Delete failed' })
    }
})

export default router
