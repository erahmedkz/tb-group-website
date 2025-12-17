import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, CheckCircle2, Headphones, PhoneCall, Radio, Server, Zap } from 'lucide-react'
import ContactForm from '../../components/ui/ContactForm'

const features = [
    { icon: PhoneCall, title: 'IP телефония', description: 'Виртуальные номера и качественная связь' },
    { icon: Server, title: 'Виртуальная АТС', description: 'Полноценная телефонная станция в облаке' },
    { icon: Headphones, title: 'Call-центр', description: 'Организация входящих и исходящих звонков' },
    { icon: Radio, title: 'SIP-транки', description: 'Подключение к операторам связи' },
]

const benefits = [
    'Снижение расходов на связь до 50%',
    'Запись и аналитика всех разговоров',
    'Интеграция с CRM системами',
    'Работа из любой точки мира',
    'Гарантия 12 месяцев на все работы'
]

export default function TelephonyPage() {
    return (
        <div className="pt-20">
            <section className="section-padding bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-blob" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-pink/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center">
                                <Phone className="w-7 h-7 text-white" />
                            </div>
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                            <span className="text-gradient">Телефония</span> для бизнеса
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-dark-300 mb-8">
                            SIP-решения, IP АТС и интеграция с Битрикс24 и МойСклад
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
                            <a href="#contact" className="btn-primary flex items-center gap-2">Консультация <ArrowRight className="w-5 h-5" /></a>
                            <Link to="/cases" className="btn-secondary">Кейсы</Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Возможности</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 group hover:border-accent-purple/30 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <f.icon className="w-6 h-6 text-accent-purple" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-dark-400">{f.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-dark-900/50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Преимущества</h2>
                            <div className="space-y-4">
                                {benefits.map((b, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-dark-200">{b}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Zap className="w-8 h-8 text-yellow-500" />
                                <h3 className="font-display text-2xl font-bold text-white">Быстрый запуск</h3>
                            </div>
                            <p className="text-dark-400 mb-6">Настраиваем телефонию за 2-3 дня с полной интеграцией в CRM</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                                    <div className="font-display text-3xl font-bold text-gradient mb-1">50%</div>
                                    <div className="text-dark-500 text-sm">экономия</div>
                                </div>
                                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                                    <div className="font-display text-3xl font-bold text-gradient mb-1">24/7</div>
                                    <div className="text-dark-500 text-sm">поддержка</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="contact" className="section-padding bg-dark-950">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Оставить <span className="text-gradient">заявку</span></h2>
                        </motion.div>
                        <ContactForm service="Телефония" />
                    </div>
                </div>
            </section>
        </div>
    )
}
