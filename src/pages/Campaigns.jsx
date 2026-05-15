import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Plus, Search, Copy, Check, ChevronDown, Calendar,
  Tag, FileText, Users, TrendingUp, Filter,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import {
  formatNumber, formatShortDate, getStatusColor, getPlatformMeta,
} from '../utils/helpers'
import { staggerContainer, staggerItem } from '../animations/variants'

const STATUS_FILTERS = ['All', 'Active', 'Pending', 'Completed', 'Draft']

function PlatformBadge({ platform }) {
  const meta = getPlatformMeta(platform)
  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${meta.bg} ${meta.color} capitalize`}>
      {meta.label}
    </span>
  )
}

function CampaignCard({ campaign }) {
  const [showCaption, setShowCaption] = useState(false)
  const [copied, setCopied] = useState(false)
  const s = getStatusColor(campaign.status)

  const copyCaption = () => {
    const text = [campaign.suggestedCaption, campaign.suggestedHashtags].filter(Boolean).join('\n\n')
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      variants={staggerItem}
      className="glass-card overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* Top accent stripe */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${
        campaign.status === 'active' ? 'from-purple-500 to-indigo-500' :
        campaign.status === 'completed' ? 'from-blue-500 to-cyan-500' :
        campaign.status === 'pending' ? 'from-amber-500 to-orange-500' :
        'from-white/10 to-white/5'
      }`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <PlatformBadge platform={campaign.platform} />
              <span className={`status-badge ${s.bg} ${s.text}`}>
                <span className={`w-1 h-1 rounded-full ${s.dot}`} />
                {campaign.status}
              </span>
              {campaign.priority === 'high' && (
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-red-500/10 text-red-400">
                  High Priority
                </span>
              )}
            </div>
            <h3 className="text-white font-semibold text-base leading-snug">{campaign.name}</h3>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-white font-bold text-[15px]">{formatNumber(campaign.reachEstimate)}</p>
            <p className="text-white/25 text-[11px]">est. reach</p>
          </div>
        </div>

        {/* Description */}
        {campaign.description && (
          <p className="text-white/35 text-xs leading-relaxed mb-4 line-clamp-2">{campaign.description}</p>
        )}

        {/* Participation bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/40 text-xs flex items-center gap-1">
              <Users size={11} /> Participation
            </span>
            <span className="text-white/70 text-xs font-medium">
              {campaign.confirmedCreators}/{campaign.targetCreators} creators
            </span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${campaign.participation}%` }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-white/20 text-[11px]">{campaign.wave}</span>
            <span className="text-white/45 text-[11px] font-medium">{campaign.participation}%</span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-4 text-xs text-white/35 flex-wrap">
          {campaign.launchDate && (
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {formatShortDate(campaign.launchDate)}
            </span>
          )}
          {campaign.tags?.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Tag size={11} />
              {campaign.tags.slice(0, 2).join(', ')}
            </span>
          )}
          {campaign.reachEstimate > 0 && (
            <span className="flex items-center gap-1.5 ml-auto text-purple-400/60">
              <TrendingUp size={11} />
              {formatNumber(campaign.reachEstimate)} reach
            </span>
          )}
        </div>

        {/* Caption section */}
        {(campaign.suggestedCaption || campaign.suggestedHashtags) && (
          <div className="border-t border-white/[0.05] pt-4">
            <button
              onClick={() => setShowCaption(!showCaption)}
              className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-2 w-full text-left"
            >
              <FileText size={11} />
              Suggested Caption
              <ChevronDown
                size={11}
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
                  <div className="bg-white/[0.03] rounded-xl p-3.5 mb-2.5 border border-white/[0.05]">
                    {campaign.suggestedCaption && (
                      <p className="text-white/65 text-xs leading-relaxed">{campaign.suggestedCaption}</p>
                    )}
                    {campaign.suggestedHashtags && (
                      <p className="text-purple-400/60 text-xs mt-2 leading-relaxed">{campaign.suggestedHashtags}</p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={copyCaption}
                    className="flex items-center gap-2 text-xs bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] rounded-lg px-3 py-1.5 text-white/50 hover:text-white/80 transition-all duration-200"
                  >
                    {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    {copied ? 'Copied!' : 'Copy Caption & Hashtags'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Campaigns() {
  const { campaigns, openModal } = useAppStore()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = campaigns.filter((c) => {
    const matchStatus = filter === 'All' || c.status.toLowerCase() === filter.toLowerCase()
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.tags?.some(t => t.includes(search.toLowerCase()))
    return matchStatus && matchSearch
  })

  const counts = STATUS_FILTERS.reduce((acc, s) => {
    acc[s] = s === 'All' ? campaigns.length : campaigns.filter(c => c.status.toLowerCase() === s.toLowerCase()).length
    return acc
  }, {})

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
          <h1 className="text-xl font-bold text-white">Campaigns</h1>
          <p className="text-white/35 text-sm mt-0.5">{campaigns.length} total campaigns</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => openModal('createCampaign')}
          className="btn-primary"
        >
          <Plus size={15} />
          New Campaign
        </motion.button>
      </motion.div>

      {/* Filter + Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6"
      >
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            className="input-field pl-10 py-2.5 text-sm"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-medium px-3 py-2 rounded-xl transition-all duration-200 ${
                filter === f
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
                  : 'bg-white/[0.04] text-white/45 border border-white/[0.06] hover:bg-white/[0.07] hover:text-white/70'
              }`}
            >
              {f}
              {counts[f] > 0 && (
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${filter === f ? 'bg-purple-500/20' : 'bg-white/[0.06]'}`}>
                  {counts[f]}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Campaign grid */}
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
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filtered.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
