import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, Clock, Rocket, Flag, Plus } from 'lucide-react'
import { mockCalendarEvents } from '../data/mockData'
import { useAppStore } from '../store/useAppStore'
import { formatShortDate } from '../utils/helpers'
import { staggerContainer, staggerItem } from '../animations/variants'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const eventColorMap = {
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-300', dot: 'bg-purple-400', border: 'border-purple-500/20' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-300', dot: 'bg-blue-400', border: 'border-blue-500/20' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', dot: 'bg-emerald-400', border: 'border-emerald-500/20' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-300', dot: 'bg-amber-400', border: 'border-amber-500/20' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-300', dot: 'bg-pink-400', border: 'border-pink-500/20' },
  indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', dot: 'bg-indigo-400', border: 'border-indigo-500/20' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-300', dot: 'bg-violet-400', border: 'border-violet-500/20' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', dot: 'bg-cyan-400', border: 'border-cyan-500/20' },
}

const typeIcon = { launch: Rocket, deadline: Flag, event: Clock }

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevDays = new Date(year, month, 0).getDate()

  const days = []
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevDays - i, current: false, date: new Date(year, month - 1, prevDays - i) })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, current: true, date: new Date(year, month, i) })
  }
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, current: false, date: new Date(year, month + 1, i) })
  }
  return days
}

function getEventsForDate(date) {
  const dateStr = date.toISOString().split('T')[0]
  return mockCalendarEvents.filter((e) => e.date === dateStr)
}

export default function CalendarPage() {
  const { openModal } = useAppStore()
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)) // May 2026
  const [selectedDay, setSelectedDay] = useState(today)
  const [view, setView] = useState('month')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const calDays = getCalendarDays(year, month)

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const goToday = () => { setCurrentDate(new Date(2026, 4, 1)); setSelectedDay(new Date(2026, 4, 15)) }

  const selectedEvents = getEventsForDate(selectedDay)
  const upcomingEvents = mockCalendarEvents
    .filter((e) => new Date(e.date) >= new Date('2026-05-15'))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6)

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-xl font-bold text-white">Calendar</h1>
          <p className="text-white/35 text-sm mt-0.5">Campaign schedule and content launches</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={goToday} className="btn-secondary py-2 text-xs">Today</button>
          <button
            onClick={() => openModal('createCampaign')}
            className="btn-primary"
          >
            <Plus size={14} />
            Schedule
          </button>
        </div>
      </motion.div>

      <div className="grid xl:grid-cols-4 gap-6">
        {/* Main calendar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="xl:col-span-3 glass-card p-5"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={prevMonth} className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <ChevronLeft size={15} />
              </button>
              <h2 className="text-white font-bold text-lg">
                {MONTHS[month]} <span className="text-white/40">{year}</span>
              </h2>
              <button onClick={nextMonth} className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <ChevronRight size={15} />
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" />Launch</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" />Deadline</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" />Event</span>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-white/25 text-xs font-medium py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {calDays.map((d, i) => {
              const events = getEventsForDate(d.date)
              const isToday = d.date.toDateString() === new Date('2026-05-15').toDateString()
              const isSelected = d.date.toDateString() === selectedDay.toDateString()
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: d.current ? 1.03 : 1 }}
                  onClick={() => d.current && setSelectedDay(d.date)}
                  className={`relative min-h-[72px] p-1.5 rounded-xl text-left transition-all duration-200 group
                    ${!d.current ? 'opacity-20 cursor-default' : 'cursor-pointer hover:bg-white/[0.04]'}
                    ${isSelected && d.current ? 'bg-purple-500/10 border border-purple-500/25' : 'border border-transparent'}
                  `}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm font-medium mb-1 mx-auto
                    ${isToday ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-glow-purple' :
                      isSelected ? 'bg-purple-500/20 text-purple-300' :
                      d.current ? 'text-white/70 group-hover:text-white' : 'text-white/20'
                    }`}
                  >
                    {d.day}
                  </div>
                  <div className="space-y-0.5">
                    {events.slice(0, 2).map((e) => {
                      const c = eventColorMap[e.color] || eventColorMap.purple
                      return (
                        <div key={e.id} className={`text-[9px] px-1.5 py-0.5 rounded-md truncate font-medium ${c.bg} ${c.text}`}>
                          {e.title}
                        </div>
                      )
                    })}
                    {events.length > 2 && (
                      <div className="text-[9px] px-1.5 text-white/30">+{events.length - 2} more</div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Side panel */}
        <div className="space-y-5">
          {/* Selected day events */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={14} className="text-purple-400" />
              <h3 className="text-white font-semibold text-[14px]">
                {selectedDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </h3>
            </div>
            {selectedEvents.length === 0 ? (
              <p className="text-white/25 text-sm text-center py-4">No events this day</p>
            ) : (
              <div className="space-y-2">
                {selectedEvents.map((e) => {
                  const c = eventColorMap[e.color] || eventColorMap.purple
                  const Icon = typeIcon[e.type] || Clock
                  return (
                    <div key={e.id} className={`p-3 rounded-xl ${c.bg} border ${c.border}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={11} className={c.text} />
                        <span className={`text-[10px] font-medium uppercase tracking-wide ${c.text}`}>{e.type}</span>
                      </div>
                      <p className="text-white text-sm font-medium leading-snug">{e.title}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>

          {/* Upcoming events */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
            className="glass-card p-5"
          >
            <h3 className="text-white font-semibold text-[14px] mb-4">Upcoming</h3>
            <div className="space-y-3">
              {upcomingEvents.map((e) => {
                const c = eventColorMap[e.color] || eventColorMap.purple
                const Icon = typeIcon[e.type] || Clock
                return (
                  <div key={e.id} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={12} className={c.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-medium truncate">{e.title}</p>
                      <p className="text-white/25 text-xs">{formatShortDate(e.date)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
