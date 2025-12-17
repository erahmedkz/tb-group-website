import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'

// Pages
import HomePage from './pages/HomePage'
import MoySkladPage from './pages/services/MoySkladPage'
import Bitrix24Page from './pages/services/Bitrix24Page'
import TelephonyPage from './pages/services/TelephonyPage'
import CasesPage from './pages/CasesPage'
import ReviewsPage from './pages/ReviewsPage'
import AboutPage from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'

function App() {
    const location = useLocation()

    return (
        <div className="min-h-screen bg-dark-950 flex flex-col">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services/moysklad" element={<MoySkladPage />} />
                        <Route path="/services/bitrix24" element={<Bitrix24Page />} />
                        <Route path="/services/telephony" element={<TelephonyPage />} />
                        <Route path="/cases" element={<CasesPage />} />
                        <Route path="/reviews" element={<ReviewsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    )
}

export default App
