import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Edit, Trash2, X, Image, Upload } from 'lucide-react'

export default function BannersPage() {
    const [banners, setBanners] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editBanner, setEditBanner] = useState(null)
    const [form, setForm] = useState({ title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', image: '', isActive: true, order: 0 })
    const [uploading, setUploading] = useState(false)

    useEffect(() => { fetchBanners() }, [])
    const fetchBanners = async () => { const res = await axios.get('/api/banners/admin'); setBanners(res.data) }

    const openModal = (b = null) => {
        setEditBanner(b)
        setForm(b || { title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', image: '', isActive: true, order: 0 })
        setIsModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editBanner) { await axios.put(`/api/banners/${editBanner.id}`, form) }
        else { await axios.post('/api/banners', form) }
        setIsModalOpen(false)
        fetchBanners()
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить баннер?')) { await axios.delete(`/api/banners/${id}`); fetchBanners() }
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
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Баннеры</h1>
                <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    <Plus className="w-5 h-5" />Добавить
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map(b => (
                    <div key={b.id} className={`bg-dark-950 border rounded-2xl overflow-hidden ${b.isActive ? 'border-dark-800' : 'border-gray-700 opacity-60'}`}>
                        {b.image && (
                            <div className="h-40 bg-dark-800 flex items-center justify-center overflow-hidden">
                                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-white text-lg">{b.title}</h3>
                                    {b.subtitle && <p className="text-gray-400 text-sm">{b.subtitle}</p>}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openModal(b)} className="p-2 text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(b.id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            {b.description && <p className="text-gray-500 text-sm mb-4">{b.description.substring(0, 100)}...</p>}
                            <div className="flex justify-between items-center">
                                <span className={`px-2 py-1 rounded text-xs ${b.isActive ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'}`}>
                                    {b.isActive ? 'Активен' : 'Скрыт'}
                                </span>
                                <span className="text-gray-500 text-xs">Порядок: {b.order}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {banners.length === 0 && (
                <div className="text-center py-16 bg-dark-950 rounded-2xl border border-dark-800">
                    <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Нет баннеров</p>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-dark-950 rounded-2xl border border-dark-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-dark-800">
                            <h2 className="text-xl font-bold text-white">{editBanner ? 'Редактировать' : 'Добавить'} баннер</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Заголовок" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" required />
                            <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Подзаголовок" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" />
                            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Описание" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" rows={3} />

                            <div className="grid grid-cols-2 gap-4">
                                <input value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} placeholder="Текст кнопки" className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" />
                                <input value={form.buttonLink} onChange={e => setForm({ ...form, buttonLink: e.target.value })} placeholder="Ссылка кнопки" className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">Изображение</label>
                                <div className="flex gap-4">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="banner-image" />
                                    <label htmlFor="banner-image" className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-gray-400 cursor-pointer hover:border-primary-500">
                                        <Upload className="w-4 h-4" />{uploading ? 'Загрузка...' : 'Загрузить'}
                                    </label>
                                    {form.image && <img src={form.image} alt="Preview" className="w-20 h-12 object-cover rounded" />}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Порядок</label>
                                    <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                                        <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                                        Активен
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700">Сохранить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
