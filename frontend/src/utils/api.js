import axios from 'axios'

const api = axios.create({
    baseURL: 'https://backend-zhaslantoishybayevs-projects.vercel.app',
    withCredentials: false // Отключим для работы с '*' в CORS
})

export default api
