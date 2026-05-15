import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Plus, Search, Copy, Check, ChevronDown, Calendar,
  Tag, FileText, Users, TrendingUp, Filter, Zap,
  Flame, ExternalLink, Play, BarChart3, Radio,
  ArrowUpRight, Globe, Eye, Activity,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import {
  formatNumber, formatShortDate, getStatusColor,
} from '../utils/helpers'
import { staggerContainer, staggerItem } from '../animations/variants'
import CampaignDetailsModal from '../components/CampaignDetailsModal'

/* ─────────────────────────────────────────────────────────────────────── */
/*  Constants                                                               */
/* ─────────────────────────────────────────────────────────────────────── */

const STATUS_FILTERS = ['All', 'Active', 'Pending', 'Completed', 'Draft']

const platformBanners = {
  instagram: {
    gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
    symbol: 'IG',
  },
  youtube: {
    gradient: 'linear-gradient(135deg, #FF0000 0%, #880000 100%)',
    symbol: 'YT',
  },
  tiktok: {
    gradient: 'linear-gradient(135deg, #010101 0%, #69C9D0 50%, #EE1D52 100%)',
    symbol: 'TK',
  },
  twitter: {
    gradient: 'linear-gradient(135deg, #1DA1F2 0%, #0D74C5 100%)',
    symbol: 'X',
  },
}

const creatorAvatars = {
  1:  { initials: 'MC', color: 'from-purple-500 to-indigo-600' },
  2:  { initials: 'JL', color: 'from-blue-500 to-cyan-600' },
  3:  { initials: 'AR', color: 'from-amber-500 to-orange-600' },
  4:  { initials: 'SP', color: 'from-emerald-500 to-teal-600' },
  5:  { initials: 'NW', color: 'from-pink-500 to-rose-600' },
  6:  { initials: 'NB', color: 'from-violet-500 to-purple-600' },
  7:  { initials: 'LM', color: 'from-cyan-500 to-blue-600' },
  8:  { initials: 'MT', color: 'from-orange-500 to-amber-600' },
  9:  { initials: 'PS', color: 'from-rose-500 to-pink-600' },
  10: { initials: 'FO', color: 'from-indigo-500 to-blue-600' },
}

const liveActivities = [
  { id: 1, text: '@maya.creates shared Spring Collection Launch',    time: '2m',  dot: 'bg-purple-400',  avatar: 'MC', avatarColor: 'from-purple-500 to-indigo-600' },
  { id: 2, text: '4 new creators joined Music Release Promo',        time: '5m',  dot: 'bg-blue-400',    avatar: null },
  { id: 3, text: 'Wellness Campaign hit 3.2M impressions',           time: '8m',  dot: 'bg-emerald-400', avatar: null },
  { id: 4, text: '@novastylist confirmed for Spring Collection',     time: '12m', dot: 'bg-pink-400',    avatar: 'NW', avatarColor: 'from-pink-500 to-rose-600' },
  { id: 5, text: 'Campaign completion rate climbed to 88%',          time: '18m', dot: 'bg-amber-400',   avatar: null },
  { id: 6, text: '@fitfuelsam posted the Wellness Brand story',      time: '24m', dot: 'bg-emerald-400', avatar: 'SP', avatarColor: 'from-emerald-500 to-teal-600' },
  { id: 7, text: 'Spring Collection engagement up 14%',              time: '31m', dot: 'bg-purple-400',  avatar: null },
  { id: 8, text: '@chefmarcus joined Organic Food Brand Collab',     time: '45m', dot: 'bg-orange-400',  avatar: 'MT', avatarColor: 'from-orange-500 to-amber-600' },
]

/* ─────────────────────────────────────────────────────────────────────── */
/*  CampaignCard                                                            */
/* ─────────────────────────────────────────────────────────────────────── */

function CampaignCard({ campaign, onViewDetails }) {
  const [showCaption, setShowCaption] = useState(false)
  const [copied, setCopied]           = useState(false)

  const s        = getStatusColor(campaign.status)
  const pBanner  = platformBanners[campaign.platform] || platformBanners.instagram
  const isHot    = campaign.priority === 'high' && campaign.status === 'active'
  const isTrend  = campaign.participation > 75 && campaign.status === 'active'
  const visibleCreators = (campaign.creatorIds || []).slice(0, 5)

  const barColor =
    campaign.participation >= 80
      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
      : campaign.participation >= 50
        ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
        : 'bg-gradient-to-r from-amber-500 to-orange-500'

  const copyCaption = () => {
    const text = [campaign.suggestedCaption, campaign.suggestedHashtags].filter(Boolean).join('\n\n')
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3 }}
      className="glass-card overflow-hidden group cursor-pointer transition-shadow duration-200 hover:shadow-[0_0_28px_rgba(139,92,246,0.16)] hover:border-purple-500/22"
    >
      {/* ── Thumbnail Banner ── */}
      <div
        className="relative h-[92px] overflow-hidden flex-shrink-0"
        style={{ background: pBanner.gradient }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        {/* Platform symbol watermark */}
        <div className="absolute bottom-2 left-4 text-white/15 text-5xl font-black select-none leading-none">
          {pBanner.symbol}
        </div>

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {isHot && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
              <Flame size={9} className="text-orange-300" /> HOT
            </span>
          )}
          {isTrend && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
              <TrendingUp size={9} className="text-emerald-300" /> Trending
            </span>
          )}
        </div>

        {/* Top-right: reach pill */}
        <div className="absolute top-3 right-3 bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          <p className="text-white text-[11px] font-bold">{formatNumber(campaign.reachEstimate)}</p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0f0f13] to-transparent" />
      </div>

      {/* ── Card Body ── */}
      <div className="p-3.5">
        {/* Badges row */}
        <div className="flex items-center flex-wrap gap-1.5 mb-2.5">
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
            <span className={`w-1 h-1 rounded-full ${s.dot}`} />
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </span>
          {campaign.priority === 'high' && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              High Priority
            </span>
          )}
          <span className="ml-auto text-[10px] text-white/25 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.05]">
            {campaign.wave}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-[14px] leading-snug mb-1 group-hover:text-purple-100 transition-colors duration-200">
          {campaign.name}
        </h3>

        {/* Description */}
        <p className="text-white/30 text-[11.5px] leading-relaxed mb-2.5 line-clamp-2">
          {campaign.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-2.5 text-[11px]">
          <span className="flex items-center gap-1 text-white/35">
            <Calendar size={10} />
            {formatShortDate(campaign.launchDate)}
          </span>
          <span className="flex items-center gap-1 text-white/35">
            <Users size={10} />
            {campaign.confirmedCreators}/{campaign.targetCreators}
          </span>
          {campaign.tags?.[0] && (
            <span className="flex items-center gap-1 text-white/25">
              <Tag size={10} />
              {campaign.tags[0]}
            </span>
          )}
          <span className="flex items-center gap-1 text-purple-400/60 ml-auto">
            <TrendingUp size={10} />
            {formatNumber(campaign.reachEstimate)}
          </span>
        </div>

        {/* Participation bar */}
        <div className="mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/25 text-[10.5px]">Participation</span>
            <span className="text-white/55 text-[10.5px] font-bold">{campaign.participation}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${campaign.participation}%` }}
              transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
              className={`h-full rounded-full ${barColor}`}
            />
          </div>
        </div>

        {/* Creator avatar cluster */}
        {visibleCreators.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-1.5">
              {visibleCreators.map((cId, i) => {
                const c = creatorAvatars[cId]
                if (!c) return null
                return (
                  <div
                    key={cId}
                    title={`Creator ${cId}`}
                    className={`w-[22px] h-[22px] rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-[7.5px] font-bold text-white border border-[#0f0f13]`}
                    style={{ zIndex: visibleCreators.length - i }}
                  >
                    {c.initials}
                  </div>
                )
              })}
            </div>
            <span className="text-white/25 text-[10.5px]">
              {campaign.confirmedCreators} confirmed
              {campaign.targetCreators > campaign.confirmedCreators && (
                <span className="text-amber-400/50"> · {campaign.targetCreators - campaign.confirmedCreators} slots open</span>
              )}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails?.(campaign)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/35 text-purple-400 text-[11.5px] font-semibold transition-all duration-200"
          >
            <Eye size={11} />
            View Details
          </button>
          {campaign.status === 'active' && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 text-[11.5px] font-semibold transition-all duration-200">
              <Radio size={11} />
              Live
            </button>
          )}
          {campaign.status === 'pending' && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-500/30 text-amber-400 text-[11.5px] font-semibold transition-all duration-200">
              <Play size={11} />
              Launch
            </button>
          )}
          {campaign.status === 'draft' && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] text-white/35 text-[11.5px] font-semibold transition-all duration-200">
              <ExternalLink size={11} />
              Edit Draft
            </button>
          )}
          {campaign.status === 'completed' && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] text-white/35 text-[11.5px] font-semibold transition-all duration-200">
              <BarChart3 size={11} />
              Report
            </button>
          )}
        </div>

        {/* Caption accordion */}
        {(campaign.suggestedCaption || campaign.suggestedHashtags) && (
          <div className="border-t border-white/[0.05] mt-4 pt-3">
            <button
              onClick={() => setShowCaption(!showCaption)}
              className="flex items-center gap-2 text-[11px] text-white/30 hover:text-white/60 transition-colors w-full text-left"
            >
              <FileText size={10} />
              Suggested Caption
              <ChevronDown
                size={10}
                className={`ml-auto transition-transform duration-200 ${showCaption ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {showCaption && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white/[0.03] rounded-xl p-3 mt-2 mb-2 border border-white/[0.05]">
                    {campaign.suggestedCaption && (
                      <p className="text-white/55 text-[11.5px] leading-relaxed">{campaign.suggestedCaption}</p>
                    )}
                    {campaign.suggestedHashtags && (
                      <p className="text-purple-400/50 text-[11px] mt-1.5 leading-relaxed">{campaign.suggestedHashtags}</p>
                    )}
                  </div>
                  <button
                    onClick={copyCaption}
                    className="flex items-center gap-1.5 text-[11px] bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-lg px-3 py-1.5 text-white/45 hover:text-white/70 transition-all duration-200"
                  >
                    {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                    {copied ? 'Copied!' : 'Copy Caption & Hashtags'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/*  Campaigns Page                                                          */
/* ─────────────────────────────────────────────────────────────────────── */

export default function Campaigns() {
  const { campaigns, openModal } = useAppStore()
  const [filter, setFilter]               = useState('All')
  const [search, setSearch]               = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const filtered = campaigns.filter((c) => {
    const matchStatus = filter === 'All' || c.status.toLowerCase() === filter.toLowerCase()
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tags?.some((t) => t.includes(search.toLowerCase()))
    return matchStatus && matchSearch
  })

  const counts = STATUS_FILTERS.reduce((acc, s) => {
    acc[s] =
      s === 'All'
        ? campaigns.length
        : campaigns.filter((c) => c.status.toLowerCase() === s.toLowerCase()).length
    return acc
  }, {})

  /* Derived stats */
  const totalReach         = campaigns.reduce((s, c) => s + (c.reachEstimate || 0), 0)
  const activeCampaigns    = campaigns.filter((c) => c.status === 'active').length
  const completedCampaigns = campaigns.filter((c) => c.status === 'completed').length
  const avgParticipation   = Math.round(campaigns.reduce((s, c) => s + c.participation, 0) / campaigns.length)
  const totalCreators      = campaigns.reduce((acc, c) => { c.creatorIds?.forEach((id) => acc.add(id)); return acc }, new Set()).size

  const heroStats = [
    { label: 'Active',        value: activeCampaigns,          icon: Zap,      color: 'text-purple-400'  },
    { label: 'Total Reach',   value: formatNumber(totalReach), icon: Globe,    color: 'text-blue-400'    },
    { label: 'Creators',      value: totalCreators,            icon: Users,    color: 'text-emerald-400' },
    { label: 'Participation', value: `${avgParticipation}%`,   icon: BarChart3,color: 'text-amber-400'   },
  ]

  const analyticsStrip = [
    { label: 'Total Reach',         value: formatNumber(totalReach), trend: '+24%', icon: Globe,    color: 'text-blue-400',    bg: 'from-blue-500/[0.07] to-blue-500/0'     },
    { label: 'Active Campaigns',    value: activeCampaigns,          trend: '+2',   icon: Zap,      color: 'text-purple-400',  bg: 'from-purple-500/[0.07] to-purple-500/0' },
    { label: 'Creators Engaged',    value: totalCreators,            trend: '+3',   icon: Users,    color: 'text-emerald-400', bg: 'from-emerald-500/[0.07] to-emerald-500/0' },
    { label: 'Avg Participation',   value: `${avgParticipation}%`,   trend: '+6%',  icon: TrendingUp,color: 'text-amber-400',  bg: 'from-amber-500/[0.07] to-amber-500/0'   },
    { label: 'Campaigns Completed', value: completedCampaigns,       trend: null,   icon: Activity, color: 'text-pink-400',    bg: 'from-pink-500/[0.07] to-pink-500/0'     },
  ]

  return (
    <div className="p-4 sm:p-5 md:p-6 max-w-[1400px] mx-auto">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl mb-6 border border-white/[0.06]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0B1E] via-[#09090F] to-[#0C0A1A]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-16 w-72 h-72 bg-purple-600 rounded-full blur-[90px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-16 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[90px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.10, 0.05] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 w-56 h-56 bg-blue-500 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 flex-wrap">
          {/* Left: headline */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 bg-purple-500/15 border border-purple-500/25 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-300 text-[11px] font-semibold tracking-wide">Command Center</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-[28px] font-black text-white mb-2 leading-tight">
              Campaign Command Center
            </h1>
            <p className="text-white/40 text-[13px] leading-relaxed max-w-md mb-5">
              Coordinate creator launches, track participation, and amplify reach across your entire collaboration network.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal('createCampaign')}
              className="btn-primary text-sm"
            >
              <Plus size={14} />
              New Campaign
            </motion.button>
          </div>

          {/* Right: live mini stats */}
          <div className="glass-card p-4 w-full sm:w-auto sm:min-w-[196px] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Radio size={11} className="text-emerald-400" />
              <span className="text-white/45 text-[11px] font-semibold">Live Stats</span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse ml-auto" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <s.icon size={11} className={`${s.color} mb-1`} />
                  <p className="text-white font-bold text-[16px] leading-none">{s.value}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── LIVE ACTIVITY TICKER ─────────────────────────────────────────── */}
      <div className="mb-5 overflow-hidden relative rounded-xl">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#09090F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#09090F] to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          className="flex gap-2.5 w-max"
        >
          {[...liveActivities, ...liveActivities].map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-2 glass-card px-3.5 py-2 flex-shrink-0 rounded-xl"
            >
              {activity.avatar ? (
                <div
                  className={`w-[18px] h-[18px] rounded-full bg-gradient-to-br ${activity.avatarColor} flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0`}
                >
                  {activity.avatar}
                </div>
              ) : (
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${activity.dot}`} />
              )}
              <span className="text-white/40 text-[11.5px] whitespace-nowrap">{activity.text}</span>
              <span className="text-white/20 text-[10px] flex-shrink-0">{activity.time}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── ANALYTICS STRIP ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-5"
      >
        {analyticsStrip.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.05, duration: 0.3 }}
            whileHover={{ y: -2 }}
            className={`glass-card p-3.5 bg-gradient-to-br ${stat.bg} transition-shadow hover:shadow-[0_0_18px_rgba(139,92,246,0.08)]`}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon size={12} className={stat.color} />
              {stat.trend && (
                <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-0.5">
                  <ArrowUpRight size={9} />
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-white font-black text-[18px] tracking-tight leading-none">{stat.value}</p>
            <p className="text-white/30 text-[10.5px] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── FILTER + SEARCH ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.35 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5"
      >
        <div className="relative w-full sm:w-64 flex-shrink-0">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            className="input-field pl-10 py-2.5 text-sm"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Filter chips — horizontal scroll on mobile */}
        <div className="chips-scroll w-full sm:w-auto">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-medium px-3 py-2 rounded-xl transition-all duration-200 min-h-[36px] whitespace-nowrap ${
                filter === f
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
                  : 'bg-white/[0.04] text-white/45 border border-white/[0.06] hover:bg-white/[0.07] hover:text-white/70'
              }`}
            >
              {f}
              {counts[f] > 0 && (
                <span
                  className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                    filter === f ? 'bg-purple-500/20' : 'bg-white/[0.06]'
                  }`}
                >
                  {counts[f]}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── CAMPAIGN GRID ───────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-16 flex flex-col items-center justify-center text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
            <Filter size={22} className="text-white/20" />
          </div>
          <p className="text-white/50 font-medium mb-1">No campaigns found</p>
          <p className="text-white/25 text-sm">Try adjusting your search or filter</p>
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filtered.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onViewDetails={setSelectedCampaign}
            />
          ))}
        </motion.div>
      )}
      <CampaignDetailsModal
        campaign={selectedCampaign}
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </div>
  )
}

