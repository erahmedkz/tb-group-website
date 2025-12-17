import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Boxes,
    ArrowRight,
    CheckCircle2,
    Database,
    RefreshCw,
    BarChart3,
    ShoppingCart,
    Truck,
    FileText,
    Zap
} from 'lucide-react'
import ContactForm from '../../components/ui/ContactForm'

const features = [
    {
        icon: Database,
        title: 'Учет товаров',
        description: 'Полный контроль остатков, партий и серийных номеров на всех складах'
    },
    {
        icon: RefreshCw,
        title: 'Синхронизация данных',
        description: 'Автоматический обмен данными между МойСклад и другими системами'
    },
    {
        icon: BarChart3,
        title: 'Аналитика и отчеты',
        description: 'Детальные отчеты по продажам, закупкам и складским операциям'
    },
    {
        icon: ShoppingCart,
        title: 'Интеграция с маркетплейсами',
        description: 'Подключение к Ozon, Wildberries, Kaspi и другим площадкам'
    },
    {
        icon: Truck,
        title: 'Логистика',
        description: 'Управление доставкой и отслеживание заказов'
    },
    {
        icon: FileText,
        title: 'Документооборот',
        description: 'Автоматическое формирование накладных, счетов и актов'
    }
]

const stages = [
    {
        number: '01',
        title: 'Анализ',
        description: 'Изучаем текущие бизнес-процессы и определяем точки оптимизации'
    },
    {
        number: '02',
        title: 'Настройка',
        description: 'Конфигурируем систему под ваши требования и загружаем данные'
    },
    {
        number: '03',
        title: 'Интеграция',
        description: 'Подключаем необходимые интеграции с CRM, маркетплейсами, 1С'
    },
    {
        number: '04',
        title: 'Обучение',
        description: 'Проводим обучение сотрудников и предоставляем документацию'
    },
    {
        number: '05',
        title: 'Запуск',
        description: 'Запускаем систему в эксплуатацию и обеспечиваем поддержку'
    }
]

const benefits = [
    'Сокращение времени на инвентаризацию на 70%',
    'Автоматизация рутинных операций',
    'Снижение ошибок учета до минимума',
    'Интеграция со всеми популярными сервисами',
    'Работа из любой точки мира',
    'Бесплатная техподдержка 12 месяцев'
]

export default function MoySkladPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <Boxes className="w-7 h-7 text-white" />
                            </div>
                            <span className="px-4 py-1.5 rounded-full glass text-sm text-dark-300">
                                Официальный партнер
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
                        >
                            Внедрение <span className="text-gradient">МойСклад</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-dark-300 mb-8 leading-relaxed"
                        >
                            Автоматизируем складской учет и торговлю. Интегрируем МойСклад
                            с вашими системами для максимальной эффективности бизнеса.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a href="#contact" className="btn-primary flex items-center gap-2">
                                Получить консультацию
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <Link to="/cases" className="btn-secondary">
                                Смотреть кейсы
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                            Возможности <span className="text-gradient">МойСклад</span>
                        </h2>
                        <p className="text-dark-400 max-w-2xl mx-auto text-lg">
                            Полный спектр функций для управления складом и торговлей
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 group hover:border-blue-500/30 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-dark-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="section-padding bg-dark-900/50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                                Преимущества <span className="text-gradient">работы с нами</span>
                            </h2>
                            <p className="text-dark-400 text-lg mb-8">
                                Мы не просто внедряем систему — мы делаем ваш бизнес эффективнее
                            </p>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-dark-200">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <Zap className="w-8 h-8 text-yellow-500" />
                                <h3 className="font-display text-2xl font-bold text-white">
                                    Быстрый старт
                                </h3>
                            </div>
                            <p className="text-dark-400 mb-6">
                                Запускаем МойСклад за 3-5 рабочих дней. Вы получаете готовую к работе
                                систему с настроенными интеграциями и обученными сотрудниками.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                                    <div className="font-display text-3xl font-bold text-gradient mb-1">3-5</div>
                                    <div className="text-dark-500 text-sm">дней на запуск</div>
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

            {/* Stages Section */}
            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                            Этапы <span className="text-gradient">внедрения</span>
                        </h2>
                        <p className="text-dark-400 max-w-2xl mx-auto text-lg">
                            Прозрачный процесс от анализа до запуска
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connection Line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-primary-500 to-cyan-500 -translate-y-1/2" />

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {stages.map((stage, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <div className="glass-card p-6 text-center relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 font-display font-bold text-white">
                                            {stage.number}
                                        </div>
                                        <h3 className="font-display text-lg font-semibold text-white mb-2">
                                            {stage.title}
                                        </h3>
                                        <p className="text-dark-400 text-sm">
                                            {stage.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="section-padding bg-dark-900/50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                                Оставить <span className="text-gradient">заявку</span>
                            </h2>
                            <p className="text-dark-400 text-lg">
                                Заполните форму и мы свяжемся с вами в течение 30 минут
                            </p>
                        </motion.div>

                        <ContactForm service="МойСклад" />
                    </div>
                </div>
            </section>
        </div>
    )
}
