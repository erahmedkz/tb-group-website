import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageSquare, ArrowRight, CheckCircle2, Users, GitBranch, BarChart3, Calendar, FileText, Settings, Zap } from 'lucide-react'
import ContactForm from '../../components/ui/ContactForm'

const features = [
    { icon: Users, title: 'CRM система', description: 'Управление клиентами, сделками и воронкой продаж' },
    { icon: GitBranch, title: 'Бизнес-процессы', description: 'Автоматизация рутинных задач и сложных сценариев' },
    { icon: BarChart3, title: 'Аналитика', description: 'Подробные отчеты по продажам и эффективности' },
    { icon: Calendar, title: 'Задачи и проекты', description: 'Планирование и контроль дедлайнов' },
    { icon: FileText, title: 'Документы', description: 'Совместная работа и автоматическое создание документов' },
    { icon: Settings, title: 'Интеграции', description: 'Подключение телефонии, почты и внешних сервисов' }
]

const stages = [
    { number: '01', title: 'Аудит', description: 'Анализируем текущие процессы' },
    { number: '02', title: 'Проектирование', description: 'Разрабатываем архитектуру CRM' },
    { number: '03', title: 'Настройка', description: 'Конфигурируем систему и воронки' },
    { number: '04', title: 'Интеграция', description: 'Подключаем телефонию и сервисы' },
    { number: '05', title: 'Обучение', description: 'Тренинги для команды' }
]

const benefits = [
    'Рост конверсии продаж до 30%',
    'Автоматизация до 80% рутинных задач',
    'Единое пространство для всей команды',
    'Интеграция со всеми каналами коммуникации',
    'Прозрачная аналитика в реальном времени',
    'Гарантия 12 месяцев на все работы'
]

export default function Bitrix24Page() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                                <MessageSquare className="w-7 h-7 text-white" />
                            </div>
                            <span className="px-4 py-1.5 rounded-full glass text-sm text-dark-300">Золотой партнер</span>
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                            Внедрение <span className="text-gradient">Битрикс24</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-dark-300 mb-8 leading-relaxed">
                            Автоматизируем бизнес-процессы и настраиваем CRM для максимальной эффективности вашей команды.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
                            <a href="#contact" className="btn-primary flex items-center gap-2">Консультация <ArrowRight className="w-5 h-5" /></a>
                            <Link to="/cases" className="btn-secondary">Кейсы</Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Возможности <span className="text-gradient">Битрикс24</span></h2>
                        <p className="text-dark-400 max-w-2xl mx-auto text-lg">Все инструменты для эффективного управления бизнесом</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 group hover:border-primary-500/30 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <f.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-dark-400 leading-relaxed">{f.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section-padding bg-dark-900/50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Преимущества <span className="text-gradient">работы с нами</span></h2>
                            <p className="text-dark-400 text-lg mb-8">Мы настраиваем Битрикс24 так, чтобы он работал на ваш результат</p>
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
                                <h3 className="font-display text-2xl font-bold text-white">Результат за 7 дней</h3>
                            </div>
                            <p className="text-dark-400 mb-6">Полностью настроенная CRM с автоматизациями, интеграциями и обученной командой.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                                    <div className="font-display text-3xl font-bold text-gradient mb-1">7</div>
                                    <div className="text-dark-500 text-sm">дней на запуск</div>
                                </div>
                                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                                    <div className="font-display text-3xl font-bold text-gradient mb-1">30%</div>
                                    <div className="text-dark-500 text-sm">рост продаж</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stages */}
            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Этапы <span className="text-gradient">внедрения</span></h2>
                    </motion.div>
                    <div className="relative">
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-accent-purple to-accent-pink -translate-y-1/2" />
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {stages.map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                                    <div className="glass-card p-6 text-center relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center mx-auto mb-4 font-display font-bold text-white">{s.number}</div>
                                        <h3 className="font-display text-lg font-semibold text-white mb-2">{s.title}</h3>
                                        <p className="text-dark-400 text-sm">{s.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="section-padding bg-dark-900/50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Оставить <span className="text-gradient">заявку</span></h2>
                            <p className="text-dark-400 text-lg">Получите бесплатный аудит текущих бизнес-процессов</p>
                        </motion.div>
                        <ContactForm service="Битрикс24" />
                    </div>
                </div>
            </section>
        </div>
    )
}
