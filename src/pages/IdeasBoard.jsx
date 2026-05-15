import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb, Plus, ChevronUp, ChevronDown, MessageCircle,
  CheckCircle2, Clock, Eye, Zap, Star, AlertCircle, X,
  Flame, TrendingUp, Filter,
} from 'lucide-react'
import { mockIdeas } from '../data/mockData'
import { formatRelativeTime } from '../utils/helpers'
import { staggerContainer, staggerItem, modalOverlay, modalContent } from '../animations/variants'

const STATUS_CONFIG = {
  in_progress: {
    label: 'In Progress',
    icon: Zap,
    className: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
    dotColor: 'bg-blue-400',
  },
  planned: {
    label: 'Planned',
    icon: Clock,
    className: 'text-purple-400 bg-purple-500/10 border-purple-500/25',
    dotColor: 'bg-purple-400',
  },
  under_review: {
    label: 'Under Review',
    icon: Eye,
    className: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
    dotColor: 'bg-amber-400',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    dotColor: 'bg-emerald-400',
  },
}

const CATEGORIES = [
  'AI Features', 'Communication', 'Workflow', 'Analytics',
  'Community', 'Platform', 'Templates', 'Integrations', 'Design',
]

const gradients = [
  'from-purple-500 to-indigo-600',
  'from-pink-500 to-rose-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-blue-500 to-cyan-600',
  'from-violet-500 to-purple-600',
]

function IdeaCard({ idea, onVote, votes }) {
  const cfg = STATUS_CONFIG[idea.status]
  const StatusIcon = cfg.icon
  const score = votes[idea.id] ?? idea.upvotes - idea.downvotes
  const userVote = votes[`${idea.id}_user`] ?? 0

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -1 }}
      className="glass-card p-5 hover:border-white/10 transition-all duration-200"
    >
      <div className="flex gap-3.5">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onVote(idea.id, 1)}
            className={`w-8 h-7 rounded-lg flex items-center justify-center transition-all duration-200 border ${
              userVote === 1
                ? 'text-purple-400 bg-purple-500/15 border-purple-500/30'
                : 'text-white/25 hover:text-white/60 hover:bg-white/[0.05] border-transparent'
            }`}
          >
            <ChevronUp size={14} strokeWidth={2.5} />
          </button>
          <span className={`text-[13px] font-bold tabular-nums ${score > 0 ? 'text-white/70' : 'text-white/30'}`}>
            {score}
          </span>
          <button
            onClick={() => onVote(idea.id, -1)}
            className={`w-8 h-7 rounded-lg flex items-center justify-center transition-all duration-200 border ${
              userVote === -1
                ? 'text-red-400 bg-red-500/10 border-red-500/25'
                : 'text-white/25 hover:text-white/60 hover:bg-white/[0.05] border-transparent'
            }`}
          >
            <ChevronDown size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${cfg.className}`}>
              <StatusIcon size={10} />
              {cfg.label}
            </span>
            <span className="text-[11px] text-white/25 flex-shrink-0">{formatRelativeTime(idea.timestamp)}</span>
          </div>

          <h3 className="text-white/85 font-semibold text-[14.5px] leading-snug mb-1.5">
            {idea.title}
          </h3>
          <p className="text-white/35 text-[12.5px] leading-relaxed mb-3 line-clamp-2">
            {idea.description}
          </p>

          {/* Dev note */}
          {idea.devNote && (
            <div className="flex items-start gap-2 bg-purple-500/[0.07] border border-purple-500/15 rounded-xl px-3 py-2.5 mb-3">
              <AlertCircle size={12} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-purple-300/70 text-[11.5px] leading-relaxed">{idea.devNote}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradients[idea.id % gradients.length]} flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}>
                {idea.author.avatar[0]}
              </div>
              <span className="text-white/35 text-[11.5px]">{idea.author.username}</span>
              <span className="text-white/15 text-[11px]">·</span>
              <span className="text-[11px] text-white/20 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.05]">
                {idea.category}
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/25 text-[11px]">
              <MessageCircle size={11} />
              <span>{idea.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SubmitModal({ onClose }) {
  const [form, setForm] = useState({ title: '', description: '', category: '' })

  return (
    <motion.div
      variants={modalOverlay}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalContent}
        className="w-full max-w-lg glass-card p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Lightbulb size={15} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-[15px]">Submit an Idea</h2>
              <p className="text-white/30 text-[11px]">Help shape the future of VollabPulse</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white/50 text-[12px] font-medium mb-1.5 block">Idea Title *</label>
            <input
              className="input-field w-full text-sm"
              placeholder="A clear, concise title for your idea..."
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-white/50 text-[12px] font-medium mb-1.5 block">Description *</label>
            <textarea
              className="input-field w-full text-sm resize-none"
              rows={4}
              placeholder="Describe the problem this solves and how it would work..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-white/50 text-[12px] font-medium mb-1.5 block">Category *</label>
            <select
              className="input-field w-full text-sm appearance-none"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              <option value="">Select a category...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm">Cancel</button>
          <button
            onClick={onClose}
            disabled={!form.title || !form.description || !form.category}
            className="btn-primary flex-1 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Idea
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const FILTER_TABS = [
  { id: 'all', label: 'All Ideas' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'planned', label: 'Planned' },
  { id: 'under_review', label: 'Under Review' },
  { id: 'completed', label: 'Completed' },
]

export default function IdeasBoard() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('top')
  const [votes, setVotes] = useState({})
  const [showModal, setShowModal] = useState(false)

  const handleVote = (ideaId, direction) => {
    setVotes(prev => {
      const currentUserVote = prev[`${ideaId}_user`] ?? 0
      let newUserVote = direction
      if (currentUserVote === direction) newUserVote = 0 // toggle off

      const scoreDelta = newUserVote - currentUserVote
      const idea = mockIdeas.find(i => i.id === ideaId)
      const baseScore = (prev[ideaId] !== undefined ? prev[ideaId] : idea.upvotes - idea.downvotes)

      return {
        ...prev,
        [ideaId]: baseScore + scoreDelta,
        [`${ideaId}_user`]: newUserVote,
      }
    })
  }

  const filtered = mockIdeas
    .filter(i => activeFilter === 'all' || i.status === activeFilter)
    .sort((a, b) => {
      const aScore = votes[a.id] ?? (a.upvotes - a.downvotes)
      const bScore = votes[b.id] ?? (b.upvotes - b.downvotes)
      if (sortBy === 'top') return bScore - aScore
      if (sortBy === 'new') return new Date(b.timestamp) - new Date(a.timestamp)
      if (sortBy === 'trending') return (b.upvotes + b.comments) - (a.upvotes + a.comments)
      return 0
    })

  const counts = {
    all: mockIdeas.length,
    in_progress: mockIdeas.filter(i => i.status === 'in_progress').length,
    planned: mockIdeas.filter(i => i.status === 'planned').length,
    under_review: mockIdeas.filter(i => i.status === 'under_review').length,
    completed: mockIdeas.filter(i => i.status === 'completed').length,
  }

  return (
    <div className="p-4 sm:p-5 md:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-5"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <h1 className="text-[22px] font-bold text-white mb-1">Ideas Board</h1>
            <p className="text-white/35 text-sm">Vote on features and help shape the product roadmap.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-sm flex items-center gap-2 flex-shrink-0"
          >
            <Plus size={14} />
            <span>Submit Idea</span>
          </button>
        </div>

        {/* Status summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
            const StatusIcon = cfg.icon
            return (
              <motion.button
                key={key}
                onClick={() => setActiveFilter(key)}
                whileHover={{ y: -1 }}
                className={`glass-card p-3.5 text-left transition-all duration-200 ${activeFilter === key ? 'border-purple-500/30' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <StatusIcon size={14} className={cfg.className.split(' ')[0]} />
                  <span className="text-[11px] text-white/20 font-medium">{counts[key]}</span>
                </div>
                <p className="text-white/60 text-[12px] font-semibold">{cfg.label}</p>
                <div className={`w-5 h-0.5 rounded-full mt-1.5 ${cfg.dotColor}`} />
              </motion.button>
            )
          })}
        </div>

        {/* Filter tabs + sort */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-200 border ${
                  activeFilter === tab.id
                    ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                    : 'text-white/35 border-transparent hover:text-white/60 hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
                {tab.id !== 'all' && (
                  <span className="ml-1.5 text-[10px] opacity-60">{counts[tab.id]}</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-1 gap-0.5 flex-shrink-0">
            {[
              { id: 'top', label: 'Top', icon: Star },
              { id: 'new', label: 'New', icon: TrendingUp },
              { id: 'trending', label: 'Trending', icon: Flame },
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

      {/* Ideas list */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={activeFilter + sortBy}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {filtered.map(idea => (
              <IdeaCard key={idea.id} idea={idea} onVote={handleVote} votes={votes} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <Lightbulb size={28} className="text-white/15 mx-auto mb-3" />
            <p className="text-white/40 font-medium mb-1">No ideas in this category yet</p>
            <button onClick={() => setShowModal(true)} className="text-purple-400 text-sm hover:text-purple-300 transition-colors mt-2">
              Be the first to submit one →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit modal */}
      <AnimatePresence>
        {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  )
}
