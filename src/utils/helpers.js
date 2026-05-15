export const formatNumber = (num) => {
  if (!num && num !== 0) return '—'
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export const formatShortDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr))
}

export const formatRelativeTime = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'just now'
}

export const getStatusColor = (status) => {
  const map = {
    active: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/20' },
    pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400', border: 'border-amber-500/20' },
    completed: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400', border: 'border-blue-500/20' },
    draft: { bg: 'bg-white/5', text: 'text-white/40', dot: 'bg-white/40', border: 'border-white/10' },
    paused: { bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-400', border: 'border-orange-500/20' },
    inactive: { bg: 'bg-white/5', text: 'text-white/30', dot: 'bg-white/30', border: 'border-white/8' },
  }
  return map[status?.toLowerCase()] || map.draft
}

export const getPlatformMeta = (platform) => {
  const map = {
    instagram: { label: 'Instagram', color: 'text-pink-400', bg: 'bg-pink-500/10' },
    youtube: { label: 'YouTube', color: 'text-red-400', bg: 'bg-red-500/10' },
    tiktok: { label: 'TikTok', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    twitter: { label: 'Twitter/X', color: 'text-sky-400', bg: 'bg-sky-500/10' },
    linkedin: { label: 'LinkedIn', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  }
  return map[platform?.toLowerCase()] || { label: platform || 'Platform', color: 'text-purple-400', bg: 'bg-purple-500/10' }
}

export const getNotificationMeta = (type) => {
  const map = {
    campaign_invite: { color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Invite' },
    pending_action: { color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Action' },
    launch_reminder: { color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Reminder' },
    creator_response: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Response' },
    campaign_complete: { color: 'text-indigo-400', bg: 'bg-indigo-500/10', label: 'Complete' },
  }
  return map[type] || { color: 'text-white/40', bg: 'bg-white/5', label: 'Notice' }
}

export const avatarInitials = (name) => {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return parts[0][0] + parts[1][0]
  return parts[0].slice(0, 2).toUpperCase()
}

export const gradients = [
  'from-purple-500 to-indigo-600',
  'from-blue-500 to-cyan-500',
  'from-indigo-500 to-purple-600',
  'from-violet-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-pink-500 to-rose-500',
  'from-cyan-500 to-blue-500',
]

export const getAvatarGradient = (id) => gradients[(id - 1) % gradients.length]
