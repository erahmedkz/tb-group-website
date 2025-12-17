import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Create upload directories if not exist
const uploadDirs = ['uploads', 'uploads/images', 'uploads/videos']
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
})

// Image storage
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

// Video storage
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

// File filters
const imageFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    }
    cb(new Error('Only image files are allowed!'))
}

const videoFilter = (req, file, cb) => {
    const allowedTypes = /mp4|webm|ogg|mov|avi/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if (extname) {
        return cb(null, true)
    }
    cb(new Error('Only video files are allowed!'))
}

// Multer instances
export const uploadImage = multer({
    storage: imageStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
})

export const uploadVideo = multer({
    storage: videoStorage,
    fileFilter: videoFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB
})

// Delete file helper
export const deleteFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}
