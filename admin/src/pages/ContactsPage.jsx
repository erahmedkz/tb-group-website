import { useState, useEffect } from 'react'
import axios from 'axios'
import { Trash2, Eye, Clock, Check, X as XIcon } from 'lucide-react'

const statusColors = { new: 'bg-blue-600/20 text-blue-400', processing: 'bg-yellow-600/20 text-yellow-400', completed: 'bg-green-600/20 text-green-400', cancelled: 'bg-red-600/20 text-red-400' }
const statusLabels = { new: 'Новая', processing: 'В работе', completed: 'Завершена', cancelled: 'Отменена' }

export default function ContactsPage() {
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)

    useEffect(() => { fetchContacts() }, [])
    const fetchContacts = async () => { const res = await axios.get('/api/contact'); setContacts(res.data) }

    const updateStatus = async (id, status) => { await axios.patch(`/api/contact/${id}`, { status }); fetchContacts() }
    const handleDelete = async (id) => { if (confirm('Удалить?')) { await axios.delete(`/api/contact/${id}`); fetchContacts() } }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Заявки</h1>
            <div className="bg-dark-950 border border-dark-800 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-dark-800"><tr><th className="px-6 py-4 text-left text-gray-400">Имя</th><th className="px-6 py-4 text-left text-gray-400">Телефон</th><th className="px-6 py-4 text-left text-gray-400">Услуга</th><th className="px-6 py-4 text-left text-gray-400">Статус</th><th className="px-6 py-4 text-left text-gray-400">Дата</th><th className="px-6 py-4"></th></tr></thead>
                    <tbody>
                        {contacts.map(c => (
                            <tr key={c._id} className="border-t border-dark-800 hover:bg-dark-800/50">
                                <td className="px-6 py-4 text-white">{c.name}</td>
                                <td className="px-6 py-4 text-gray-400">{c.phone}</td>
                                <td className="px-6 py-4 text-gray-400">{c.service || '-'}</td>
                                <td className="px-6 py-4">
                                    <select value={c.status} onChange={e => updateStatus(c._id, e.target.value)} className={`px-2 py-1 rounded text-sm ${statusColors[c.status]} bg-transparent border-0 cursor-pointer`}>
                                        {Object.keys(statusLabels).map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{new Date(c.createdAt).toLocaleDateString('ru')}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => setSelectedContact(c)} className="p-2 text-gray-400 hover:text-white"><Eye className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(c._id)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {contacts.length === 0 && <div className="p-12 text-center text-gray-500">Нет заявок</div>}
            </div>
            {selectedContact && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-dark-950 rounded-2xl border border-dark-800 w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b border-dark-800">
                            <h2 className="text-xl font-bold text-white">Заявка</h2>
                            <button onClick={() => setSelectedContact(null)} className="text-gray-400 hover:text-white"><XIcon className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div><span className="text-gray-500">Имя:</span><p className="text-white">{selectedContact.name}</p></div>
                            <div><span className="text-gray-500">Телефон:</span><p className="text-white">{selectedContact.phone}</p></div>
                            <div><span className="text-gray-500">Email:</span><p className="text-white">{selectedContact.email || '-'}</p></div>
                            <div><span className="text-gray-500">Услуга:</span><p className="text-white">{selectedContact.service || '-'}</p></div>
                            <div><span className="text-gray-500">Сообщение:</span><p className="text-white">{selectedContact.message || '-'}</p></div>
                            <div><span className="text-gray-500">Дата:</span><p className="text-white">{new Date(selectedContact.createdAt).toLocaleString('ru')}</p></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
