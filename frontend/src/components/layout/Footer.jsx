import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react'
import axios from 'axios'

const footerLinks = {
    services: [
        { name: 'МойСклад', href: '/services/moysklad' },
        { name: 'Битрикс24', href: '/services/bitrix24' },
        { name: 'Телефония', href: '/services/telephony' },
    ],
    company: [
        { name: 'О компании', href: '/about' },
        { name: 'Кейсы', href: '/cases' },
        { name: 'Отзывы', href: '/reviews' },
        { name: 'Контакты', href: '/contacts' },
    ],
}

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const [settings, setSettings] = useState({
        phone: '+7 (700) 123-45-67',
        email: 'info@tbgroup.kz',
        address: 'г. Алматы, ул. Примерная, 123',
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

    const socialLinks = [
        { name: 'Telegram', href: settings.telegram || 'https://t.me/tbgroup', icon: Send },
        { name: 'WhatsApp', href: settings.whatsapp || 'https://wa.me/77001234567', icon: MessageCircle },
    ]

    return (
        <footer className="bg-dark-950 border-t border-dark-800/50">
            {/* Main Footer */}
            <div className="container-custom section-padding pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-accent-purple p-0.5 shadow-lg shadow-primary-500/20">
                                <img
                                    src="/logo.jpg"
                                    alt="TB Group"
                                    className="w-full h-full object-cover rounded-[10px]"
                                />
                            </div>
                            <span className="font-display font-bold text-2xl text-white">
                                TB Group
                            </span>
                        </Link>
                        <p className="text-dark-400 mb-6 leading-relaxed">
                            Внедрение и интеграция облачных решений для автоматизации вашего бизнеса.
                            Работаем с МойСклад, Битрикс24 и телефонией.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl bg-dark-800/50 border border-dark-700/50 flex items-center justify-center text-dark-400 hover:text-white hover:border-primary-500 hover:bg-primary-600/20 transition-all"
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-display font-semibold text-lg text-white mb-6">
                            Услуги
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-dark-400 hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-display font-semibold text-lg text-white mb-6">
                            Компания
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-dark-400 hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacts - Dynamic from settings */}
                    <div>
                        <h3 className="font-display font-semibold text-lg text-white mb-6">
                            Контакты
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={`tel:${settings.phone?.replace(/[^+\d]/g, '')}`}
                                    className="flex items-center gap-3 text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>{settings.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${settings.email}`}
                                    className="flex items-center gap-3 text-dark-400 hover:text-primary-400 transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>{settings.email}</span>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-3 text-dark-400">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>{settings.address}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-dark-800/50">
                <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-dark-500 text-sm">
                        © {currentYear} TB Group. Все права защищены.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link to="/privacy" className="text-dark-500 hover:text-primary-400 transition-colors">
                            Политика конфиденциальности
                        </Link>
                        <Link to="/terms" className="text-dark-500 hover:text-primary-400 transition-colors">
                            Условия использования
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
