import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Bell, Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import CreateCampaignModal from '../components/CreateCampaignModal'
import { useAppStore } from '../store/useAppStore'

const pageTitles = {
  '/': 'Dashboard',
  '/campaigns': 'Campaigns',
  '/network': 'Creator Network',
  '/calendar': 'Calendar',
  '/analytics': 'Growth Analytics',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/community': 'Community',
  '/ideas': 'Ideas Board',
  '/faq': 'FAQ',
  '/about': 'About',
}

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { notifications, openModal } = useAppStore()
  const location = useLocation()
  const unreadCount = notifications.filter((n) => !n.read).length
  const pageTitle = pageTitles[location.pathname] || 'VollabPulse'

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A]">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-white/[0.05] bg-[#0D0D0D] flex-shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <Menu size={17} />
          </button>
          <span className="text-white font-semibold text-[15px]">{pageTitle}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal('createCampaign')}
              className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 hover:bg-purple-500/25 transition-colors"
            >
              <Plus size={16} />
            </button>
            <button className="relative w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-white/50 hover:text-white transition-colors">
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <CreateCampaignModal />
    </div>
  )
}
