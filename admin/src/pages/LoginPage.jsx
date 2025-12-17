import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, Mail, AlertCircle } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center font-bold text-white text-2xl mx-auto mb-4">TB</div>
                    <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                    <p className="text-gray-500">Войдите в панель управления</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-dark-950 rounded-2xl border border-dark-800 p-8 space-y-6">
                    {error && <div className="flex items-center gap-2 p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400"><AlertCircle className="w-5 h-5" />{error}</div>}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" placeholder="admin@tbgroup.kz" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Пароль</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" placeholder="••••••••" required />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    )
}
