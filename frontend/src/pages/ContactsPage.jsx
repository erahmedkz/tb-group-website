import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, MessageCircle, Clock } from 'lucide-react'
import ContactForm from '../components/ui/ContactForm'
import axios from 'axios'

export default function ContactsPage() {
    const [settings, setSettings] = useState({
        phone: '+7 (700) 123-45-67',
        email: 'info@tbgroup.kz',
        address: 'г. Алматы, ул. Примерная, 123',
        workingHours: 'Пн-Пт: 9:00 - 18:00',
        telegram: 'https://t.me/tbgroup',
        whatsapp: 'https://wa.me/77001234567'
    })

    useEffect(() => {
        axios.get('/api/settings')
            .then(res => {
                if (res.data) {
                    setSettings(prev => ({ ...prev, ...res.data }))
                }
            })
            .catch(() => { })
    }, [])

    const contactInfo = [
        { icon: Phone, label: 'Телефон', value: settings.phone, href: `tel:${settings.phone?.replace(/[^+\d]/g, '')}` },
        { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
        { icon: MapPin, label: 'Адрес', value: settings.address, href: '#map' },
        { icon: Clock, label: 'Время работы', value: settings.workingHours, href: null },
    ]

    const socialLinks = [
        { name: 'Telegram', href: settings.telegram, icon: Send },
        { name: 'WhatsApp', href: settings.whatsapp, icon: MessageCircle },
    ]

    return (
        <div className="pt-20">
            <section className="section-padding bg-hero-gradient">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Свяжитесь <span className="text-gradient">с нами</span></h1>
                        <p className="text-xl text-dark-300">Оставьте заявку и мы свяжемся с вами в течение 30 минут</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="font-display text-3xl font-bold text-white mb-8">Контактная информация</h2>
                            <div className="space-y-6 mb-8">
                                {contactInfo.map((c, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center flex-shrink-0">
                                            <c.icon className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-dark-500 text-sm">{c.label}</p>
                                            {c.href ? (
                                                <a href={c.href} className="text-white text-lg hover:text-primary-400 transition-colors">{c.value}</a>
                                            ) : (
                                                <p className="text-white text-lg">{c.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div>
                                <p className="text-dark-400 mb-4">Мы в социальных сетях:</p>
                                <div className="flex gap-3">
                                    {socialLinks.map((s, i) => (
                                        <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} className="w-12 h-12 rounded-xl bg-dark-800/50 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:border-primary-500 transition-all">
                                            <s.icon className="w-5 h-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="font-display text-3xl font-bold text-white mb-8">Оставить заявку</h2>
                            <ContactForm />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="map" className="h-96 relative">
                <div className="absolute inset-0 bg-dark-900/50 z-10 flex items-center justify-center">
                    <div className="glass-card p-8 text-center">
                        <MapPin className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                        <h3 className="font-display text-xl font-bold text-white mb-2">{settings.address?.split(',')[0] || 'г. Алматы'}</h3>
                        <p className="text-dark-400">{settings.address?.split(',').slice(1).join(',').trim() || 'ул. Примерная, 123'}</p>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.6538612948!2d76.9286!3d43.2380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzE3LjMiTiA3NsKwNTUnNDMuMCJF!5e0!3m2!1sen!2s!4v1"
                    className="w-full h-full grayscale opacity-50"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>
        </div>
    )
}
