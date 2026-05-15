import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Grid3X3, List, SlidersHorizontal,
  MapPin, TrendingUp, Star, Users, ChevronDown,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { formatNumber, getStatusColor, getAvatarGradient, avatarInitials } from '../utils/helpers'
import { staggerContainer, staggerItem } from '../animations/variants'

const CATEGORIES = ['All', 'Lifestyle & Fashion', 'Tech & Gadgets', 'Art & Photography', 'Fitness & Health', 'Fashion & Beauty', 'Travel & Lifestyle', 'Food & Cooking', 'Finance & Business', 'Tech & Education']
const SORT_OPTIONS = [
  { value: 'reliability', label: 'Reliability' },
  { value: 'activity', label: 'Activity Score' },
  { value: 'followers', label: 'Followers' },
  { value: 'campaigns', label: 'Campaigns' },
]

function ScoreBar({ value, color }) {
  return (
    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden w-16">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  )
}

function CreatorCard({ creator }) {
  const s = getStatusColor(creator.status)
  return (
    <motion.div
      variants={staggerItem}
      className="glass-card p-5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* Avatar + Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getAvatarGradient(creator.id)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-glow-purple`}>
            {avatarInitials(creator.name)}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{creator.name}</p>
            <p className="text-purple-400/80 text-xs">{creator.username}</p>
          </div>
        </div>
        <span className={`status-badge ${s.bg} ${s.text}`}>
          <span className={`w-1 h-1 rounded-full ${s.dot}`} />
          {creator.status}
        </span>
      </div>

      {/* Category */}
      <p className="text-white/40 text-xs mb-4">{creator.category}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
          <div className="flex items-center gap-1.5 mb-1">
            <Users size={11} className="text-blue-400" />
            <span className="text-white/30 text-[10px] uppercase tracking-wide font-medium">Followers</span>
          </div>
          <p className="text-white font-bold text-sm">{formatNumber(creator.followers)}</p>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={11} className="text-emerald-400" />
            <span className="text-white/30 text-[10px] uppercase tracking-wide font-medium">Avg Reach</span>
          </div>
          <p className="text-white font-bold text-sm">{formatNumber(creator.avgReach)}</p>
        </div>
      </div>

      {/* Scores */}
      <div className="space-y-2.5 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-white/35 text-xs flex items-center gap-1.5">
            <Star size={10} className="text-amber-400" /> Reliability
          </span>
          <div className="flex items-center gap-2">
            <ScoreBar value={creator.reliabilityScore} color="bg-gradient-to-r from-amber-500 to-orange-500" />
            <span className="text-white/70 text-xs font-semibold w-8 text-right">{creator.reliabilityScore}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/35 text-xs flex items-center gap-1.5">
            <TrendingUp size={10} className="text-purple-400" /> Activity
          </span>
          <div className="flex items-center gap-2">
            <ScoreBar value={creator.activityScore} color="bg-gradient-to-r from-purple-500 to-indigo-500" />
            <span className="text-white/70 text-xs font-semibold w-8 text-right">{creator.activityScore}%</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {creator.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-1.5 text-white/25 text-xs">
          <MapPin size={10} />
          {creator.location}
        </div>
        <span className="text-white/30 text-xs">{creator.recentCampaigns} campaigns</span>
      </div>
    </motion.div>
  )
}

function CreatorRow({ creator }) {
  const s = getStatusColor(creator.status)
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-4 p-4 glass-card hover:border-white/10 transition-all duration-200 hover:bg-white/[0.02]"
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getAvatarGradient(creator.id)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
        {avatarInitials(creator.name)}
      </div>
      <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
        <div>
          <p className="text-white text-sm font-medium">{creator.name}</p>
          <p className="text-purple-400/70 text-xs">{creator.username}</p>
        </div>
        <p className="text-white/40 text-xs hidden sm:block">{creator.category}</p>
        <p className="text-white/60 text-sm font-medium hidden sm:block">{formatNumber(creator.followers)}</p>
        <div className="flex items-center gap-2">
          <span className={`status-badge ${s.bg} ${s.text}`}>
            <span className={`w-1 h-1 rounded-full ${s.dot}`} />
            {creator.status}
          </span>
          <span className="text-white/40 text-xs ml-auto">{creator.reliabilityScore}%</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function CreatorNetwork() {
  const { creators } = useAppStore()
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('reliability')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = creators
    .filter((c) => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.username.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.includes(search.toLowerCase()))
      const matchCat = category === 'All' || c.category === category
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (sortBy === 'reliability') return b.reliabilityScore - a.reliabilityScore
      if (sortBy === 'activity') return b.activityScore - a.activityScore
      if (sortBy === 'followers') return b.followers - a.followers
      if (sortBy === 'campaigns') return b.recentCampaigns - a.recentCampaigns
      return 0
    })

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
          <h1 className="text-xl font-bold text-white">Creator Network</h1>
          <p className="text-white/35 text-sm mt-0.5">{creators.length} creators in your network</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${view === 'grid' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' : 'bg-white/[0.04] text-white/35 border border-white/[0.06] hover:text-white/60'}`}
          >
            <Grid3X3 size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${view === 'list' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' : 'bg-white/[0.04] text-white/35 border border-white/[0.06] hover:text-white/60'}`}
          >
            <List size={15} />
          </button>
        </div>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6"
      >
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            className="input-field pl-10 py-2.5 text-sm"
            placeholder="Search creators, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary gap-2 ${showFilters ? 'border-purple-500/20 text-purple-300' : ''}`}
        >
          <SlidersHorizontal size={14} />
          Filters
          <ChevronDown size={12} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        <div className="relative ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs">Sort:</span>
            <div className="relative">
              <select
                className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2 text-white/60 text-xs focus:outline-none focus:border-purple-500/40 appearance-none pr-7"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} className="bg-[#1A1A1A]">{o.label}</option>
                ))}
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-all duration-200 ${
                category === cat
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
                  : 'bg-white/[0.04] text-white/40 border border-white/[0.06] hover:bg-white/[0.07] hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      )}

      {/* Results */}
      <p className="text-white/25 text-xs mb-4">{filtered.length} creator{filtered.length !== 1 ? 's' : ''} found</p>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-16 flex flex-col items-center text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
            <Users size={22} className="text-white/20" />
          </div>
          <p className="text-white/50 font-medium mb-1">No creators found</p>
          <p className="text-white/25 text-sm">Try a different search or filter</p>
        </motion.div>
      ) : view === 'grid' ? (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filtered.map((c) => <CreatorCard key={c.id} creator={c} />)}
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-2"
        >
          {filtered.map((c) => <CreatorRow key={c.id} creator={c} />)}
        </motion.div>
      )}
    </div>
  )
}
