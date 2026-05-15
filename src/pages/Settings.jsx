import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Settings as SettingsIcon, Users, Bell, Palette, Puzzle,
  Save, ChevronRight, Zap, Globe, Lock, Mail,
  Link2, Github, Twitter, Youtube,
} from 'lucide-react'

const TABS = [
  { id: 'workspace', label: 'Workspace', icon: SettingsIcon },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
]

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5.5 rounded-full transition-all duration-200 flex-shrink-0 ${checked ? 'bg-purple-500' : 'bg-white/10'}`}
      style={{ height: '22px', width: '40px' }}
    >
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm"
        style={{ width: '18px', height: '18px' }}
      />
    </button>
  )
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-white/[0.05] last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-sm font-medium">{label}</p>
        {description && <p className="text-white/30 text-xs mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

function IntegrationCard({ icon: Icon, name, description, status, iconColor }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-all duration-200">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColor}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-sm font-semibold">{name}</p>
        <p className="text-white/30 text-xs">{description}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {status === 'connected' ? (
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Connected</span>
        ) : (
          <button className="text-xs px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all font-medium">
            Connect
          </button>
        )}
      </div>
    </div>
  )
}

const mockTeam = [
  { id: 1, name: 'Maya Chen', email: 'maya@studio.com', role: 'Admin', avatar: 'MC' },
  { id: 2, name: 'Jordan Lee', email: 'jordan@studio.com', role: 'Manager', avatar: 'JL' },
  { id: 3, name: 'Sam Patel', email: 'sam@studio.com', role: 'Creator', avatar: 'SP' },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('workspace')
  const [notifPrefs, setNotifPrefs] = useState({
    campaignInvites: true,
    pendingActions: true,
    launchReminders: true,
    creatorResponses: true,
    weeklyDigest: false,
    emailNotifications: true,
  })
  const [workspace, setWorkspace] = useState({
    name: 'Creator Studio',
    description: 'Premium creator collaboration workspace',
    website: 'https://creatorstudio.io',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleNotif = (key) =>
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="p-4 sm:p-5 md:p-7 max-w-[1100px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-7"
      >
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-white/35 text-sm mt-0.5">Manage your workspace and preferences</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="md:w-52 flex-shrink-0"
        >
          {/* Mobile: horizontal scroll chips */}
          <div className="md:hidden chips-scroll pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[40px]
                  ${activeTab === tab.id
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
                    : 'bg-white/[0.04] text-white/40 border border-white/[0.06] hover:text-white/70'
                  }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
          {/* Desktop: vertical list */}
          <div className="hidden md:block glass-card p-2 space-y-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left
                  ${activeTab === tab.id
                    ? 'bg-purple-500/10 text-white border border-purple-500/20'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent'
                  }`}
              >
                <tab.icon size={15} />
                {tab.label}
                {activeTab === tab.id && <ChevronRight size={12} className="ml-auto" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex-1 min-w-0"
        >
          <AnimatePresence mode="wait">
            {/* Workspace */}
            {activeTab === 'workspace' && (
              <motion.div
                key="workspace"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6"
              >
                <h2 className="text-white font-semibold text-base mb-6 pb-4 border-b border-white/[0.06]">Workspace Settings</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-white/45 text-xs font-medium mb-2">Workspace Name</label>
                    <input
                      className="input-field"
                      value={workspace.name}
                      onChange={(e) => setWorkspace((p) => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-white/45 text-xs font-medium mb-2">Description</label>
                    <textarea
                      className="input-field resize-none"
                      rows={3}
                      value={workspace.description}
                      onChange={(e) => setWorkspace((p) => ({ ...p, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-white/45 text-xs font-medium mb-2">
                      <Globe size={11} className="inline mr-1" />Website
                    </label>
                    <input
                      className="input-field"
                      value={workspace.website}
                      onChange={(e) => setWorkspace((p) => ({ ...p, website: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSave}
                      className="btn-primary"
                    >
                      {saved ? '✓ Saved' : (
                        <>
                          <Save size={14} />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team */}
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <h2 className="text-white font-semibold text-base">Team Members</h2>
                  <button className="btn-secondary py-2 text-xs">
                    <Mail size={13} />
                    Invite Member
                  </button>
                </div>
                <div className="space-y-3">
                  {mockTeam.map((member) => (
                    <div key={member.id} className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/40 to-indigo-500/40 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{member.name}</p>
                        <p className="text-white/30 text-xs">{member.email}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        member.role === 'Admin' ? 'bg-purple-500/10 text-purple-400' :
                        member.role === 'Manager' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-white/5 text-white/40'
                      }`}>
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-xl border border-dashed border-white/[0.08] text-center">
                  <p className="text-white/30 text-sm">Invite collaborators to manage campaigns and creators together</p>
                  <button className="text-purple-400 text-xs font-medium mt-2 hover:text-purple-300 transition-colors">
                    + Invite by email
                  </button>
                </div>
              </motion.div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6"
              >
                <h2 className="text-white font-semibold text-base mb-6 pb-4 border-b border-white/[0.06]">Notification Preferences</h2>
                <SettingRow label="Campaign Invites" description="Get notified when you receive collaboration invites">
                  <ToggleSwitch checked={notifPrefs.campaignInvites} onChange={(v) => toggleNotif('campaignInvites')} />
                </SettingRow>
                <SettingRow label="Pending Actions" description="Reminders for creator confirmations and approvals needed">
                  <ToggleSwitch checked={notifPrefs.pendingActions} onChange={() => toggleNotif('pendingActions')} />
                </SettingRow>
                <SettingRow label="Launch Reminders" description="Alerts before scheduled campaign launches">
                  <ToggleSwitch checked={notifPrefs.launchReminders} onChange={() => toggleNotif('launchReminders')} />
                </SettingRow>
                <SettingRow label="Creator Responses" description="When creators confirm or decline campaign participation">
                  <ToggleSwitch checked={notifPrefs.creatorResponses} onChange={() => toggleNotif('creatorResponses')} />
                </SettingRow>
                <SettingRow label="Weekly Digest" description="A weekly summary of campaign performance and activity">
                  <ToggleSwitch checked={notifPrefs.weeklyDigest} onChange={() => toggleNotif('weeklyDigest')} />
                </SettingRow>
                <SettingRow label="Email Notifications" description="Receive important updates via email">
                  <ToggleSwitch checked={notifPrefs.emailNotifications} onChange={() => toggleNotif('emailNotifications')} />
                </SettingRow>
              </motion.div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6"
              >
                <h2 className="text-white font-semibold text-base mb-6 pb-4 border-b border-white/[0.06]">Appearance</h2>
                <div className="mb-6">
                  <p className="text-white/45 text-xs font-medium mb-3">Theme</p>
                  <div className="flex gap-3">
                    <div className="flex-1 p-4 rounded-xl border-2 border-purple-500/40 bg-purple-500/5 cursor-pointer">
                      <div className="w-full h-20 rounded-lg bg-[#111111] mb-3 border border-white/5 flex items-center justify-center gap-2">
                        <div className="w-2 h-8 rounded bg-purple-500/40" />
                        <div className="w-8 h-8 rounded bg-white/5" />
                        <div className="w-6 h-8 rounded bg-white/5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-medium">Dark</span>
                        <div className="w-3.5 h-3.5 rounded-full bg-purple-500 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-pointer opacity-40">
                      <div className="w-full h-20 rounded-lg bg-white/20 mb-3 border border-white/10 flex items-center justify-center gap-2">
                        <div className="w-2 h-8 rounded bg-purple-500/60" />
                        <div className="w-8 h-8 rounded bg-black/10" />
                        <div className="w-6 h-8 rounded bg-black/10" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/50 text-xs font-medium">Light</span>
                        <span className="text-white/20 text-xs">Soon</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-white/45 text-xs font-medium mb-3">Accent Color</p>
                  <div className="flex gap-2.5 flex-wrap">
                    {[
                      { label: 'Purple', from: 'from-purple-500', to: 'to-indigo-600', active: true },
                      { label: 'Blue', from: 'from-blue-500', to: 'to-cyan-500', active: false },
                      { label: 'Violet', from: 'from-violet-500', to: 'to-purple-600', active: false },
                      { label: 'Rose', from: 'from-rose-500', to: 'to-pink-500', active: false },
                      { label: 'Emerald', from: 'from-emerald-500', to: 'to-teal-500', active: false },
                    ].map((c) => (
                      <div key={c.label} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${c.from} ${c.to} cursor-pointer ${c.active ? 'ring-2 ring-white/40 ring-offset-1 ring-offset-[#0A0A0A]' : 'opacity-50 hover:opacity-80 transition-opacity'}`} />
                        <span className="text-white/25 text-[10px]">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6"
              >
                <div className="mb-6 pb-4 border-b border-white/[0.06]">
                  <h2 className="text-white font-semibold text-base">Platform Integrations</h2>
                  <p className="text-white/30 text-xs mt-1">Connect your social platforms for future automated reporting (read-only access)</p>
                </div>
                <div className="space-y-3 mb-6">
                  <IntegrationCard icon={Zap} name="Instagram" description="Campaign reach reporting (coming soon)" status="pending" iconColor="bg-gradient-to-br from-pink-500/20 to-purple-500/20" />
                  <IntegrationCard icon={Youtube} name="YouTube" description="Video performance analytics (coming soon)" status="pending" iconColor="bg-red-500/15" />
                  <IntegrationCard icon={Twitter} name="Twitter / X" description="Engagement tracking (coming soon)" status="pending" iconColor="bg-sky-500/15" />
                  <IntegrationCard icon={Link2} name="Webhook URL" description="Send campaign events to your own backend" status="pending" iconColor="bg-indigo-500/15" />
                  <IntegrationCard icon={Github} name="Zapier" description="Automate workflows between apps (coming soon)" status="pending" iconColor="bg-orange-500/15" />
                </div>
                <div className="p-4 rounded-xl border border-dashed border-purple-500/15 bg-purple-500/[0.04]">
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="text-white/70 text-sm font-medium">Privacy First</p>
                      <p className="text-white/30 text-xs mt-0.5">All integrations use read-only OAuth. VollabPulse never posts, likes, or comments on your behalf.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
