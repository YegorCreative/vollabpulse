import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X, Calendar, Users, TrendingUp, Globe, CheckCircle,
  Clock, Copy, Check, BarChart3, Activity, Zap, Flame,
  MessageSquare, ArrowUpRight, Radio,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useAppStore } from '../store/useAppStore'
import { formatNumber, formatShortDate, getStatusColor } from '../utils/helpers'

/* ─── Constants ─────────────────────────────────────────────────────────── */

const platformBanners = {
  instagram: { gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)', symbol: 'IG' },
  youtube:   { gradient: 'linear-gradient(135deg, #FF0000 0%, #880000 100%)', symbol: 'YT' },
  tiktok:    { gradient: 'linear-gradient(135deg, #010101 0%, #69C9D0 50%, #EE1D52 100%)', symbol: 'TK' },
  twitter:   { gradient: 'linear-gradient(135deg, #1DA1F2 0%, #0D74C5 100%)', symbol: 'X' },
}

const avatarColors = {
  1: 'from-purple-500 to-indigo-600',
  2: 'from-blue-500 to-cyan-600',
  3: 'from-amber-500 to-orange-600',
  4: 'from-emerald-500 to-teal-600',
  5: 'from-pink-500 to-rose-600',
  6: 'from-violet-500 to-purple-600',
  7: 'from-cyan-500 to-blue-600',
  8: 'from-orange-500 to-amber-600',
  9: 'from-rose-500 to-pink-600',
  10: 'from-indigo-500 to-blue-600',
}

const TABS = ['Overview', 'Creators', 'Activity', 'Timeline']

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function buildTrendData(campaign) {
  const base   = campaign.reachEstimate * 0.028
  const growth = campaign.reachEstimate * 0.007
  return Array.from({ length: 14 }, (_, i) => ({
    day: `D${i + 1}`,
    reach: Math.floor(
      base + growth * i + (((campaign.id * 13 + i * 7) % 20) - 10) * base * 0.06,
    ),
  }))
}

function buildActivities(campaign) {
  const list = [
    {
      id: 1, text: `Campaign "${campaign.name}" was created`,
      time: formatShortDate(campaign.createdAt), dot: 'bg-purple-400', icon: Zap,
    },
    {
      id: 2, text: `${campaign.targetCreators} creators were invited`,
      time: formatShortDate(campaign.launchDate), dot: 'bg-blue-400', icon: Users,
    },
  ]
  if (campaign.participation > 0) {
    list.push({
      id: 3,
      text: `${campaign.confirmedCreators} creators confirmed participation`,
      time: formatShortDate(campaign.launchDate),
      dot: 'bg-emerald-400', icon: CheckCircle,
    })
  }
  if (campaign.status === 'active') {
    list.push(
      { id: 4, text: `${campaign.wave} officially launched`, time: 'May 10, 2026', dot: 'bg-amber-400', icon: Flame },
      { id: 5, text: `${Math.floor(campaign.confirmedCreators * 0.6)} creators posted content`, time: 'May 12, 2026', dot: 'bg-pink-400', icon: MessageSquare },
      { id: 6, text: `Engagement up ${Math.floor(campaign.participation * 0.15)}% this week`, time: 'May 14, 2026', dot: 'bg-emerald-400', icon: TrendingUp },
    )
  }
  if (campaign.status === 'completed') {
    list.push(
      { id: 4, text: `Campaign completed with ${campaign.participation}% participation`, time: formatShortDate(campaign.endDate), dot: 'bg-emerald-400', icon: CheckCircle },
      { id: 5, text: `Final reach: ${formatNumber(campaign.reachEstimate)} users`, time: formatShortDate(campaign.endDate), dot: 'bg-blue-400', icon: Globe },
    )
  }
  return list
}

function buildTimeline(campaign) {
  const isAfter = (status) =>
    ['active', 'completed'].includes(campaign.status) ? 'done' : status

  return [
    {
      id: 1, title: 'Campaign Created', date: campaign.createdAt,
      status: 'done', dotColor: 'bg-purple-500',
      desc: `Set up with ${campaign.targetCreators} creator slots and content brief.`,
    },
    {
      id: 2, title: 'Creator Invitations Sent', date: campaign.launchDate,
      status: campaign.status === 'draft' ? 'upcoming' : 'done',
      dotColor: 'bg-blue-500',
      desc: `${campaign.targetCreators} creators were invited to participate.`,
    },
    {
      id: 3, title: `${campaign.wave} Launch`, date: campaign.launchDate,
      status: campaign.status === 'active' ? 'live'
             : campaign.status === 'pending' || campaign.status === 'draft' ? 'upcoming'
             : 'done',
      dotColor: 'bg-emerald-500',
      desc: 'Campaign content publishing begins across all platforms.',
    },
    {
      id: 4, title: 'Campaign Ends', date: campaign.endDate,
      status: campaign.status === 'completed' ? 'done' : 'upcoming',
      dotColor: 'bg-amber-500',
      desc: 'Campaign closes and final performance metrics are compiled.',
    },
  ]
}

/* ─── Chart Tooltip ─────────────────────────────────────────────────────── */

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1A1A2E] border border-white/10 rounded-xl px-3 py-2 text-[11px]">
      <p className="text-white/40 mb-0.5">{label}</p>
      <p className="text-purple-300 font-semibold">{formatNumber(payload[0].value)}</p>
    </div>
  )
}

/* ─── Main Component ────────────────────────────────────────────────────── */

export default function CampaignDetailsModal({ campaign, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [copiedId, setCopiedId]   = useState(null)
  const { creators } = useAppStore()

  const chartData        = useMemo(() => campaign ? buildTrendData(campaign) : [], [campaign?.id])
  const activities       = useMemo(() => campaign ? buildActivities(campaign) : [], [campaign?.id])
  const timeline         = useMemo(() => campaign ? buildTimeline(campaign) : [], [campaign?.id])
  const campaignCreators = useMemo(
    () => creators.filter((c) => campaign?.creatorIds?.includes(c.id)),
    [campaign?.id, creators],
  )

  const copy = (text, id) => {
    if (!text) return
    navigator.clipboard.writeText(text).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2200)
  }

  /* Reset tab when campaign changes */
  const handleTabClick = (tab) => setActiveTab(tab)

  if (!campaign) return null

  const s       = getStatusColor(campaign.status)
  const pBanner = platformBanners[campaign.platform] || platformBanners.instagram
  const isHot   = campaign.priority === 'high' && campaign.status === 'active'
  const isTrend = campaign.participation > 75 && campaign.status === 'active'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
        >
          {/* Blurred backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-3xl flex flex-col bg-[#0D0D12] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_60px_rgba(139,92,246,0.07)]"
            style={{ maxHeight: '88vh' }}
          >
            {/* ── Hero Header ──────────────────────────────────────────── */}
            <div
              className="relative h-[140px] overflow-hidden flex-shrink-0"
              style={{ background: pBanner.gradient }}
            >
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute -top-8 -right-8 w-44 h-44 bg-white/10 rounded-full blur-3xl pointer-events-none" />

              {/* Platform watermark */}
              <div className="absolute bottom-3 left-5 text-white/10 text-7xl font-black select-none leading-none">
                {pBanner.symbol}
              </div>

              {/* Gradient fade to dark */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

              {/* Header content */}
              <div className="absolute inset-0 flex items-end p-5">
                <div className="flex items-end justify-between w-full gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-1.5 mb-2">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                        <span className={`w-1 h-1 rounded-full ${s.dot}`} />
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                      {isHot && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                          <Flame size={9} className="text-orange-300" /> HOT
                        </span>
                      )}
                      {isTrend && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                          <TrendingUp size={9} className="text-emerald-300" /> Trending
                        </span>
                      )}
                    </div>
                    <h2 className="text-white font-black text-lg md:text-xl leading-tight">
                      {campaign.name}
                    </h2>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-white font-black text-2xl leading-none">
                      {formatNumber(campaign.reachEstimate)}
                    </p>
                    <p className="text-white/45 text-[10px] mt-0.5">estimated reach</p>
                  </div>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10 z-10"
              >
                <X size={13} />
              </button>
            </div>

            {/* ── Quick Stats Bar ──────────────────────────────────────── */}
            <div className="grid grid-cols-4 border-b border-white/[0.05] flex-shrink-0">
              {[
                { label: 'Participation', value: `${campaign.participation}%`, icon: Activity },
                { label: 'Creators',      value: `${campaign.confirmedCreators}/${campaign.targetCreators}`, icon: Users },
                { label: 'Launch Date',   value: formatShortDate(campaign.launchDate), icon: Calendar },
                { label: 'Wave',          value: campaign.wave, icon: Zap },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`py-2.5 px-3 text-center ${i > 0 ? 'border-l border-white/[0.04]' : ''}`}
                >
                  <p className="text-white font-bold text-[14px] leading-none">{stat.value}</p>
                  <p className="text-white/25 text-[9.5px] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* ── Tabs ─────────────────────────────────────────────────── */}
            <div className="flex items-center border-b border-white/[0.05] px-4 gap-0 flex-shrink-0">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`py-3 px-3.5 text-[12px] font-medium transition-all duration-200 border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-purple-300 border-purple-500'
                      : 'text-white/30 border-transparent hover:text-white/55 hover:border-white/15'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ── Tab Content ──────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto no-scrollbar">

              {/* ─ Overview ─ */}
              {activeTab === 'Overview' && (
                <div className="p-5 space-y-4">
                  {/* Description */}
                  <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05]">
                    <p className="text-white/55 text-[13px] leading-relaxed mb-3">
                      {campaign.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {campaign.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10.5px] px-2.5 py-0.5 rounded-full bg-purple-500/8 border border-purple-500/15 text-purple-400/70"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Participation bar */}
                  <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white/60 text-[12px] font-medium mb-0.5">Campaign Participation</p>
                        <p className="text-white/30 text-[11px]">
                          {campaign.confirmedCreators} of {campaign.targetCreators} creators confirmed
                        </p>
                      </div>
                      <p className="text-white font-black text-2xl">{campaign.participation}%</p>
                    </div>
                    <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${campaign.participation}%` }}
                        transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          campaign.participation >= 80
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : campaign.participation >= 50
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-400'
                              : 'bg-gradient-to-r from-amber-500 to-orange-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* 14-day reach chart */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">
                        14-Day Reach Trend
                      </h3>
                      <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                        <ArrowUpRight size={11} />
                        +{Math.floor(campaign.participation * 0.15)}% this week
                      </span>
                    </div>
                    <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05]">
                      <ResponsiveContainer width="100%" height={110}>
                        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="modalReachGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%"   stopColor="#8B5CF6" stopOpacity={0.3} />
                              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="day"
                            tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
                            axisLine={false}
                            tickLine={false}
                            interval={2}
                          />
                          <YAxis hide />
                          <Tooltip content={<ChartTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="reach"
                            stroke="#8B5CF6"
                            strokeWidth={1.5}
                            fill="url(#modalReachGrad)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Suggested content */}
                  {(campaign.suggestedCaption || campaign.suggestedHashtags) && (
                    <div>
                      <h3 className="text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-2.5">
                        Suggested Content Brief
                      </h3>
                      <div className="bg-white/[0.02] rounded-xl border border-white/[0.05] overflow-hidden">
                        {campaign.suggestedCaption && (
                          <div className="p-4 border-b border-white/[0.04]">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/35 text-[10.5px] font-semibold uppercase tracking-wider">Caption</span>
                              <button
                                onClick={() => copy(campaign.suggestedCaption, 'caption')}
                                className="flex items-center gap-1 text-[10.5px] text-white/25 hover:text-white/60 transition-colors"
                              >
                                {copiedId === 'caption'
                                  ? <Check size={9} className="text-emerald-400" />
                                  : <Copy size={9} />}
                                {copiedId === 'caption' ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                            <p className="text-white/60 text-[12.5px] leading-relaxed">{campaign.suggestedCaption}</p>
                          </div>
                        )}
                        {campaign.suggestedHashtags && (
                          <div className="p-4 border-b border-white/[0.04]">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/35 text-[10.5px] font-semibold uppercase tracking-wider">Hashtags</span>
                              <button
                                onClick={() => copy(campaign.suggestedHashtags, 'tags')}
                                className="flex items-center gap-1 text-[10.5px] text-white/25 hover:text-white/60 transition-colors"
                              >
                                {copiedId === 'tags'
                                  ? <Check size={9} className="text-emerald-400" />
                                  : <Copy size={9} />}
                                {copiedId === 'tags' ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                            <p className="text-purple-400/60 text-[12px] leading-relaxed">{campaign.suggestedHashtags}</p>
                          </div>
                        )}
                        <div className="p-3">
                          <button
                            onClick={() =>
                              copy(
                                [campaign.suggestedCaption, campaign.suggestedHashtags]
                                  .filter(Boolean)
                                  .join('\n\n'),
                                'all',
                              )
                            }
                            className="w-full py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/18 border border-purple-500/15 hover:border-purple-500/28 text-purple-300 text-[12px] font-semibold transition-all duration-200"
                          >
                            {copiedId === 'all' ? '✓ Copied full brief!' : 'Copy Full Brief'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─ Creators ─ */}
              {activeTab === 'Creators' && (
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-white/40 text-[12px]">
                      {campaign.confirmedCreators} confirmed
                      <span className="text-white/20"> · </span>
                      {campaign.targetCreators - campaign.confirmedCreators} slots open
                    </p>
                    {campaign.status === 'active' && (
                      <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-semibold">
                        <Radio size={10} /> Live
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-2.5">
                    {campaignCreators.map((creator, i) => {
                      const confirmed = i < campaign.confirmedCreators
                      const color     = avatarColors[creator.id] || 'from-purple-500 to-indigo-600'
                      const initials  = creator.name.split(' ').map((w) => w[0]).join('').slice(0, 2)
                      return (
                        <div
                          key={creator.id}
                          className="flex items-center gap-3 p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
                        >
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0`}
                          >
                            {initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-white font-semibold text-[12.5px] truncate">{creator.name}</p>
                              {confirmed ? (
                                <span className="flex-shrink-0 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                                  Confirmed
                                </span>
                              ) : (
                                <span className="flex-shrink-0 text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
                                  Pending
                                </span>
                              )}
                            </div>
                            <p className="text-white/30 text-[11px] truncate">
                              {creator.username} · {creator.category}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-white font-bold text-[14px] leading-none">
                              {creator.reliabilityScore}%
                            </p>
                            <p className="text-white/25 text-[9px] mt-0.5">reliability</p>
                          </div>
                        </div>
                      )
                    })}

                    {/* Empty slots */}
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.min(campaign.targetCreators - campaignCreators.length, 3),
                      ),
                    }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="flex items-center gap-3 p-3.5 bg-white/[0.01] rounded-xl border border-dashed border-white/[0.07]"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                          <Users size={13} className="text-white/15" />
                        </div>
                        <div>
                          <p className="text-white/20 text-[12px]">Open Slot</p>
                          <p className="text-white/12 text-[10.5px]">Awaiting confirmation</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─ Activity ─ */}
              {activeTab === 'Activity' && (
                <div className="p-5">
                  <div className="space-y-0">
                    {activities.map((item, i) => (
                      <div key={item.id} className="flex gap-3 group">
                        <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                          {i < activities.length - 1 && (
                            <div className="w-px flex-1 bg-white/[0.05] mt-1 mb-1 min-h-[24px]" />
                          )}
                        </div>
                        <div className="pb-4 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-white/55 text-[12.5px] leading-relaxed group-hover:text-white/80 transition-colors">
                              {item.text}
                            </p>
                            <span className="text-white/20 text-[10.5px] whitespace-nowrap flex-shrink-0 mt-0.5">
                              {item.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─ Timeline ─ */}
              {activeTab === 'Timeline' && (
                <div className="p-5">
                  <div className="space-y-0">
                    {timeline.map((item, i) => (
                      <div key={item.id} className="flex gap-4">
                        {/* Dot + line */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                              item.status === 'done'
                                ? `${item.dotColor} border-transparent`
                                : item.status === 'live'
                                  ? 'bg-transparent border-purple-500'
                                  : 'bg-white/[0.04] border-white/[0.10]'
                            }`}
                          >
                            {item.status === 'done' && <CheckCircle size={14} className="text-white" />}
                            {item.status === 'live' && (
                              <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse" />
                            )}
                            {item.status === 'upcoming' && (
                              <Clock size={12} className="text-white/20" />
                            )}
                          </div>
                          {i < timeline.length - 1 && (
                            <div
                              className={`w-px flex-1 my-1.5 ${
                                item.status === 'done' ? 'bg-white/12' : 'bg-white/[0.04]'
                              }`}
                              style={{ minHeight: '28px' }}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="pb-6 flex-1 pt-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className={`font-semibold text-[13px] ${
                                item.status === 'done'
                                  ? 'text-white/70'
                                  : item.status === 'live'
                                    ? 'text-purple-300'
                                    : 'text-white/25'
                              }`}
                            >
                              {item.title}
                            </h4>
                            {item.status === 'live' && (
                              <span className="text-[9px] font-bold text-purple-400 bg-purple-500/12 border border-purple-500/20 px-1.5 py-0.5 rounded-full">
                                LIVE
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-[12px] leading-relaxed ${
                              item.status === 'done' ? 'text-white/30' : 'text-white/18'
                            }`}
                          >
                            {item.desc}
                          </p>
                          <p className="text-white/15 text-[10.5px] mt-1.5">
                            {formatShortDate(item.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
