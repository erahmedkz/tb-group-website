import { motion } from 'framer-motion'

export default function InfiniteCarousel({ items, speed = 30 }) {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items, ...items]

    return (
        <div className="overflow-hidden relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-6"
                animate={{
                    x: ['0%', '-33.333%']
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: speed,
                        ease: 'linear'
                    }
                }}
            >
                {duplicatedItems.map((item, index) => (
                    <div
                        key={`${item}-${index}`}
                        className="flex-shrink-0 glass-card px-8 py-6 flex items-center justify-center min-w-[200px] hover:border-primary-500/30 transition-all"
                    >
                        <span className="font-display font-semibold text-dark-300 text-lg whitespace-nowrap">
                            {item}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
