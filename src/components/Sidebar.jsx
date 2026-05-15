import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Calendar,
  TrendingUp,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  MessageSquare,
  Lightbulb,
  HelpCircle,
  Info,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const navGroups = [
  {
    label: null,
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { path: '/campaigns', label: 'Campaigns', icon: Megaphone },
      { path: '/network', label: 'Creator Network', icon: Users },
      { path: '/analytics', label: 'Growth Analytics', icon: TrendingUp },
    ],
  },
  {
    label: 'Explore',
    items: [
      { path: '/community', label: 'Community', icon: MessageSquare },
      { path: '/ideas', label: 'Ideas Board', icon: Lightbulb },
      { path: '/calendar', label: 'Calendar', icon: Calendar },
    ],
  },
  {
    label: 'More',
    items: [
      { path: '/notifications', label: 'Notifications', icon: Bell, badge: true },
      { path: '/faq', label: 'FAQ', icon: HelpCircle },
      { path: '/about', label: 'About', icon: Info },
      { path: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const { sidebarCollapsed, toggleSidebar, logout, notifications } = useAppStore()
  const location = useLocation()
  const unreadCount = notifications.filter((n) => !n.read).length

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path
    return location.pathname === item.path || location.pathname.startsWith(item.path + '/')
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.05]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-glow-purple">
          <Zap size={15} className="text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-bold text-white text-[15px] tracking-tight whitespace-nowrap"
            >
              VollabPulse
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 overflow-y-auto overflow-x-hidden no-scrollbar">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-2' : ''}>
            {group.label && (
              <AnimatePresence>
                {!sidebarCollapsed ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="text-[9.5px] font-bold text-white/20 uppercase tracking-widest px-3 mb-1 mt-1"
                  >
                    {group.label}
                  </motion.p>
                ) : (
                  <div className="border-t border-white/[0.05] my-2" />
                )}
              </AnimatePresence>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item)
                return (
                  <NavLink key={item.path} to={item.path} onClick={onMobileClose} className="block">
                    <motion.div
                      whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
                      transition={{ duration: 0.12 }}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer
                        ${active
                          ? 'bg-purple-500/10 text-white border border-purple-500/20'
                          : 'text-white/40 hover:text-white/75 hover:bg-white/[0.05] border border-transparent'
                        }`}
                    >
                      <div className="relative flex-shrink-0">
                        <item.icon size={17} />
                        {item.badge && unreadCount > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] bg-purple-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-0.5 leading-none">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        )}
                      </div>
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12 }}
                            className="text-sm font-medium whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {active && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 rounded-xl bg-purple-500/5 -z-10"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                        />
                      )}
                    </motion.div>
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2.5 pb-4 border-t border-white/[0.05] pt-3">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/25 hover:text-red-400 hover:bg-red-500/[0.07] transition-all duration-200 w-full"
        >
          <LogOut size={17} className="flex-shrink-0" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-colors z-20 shadow-card"
      >
        {sidebarCollapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </motion.button>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 68 : 232 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative hidden md:flex flex-col h-screen bg-[#0D0D0D] border-r border-white/[0.05] flex-shrink-0 overflow-visible"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed left-0 top-0 h-full w-[232px] flex flex-col bg-[#0D0D0D] border-r border-white/[0.05] z-50 md:hidden overflow-hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
