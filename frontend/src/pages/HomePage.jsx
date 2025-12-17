import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Boxes,
    MessageSquare,
    Phone,
    CheckCircle2,
    TrendingUp,
    Users,
    Award,
    Clock,
    Shield
} from 'lucide-react'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import InfiniteCarousel from '../components/ui/InfiniteCarousel'

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

// Services data
const services = [
    {
        id: 'moysklad',
        title: 'МойСклад',
        description: 'Внедрение и настройка облачной системы учета товаров, интеграция с CRM и маркетплейсами',
        icon: Boxes,
        href: '/services/moysklad',
        gradient: 'from-blue-500 to-cyan-500',
        features: ['Учет товаров', 'Интеграции', 'Автоматизация']
    },
    {
        id: 'bitrix24',
        title: 'Битрикс24',
        description: 'Автоматизация бизнес-процессов, настройка CRM, интеграция с внешними сервисами',
        icon: MessageSquare,
        href: '/services/bitrix24',
        gradient: 'from-primary-500 to-accent-purple',
        features: ['CRM система', 'Бизнес-процессы', 'Интеграции']
    },
    {
        id: 'telephony',
        title: 'Телефония',
        description: 'SIP-решения, IP АТС, интеграция телефонии с Битрикс24 и МойСклад',
        icon: Phone,
        href: '/services/telephony',
        gradient: 'from-accent-purple to-accent-pink',
        features: ['IP АТС', 'SIP телефония', 'Интеграции']
    }
]

// Advantages
const advantages = [
    {
        icon: TrendingUp,
        title: 'Рост эффективности',
        description: 'Увеличение производительности бизнеса на 40% благодаря автоматизации'
    },
    {
        icon: Users,
        title: '100+ клиентов',
        description: 'Доверие более сотни компаний из различных сфер бизнеса'
    },
    {
        icon: Award,
        title: 'Сертифицированные специалисты',
        description: 'Официальные партнеры МойСклад и Битрикс24'
    },
    {
        icon: Clock,
        title: 'Быстрое внедрение',
        description: 'Запуск проектов от 3 дней с полной настройкой'
    },
    {
        icon: Shield,
        title: 'Гарантия качества',
        description: '12 месяцев бесплатной технической поддержки'
    },
    {
        icon: CheckCircle2,
        title: 'Индивидуальный подход',
        description: 'Решения, адаптированные под ваши бизнес-процессы'
    }
]

// Client logos (placeholder names)
const clients = [
    'TechCorp', 'GlobalTrade', 'RetailMax', 'LogiPro', 'MarketHub', 'DataFlow'
]

export default function HomePage() {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

                {/* Animated Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent-pink/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

                <div className="container-custom relative z-10 px-4">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="text-center max-w-5xl mx-auto"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-dark-300">Официальные партнеры МойСклад и Битрикс24</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            variants={fadeInUp}
                            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                        >
                            Облачные решения
                            <br />
                            <span className="text-gradient">для вашего бизнеса</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            Внедряем и интегрируем МойСклад, Битрикс24 и телефонию.
                            Автоматизируем бизнес-процессы и увеличиваем эффективность вашей компании.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link to="/contacts" className="btn-primary flex items-center gap-2 group">
                                Оставить заявку
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/cases" className="btn-secondary">
                                Смотреть кейсы
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={fadeInUp}
                            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-dark-800/50"
                        >
                            <div className="text-center">
                                <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                                    <AnimatedCounter end={100} suffix="+" />
                                </div>
                                <div className="text-dark-400">Клиентов</div>
                            </div>
                            <div className="text-center">
                                <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                                    <AnimatedCounter end={200} suffix="+" />
                                </div>
                                <div className="text-dark-400">Проектов</div>
                            </div>
                            <div className="text-center">
                                <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                                    <AnimatedCounter end={5} suffix=" лет" />
                                </div>
                                <div className="text-dark-400">На рынке</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                            Наши <span className="text-gradient">услуги</span>
                        </h2>
                        <p className="text-dark-400 max-w-2xl mx-auto text-lg">
                            Комплексные решения для автоматизации и оптимизации вашего бизнеса
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link
                                    to={service.href}
                                    className="group block h-full glass-card p-8 hover:border-primary-500/50 transition-all duration-300"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <service.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-display text-2xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-dark-400 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {service.features.map((feature, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-dark-800/50 rounded-full text-sm text-dark-300"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Link */}
                                    <div className="flex items-center gap-2 text-primary-400 font-medium">
                                        Подробнее
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            <section className="section-padding bg-dark-900/50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                            Почему <span className="text-gradient">выбирают нас</span>
                        </h2>
                        <p className="text-dark-400 max-w-2xl mx-auto text-lg">
                            Мы помогаем бизнесу расти и развиваться с помощью современных технологий
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((advantage, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="glass-card p-6 hover:border-primary-500/30 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <advantage.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 className="font-display text-lg font-semibold text-white mb-2">
                                    {advantage.title}
                                </h3>
                                <p className="text-dark-400 text-sm leading-relaxed">
                                    {advantage.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Clients Section */}
            <section className="section-padding bg-dark-950 overflow-hidden">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                            Нам <span className="text-gradient">доверяют</span>
                        </h2>
                        <p className="text-dark-400 max-w-2xl mx-auto">
                            Компании из различных отраслей выбирают TB Group
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <InfiniteCarousel
                        items={clients}
                        speed={25}
                    />
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-dark-900/50 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-purple/20" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 md:p-16 text-center max-w-4xl mx-auto"
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                            Готовы <span className="text-gradient">начать?</span>
                        </h2>
                        <p className="text-dark-300 text-lg mb-10 max-w-2xl mx-auto">
                            Оставьте заявку и получите бесплатную консультацию.
                            Мы поможем подобрать оптимальное решение для вашего бизнеса.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contacts" className="btn-primary flex items-center gap-2">
                                Оставить заявку
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/contacts" className="btn-secondary">
                                Получить консультацию
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
