import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Edit, Trash2, X, Upload, Image } from 'lucide-react'

export default function CasesPage() {
    const [cases, setCases] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editCase, setEditCase] = useState(null)
    const [form, setForm] = useState({ title: '', client: '', type: 'moysklad', problem: '', solution: '', result: '', image: '', isPublished: true })
    const [uploading, setUploading] = useState(false)

    useEffect(() => { fetchCases() }, [])
    const fetchCases = async () => {
        try {
            const res = await axios.get('/api/cases/admin')
            setCases(res.data)
        } catch (err) {
            console.error('Failed to fetch cases:', err)
        }
    }

    const openModal = (c = null) => {
        setEditCase(c)
        setForm(c || { title: '', client: '', type: 'moysklad', problem: '', solution: '', result: '', image: '', isPublished: true })
        setIsModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editCase) {
                await axios.put(`/api/cases/${editCase.id}`, form)
            } else {
                await axios.post('/api/cases', form)
            }
            setIsModalOpen(false)
            fetchCases()
        } catch (err) {
            alert('Ошибка сохранения: ' + (err.response?.data?.error || err.message))
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить кейс?')) {
            await axios.delete(`/api/cases/${id}`)
            fetchCases()
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('image', file)

        try {
            const res = await axios.post('/api/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setForm({ ...form, image: res.data.url })
        } catch (err) {
            alert('Ошибка загрузки: ' + (err.response?.data?.error || err.message))
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Кейсы</h1>
                <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    <Plus className="w-5 h-5" />Добавить
                </button>
            </div>

            <div className="bg-dark-950 border border-dark-800 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-dark-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-400">Фото</th>
                            <th className="px-6 py-4 text-left text-gray-400">Название</th>
                            <th className="px-6 py-4 text-left text-gray-400">Клиент</th>
                            <th className="px-6 py-4 text-left text-gray-400">Тип</th>
                            <th className="px-6 py-4 text-left text-gray-400">Статус</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map(c => (
                            <tr key={c.id} className="border-t border-dark-800">
                                <td className="px-6 py-4">
                                    {c.image ? (
                                        <img src={c.image} alt="" className="w-16 h-12 object-cover rounded" />
                                    ) : (
                                        <div className="w-16 h-12 bg-dark-800 rounded flex items-center justify-center">
                                            <Image className="w-6 h-6 text-dark-600" />
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-white">{c.title}</td>
                                <td className="px-6 py-4 text-gray-400">{c.client}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-primary-600/20 text-primary-400 rounded text-sm">{c.type}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-sm ${c.isPublished ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'}`}>
                                        {c.isPublished ? 'Опубликован' : 'Скрыт'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => openModal(c)} className="p-2 text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(c.id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {cases.length === 0 && (
                    <div className="p-12 text-center text-gray-500">Нет кейсов. Добавьте первый!</div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-dark-950 rounded-2xl border border-dark-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-dark-800">
                            <h2 className="text-xl font-bold text-white">{editCase ? 'Редактировать' : 'Добавить'} кейс</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-gray-400 mb-2">Изображение</label>
                                <div className="flex items-center gap-4">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="case-image" />
                                    <label htmlFor="case-image" className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-gray-400 cursor-pointer hover:border-primary-500">
                                        <Upload className="w-4 h-4" />{uploading ? 'Загрузка...' : 'Загрузить'}
                                    </label>
                                    {form.image && <img src={form.image} alt="Preview" className="w-24 h-16 object-cover rounded" />}
                                </div>
                            </div>

                            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Название проекта" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" required />
                            <input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="Клиент" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" required />
                            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white">
                                <option value="moysklad">МойСклад</option>
                                <option value="bitrix24">Битрикс24</option>
                                <option value="telephony">Телефония</option>
                            </select>
                            <textarea value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} placeholder="Задача / Проблема клиента" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" rows={2} required />
                            <textarea value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} placeholder="Решение" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" rows={2} required />
                            <textarea value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} placeholder="Результат (в цифрах, %)" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" rows={2} required />
                            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
                                Опубликовать на сайте
                            </label>
                            <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700">Сохранить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
