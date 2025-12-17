import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Edit, Trash2, Check, X, Star } from 'lucide-react'

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editReview, setEditReview] = useState(null)
    const [form, setForm] = useState({ name: '', company: '', role: '', rating: 5, text: '', type: 'text', videoUrl: '', isApproved: true })

    useEffect(() => { fetchReviews() }, [])
    const fetchReviews = async () => { const res = await axios.get('/api/reviews/admin'); setReviews(res.data) }

    const openModal = (r = null) => {
        setEditReview(r)
        setForm(r || { name: '', company: '', role: '', rating: 5, text: '', type: 'text', videoUrl: '', isApproved: true })
        setIsModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editReview) { await axios.put(`/api/reviews/${editReview._id}`, form) }
        else { await axios.post('/api/reviews', form) }
        setIsModalOpen(false)
        fetchReviews()
    }

    const handleApprove = async (id) => { await axios.patch(`/api/reviews/${id}/approve`); fetchReviews() }
    const handleDelete = async (id) => { if (confirm('Удалить?')) { await axios.delete(`/api/reviews/${id}`); fetchReviews() } }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Отзывы</h1>
                <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><Plus className="w-5 h-5" />Добавить</button>
            </div>
            <div className="space-y-4">
                {reviews.map(r => (
                    <div key={r._id} className={`bg-dark-950 border rounded-2xl p-6 ${r.isApproved ? 'border-dark-800' : 'border-orange-600/50'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="font-semibold text-white">{r.name}</div>
                                <div className="text-gray-500 text-sm">{r.role}, {r.company}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                {r.isFromUser && !r.isApproved && <button onClick={() => handleApprove(r._id)} className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30"><Check className="w-4 h-4" /></button>}
                                <button onClick={() => openModal(r)} className="p-2 text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(r._id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="flex gap-1 mb-2">{[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}</div>
                        <p className="text-gray-400">{r.text}</p>
                        {!r.isApproved && <div className="mt-4 text-orange-400 text-sm">Ожидает модерации</div>}
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-dark-950 rounded-2xl border border-dark-800 w-full max-w-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-dark-800">
                            <h2 className="text-xl font-bold text-white">{editReview ? 'Редактировать' : 'Добавить'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Имя" className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" required />
                                <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Компания" className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" required />
                            </div>
                            <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Должность" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" />
                            <select value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white">
                                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} звезд</option>)}
                            </select>
                            <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="Текст отзыва" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" rows={4} required />
                            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white">
                                <option value="text">Текст</option><option value="video">Видео</option>
                            </select>
                            {form.type === 'video' && <input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} placeholder="YouTube URL" className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white" />}
                            <label className="flex items-center gap-2 text-gray-400"><input type="checkbox" checked={form.isApproved} onChange={e => setForm({ ...form, isApproved: e.target.checked })} />Одобрен</label>
                            <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700">Сохранить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
