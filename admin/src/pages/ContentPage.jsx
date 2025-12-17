import { useState, useEffect } from 'react'
import axios from 'axios'
import { Save, Edit2, Check, X, FileText, Loader2, Plus, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

// Toast notification
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

// All site content structure
const allSiteContent = [
    // Главная страница
    { page: 'home', section: 'hero', key: 'title', value: 'Облачные решения для вашего бизнеса' },
    { page: 'home', section: 'hero', key: 'subtitle', value: 'Внедряем и интегрируем МойСклад, Битрикс24 и телефонию для автоматизации вашего бизнеса' },
    { page: 'home', section: 'hero', key: 'badge', value: '🚀 Работаем по всему Казахстану' },
    { page: 'home', section: 'stats', key: 'clients', value: '100' },
    { page: 'home', section: 'stats', key: 'projects', value: '200' },
    { page: 'home', section: 'stats', key: 'years', value: '5' },
    { page: 'home', section: 'cta', key: 'title', value: 'Готовы автоматизировать бизнес?' },
    { page: 'home', section: 'cta', key: 'subtitle', value: 'Оставьте заявку и получите бесплатную консультацию' },

    // О компании
    { page: 'about', section: 'hero', key: 'title', value: 'О компании TB Group' },
    { page: 'about', section: 'hero', key: 'description', value: 'TB Group — ваш надежный партнер в автоматизации бизнеса. Мы внедряем облачные решения, которые помогают компаниям расти и развиваться.' },
    { page: 'about', section: 'stats', key: 'years', value: '5' },
    { page: 'about', section: 'stats', key: 'clients', value: '100' },
    { page: 'about', section: 'stats', key: 'projects', value: '200' },

    // Контакты
    { page: 'contacts', section: 'hero', key: 'title', value: 'Свяжитесь с нами' },
    { page: 'contacts', section: 'hero', key: 'subtitle', value: 'Мы всегда готовы помочь с вашими вопросами' },
    { page: 'contacts', section: 'info', key: 'phone', value: '+7 (700) 123-45-67' },
    { page: 'contacts', section: 'info', key: 'email', value: 'info@tbgroup.kz' },
    { page: 'contacts', section: 'info', key: 'address', value: 'г. Алматы, ул. Примерная, 123' },
    { page: 'contacts', section: 'info', key: 'workingHours', value: 'Пн-Пт: 9:00 - 18:00' },

    // Услуги - МойСклад
    { page: 'moysklad', section: 'hero', key: 'title', value: 'Внедрение МойСклад' },
    { page: 'moysklad', section: 'hero', key: 'subtitle', value: 'Автоматизация складского учета и торговли' },

    // Услуги - Битрикс24
    { page: 'bitrix24', section: 'hero', key: 'title', value: 'Внедрение Битрикс24' },
    { page: 'bitrix24', section: 'hero', key: 'subtitle', value: 'CRM-система для управления продажами и клиентами' },

    // Услуги - Телефония
    { page: 'telephony', section: 'hero', key: 'title', value: 'IP-телефония' },
    { page: 'telephony', section: 'hero', key: 'subtitle', value: 'Современная связь для вашего бизнеса' },

    // Кейсы
    { page: 'cases', section: 'hero', key: 'title', value: 'Наши кейсы' },
    { page: 'cases', section: 'hero', key: 'subtitle', value: 'Реальные примеры успешных проектов' },

    // Отзывы
    { page: 'reviews', section: 'hero', key: 'title', value: 'Отзывы клиентов' },
    { page: 'reviews', section: 'hero', key: 'subtitle', value: 'Что говорят о нас наши клиенты' },
]

const pageNames = {
    home: 'Главная',
    about: 'О компании',
    contacts: 'Контакты',
    moysklad: 'МойСклад',
    bitrix24: 'Битрикс24',
    telephony: 'Телефония',
    cases: 'Кейсы',
    reviews: 'Отзывы'
}

export default function ContentPage() {
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editValue, setEditValue] = useState('')
    const [toast, setToast] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [newItem, setNewItem] = useState({ page: 'home', section: '', key: '', value: '' })

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/content')
            if (res.data && res.data.length > 0) {
                // Merge with default content
                const merged = allSiteContent.map(defaultItem => {
                    const found = res.data.find(
                        dbItem => dbItem.page === defaultItem.page &&
                            dbItem.section === defaultItem.section &&
                            dbItem.key === defaultItem.key
                    )
                    return found ? { ...defaultItem, value: found.value, id: found.id } : defaultItem
                })
                // Add any additional items from DB that are not in defaults
                res.data.forEach(dbItem => {
                    const exists = merged.find(
                        m => m.page === dbItem.page && m.section === dbItem.section && m.key === dbItem.key
                    )
                    if (!exists) {
                        merged.push(dbItem)
                    }
                })
                setContent(merged)
            } else {
                setContent(allSiteContent)
            }
        } catch (err) {
            setContent(allSiteContent)
        } finally {
            setLoading(false)
        }
    }

    const resetToDefaults = async () => {
        if (!confirm('Восстановить все значения по умолчанию?')) return
        setLoading(true)
        try {
            for (const item of allSiteContent) {
                await axios.put(`/api/content/${item.page}/${item.section}/${item.key}`, {
                    value: item.value,
                    type: 'text'
                })
            }
            setContent(allSiteContent)
            setToast({ message: 'Контент восстановлен!', type: 'success' })
        } catch (err) {
            setToast({ message: 'Ошибка восстановления', type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (item) => {
        setEditingId(`${item.page}-${item.section}-${item.key}`)
        setEditValue(item.value)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditValue('')
    }

    const saveEdit = async (item) => {
        setSaving(true)
        try {
            await axios.put(`/api/content/${item.page}/${item.section}/${item.key}`, {
                value: editValue,
                type: 'text'
            })
            setContent(content.map(p =>
                p.page === item.page && p.section === item.section && p.key === item.key
                    ? { ...p, value: editValue }
                    : p
            ))
            setEditingId(null)
            setToast({ message: 'Сохранено!', type: 'success' })
        } catch (err) {
            setToast({ message: 'Ошибка сохранения', type: 'error' })
        } finally {
            setSaving(false)
        }
    }

    const addNewItem = async () => {
        if (!newItem.section || !newItem.key || !newItem.value) {
            setToast({ message: 'Заполните все поля', type: 'error' })
            return
        }
        try {
            await axios.put(`/api/content/${newItem.page}/${newItem.section}/${newItem.key}`, {
                value: newItem.value,
                type: 'text'
            })
            setContent([...content, { ...newItem, type: 'text' }])
            setNewItem({ page: 'home', section: '', key: '', value: '' })
            setShowAddForm(false)
            setToast({ message: 'Элемент добавлен!', type: 'success' })
        } catch (err) {
            setToast({ message: 'Ошибка добавления', type: 'error' })
        }
    }

    const groupedByPage = content.reduce((acc, item) => {
        if (!acc[item.page]) acc[item.page] = []
        acc[item.page].push(item)
        return acc
    }, {})

    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Контент страниц</h1>
                <div className="flex gap-3">
                    <button onClick={resetToDefaults} className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700 border border-dark-700">
                        <RefreshCw className="w-4 h-4" />Сбросить
                    </button>
                    <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        <Plus className="w-5 h-5" />Добавить
                    </button>
                </div>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="bg-dark-950 border border-dark-800 rounded-2xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Добавить новый элемент</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select value={newItem.page} onChange={e => setNewItem({ ...newItem, page: e.target.value })} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-white">
                            {Object.entries(pageNames).map(([key, name]) => (
                                <option key={key} value={key}>{name}</option>
                            ))}
                        </select>
                        <input placeholder="Секция (например: hero)" value={newItem.section} onChange={e => setNewItem({ ...newItem, section: e.target.value })} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-white" />
                        <input placeholder="Ключ (например: title)" value={newItem.key} onChange={e => setNewItem({ ...newItem, key: e.target.value })} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-white" />
                        <input placeholder="Значение" value={newItem.value} onChange={e => setNewItem({ ...newItem, value: e.target.value })} className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-white" />
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button onClick={addNewItem} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Добавить</button>
                        <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700">Отмена</button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedByPage).map(([page, items]) => (
                        <div key={page} className="bg-dark-950 border border-dark-800 rounded-2xl overflow-hidden">
                            <div className="bg-dark-800 px-6 py-4">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary-400" />
                                    {pageNames[page] || page}
                                </h2>
                            </div>
                            <div className="divide-y divide-dark-800">
                                {items.map(item => {
                                    const id = `${item.page}-${item.section}-${item.key}`
                                    const isEditing = editingId === id

                                    return (
                                        <div key={id} className="px-6 py-4 flex items-start gap-4 hover:bg-dark-900/50">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-primary-400 mb-1 font-mono">
                                                    {item.section} → {item.key}
                                                </div>
                                                {isEditing ? (
                                                    <textarea
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        className="w-full px-3 py-2 bg-dark-800 border border-primary-500 rounded-lg text-white focus:outline-none resize-none"
                                                        rows={3}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <div className="text-white break-words">{item.value || <span className="text-gray-500 italic">Пусто</span>}</div>
                                                )}
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                {isEditing ? (
                                                    <>
                                                        <button
                                                            onClick={() => saveEdit(item)}
                                                            disabled={saving}
                                                            className="p-2 text-green-400 hover:bg-green-600/20 rounded-lg disabled:opacity-50"
                                                        >
                                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                        </button>
                                                        <button onClick={cancelEdit} className="p-2 text-gray-400 hover:bg-dark-800 rounded-lg">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => startEdit(item)} className="p-2 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
