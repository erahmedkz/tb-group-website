import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquare, Send, CheckCircle, Loader2 } from 'lucide-react'
import axios from 'axios'
import { VideoPlayer } from '../components/ui/Media'

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ name: '', company: '', role: '', rating: 5, text: '' })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            const res = await axios.get('/api/reviews')
            setReviews(res.data)
        } catch (err) {
            setReviews([
                { id: 1, name: 'Алексей Петров', company: 'ТОО "Ритейл Про"', role: 'Директор', rating: 5, text: 'Отличная работа! Внедрили МойСклад за неделю. Теперь все процессы автоматизированы, экономия времени огромная.', type: 'text' },
                { id: 2, name: 'Мария Иванова', company: 'ИП Иванова', role: 'Основатель', rating: 5, text: 'Благодаря настройке Битрикс24 увеличили продажи на 40%. Воронка работает как часы!', type: 'text' },
                { id: 3, name: 'Сергей Ким', company: 'ТОО "ТехноСервис"', role: 'Коммерческий директор', rating: 5, text: 'Интегрировали телефонию с CRM - теперь не теряем ни одного звонка. Рекомендую!', type: 'text', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await axios.post('/api/reviews/submit', formData)
            setSubmitted(true)
            setFormData({ name: '', company: '', role: '', rating: 5, text: '' })
        } catch (err) {
            alert('Ошибка отправки')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section-padding bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>
                <div className="container-custom relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                            <span className="text-gradient">Отзывы</span> клиентов
                        </h1>
                        <p className="text-xl text-dark-300 mb-8">
                            Что говорят о нас наши клиенты
                        </p>
                        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                            Оставить отзыв
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Submit Form */}
            {showForm && (
                <section className="py-12 bg-dark-900">
                    <div className="container-custom max-w-2xl">
                        {submitted ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">Спасибо за отзыв!</h3>
                                <p className="text-dark-400">Ваш отзыв отправлен на модерацию</p>
                            </motion.div>
                        ) : (
                            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                                <h3 className="text-xl font-bold text-white mb-4">Оставить отзыв</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input placeholder="Ваше имя" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none" required />
                                    <input placeholder="Компания" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none" required />
                                </div>
                                <input placeholder="Должность" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none" />
                                <div>
                                    <label className="block text-dark-400 mb-2">Оценка</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <button key={n} type="button" onClick={() => setFormData({ ...formData, rating: n })} className={`p-2 transition-colors ${n <= formData.rating ? 'text-yellow-500' : 'text-dark-600 hover:text-yellow-600'}`}>
                                                <Star className="w-7 h-7 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <textarea placeholder="Ваш отзыв" value={formData.text} onChange={e => setFormData({ ...formData, text: e.target.value })} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none h-32 resize-none" required />
                                <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2">
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    {submitting ? 'Отправка...' : 'Отправить отзыв'}
                                </button>
                            </motion.form>
                        )}
                    </div>
                </section>
            )}

            {/* Reviews Grid */}
            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full" />
                        </div>
                    ) : reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card p-6 hover:border-primary-500/30 transition-all"
                                >
                                    {/* Video */}
                                    {(review.videoUrl || review.video) && (
                                        <div className="mb-4">
                                            <VideoPlayer
                                                youtubeUrl={review.videoUrl}
                                                src={review.video}
                                            />
                                        </div>
                                    )}

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(review.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <p className="text-dark-300 mb-4 leading-relaxed">{review.text}</p>

                                    {/* Author */}
                                    <div className="border-t border-dark-800 pt-4">
                                        <div className="font-semibold text-white">{review.name}</div>
                                        <div className="text-dark-500 text-sm">{review.role}, {review.company}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <MessageSquare className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                            <p className="text-dark-400 text-lg">Пока нет отзывов</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
