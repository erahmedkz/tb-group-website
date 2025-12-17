import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Image } from 'lucide-react'
import axios from 'axios'
import { LazyImage } from '../components/ui/Media'

const filterOptions = [
    { id: 'all', label: 'Все проекты' },
    { id: 'moysklad', label: 'МойСклад' },
    { id: 'bitrix24', label: 'Битрикс24' },
    { id: 'telephony', label: 'Телефония' }
]

const typeColors = {
    moysklad: 'from-blue-500 to-cyan-500',
    bitrix24: 'from-primary-500 to-accent-purple',
    telephony: 'from-accent-purple to-accent-pink'
}

const typeLabels = {
    moysklad: 'МойСклад',
    bitrix24: 'Битрикс24',
    telephony: 'Телефония'
}

export default function CasesPage() {
    const [cases, setCases] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchCases()
    }, [activeFilter])

    const fetchCases = async () => {
        try {
            setLoading(true)
            const params = activeFilter !== 'all' ? `?type=${activeFilter}` : ''
            const res = await axios.get(`/api/cases${params}`)
            setCases(res.data)
        } catch (err) {
            console.error('Failed to fetch cases:', err)
            setCases([
                { id: 1, title: 'Автоматизация склада для ТОО "Ритейл Плюс"', client: 'ТОО "Ритейл Плюс"', type: 'moysklad', problem: 'Ручной учет товаров занимал много времени', solution: 'Внедрили МойСклад с интеграцией Kaspi', result: 'Сокращение времени на учет на 60%', image: '' },
                { id: 2, title: 'CRM система для отдела продаж', client: 'ИП Иванов', type: 'bitrix24', problem: 'Потеря клиентов из-за отсутствия учета', solution: 'Настроили воронку продаж в Битрикс24', result: 'Рост конверсии на 35%', image: '' },
                { id: 3, title: 'IP телефония для колл-центра', client: 'ТОО "Колл Центр"', type: 'telephony', problem: 'Дорогие звонки и нет записи разговоров', solution: 'Внедрили IP АТС с интеграцией CRM', result: 'Экономия 40% на связи', image: '' }
            ])
        } finally {
            setLoading(false)
        }
    }

    const filteredCases = cases.filter(c =>
        c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.client?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section-padding bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-blob" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                </div>
                <div className="container-custom relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                            Наши <span className="text-gradient">кейсы</span>
                        </h1>
                        <p className="text-xl text-dark-300">
                            Реальные примеры успешных проектов и результаты наших клиентов
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-dark-950 border-b border-dark-800 sticky top-20 z-30">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map(filter => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter.id
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                            <input
                                type="text"
                                placeholder="Поиск..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cases Grid */}
            <section className="section-padding bg-dark-950">
                <div className="container-custom">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full" />
                        </div>
                    ) : filteredCases.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCases.map((caseItem, index) => (
                                <motion.div
                                    key={caseItem.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card overflow-hidden group hover:border-primary-500/50 transition-all"
                                >
                                    {/* Image */}
                                    <div className="h-48 relative overflow-hidden">
                                        {caseItem.image ? (
                                            <LazyImage
                                                src={caseItem.image}
                                                alt={caseItem.title}
                                                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${typeColors[caseItem.type]} opacity-20 flex items-center justify-center`}>
                                                <Image className="w-16 h-16 text-white/30" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColors[caseItem.type]} text-white mb-4`}>
                                            {typeLabels[caseItem.type]}
                                        </span>

                                        <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                            {caseItem.title}
                                        </h3>
                                        <p className="text-dark-400 text-sm mb-4">{caseItem.client}</p>

                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <span className="text-dark-500">Задача: </span>
                                                <span className="text-dark-300">{caseItem.problem}</span>
                                            </div>
                                            <div>
                                                <span className="text-dark-500">Решение: </span>
                                                <span className="text-dark-300">{caseItem.solution}</span>
                                            </div>
                                            <div className="pt-2 border-t border-dark-800">
                                                <span className="text-green-400 font-medium">{caseItem.result}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Filter className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                            <p className="text-dark-400 text-lg">Кейсы не найдены</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
