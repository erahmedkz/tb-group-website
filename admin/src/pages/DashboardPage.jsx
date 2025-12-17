import { useState, useEffect } from 'react'
import axios from 'axios'
import { Briefcase, MessageSquare, Mail, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
    const [stats, setStats] = useState({ cases: 0, reviews: 0, contacts: 0, pending: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [cases, reviews, contacts] = await Promise.all([
                    axios.get('/api/cases/admin'),
                    axios.get('/api/reviews/admin'),
                    axios.get('/api/contact')
                ])
                setStats({
                    cases: cases.data.length,
                    reviews: reviews.data.length,
                    contacts: contacts.data.length,
                    pending: reviews.data.filter(r => !r.isApproved).length
                })
            } catch (err) { console.error(err) }
        }
        fetchStats()
    }, [])

    const cards = [
        { label: 'Кейсы', value: stats.cases, icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
        { label: 'Отзывы', value: stats.reviews, icon: MessageSquare, color: 'from-primary-500 to-purple-500' },
        { label: 'Заявки', value: stats.contacts, icon: Mail, color: 'from-green-500 to-emerald-500' },
        { label: 'На модерации', value: stats.pending, icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    ]

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Дашборд</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-dark-950 border border-dark-800 rounded-2xl p-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                            <card.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                        <div className="text-gray-500">{card.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
