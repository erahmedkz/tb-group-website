import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle, Loader2, ChevronDown } from 'lucide-react'
import api from '../../utils/api'

const serviceOptions = [
    { value: '', label: 'Выберите услугу' },
    { value: 'moysklad', label: 'МойСклад' },
    { value: 'bitrix24', label: 'Битрикс24' },
    { value: 'telephony', label: 'Телефония' },
    { value: 'integration', label: 'Интеграция систем' },
    { value: 'consulting', label: 'Консультация' },
    { value: 'other', label: 'Другое' },
]

export default function ContactForm({ service = '', showServiceSelect = true }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [selectedService, setSelectedService] = useState(service)
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: { service }
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setError('')

        try {
            await api.post('contact', {
                ...data,
                service: selectedService
            })
            setIsSubmitted(true)
            reset()
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка отправки. Попробуйте позже.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleServiceSelect = (value, label) => {
        setSelectedService(value)
        setValue('service', value)
        setIsSelectOpen(false)
    }

    if (isSubmitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">Заявка отправлена!</h3>
                <p className="text-dark-400 mb-6">Мы свяжемся с вами в течение 30 минут</p>
                <button onClick={() => setIsSubmitted(false)} className="btn-secondary">Отправить ещё</button>
            </motion.div>
        )
    }

    const selectedLabel = serviceOptions.find(o => o.value === selectedService)?.label || 'Выберите услугу'

    return (
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit(onSubmit)} className="glass-card p-8">
            {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Honeypot field */}
            <input
                type="text"
                {...register('website')}
                style={{ position: 'absolute', left: '-9999px' }}
                tabIndex={-1}
                autoComplete="off"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-dark-300 mb-2 text-sm font-medium">Имя</label>
                    <input
                        {...register('name', { required: 'Введите имя', minLength: { value: 2, message: 'Минимум 2 символа' } })}
                        className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="Ваше имя"
                    />
                    {errors.name && <span className="text-red-400 text-sm mt-1 block">{errors.name.message}</span>}
                </div>
                <div>
                    <label className="block text-dark-300 mb-2 text-sm font-medium">Телефон</label>
                    <input
                        {...register('phone', { required: 'Введите телефон', minLength: { value: 10, message: 'Минимум 10 цифр' } })}
                        className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="+7 (700) 000-00-00"
                    />
                    {errors.phone && <span className="text-red-400 text-sm mt-1 block">{errors.phone.message}</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-dark-300 mb-2 text-sm font-medium">Email</label>
                    <input
                        {...register('email', { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Неверный формат email' } })}
                        type="email"
                        className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="email@example.com"
                    />
                    {errors.email && <span className="text-red-400 text-sm mt-1 block">{errors.email.message}</span>}
                </div>
                {showServiceSelect && (
                    <div className="relative">
                        <label className="block text-dark-300 mb-2 text-sm font-medium">Услуга</label>
                        <input type="hidden" {...register('service')} value={selectedService} />

                        {/* Custom styled select */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsSelectOpen(!isSelectOpen)}
                                className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-left text-white focus:border-primary-500 focus:outline-none transition-colors flex items-center justify-between"
                            >
                                <span className={selectedService ? 'text-white' : 'text-dark-500'}>
                                    {selectedLabel}
                                </span>
                                <ChevronDown className={`w-5 h-5 text-dark-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown menu */}
                            {isSelectOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-dark-700 rounded-xl overflow-hidden z-50 shadow-xl shadow-black/50"
                                >
                                    {serviceOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => handleServiceSelect(opt.value, opt.label)}
                                            className={`w-full px-4 py-3 text-left transition-colors hover:bg-primary-600/20 ${selectedService === opt.value
                                                    ? 'bg-primary-600/30 text-primary-400'
                                                    : 'text-dark-200 hover:text-white'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-dark-300 mb-2 text-sm font-medium">Сообщение</label>
                <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                    placeholder="Опишите вашу задачу..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" />Отправка...</>
                ) : (
                    <><Send className="w-5 h-5" />Отправить заявку</>
                )}
            </button>

            <p className="text-dark-500 text-xs mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
        </motion.form>
    )
}
