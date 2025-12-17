import { useState, useEffect } from 'react'
import axios from 'axios'
import { Save, Check, Database, Download, Trash2, Loader2, X, CheckCircle, AlertCircle } from 'lucide-react'

// Toast notification component
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border animate-slide-in ${type === 'success' ? 'bg-green-600/90 border-green-500' : 'bg-red-600/90 border-red-500'
            }`}>
            {type === 'success' ? <CheckCircle className="w-5 h-5 text-white" /> : <AlertCircle className="w-5 h-5 text-white" />}
            <span className="text-white font-medium">{message}</span>
            <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}

export default function SettingsPage() {
    const [settings, setSettings] = useState({ phone: '', email: '', address: '', telegram: '', whatsapp: '', workingHours: '' })
    const [saving, setSaving] = useState(false)
    const [backups, setBackups] = useState([])
    const [creatingBackup, setCreatingBackup] = useState(false)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        fetchSettings()
        fetchBackups()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await axios.get('/api/settings')
            if (res.data && typeof res.data === 'object') {
                setSettings({
                    phone: res.data.phone || '',
                    email: res.data.email || '',
                    address: res.data.address || '',
                    telegram: res.data.telegram || '',
                    whatsapp: res.data.whatsapp || '',
                    workingHours: res.data.workingHours || ''
                })
            }
        } catch (err) {
            console.error('Failed to fetch settings:', err)
        }
    }

    const fetchBackups = async () => {
        try {
            const res = await axios.get('/api/admin/backups')
            setBackups(res.data)
        } catch (err) {
            console.error('Failed to fetch backups')
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await axios.post('/api/settings/bulk', settings)
            setToast({ message: 'Настройки сохранены!', type: 'success' })
        } catch (err) {
            setToast({ message: 'Ошибка сохранения', type: 'error' })
        } finally {
            setSaving(false)
        }
    }

    const createBackup = async () => {
        setCreatingBackup(true)
        try {
            const res = await axios.post('/api/admin/backup')
            setToast({ message: res.data.message || 'Бэкап создан!', type: 'success' })
            fetchBackups()
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message
            // Show user-friendly message
            if (errorMsg.includes('pg_dump') || errorMsg.includes('PGPASSWORD')) {
                setToast({ message: 'PostgreSQL не установлен. Бэкап недоступен.', type: 'error' })
            } else {
                setToast({ message: 'Ошибка создания бэкапа', type: 'error' })
            }
        } finally {
            setCreatingBackup(false)
        }
    }

    const deleteBackup = async (filename) => {
        if (!confirm('Удалить бэкап?')) return
        try {
            await axios.delete(`/api/admin/backup/${filename}`)
            setToast({ message: 'Бэкап удален', type: 'success' })
            fetchBackups()
        } catch (err) {
            setToast({ message: 'Ошибка удаления', type: 'error' })
        }
    }

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    return (
        <div className="space-y-8">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Настройки</h1>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50">
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
            </div>

            {/* Contact Settings */}
            <div className="bg-dark-950 border border-dark-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Контактная информация</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2">Телефон</label>
                        <input value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} placeholder="+7 (700) 123-45-67" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Email</label>
                        <input value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} placeholder="info@tbgroup.kz" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-2">Адрес</label>
                        <input value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} placeholder="г. Алматы, ул. Примерная, 123" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Telegram</label>
                        <input value={settings.telegram} onChange={e => setSettings({ ...settings, telegram: e.target.value })} placeholder="https://t.me/tbgroup" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">WhatsApp</label>
                        <input value={settings.whatsapp} onChange={e => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="https://wa.me/77001234567" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Время работы</label>
                        <input value={settings.workingHours} onChange={e => setSettings({ ...settings, workingHours: e.target.value })} placeholder="Пн-Пт: 9:00-18:00" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:border-primary-500 focus:outline-none" />
                    </div>
                </div>
            </div>

            {/* Database Backups */}
            <div className="bg-dark-950 border border-dark-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Database className="w-5 h-5" />Резервные копии
                    </h2>
                    <button onClick={createBackup} disabled={creatingBackup} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
                        {creatingBackup ? <Loader2 className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
                        {creatingBackup ? 'Создание...' : 'Создать бэкап'}
                    </button>
                </div>

                {backups.length > 0 ? (
                    <div className="space-y-2">
                        {backups.map((b, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-dark-800 rounded-xl">
                                <div>
                                    <p className="text-white font-mono text-sm">{b.name}</p>
                                    <p className="text-gray-500 text-xs">{formatSize(b.size)} • {new Date(b.created).toLocaleString('ru')}</p>
                                </div>
                                <div className="flex gap-2">
                                    <a href={`/api/admin/backup/${b.name}`} download className="p-2 text-gray-400 hover:text-blue-400">
                                        <Download className="w-4 h-4" />
                                    </a>
                                    <button onClick={() => deleteBackup(b.name)} className="p-2 text-gray-400 hover:text-red-400">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">Нет резервных копий</p>
                )}
            </div>
        </div>
    )
}
