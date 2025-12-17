import { motion } from 'framer-motion'
import { Users, Award, Target, Heart, CheckCircle2 } from 'lucide-react'
import AnimatedCounter from '../components/ui/AnimatedCounter'

const team = [
    { name: 'Тимур Байжанов', role: 'CEO & Founder', description: 'Эксперт по автоматизации бизнес-процессов с 10-летним опытом' },
    { name: 'Алия Сериккызы', role: 'Технический директор', description: 'Сертифицированный специалист Битрикс24 и МойСклад' },
    { name: 'Данияр Ахметов', role: 'Руководитель проектов', description: 'Управление проектами любой сложности' },
    { name: 'Айгерим Нурланова', role: 'Ведущий разработчик', description: 'Специалист по интеграциям и API' },
]

const values = [
    { icon: Target, title: 'Результат', description: 'Мы работаем на измеримый результат для вашего бизнеса' },
    { icon: Users, title: 'Партнерство', description: 'Строим долгосрочные отношения с клиентами' },
    { icon: Award, title: 'Качество', description: 'Гарантируем высокое качество всех наших решений' },
    { icon: Heart, title: 'Забота', description: 'Поддерживаем клиентов на всех этапах работы' },
]

const certificates = ['Золотой партнер Битрикс24', 'Официальный партнер МойСклад', 'Сертифицированный интегратор', 'ISO 9001:2015']

export default function AboutPage() {
    return (
        <div className="pt-20">
            <section className="section-padding bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>
                <div className="container-custom relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">О <span className="text-gradient">компании</span></h1>
                        <p className="text-xl text-dark-300 leading-relaxed">TB Group — ваш надежный партнер в автоматизации бизнеса. Мы внедряем облачные решения, которые помогают компаниям расти и развиваться.</p>
                    </motion.div>
                </div>
            </section>

            {/* Stats with animated counters */}
            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6 text-center">
                            <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                                <AnimatedCounter end={5} suffix="+" />
                            </div>
                            <div className="text-dark-400">Лет на рынке</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-6 text-center">
                            <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                                <AnimatedCounter end={100} suffix="+" />
                            </div>
                            <div className="text-dark-400">Довольных клиентов</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-6 text-center">
                            <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                                <AnimatedCounter end={200} suffix="+" />
                            </div>
                            <div className="text-dark-400">Успешных проектов</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass-card p-6 text-center">
                            <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                                24/7
                            </div>
                            <div className="text-dark-400">Техподдержка</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-dark-900/50">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Наши <span className="text-gradient">ценности</span></h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center group hover:border-primary-500/30 transition-all">
                                <div className="w-14 h-14 rounded-xl bg-primary-600/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <v.icon className="w-7 h-7 text-primary-400" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white mb-2">{v.title}</h3>
                                <p className="text-dark-400 text-sm">{v.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Наша <span className="text-gradient">команда</span></h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((t, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center mx-auto mb-4 text-white font-display font-bold text-2xl">
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="font-display text-lg font-semibold text-white mb-1">{t.name}</h3>
                                <p className="text-primary-400 text-sm mb-3">{t.role}</p>
                                <p className="text-dark-400 text-sm">{t.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-dark-900/50">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Сертификаты и <span className="text-gradient">партнерства</span></h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {certificates.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-4 flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-dark-200">{c}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
