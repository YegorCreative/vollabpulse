import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Search, ChevronDown, MessageSquare, Shield, Zap, Users, BarChart3, Smartphone, Globe, Settings, Calendar } from 'lucide-react'
import { fadeInUp } from '../animations/variants'

const FAQ_DATA = [
  {
    id: 1,
    category: 'Platform Basics',
    icon: HelpCircle,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    questions: [
      {
        q: 'What is VollabPulse?',
        a: 'VollabPulse is a creator collaboration operating system. It helps content creators organize synchronized campaigns, measure collaboration impact, and build powerful creative networks. Instead of each creator posting alone, VollabPulse coordinates groups of creators to amplify their collective reach — resulting in significantly higher engagement, organic discovery, and audience growth for everyone involved.',
      },
      {
        q: 'How is VollabPulse different from other creator tools?',
        a: 'Most creator tools focus on individual scheduling or analytics. VollabPulse is built around the idea that creators grow faster together. Our platform coordinates campaign waves — synchronized content drops across multiple creators — giving each participant the benefit of collective momentum. Think of it as the "operating system" layer beneath individual creator workflows.',
      },
      {
        q: 'Is VollabPulse free to use?',
        a: 'VollabPulse is currently in its platform launch phase. Access is by invitation only. Pricing tiers for teams and agencies will be announced when public access opens. Early users will receive priority access and legacy pricing.',
      },
    ],
  },
  {
    id: 2,
    category: 'Campaigns',
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    questions: [
      {
        q: 'How do campaigns work on VollabPulse?',
        a: 'A campaign on VollabPulse is a coordinated content initiative shared across a group of creators. You create a campaign brief with a launch date, caption suggestions, hashtag strategy, and target creators. Participating creators see the brief, confirm their participation, and coordinate their posting. The platform tracks engagement lift across all participants and reports the collective result.',
      },
      {
        q: 'What is a "wave" campaign?',
        a: 'A wave campaign is a synchronized posting strategy where multiple creators publish related content within a defined time window — typically the same day or weekend. The overlapping content creates algorithmic momentum: the platform detects increased interest in a topic and rewards all participating creators with broader distribution. VollabPulse manages the coordination so the timing is seamless.',
      },
      {
        q: 'Can I run campaigns across multiple platforms?',
        a: 'Yes. VollabPulse supports campaign coordination across Instagram, YouTube, TikTok, and Twitter/X. Each platform has different reach dynamics, and our analytics break down performance per platform. Native API integrations for automated tracking are coming in a future update.',
      },
    ],
  },
  {
    id: 3,
    category: 'Safety & Trust',
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    questions: [
      {
        q: 'Is VollabPulse safe for Instagram?',
        a: 'Absolutely. VollabPulse does not access your Instagram account, does not automate any posting, likes, follows, or engagement, and does not require your social media login credentials. The platform is purely an organizational layer — it helps you coordinate what to post and when, but all posting is done manually by each creator from their own device. This makes it fully compliant with Instagram\'s Terms of Service.',
      },
      {
        q: 'Does VollabPulse automate engagement or interactions?',
        a: 'No. VollabPulse never automates likes, comments, follows, story views, or any other form of platform interaction. All engagement is organic and comes from real audiences discovering content through the amplified reach of coordinated campaigns. We are explicitly designed to be TOS-safe across all major platforms.',
      },
      {
        q: 'How is my data protected?',
        a: 'VollabPulse does not store your social media credentials, does not scrape platform data, and all user data is encrypted at rest. We collect only what you provide directly: campaign details, creator profiles, and collaboration records. Full privacy policy details will be published at our public launch.',
      },
    ],
  },
  {
    id: 4,
    category: 'Creator Network',
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    questions: [
      {
        q: 'Can I manage multiple creators on one account?',
        a: 'Yes. VollabPulse is designed for teams, agencies, and creator networks. A single workspace can host dozens of creator profiles, manage multiple simultaneous campaigns, and track individual performance for each creator. Role-based access (admin, manager, creator) lets you control who can create campaigns versus who can just view them.',
      },
      {
        q: 'Can teams collaborate within the platform?',
        a: 'Yes. Multiple team members can access the same workspace. You can assign roles, invite new members, and coordinate campaign management across your organization. A native messaging system for direct creator communication is on the roadmap for later this year.',
      },
      {
        q: 'How does creator reliability scoring work?',
        a: 'Each creator in your network has a reliability score (0–100) based on their campaign completion history. A creator who confirms participation and posts on time consistently will have a high score. This helps you identify your most dependable collaborators and prioritize them for high-stakes campaigns.',
      },
    ],
  },
  {
    id: 5,
    category: 'Analytics',
    icon: BarChart3,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    questions: [
      {
        q: 'What analytics does VollabPulse provide?',
        a: 'VollabPulse tracks engagement trends, reach growth, campaign completion rates, creator consistency rankings, and collaboration impact over time. Growth Analytics shows you week-over-week and month-over-month performance across your entire network. Currently all data is based on manually entered or estimated figures — live platform API analytics are coming in a future update.',
      },
      {
        q: 'Can I export analytics reports?',
        a: 'PDF and CSV export is currently under review on our Ideas Board and is one of the most-requested features. Once shipped, you will be able to export full campaign performance reports with charts, creator participation data, and engagement metrics for client or team presentations.',
      },
    ],
  },
  {
    id: 6,
    category: 'Platform & Mobile',
    icon: Smartphone,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    questions: [
      {
        q: 'Is VollabPulse a content scheduling platform?',
        a: 'No. VollabPulse is a collaboration coordination platform, not a scheduler. It does not post content for you. Instead, it helps you plan what to post, coordinate with other creators, track campaign participation, and measure the collective impact. Think of it as the strategy and coordination layer — you bring the content.',
      },
      {
        q: 'Is VollabPulse mobile friendly?',
        a: 'The web app is fully responsive and works well on mobile browsers. A dedicated native iOS and Android app is the most-voted feature on our Ideas Board and is planned for 2027. In the meantime, the web interface scales gracefully from desktop to mobile.',
      },
      {
        q: 'Will API integrations with social platforms come later?',
        a: 'Yes. Native integrations with Instagram Graph API, YouTube Data API, and TikTok for Business API are on our roadmap. These will enable automatic campaign tracking, real reach data, and tighter coordination tools. Zapier and Make.com automation connectors are also planned for workflow automation.',
      },
    ],
  },
]

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`border-b border-white/[0.05] transition-colors duration-200 ${isOpen ? 'bg-white/[0.02]' : ''}`}>
      <button
        onClick={onToggle}
        className="flex items-start justify-between gap-4 w-full text-left px-5 py-4 hover:bg-white/[0.02] transition-colors duration-150"
      >
        <span className={`text-[13.5px] font-medium leading-relaxed transition-colors duration-200 ${isOpen ? 'text-white' : 'text-white/65 hover:text-white/80'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`flex-shrink-0 mt-0.5 transition-colors duration-200 ${isOpen ? 'text-purple-400' : 'text-white/25'}`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="text-white/45 text-[13px] leading-relaxed px-5 pb-5 pt-0">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const allQuestions = FAQ_DATA.flatMap(cat =>
    cat.questions.map(q => ({ ...q, category: cat.category, catId: cat.id }))
  )

  const filteredGroups = searchQuery
    ? [{ id: 'search', category: 'Search Results', icon: Search, color: 'text-purple-400', bg: 'bg-purple-500/10', questions: allQuestions.filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase())) }]
    : FAQ_DATA

  return (
    <div className="p-4 sm:p-5 md:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-7"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-glow-purple">
            <HelpCircle size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-white">Frequently Asked Questions</h1>
            <p className="text-white/35 text-sm">Everything you need to know about VollabPulse.</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-10 w-full text-sm h-10"
          />
        </div>
      </motion.div>

      {/* Category groups */}
      <div className="space-y-4">
        {filteredGroups.map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: gi * 0.05 }}
            className="glass-card overflow-hidden"
          >
            {/* Category header */}
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.05]">
              <div className={`w-7 h-7 rounded-xl ${group.bg} flex items-center justify-center flex-shrink-0`}>
                <group.icon size={14} className={group.color} />
              </div>
              <span className="text-white/75 text-[13px] font-semibold">{group.category}</span>
              <span className="text-white/20 text-[11px] ml-auto">{group.questions.length} questions</span>
            </div>

            {/* Questions */}
            {group.questions.length > 0 ? (
              group.questions.map((item, qi) => (
                <AccordionItem
                  key={`${group.id}-${qi}`}
                  question={item.q}
                  answer={item.a}
                  isOpen={openId === `${group.id}-${qi}`}
                  onToggle={() => setOpenId(openId === `${group.id}-${qi}` ? null : `${group.id}-${qi}`)}
                />
              ))
            ) : (
              <p className="text-white/25 text-sm px-5 py-4">No results found for "{searchQuery}"</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="glass-card p-5 mt-5 text-center"
      >
        <MessageSquare size={20} className="text-purple-400 mx-auto mb-2" />
        <p className="text-white/60 text-[13px] font-semibold mb-1">Still have questions?</p>
        <p className="text-white/30 text-[12.5px] mb-3">Post in the Community or reach out to the VollabPulse team directly.</p>
        <button className="btn-primary text-sm px-5">Ask the Community</button>
      </motion.div>
    </div>
  )
}
