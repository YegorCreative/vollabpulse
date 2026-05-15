import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, Search, ChevronUp, MessageCircle, Eye,
  Flame, Star, Hash, TrendingUp, Zap, Users, Sparkles,
  BookOpen, Edit3,
} from 'lucide-react'
import { mockDiscussions, mockCreators } from '../data/mockData'
import { formatRelativeTime, formatNumber } from '../utils/helpers'
import { staggerContainer, staggerItem, fadeInUp } from '../animations/variants'

const CATEGORIES = [
  { id: 'all', label: 'All Discussions' },
  { id: 'Growth Tips', label: 'Growth Tips', color: 'emerald' },
  { id: 'Algorithm', label: 'Algorithm', color: 'blue' },
  { id: 'Collaboration Requests', label: 'Collabs', color: 'purple' },
  { id: 'Strategy', label: 'Strategy', color: 'amber' },
  { id: 'Content Ideas', label: 'Content Ideas', color: 'pink' },
  { id: 'Q&A', label: 'Q&A', color: 'cyan' },
  { id: 'Creator Spotlight', label: 'Spotlight', color: 'indigo' },
  { id: 'Photography', label: 'Photography', color: 'violet' },
]

const categoryStyle = {
  'Growth Tips': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'Algorithm': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Collaboration Requests': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'Strategy': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'Content Ideas': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  'Q&A': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Creator Spotlight': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'Photography': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
}

const popularTopics = [
  { tag: 'instagram', count: 24, color: 'text-pink-400' },
  { tag: 'strategy', count: 18, color: 'text-amber-400' },
  { tag: 'collaboration', count: 16, color: 'text-purple-400' },
  { tag: 'growth', count: 15, color: 'text-emerald-400' },
  { tag: 'algorithm', count: 12, color: 'text-blue-400' },
  { tag: 'reels', count: 11, color: 'text-red-400' },
  { tag: 'stories', count: 9, color: 'text-orange-400' },
  { tag: 'branding', count: 7, color: 'text-cyan-400' },
]

const gradients = [
  'from-purple-500 to-indigo-600',
  'from-pink-500 to-rose-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-blue-500 to-cyan-600',
  'from-violet-500 to-purple-600',
]

function DiscussionCard({ discussion }) {
  const [upvoted, setUpvoted] = useState(false)
  const [votes, setVotes] = useState(discussion.upvotes)

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -1 }}
      className="glass-card p-5 cursor-pointer group hover:border-white/10 transition-all duration-200"
    >
      <div className="flex gap-3.5">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
          <button
            onClick={(e) => {
              e.preventDefault()
              setUpvoted(!upvoted)
              setVotes(v => upvoted ? v - 1 : v + 1)
            }}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 ${
              upvoted
                ? 'text-purple-400 bg-purple-500/15 border border-purple-500/30'
                : 'text-white/25 hover:text-white/60 hover:bg-white/[0.05] border border-transparent'
            }`}
          >
            <ChevronUp size={14} strokeWidth={2.5} />
            <span className="text-[11px] font-bold tabular-nums">{formatNumber(votes)}</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
            {discussion.pinned && (
              <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                Pinned
              </span>
            )}
            {discussion.hot && (
              <span className="text-[10px] font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Flame size={9} /> Hot
              </span>
            )}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${categoryStyle[discussion.category] || 'text-white/40 bg-white/[0.05] border-white/[0.06]'}`}>
              {discussion.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white/85 font-semibold text-[14.5px] leading-snug mb-1.5 group-hover:text-white transition-colors">
            {discussion.title}
          </h3>

          {/* Preview */}
          <p className="text-white/35 text-[12.5px] leading-relaxed mb-3 line-clamp-2">
            {discussion.preview}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            {discussion.tags.map(tag => (
              <span key={tag} className="text-[11px] text-white/25 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradients[discussion.id % gradients.length]} flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}>
                {discussion.author.avatar[0]}
              </div>
              <span className="text-white/40 text-xs font-medium">{discussion.author.username}</span>
              {discussion.author.verified && (
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Star size={7} className="text-white" fill="white" />
                </div>
              )}
              <span className="text-white/20 text-[11px]">·</span>
              <span className="text-white/25 text-[11px]">{formatRelativeTime(discussion.timestamp)}</span>
            </div>
            <div className="flex items-center gap-3 text-white/25 text-[11px]">
              <span className="flex items-center gap-1">
                <MessageCircle size={11} /> {discussion.comments}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={11} /> {formatNumber(discussion.views)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Community() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('hot')

  const filtered = mockDiscussions
    .filter(d => {
      const matchCat = activeCategory === 'all' || d.category === activeCategory
      const matchSearch = !searchQuery ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (sortBy === 'hot') return ((b.hot ? 2 : 0) + (b.pinned ? 1 : 0)) - ((a.hot ? 2 : 0) + (a.pinned ? 1 : 0)) || b.upvotes - a.upvotes
      if (sortBy === 'new') return new Date(b.timestamp) - new Date(a.timestamp)
      if (sortBy === 'top') return b.upvotes - a.upvotes
      return 0
    })

  const featuredCreators = mockCreators.slice(0, 4)

  return (
    <div className="p-4 sm:p-5 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-5"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <h1 className="text-[22px] font-bold text-white mb-1">Community</h1>
            <p className="text-white/35 text-sm">Connect with creators, share strategies, and grow together.</p>
          </div>
          <button className="btn-primary text-sm flex items-center gap-2 flex-shrink-0">
            <Edit3 size={14} />
            <span>Start Discussion</span>
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-5 mb-4">
          {[
            { label: 'Members', value: '2,840', icon: Users, color: 'text-purple-400' },
            { label: 'Discussions', value: '847', icon: MessageSquare, color: 'text-blue-400' },
            { label: 'Active Today', value: '124', icon: Zap, color: 'text-emerald-400' },
            { label: 'Featured Posts', value: '12', icon: Sparkles, color: 'text-amber-400' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-1.5 text-[12px]">
              <stat.icon size={13} className={stat.color} />
              <span className="text-white/70 font-semibold">{stat.value}</span>
              <span className="text-white/25">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field pl-8 text-sm w-full h-9"
            />
          </div>
          <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-1 gap-0.5">
            {[
              { id: 'hot', label: 'Hot', icon: Flame },
              { id: 'new', label: 'New', icon: TrendingUp },
              { id: 'top', label: 'Top', icon: Star },
            ].map(sort => (
              <button
                key={sort.id}
                onClick={() => setSortBy(sort.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                  sortBy === sort.id ? 'bg-white/[0.08] text-white' : 'text-white/35 hover:text-white/60'
                }`}
              >
                <sort.icon size={11} />
                {sort.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category tabs */}
      <div className="flex items-center gap-1.5 mb-5 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-200 border ${
              activeCategory === cat.id
                ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                : 'text-white/35 border-transparent hover:text-white/60 hover:bg-white/[0.04]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="flex gap-5">
        {/* Main discussions list */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + sortBy + searchQuery}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {filtered.map(d => (
                  <DiscussionCard key={d.id} discussion={d} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <MessageSquare size={28} className="text-white/15 mx-auto mb-3" />
                <p className="text-white/40 font-medium mb-1">No discussions found</p>
                <p className="text-white/20 text-sm">Try a different category or search term</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right sidebar — desktop only */}
        <div className="hidden lg:flex flex-col gap-4 w-60 flex-shrink-0">
          {/* Popular topics */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Hash size={14} className="text-purple-400" />
              <span className="text-white/70 text-[13px] font-semibold">Popular Topics</span>
            </div>
            <div className="space-y-1.5">
              {popularTopics.map((topic, i) => (
                <button
                  key={topic.tag}
                  onClick={() => setSearchQuery(topic.tag)}
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                >
                  <span className={`text-[12px] font-medium ${topic.color}`}>#{topic.tag}</span>
                  <span className="text-[11px] text-white/25 group-hover:text-white/40 transition-colors">{topic.count}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured creators */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-purple-400" />
              <span className="text-white/70 text-[13px] font-semibold">Active Creators</span>
            </div>
            <div className="space-y-2.5">
              {featuredCreators.map((creator, i) => (
                <div key={creator.id} className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                    {creator.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-[12px] font-medium truncate">{creator.name}</p>
                    <p className="text-white/25 text-[11px] truncate">{creator.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community guidelines */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <BookOpen size={13} className="text-purple-400" />
              <span className="text-white/70 text-[13px] font-semibold">Community Rules</span>
            </div>
            <ul className="space-y-1.5">
              {[
                'Be respectful and constructive',
                'Share real experiences and data',
                'No spam or self-promotion',
                'Credit creators you reference',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-400/60 text-[11px] font-bold mt-0.5">{i + 1}.</span>
                  <span className="text-white/30 text-[11.5px] leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
