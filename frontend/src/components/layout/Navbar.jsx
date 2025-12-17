import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const navigation = [
    { name: 'Главная', href: '/' },
    {
        name: 'Услуги',
        href: '/services',
        children: [
            { name: 'МойСклад', href: '/services/moysklad' },
            { name: 'Битрикс24', href: '/services/bitrix24' },
            { name: 'Телефония', href: '/services/telephony' },
        ],
    },
    { name: 'Кейсы', href: '/cases' },
    { name: 'Отзывы', href: '/reviews' },
    { name: 'О компании', href: '/about' },
    { name: 'Контакты', href: '/contacts' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
        setActiveDropdown(null)
    }, [location])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass py-3 shadow-lg shadow-dark-950/50'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-accent-purple p-0.5 transform group-hover:scale-105 transition-transform shadow-lg shadow-primary-500/20">
                            <img
                                src="/logo.jpg"
                                alt="TB Group"
                                className="w-full h-full object-cover rounded-[10px]"
                            />
                        </div>
                        <span className="font-display font-bold text-xl text-white">
                            TB Group
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {item.children ? (
                                    <>
                                        <button className="px-4 py-2 text-dark-200 hover:text-white transition-colors flex items-center gap-1 font-medium">
                                            {item.name}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {activeDropdown === item.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-2 w-48 glass-card p-2"
                                                >
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.name}
                                                            to={child.href}
                                                            className={`block px-4 py-2 rounded-lg transition-colors ${location.pathname === child.href
                                                                ? 'bg-primary-600/20 text-primary-400'
                                                                : 'text-dark-200 hover:text-white hover:bg-dark-800/50'
                                                                }`}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className={`px-4 py-2 transition-colors font-medium ${location.pathname === item.href
                                            ? 'text-primary-400'
                                            : 'text-dark-200 hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Link
                            to="/contacts"
                            className="btn-primary text-sm"
                        >
                            Оставить заявку
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-white"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden glass mt-3 mx-4 rounded-2xl overflow-hidden"
                    >
                        <div className="p-4 space-y-2">
                            {navigation.map((item) => (
                                <div key={item.name}>
                                    {item.children ? (
                                        <>
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                                className="w-full px-4 py-3 text-dark-200 hover:text-white transition-colors flex items-center justify-between font-medium"
                                            >
                                                {item.name}
                                                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {activeDropdown === item.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="pl-4 space-y-1"
                                                    >
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.name}
                                                                to={child.href}
                                                                className={`block px-4 py-2 rounded-lg ${location.pathname === child.href
                                                                    ? 'bg-primary-600/20 text-primary-400'
                                                                    : 'text-dark-300 hover:text-white hover:bg-dark-800/50'
                                                                    }`}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={`block px-4 py-3 rounded-lg transition-colors font-medium ${location.pathname === item.href
                                                ? 'bg-primary-600/20 text-primary-400'
                                                : 'text-dark-200 hover:text-white hover:bg-dark-800/50'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <Link
                                to="/contacts"
                                className="btn-primary w-full text-center block mt-4"
                            >
                                Оставить заявку
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
