import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CasesPage from './pages/CasesPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactsPage from './pages/ContactsPage'
import SettingsPage from './pages/SettingsPage'
import BannersPage from './pages/BannersPage'
import ContentPage from './pages/ContentPage'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" /></div>
    if (!user) return <Navigate to="/login" />
    return children
}

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<DashboardPage />} />
                <Route path="cases" element={<CasesPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="banners" element={<BannersPage />} />
                <Route path="content" element={<ContentPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    )
}
