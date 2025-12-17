// Simple anti-spam middleware (rate limiting + honeypot)
// For production, use reCAPTCHA or hCaptcha

const spamStore = new Map()

// Clean up old entries every 10 minutes
setInterval(() => {
    const now = Date.now()
    for (const [key, data] of spamStore) {
        if (now - data.timestamp > 600000) { // 10 minutes
            spamStore.delete(key)
        }
    }
}, 600000)

export const antiSpam = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress
    const now = Date.now()

    // Check honeypot field (should be empty)
    if (req.body.website || req.body.honeypot) {
        return res.status(400).json({ error: 'Spam detected' })
    }

    // Check rate limit per IP
    const userData = spamStore.get(ip)

    if (userData) {
        const timeDiff = now - userData.timestamp

        // If less than 30 seconds since last request
        if (timeDiff < 30000) {
            userData.count++

            // If more than 3 requests in 30 seconds
            if (userData.count > 3) {
                return res.status(429).json({
                    error: 'Too many requests. Please wait before submitting again.'
                })
            }
        } else {
            // Reset counter
            userData.count = 1
            userData.timestamp = now
        }
    } else {
        spamStore.set(ip, { count: 1, timestamp: now })
    }

    next()
}

// Validate form fields
export const validateContactForm = (req, res, next) => {
    const { name, phone } = req.body

    // Name validation
    if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: 'Name is required (min 2 characters)' })
    }

    // Phone validation (basic)
    if (!phone || phone.trim().length < 10) {
        return res.status(400).json({ error: 'Valid phone number is required' })
    }

    // Check for suspicious content
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /onclick/i,
        /onerror/i,
        /<iframe/i,
        /<link/i,
        /<style/i
    ]

    const allFields = [name, phone, req.body.email, req.body.message].filter(Boolean).join(' ')

    for (const pattern of suspiciousPatterns) {
        if (pattern.test(allFields)) {
            return res.status(400).json({ error: 'Invalid content detected' })
        }
    }

    next()
}
