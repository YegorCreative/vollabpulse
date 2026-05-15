import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Megaphone, Users, Bell, TrendingUp, Plus,
  ArrowRight, Calendar, Activity, Crown, ChevronRight,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { mockActivityFeed } from '../data/mockData'
import { formatNumber, formatRelativeTime, getStatusColor, getAvatarGradient, avatarInitials } from '../utils/helpers'
import { staggerContainer, staggerItem } from '../animations/variants'

const activityTypeMeta = {
  participation: { dot: 'bg-emerald-400' },
  join: { dot: 'bg-blue-400' },
  campaign: { dot: 'bg-purple-400' },
  completion: { dot: 'bg-amber-400' },
  invite: { dot: 'bg-indigo-400' },
}

function StatCard({ icon: Icon, label, value, trend, colorClass, sub }) {
  return (
    <motion.div
      variants={staggerItem}
      className="glass-card p-5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="text-[26px] font-bold text-white mb-0.5 tracking-tight">{value}</div>
      <div className="text-white/40 text-sm">{label}</div>
      {sub && <div className="text-white/20 text-xs mt-1">{sub}</div>}
    </motion.div>
  )
}

export default function Dashboard() {
  const { campaigns, creators, notifications, openModal } = useAppStore()

  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length
  const totalReach = campaigns.reduce((s, c) => s + (c.reachEstimate || 0), 0)
  const pendingActions = notifications.filter((n) => !n.read).length
  const recentCampaigns = campaigns.slice(0, 4)
  const topCreators = [...creators].sort((a, b) => b.reliabilityScore - a.reliabilityScore).slice(0, 5)
  const upcomingLaunches = campaigns
    .filter((c) => c.status !== 'completed' && c.launchDate)
    .sort((a, b) => new Date(a.launchDate) - new Date(b.launchDate))
    .slice(0, 4)

  return (
    <div className="p-4 sm:p-5 md:p-7 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between mb-7"
      >
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <p className="text-white/35 text-sm mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => openModal('createCampaign')}
          className="btn-primary hidden md:flex"
        >
          <Plus size={15} />
          New Campaign
        </motion.button>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7"
      >
        <StatCard icon={Megaphone} label="Active Campaigns" value={activeCampaigns} trend={12} colorClass="bg-purple-500/15" sub={`${campaigns.length} total`} />
        <StatCard icon={Users} label="Creator Network" value={creators.length} trend={8} colorClass="bg-blue-500/15" sub="In your network" />
        <StatCard icon={Bell} label="Pending Actions" value={pendingActions} colorClass="bg-amber-500/15" sub="Need attention" />
        <StatCard icon={TrendingUp} label="Est. Total Reach" value={formatNumber(totalReach)} trend={24} colorClass="bg-emerald-500/15" sub="Across all campaigns" />
      </motion.div>

      {/* Body grid */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Campaign Overview */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold text-[15px]">Campaign Overview</h2>
              <Link to="/campaigns" className="text-purple-400 hover:text-purple-300 text-xs font-medium flex items-center gap-1 transition-colors">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-2.5">
              {recentCampaigns.map((campaign) => {
                const s = getStatusColor(campaign.status)
                return (
                  <motion.div
                    key={campaign.id}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.12 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.025] hover:bg-white/[0.04] transition-all duration-200 cursor-pointer border border-transparent hover:border-white/[0.05]"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/15 to-indigo-500/15 flex items-center justify-center flex-shrink-0 border border-purple-500/10">
                      <Megaphone size={15} className="text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-white text-sm font-medium truncate">{campaign.name}</span>
                        <span className={`status-badge flex-shrink-0 ${s.bg} ${s.text}`}>
                          <span className={`w-1 h-1 rounded-full ${s.dot}`} />
                          {campaign.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${campaign.participation}%` }}
                            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                          />
                        </div>
                        <span className="text-white/35 text-xs whitespace-nowrap">{campaign.participation}%</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-white/60 text-xs font-medium">{formatNumber(campaign.reachEstimate)}</div>
                      <div className="text-white/20 text-[10px]">reach</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.4 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-5">
              <Activity size={15} className="text-purple-400" />
              <h2 className="text-white font-semibold text-[15px]">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {mockActivityFeed.map((item) => {
                const meta = activityTypeMeta[item.type] || activityTypeMeta.campaign
                return (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/65 text-sm leading-snug">
                        <span className="text-white font-medium">{item.user}</span>{' '}
                        {item.action}{' '}
                        <span className="text-purple-400/80">{item.target}</span>
                      </p>
                      <p className="text-white/25 text-xs mt-0.5">{formatRelativeTime(item.timestamp)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming Launches */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-blue-400" />
                <h2 className="text-white font-semibold text-[15px]">Upcoming Launches</h2>
              </div>
              <Link to="/calendar" className="text-white/30 hover:text-purple-400 transition-colors">
                <ChevronRight size={15} />
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingLaunches.map((campaign) => (
                <div key={campaign.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/[0.08] border border-indigo-500/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-indigo-400 text-[9px] font-semibold uppercase leading-none">
                      {new Date(campaign.launchDate).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-white font-bold text-sm leading-none mt-0.5">
                      {new Date(campaign.launchDate).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{campaign.name}</p>
                    <p className="text-white/25 text-xs">{campaign.targetCreators} creators</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Creators */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Crown size={15} className="text-amber-400" />
                <h2 className="text-white font-semibold text-[15px]">Top Creators</h2>
              </div>
              <Link to="/network" className="text-white/30 hover:text-purple-400 transition-colors">
                <ChevronRight size={15} />
              </Link>
            </div>
            <div className="space-y-3">
              {topCreators.map((creator) => (
                <div key={creator.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarGradient(creator.id)} flex items-center justify-center flex-shrink-0 text-xs font-bold text-white`}>
                    {avatarInitials(creator.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/85 text-sm font-medium truncate">{creator.username}</p>
                    <p className="text-white/25 text-xs truncate">{creator.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white text-sm font-semibold">{creator.reliabilityScore}%</p>
                    <p className="text-white/20 text-[10px]">reliable</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Engagement completion */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.4 }}
            className="glass-card p-5"
          >
            <h2 className="text-white font-semibold text-[15px] mb-5">Engagement Progress</h2>
            <div className="space-y-4">
              {campaigns.filter(c => c.status === 'active').slice(0, 3).map((c) => (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white/55 text-xs truncate pr-2">{c.name}</span>
                    <span className="text-white text-xs font-semibold flex-shrink-0">{c.participation}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.participation}%` }}
                      transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
