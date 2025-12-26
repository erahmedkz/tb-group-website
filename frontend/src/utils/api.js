import axios from 'axios'

const api = axios.create({
    // Если VITE_API_URL не задан, используем /api (для прокси), 
    // иначе используем полный URL бэкенда
    baseURL: import.meta.env.VITE_API_URL || '',
    withCredentials: true
})

export default api