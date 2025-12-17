import { useState, useRef, useEffect } from 'react'
import { Image, Play } from 'lucide-react'

// Lazy loaded image component
export function LazyImage({ src, alt, className = '', fallback = null }) {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const imgRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && imgRef.current) {
                    imgRef.current.src = src
                    observer.disconnect()
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        )

        if (imgRef.current) {
            observer.observe(imgRef.current)
        }

        return () => observer.disconnect()
    }, [src])

    if (error) {
        return fallback || (
            <div className={`bg-dark-800 flex items-center justify-center ${className}`}>
                <Image className="w-12 h-12 text-dark-600" />
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            {!loaded && (
                <div className="absolute inset-0 bg-dark-800 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <img
                ref={imgRef}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                loading="lazy"
            />
        </div>
    )
}

// Video player component with lazy loading
export function VideoPlayer({ src, youtubeUrl, className = '' }) {
    const [loaded, setLoaded] = useState(false)
    const containerRef = useRef(null)

    // Convert YouTube URL to embed
    const getYoutubeEmbedUrl = (url) => {
        if (!url) return null
        const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/)
        return match ? `https://www.youtube.com/embed/${match[1]}` : null
    }

    const embedUrl = getYoutubeEmbedUrl(youtubeUrl)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoaded(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // YouTube video
    if (embedUrl) {
        return (
            <div ref={containerRef} className={`aspect-video bg-dark-800 rounded-xl overflow-hidden ${className}`}>
                {loaded ? (
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-16 h-16 text-dark-600" />
                    </div>
                )}
            </div>
        )
    }

    // Local video
    if (src) {
        return (
            <div ref={containerRef} className={`aspect-video bg-dark-800 rounded-xl overflow-hidden ${className}`}>
                {loaded ? (
                    <video
                        src={src}
                        controls
                        className="w-full h-full object-cover"
                        preload="metadata"
                    >
                        Ваш браузер не поддерживает видео.
                    </video>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-16 h-16 text-dark-600" />
                    </div>
                )}
            </div>
        )
    }

    return null
}

// Case card image with proper display
export function CaseImage({ src, title, type, className = '' }) {
    const typeColors = {
        moysklad: 'from-blue-500 to-cyan-500',
        bitrix24: 'from-primary-500 to-accent-purple',
        telephony: 'from-accent-purple to-accent-pink'
    }

    if (!src) {
        return (
            <div className={`bg-gradient-to-br ${typeColors[type] || 'from-primary-500 to-accent-purple'} opacity-30 ${className}`} />
        )
    }

    return <LazyImage src={src} alt={title} className={className} />
}
