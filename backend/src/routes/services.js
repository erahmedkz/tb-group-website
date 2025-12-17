import express from 'express'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Service content structure
const defaultServices = {
    moysklad: {
        title: 'МойСклад',
        description: 'Внедрение и настройка облачной системы учета товаров',
        features: ['Учет товаров', 'Синхронизация данных', 'Аналитика', 'Интеграции'],
        benefits: ['Сокращение времени на 70%', 'Автоматизация операций', 'Снижение ошибок'],
    },
    bitrix24: {
        title: 'Битрикс24',
        description: 'Автоматизация бизнес-процессов и настройка CRM',
        features: ['CRM система', 'Бизнес-процессы', 'Аналитика', 'Задачи'],
        benefits: ['Рост конверсии до 30%', 'Автоматизация до 80%', 'Единое пространство'],
    },
    telephony: {
        title: 'Телефония',
        description: 'SIP-решения и IP АТС для бизнеса',
        features: ['IP телефония', 'Виртуальная АТС', 'Call-центр', 'SIP-транки'],
        benefits: ['Снижение расходов до 50%', 'Запись разговоров', 'Интеграция с CRM'],
    }
}

router.get('/', (req, res) => res.json(defaultServices))
router.get('/:id', (req, res) => {
    const service = defaultServices[req.params.id]
    if (!service) return res.status(404).json({ error: 'Not found' })
    res.json(service)
})

export default router
