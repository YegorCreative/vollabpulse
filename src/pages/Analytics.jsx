import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp, Users, Megaphone, Star, Award, BarChart3,
  Download, Calendar, Filter, Clock, Flame, Zap,
} from 'lucide-react'
import { mockAnalyticsData } from '../data/mockData'
import { useAppStore } from '../store/useAppStore'
import { formatNumber } from '../utils/helpers'
import { staggerContainer, staggerItem } from '../animations/variants'

const CHART_THEME = {
  purple: '#8B5CF6',
  indigo: '#6366F1',
  blue: '#3B82F6',
  cyan: '#06B6D4',
  grid: 'rgba(255,255,255,0.04)',
  text: 'rgba(255,255,255,0.35)',
}

const BEST_TIMES = [
  { day: 'Mon', slots: [{ hour: '7 AM', score: 72 }, { hour: '12 PM', score: 55 }, { hour: '8 PM', score: 88 }] },
  { day: 'Tue', slots: [{ hour: '8 AM', score: 68 }, { hour: '1 PM', score: 60 }, { hour: '9 PM', score: 82 }] },
  { day: 'Wed', slots: [{ hour: '7 AM', score: 75 }, { hour: '12 PM', score: 65 }, { hour: '8 PM', score: 91 }] },
  { day: 'Thu', slots: [{ hour: '6 AM', score: 58 }, { hour: '11 AM', score: 70 }, { hour: '7 PM', score: 85 }] },
  { day: 'Fri', slots: [{ hour: '8 AM', score: 66 }, { hour: '2 PM', score: 74 }, { hour: '9 PM', score: 79 }] },
  { day: 'Sat', slots: [{ hour: '9 AM', score: 80 }, { hour: '3 PM', score: 78 }, { hour: '8 PM', score: 95 }] },
  { day: 'Sun', slots: [{ hour: '10 AM', score: 88 }, { hour: '4 PM', score: 83 }, { hour: '7 PM', score: 76 }] },
]

const engagementLift = [
  { campaign: 'Wellness Brand Campaign', solo: 3.2, collab: 8.7, lift: '+172%' },
  { campaign: 'Spring Collection Launch', solo: 2.8, collab: 7.1, lift: '+154%' },
  { campaign: 'Music Release Promo', solo: 4.1, collab: 9.4, lift: '+129%' },
  { campaign: 'Tech Product Review Wave', solo: 2.5, collab: 5.9, lift: '+136%' },
  { campaign: 'Organic Food Brand', solo: 3.0, collab: 6.8, lift: '+127%' },
]
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3.5 py-3 shadow-card-hover border-white/10">
      <p className="text-white/50 text-xs mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === 'number' && entry.value > 10000 ? formatNumber(entry.value) : entry.value}
        </p>
      ))}
    </div>
  )
}

function KPICard({ icon: Icon, label, value, trend, color }) {
  return (
    <motion.div variants={staggerItem} className="glass-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={16} className="text-white" />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-[22px] font-bold text-white mb-0.5 tracking-tight">{value}</p>
      <p className="text-white/35 text-xs">{label}</p>
    </motion.div>
  )
}

export default function Analytics() {
  const { campaigns, creators } = useAppStore()
  const { engagementTrends, campaignCompletion, supportParticipation, growthEstimates, creatorRankings } = mockAnalyticsData
  const [dateRange, setDateRange] = useState('90d')

  const totalReach = campaigns.reduce((s, c) => s + (c.reachEstimate || 0), 0)
  const avgParticipation = Math.round(campaigns.reduce((s, c) => s + c.participation, 0) / campaigns.length)
  const completedCampaigns = campaigns.filter(c => c.status === 'completed').length

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
          <h1 className="text-xl font-bold text-white">Growth Analytics</h1>
          <p className="text-white/35 text-sm mt-0.5">Collaboration performance and engagement insights</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-1 gap-0.5">
            {['30d', '90d', '6m', '1y'].map(r => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                  dateRange === r ? 'bg-white/[0.08] text-white' : 'text-white/35 hover:text-white/60'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 btn-secondary text-[12px] px-3 py-2">
            <Download size={12} />
            Export
          </button>
        </div>
      </motion.div>

      {/* KPI row */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7"
      >
        <KPICard icon={TrendingUp} label="Total Est. Reach" value={formatNumber(totalReach)} trend={24} color="bg-purple-500/15" />
        <KPICard icon={Users} label="Active Creators" value={creators.filter(c => c.status === 'active').length} trend={8} color="bg-blue-500/15" />
        <KPICard icon={Megaphone} label="Avg Participation" value={`${avgParticipation}%`} trend={6} color="bg-emerald-500/15" />
        <KPICard icon={Star} label="Campaigns Completed" value={completedCampaigns} color="bg-amber-500/15" />
      </motion.div>

      {/* Charts grid */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Engagement Trends - wide */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="xl:col-span-2 glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={15} className="text-purple-400" />
            <h3 className="text-white font-semibold text-[15px]">Engagement Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementTrends} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_THEME.purple} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={CHART_THEME.purple} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_THEME.cyan} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={CHART_THEME.cyan} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={CHART_THEME.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: CHART_THEME.text, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: CHART_THEME.text, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatNumber} width={48} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="reach" name="Reach" stroke={CHART_THEME.purple} strokeWidth={2} fill="url(#reachGrad)" dot={false} />
              <Area type="monotone" dataKey="engagement" name="Engagement" stroke={CHART_THEME.cyan} strokeWidth={2} fill="url(#engGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Participation Breakdown - pie */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="glass-card p-5"
        >
          <h3 className="text-white font-semibold text-[15px] mb-6">Support by Category</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={supportParticipation}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={74}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {supportParticipation.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {supportParticipation.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.fill }} />
                  <span className="text-white/50 text-xs">{item.name}</span>
                </div>
                <span className="text-white/70 text-xs font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Campaign Completion */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="glass-card p-5"
        >
          <h3 className="text-white font-semibold text-[15px] mb-6">Campaign Completion</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={campaignCompletion} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barSize={20}>
              <CartesianGrid stroke={CHART_THEME.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: CHART_THEME.text, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: CHART_THEME.text, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Total" fill="rgba(139,92,246,0.15)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" name="Completed" fill={CHART_THEME.purple} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Growth Estimates */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="glass-card p-5"
        >
          <h3 className="text-white font-semibold text-[15px] mb-6">Creator Growth</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={growthEstimates} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_THEME.indigo} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={CHART_THEME.indigo} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={CHART_THEME.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: CHART_THEME.text, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: CHART_THEME.text, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="actual" name="Actual" stroke={CHART_THEME.purple} strokeWidth={2.5} dot={{ fill: CHART_THEME.purple, r: 3, strokeWidth: 0 }} connectNulls={false} />
              <Line type="monotone" dataKey="projected" name="Projected" stroke={CHART_THEME.indigo} strokeWidth={2} strokeDasharray="5 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Creator Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <Award size={15} className="text-amber-400" />
            <h3 className="text-white font-semibold text-[15px]">Creator Consistency</h3>
          </div>
          <div className="space-y-3">
            {creatorRankings.map((creator, i) => (
              <div key={creator.name} className="flex items-center gap-3">
                <span className={`text-sm font-bold w-5 text-right flex-shrink-0 ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-white/50' : i === 2 ? 'text-orange-400/70' : 'text-white/25'}`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/80 text-xs font-medium truncate">{creator.name}</span>
                    <span className="text-white text-xs font-bold ml-2">{creator.score}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${creator.score}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                      className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`}
                    />
                  </div>
                </div>
                <span className="text-white/25 text-xs flex-shrink-0">{creator.campaigns}c</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row — Engagement Lift + Best Posting Times */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Engagement Lift */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <Flame size={15} className="text-orange-400" />
            <h3 className="text-white font-semibold text-[15px]">Collaboration Engagement Lift</h3>
          </div>
          <p className="text-white/30 text-[12px] mb-4">Solo vs. coordinated campaign engagement rate (%)</p>
          <div className="space-y-3">
            {engagementLift.map((item, i) => (
              <motion.div
                key={item.campaign}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.07, duration: 0.3 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/55 text-[12px] truncate flex-1 mr-2">{item.campaign}</span>
                  <span className="text-emerald-400 text-[11px] font-bold flex-shrink-0">{item.lift}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.solo / 10) * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                      className="h-full bg-white/20 rounded-full"
                    />
                  </div>
                  <span className="text-white/20 text-[10px] w-6 text-right">{item.solo}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.collab / 10) * 100}%` }}
                      transition={{ delay: 0.55 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    />
                  </div>
                  <span className="text-purple-400 text-[10px] font-semibold w-6 text-right">{item.collab}%</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.05]">
            <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 bg-white/20 rounded-full" /><span className="text-white/30 text-[11px]">Solo</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" /><span className="text-white/30 text-[11px]">Collab</span></div>
          </div>
        </motion.div>

        {/* Best Posting Times */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.45 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock size={15} className="text-cyan-400" />
            <h3 className="text-white font-semibold text-[15px]">Best Posting Times</h3>
            <span className="ml-auto text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md font-semibold">AI Preview</span>
          </div>
          <p className="text-white/30 text-[12px] mb-4">Engagement score by day and time slot</p>
          <div className="space-y-2">
            {BEST_TIMES.map((dayData, di) => (
              <motion.div
                key={dayData.day}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + di * 0.05 }}
                className="flex items-center gap-2"
              >
                <span className="text-white/30 text-[11px] w-7 flex-shrink-0 font-medium">{dayData.day}</span>
                <div className="flex-1 grid grid-cols-3 gap-1.5">
                  {dayData.slots.map(slot => (
                    <div
                      key={slot.hour}
                      className="relative rounded-lg overflow-hidden"
                      style={{ height: 28 }}
                    >
                      <div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: `rgba(139,92,246,${slot.score / 100 * 0.7 + 0.05})`,
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[9px] text-white/60 font-medium">{slot.hour}</span>
                        <span className="text-[8px] text-white/40">{slot.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
            <span className="text-white/20 text-[11px]">Lower engagement</span>
            <div className="flex gap-1">
              {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((o, i) => (
                <div key={i} className="w-4 h-2 rounded-sm" style={{ background: `rgba(139,92,246,${o})` }} />
              ))}
            </div>
            <span className="text-white/20 text-[11px]">Peak time</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
