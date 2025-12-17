import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '' }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    useEffect(() => {
        if (!isInView) return

        let startTime
        let animationFrame

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            } else {
                setCount(end)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [isInView, end, duration])

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            {prefix}{count.toLocaleString()}{suffix}
        </motion.span>
    )
}
