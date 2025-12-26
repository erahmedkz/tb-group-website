import multer from 'multer'
import path from 'path'
import { supabase } from '../config/supabase.js'

// Use memory storage as we'll upload to Supabase
const storage = multer.memoryStorage()

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

export const uploadImage = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
})

export const uploadVideo = multer({
    storage: storage,
    fileFilter: videoFilter,
    limits: { fileSize: 100 * 1024 * 1024 }
})

// Helper to upload to Supabase
export const uploadToSupabase = async (file, folder = 'images') => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = `${folder}/${uniqueSuffix}${path.extname(file.originalname)}`

    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filename, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        })

    if (error) {
        throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filename)

    return {
        url: publicUrl,
        filename: filename
    }
}

// Delete file helper
export const deleteFile = async (filename) => {
    if (!filename) return
    
    const { error } = await supabase.storage
        .from('uploads')
        .remove([filename])
    
    if (error) {
        console.error('Supabase delete error:', error.message)
    }
}