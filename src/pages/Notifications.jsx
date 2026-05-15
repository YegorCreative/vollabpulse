import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, CheckCheck, Megaphone, Clock, Rocket,
  MessageCircle, Star, ChevronRight, AlertCircle, MessageSquare, Info,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { formatRelativeTime, getNotificationMeta } from '../utils/helpers'
import { staggerContainer, staggerItem } from '../animations/variants'

const typeIconMap = {
  campaign_invite: Megaphone,
  pending_action: AlertCircle,
  launch_reminder: Rocket,
  creator_response: MessageCircle,
  campaign_complete: Star,
  discussion_reply: MessageSquare,
  system: Info,
}

const extraNotifications = [
  {
    id: 9,
    type: 'discussion_reply',
    title: 'New Reply to Your Discussion',
    message: '@novastylist replied to "Story share strategy: why timing matters" — \'The 7–9 AM window works perfectly for my audience too.\'',
    timestamp: '2026-05-15T11:00:00',
    read: false,
    priority: 'low',
    actionLabel: 'View Reply',
  },
  {
    id: 10,
    type: 'system',
    title: 'Platform Update: Ideas Board is Live',
    message: 'You can now submit and vote on new feature ideas. Head to the Ideas Board to see the current roadmap and most-requested features.',
    timestamp: '2026-05-14T09:00:00',
    read: true,
    priority: 'low',
    actionLabel: 'Open Ideas Board',
  },
  {
    id: 11,
    type: 'campaign_invite',
    title: 'Summer Wave Campaign Invite',
    message: 'You have been invited to join the "Summer Glow Collection" campaign starting June 14. 14 creators confirmed so far.',
    timestamp: '2026-05-13T08:00:00',
    read: false,
    priority: 'high',
    actionLabel: 'View Campaign',
  },
]

const FILTERS = ['All', 'Unread', 'Invites', 'Actions', 'Reminders', 'Replies']

export default function Notifications() {
  const { notifications, markNotificationRead, markAllRead } = useAppStore()
  const [filter, setFilter] = useState('All')

  const allNotifications = [...notifications, ...extraNotifications].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )
  const unreadCount = allNotifications.filter((n) => !n.read).length

  const filtered = (() => {
    switch (filter) {
      case 'Unread': return allNotifications.filter((n) => !n.read)
      case 'Invites': return allNotifications.filter((n) => n.type === 'campaign_invite')
      case 'Actions': return allNotifications.filter((n) => n.type === 'pending_action')
      case 'Reminders': return allNotifications.filter((n) => n.type === 'launch_reminder')
      case 'Replies': return allNotifications.filter((n) => n.type === 'discussion_reply')
      default: return allNotifications
    }
  })()

  return (
    <div className="p-5 md:p-7 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-xl font-bold text-white">Notifications</h1>
          <p className="text-white/35 text-sm mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={markAllRead}
            className="btn-secondary"
          >
            <CheckCheck size={14} />
            Mark all read
          </motion.button>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="flex items-center gap-1.5 flex-wrap mb-6"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3 py-2 rounded-xl transition-all duration-200 ${
              filter === f
                ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
                : 'bg-white/[0.04] text-white/40 border border-white/[0.06] hover:bg-white/[0.07] hover:text-white/65'
            }`}
          >
            {f}
            {f === 'Unread' && unreadCount > 0 && (
              <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/20">{unreadCount}</span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Notifications list */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-16 flex flex-col items-center text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
            <Bell size={22} className="text-white/20" />
          </div>
          <p className="text-white/50 font-medium mb-1">No notifications</p>
          <p className="text-white/25 text-sm">You're all caught up!</p>
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-2"
        >
          {filtered.map((notif) => {
            const meta = getNotificationMeta(notif.type)
            const Icon = typeIconMap[notif.type] || Bell
            return (
              <motion.div
                key={notif.id}
                variants={staggerItem}
                onClick={() => markNotificationRead(notif.id)}
                className={`glass-card p-4 transition-all duration-200 cursor-pointer hover:border-white/10 hover:bg-white/[0.02]
                  ${!notif.read ? 'border-purple-500/[0.12] bg-purple-500/[0.025]' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className={meta.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{notif.title}</p>
                        {!notif.read && (
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        )}
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                        notif.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                        notif.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-white/5 text-white/25'
                      }`}>
                        {notif.priority}
                      </span>
                    </div>
                    <p className="text-white/45 text-sm leading-snug mb-2.5">{notif.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/25 text-xs flex items-center gap-1.5">
                        <Clock size={10} />
                        {formatRelativeTime(notif.timestamp)}
                      </span>
                      {notif.actionLabel && (
                        <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-medium">
                          {notif.actionLabel}
                          <ChevronRight size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
