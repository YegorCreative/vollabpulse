import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import Auth from './pages/Auth'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import CreatorNetwork from './pages/CreatorNetwork'
import CalendarPage from './pages/Calendar'
import Analytics from './pages/Analytics'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Community from './pages/Community'
import IdeasBoard from './pages/IdeasBoard'
import FAQ from './pages/FAQ'
import About from './pages/About'

function App() {
  const { isAuthenticated } = useAppStore()

  return (
    <Routes>
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/auth" replace />}
      >
        <Route index element={<Dashboard />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="network" element={<CreatorNetwork />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="community" element={<Community />} />
        <Route path="ideas" element={<IdeasBoard />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
