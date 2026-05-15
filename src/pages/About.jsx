import { motion } from 'framer-motion'
import {
  Zap, Users, TrendingUp, Heart, Globe, Shield,
  Lightbulb, Star, ArrowRight, CheckCircle2, Clock,
  Rocket, MessageSquare, BarChart3, Sparkles,
} from 'lucide-react'

const values = [
  {
    icon: Users,
    title: 'Creator-First',
    description: 'Every decision we make starts with one question: does this help creators grow? The platform exists to serve creators, not extract from them.',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    icon: Shield,
    title: 'Trust by Design',
    description: 'We never automate engagement, never touch your social credentials, and never compromise your account safety. Trust is not a feature — it is the foundation.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: TrendingUp,
    title: 'Growth Through Collaboration',
    description: 'Solo growth has a ceiling. Collaborative growth compounds. We are built on the belief that creators who build together grow faster, stronger, and longer.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Globe,
    title: 'Community Over Competition',
    description: 'The creator economy is not a zero-sum game. When one creator wins with collaboration, the whole ecosystem becomes stronger.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Lightbulb,
    title: 'Radical Transparency',
    description: 'Our roadmap is public. Our Ideas Board is community-driven. We build in the open because the best products are co-created with the people who use them.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Heart,
    title: 'Long-Term Thinking',
    description: 'We optimize for sustainable creator growth, not vanity metrics. Our goal is to still be your most trusted tool in five years.',
    gradient: 'from-violet-500 to-purple-600',
  },
]

const roadmapItems = [
  { quarter: 'Q1 2026', title: 'Platform Launch', description: 'Core dashboard, campaigns, creator network, and analytics.', status: 'completed', icon: CheckCircle2 },
  { quarter: 'Q2 2026', title: 'Community & Ideas Board', description: 'Creator discussions, feature voting, and collaborative roadmapping.', status: 'completed', icon: CheckCircle2 },
  { quarter: 'Q3 2026', title: 'AI Analytics Engine', description: 'Optimal posting time predictions and engagement lift scoring.', status: 'upcoming', icon: Clock },
  { quarter: 'Q4 2026', title: 'Native Messaging', description: 'Direct creator-to-coordinator communication inside VollabPulse.', status: 'upcoming', icon: Clock },
  { quarter: 'Q1 2027', title: 'Mobile App', description: 'Native iOS and Android experience for on-the-go campaign management.', status: 'planned', icon: Rocket },
  { quarter: 'Q2 2027', title: 'Platform API Integrations', description: 'Live data from Instagram, YouTube, and TikTok for real-time analytics.', status: 'planned', icon: Rocket },
]

const stats = [
  { value: '2,840+', label: 'Creators on Platform', icon: Users, color: 'text-purple-400' },
  { value: '180+', label: 'Active Campaigns', icon: Zap, color: 'text-amber-400' },
  { value: '94%', label: 'Avg Participation Rate', icon: TrendingUp, color: 'text-emerald-400' },
  { value: '12.4M+', label: 'Combined Reach', icon: Globe, color: 'text-blue-400' },
]

export default function About() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero section */}
      <div className="relative overflow-hidden px-4 sm:px-5 md:px-8 pt-10 pb-12">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 -left-24 w-80 h-80 bg-purple-500 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -top-16 right-0 w-72 h-72 bg-indigo-600 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-600 rounded-full blur-[100px]"
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 rounded-full px-4 py-1.5 text-purple-300 text-[12px] font-semibold mb-6"
          >
            <Sparkles size={12} />
            The Creator Collaboration Operating System
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5"
          >
            Creators grow{' '}
            <span className="gradient-text">stronger</span>
            <br />together.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/45 text-[16px] md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
          >
            VollabPulse helps creators organize collaboration, measure growth, and build powerful creative communities that compound over time.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <button className="btn-primary px-6 py-2.5 text-[14px] flex items-center gap-2">
              <Zap size={15} />
              Get Started Free
            </button>
            <button className="btn-secondary px-6 py-2.5 text-[14px] flex items-center gap-2">
              View Roadmap
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-5 md:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card p-5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 divide-x divide-white/[0.05]">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center px-4">
                <stat.icon size={18} className={`${stat.color} mx-auto mb-1.5`} />
                <p className="text-white text-xl md:text-2xl font-black tracking-tight">{stat.value}</p>
                <p className="text-white/30 text-[11.5px] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission section */}
      <div className="px-5 md:px-8 mb-14">
        <div className="grid md:grid-cols-2 gap-5 items-center">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="text-purple-400 text-[11px] font-bold uppercase tracking-widest mb-3">Our Mission</div>
            <h2 className="text-white text-2xl md:text-3xl font-black leading-tight mb-4">
              Make creator collaboration as easy as pressing publish.
            </h2>
            <p className="text-white/40 text-[14px] leading-relaxed mb-4">
              The creator economy is powered by individuals with remarkable talent. But the gap between a great creator and a thriving creator often comes down to one thing: connection. Who you collaborate with. How you coordinate. When you show up together.
            </p>
            <p className="text-white/40 text-[14px] leading-relaxed">
              VollabPulse exists to collapse that gap. We built the infrastructure for creator collaboration — so that organizing a campaign wave, tracking its impact, and building lasting creator relationships feels effortless.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-3"
          >
            {[
              { icon: Zap, title: 'Coordinate campaigns in minutes', desc: 'Create a campaign brief, invite creators, and track participation — all from one dashboard.' },
              { icon: BarChart3, title: 'Measure what actually matters', desc: 'See engagement lift, reach growth, and creator reliability across every campaign you run.' },
              { icon: MessageSquare, title: 'Build a creator network that lasts', desc: 'Your creator network grows smarter with every campaign, building a community of trusted collaborators.' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={15} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white/80 text-[13px] font-semibold mb-0.5">{item.title}</p>
                  <p className="text-white/30 text-[12px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Values grid */}
      <div className="px-5 md:px-8 mb-14">
        <div className="text-center mb-7">
          <div className="text-purple-400 text-[11px] font-bold uppercase tracking-widest mb-2">Platform Values</div>
          <h2 className="text-white text-2xl md:text-3xl font-black">What we stand for</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              className="glass-card p-5"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 shadow-sm`}>
                <value.icon size={17} className="text-white" />
              </div>
              <h3 className="text-white/85 font-bold text-[14.5px] mb-2">{value.title}</h3>
              <p className="text-white/35 text-[12.5px] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="px-5 md:px-8 mb-14">
        <div className="text-center mb-7">
          <div className="text-purple-400 text-[11px] font-bold uppercase tracking-widest mb-2">What's Coming</div>
          <h2 className="text-white text-2xl md:text-3xl font-black">Platform Roadmap</h2>
          <p className="text-white/30 text-sm mt-2">Built in public. Shaped by the community.</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-4 bottom-4 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent hidden sm:block" />

          <div className="space-y-3">
            {roadmapItems.map((item, i) => {
              const StatusIcon = item.icon
              const isCompleted = item.status === 'completed'
              const isUpcoming = item.status === 'upcoming'

              return (
                <motion.div
                  key={item.quarter}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex gap-4 items-start sm:pl-0"
                >
                  {/* Timeline dot */}
                  <div className={`flex-shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center hidden sm:flex ${
                    isCompleted
                      ? 'bg-emerald-500/15 border-emerald-500/30'
                      : isUpcoming
                        ? 'bg-blue-500/10 border-blue-500/25'
                        : 'bg-white/[0.04] border-white/[0.08]'
                  }`}>
                    <StatusIcon size={14} className={isCompleted ? 'text-emerald-400' : isUpcoming ? 'text-blue-400' : 'text-white/30'} />
                  </div>

                  <div className={`flex-1 glass-card p-4 ${isCompleted ? 'border-emerald-500/15' : isUpcoming ? 'border-blue-500/10' : ''}`}>
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-white/25 uppercase tracking-wider">{item.quarter}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                            isCompleted ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                            isUpcoming ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                            'text-white/30 bg-white/[0.04] border-white/[0.06]'
                          }`}>
                            {isCompleted ? 'Shipped' : isUpcoming ? 'In Progress' : 'Planned'}
                          </span>
                        </div>
                        <p className="text-white/80 font-bold text-[14px]">{item.title}</p>
                        <p className="text-white/35 text-[12.5px] mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="px-5 md:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative overflow-hidden glass-card p-8 text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-glow-purple">
              <Zap size={20} className="text-white" />
            </div>
            <h2 className="text-white text-2xl font-black mb-2">Ready to collaborate?</h2>
            <p className="text-white/35 text-[13.5px] max-w-md mx-auto mb-6">
              Join thousands of creators already using VollabPulse to coordinate campaigns and accelerate their growth.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button className="btn-primary px-7 py-2.5 text-[14px] flex items-center gap-2">
                <Rocket size={15} />
                Start Collaborating
              </button>
              <button className="btn-secondary px-7 py-2.5 text-[14px] flex items-center gap-2">
                <Star size={14} />
                View Ideas Board
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
