import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Briefcase, MessageSquare, Mail, Settings, LogOut, Image, FileText } from 'lucide-react'

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Дашборд' },
    { to: '/cases', icon: Briefcase, label: 'Кейсы' },
    { to: '/reviews', icon: MessageSquare, label: 'Отзывы' },
    { to: '/contacts', icon: Mail, label: 'Заявки' },
    { to: '/banners', icon: Image, label: 'Баннеры' },
    { to: '/content', icon: FileText, label: 'Контент' },
    { to: '/settings', icon: Settings, label: 'Настройки' },
]

export default function Layout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => { logout(); navigate('/login') }

    return (
        <div className="min-h-screen bg-dark-900 flex">
            <aside className="w-64 bg-dark-950 border-r border-dark-800 p-4 flex flex-col">
                <div className="flex items-center gap-3 p-4 mb-6">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-purple-500 p-0.5 shadow-lg shadow-primary-500/20">
                        <img src="/logo.jpeg" alt="TB Group" className="w-full h-full object-cover rounded-[8px]" />
                    </div>
                    <div>
                        <div className="font-semibold text-white">TB Group</div>
                        <div className="text-xs text-gray-500">Админ-панель</div>
                    </div>
                </div>
                <nav className="flex-1 space-y-1">
                    {navItems.map(item => (
                        <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-dark-800 hover:text-white'}`}>
                            <item.icon className="w-5 h-5" />{item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="border-t border-dark-800 pt-4 mt-4">
                    <div className="px-4 py-2 text-sm text-gray-500">{user?.email}</div>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600/20 hover:text-red-400 w-full transition-colors">
                        <LogOut className="w-5 h-5" />Выйти
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-auto"><Outlet /></main>
        </div>
    )
}
