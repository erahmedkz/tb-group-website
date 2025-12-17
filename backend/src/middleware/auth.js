import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

export const protect = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) return res.status(401).json({ error: 'Not authorized' })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        })
        if (!user || !user.isActive) return res.status(401).json({ error: 'User not found or inactive' })

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ error: 'Not authorized' })
    }
}

export const adminOnly = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' })
    }
    next()
}
