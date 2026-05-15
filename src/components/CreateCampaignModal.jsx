import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Megaphone, Calendar, Tag, Users, ChevronDown } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { modalOverlay, modalContent } from '../animations/variants'

const platforms = ['instagram', 'youtube', 'tiktok', 'twitter', 'linkedin']
const priorities = ['low', 'medium', 'high']

export default function CreateCampaignModal() {
  const { activeModal, closeModal, addCampaign, creators } = useAppStore()
  const isOpen = activeModal === 'createCampaign'

  const [form, setForm] = useState({
    name: '',
    description: '',
    platform: 'instagram',
    priority: 'medium',
    launchDate: '',
    endDate: '',
    suggestedCaption: '',
    suggestedHashtags: '',
    tags: '',
    wave: 'Wave 1',
    targetCreators: 5,
    reachEstimate: 500000,
  })

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    addCampaign({
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      targetCreators: Number(form.targetCreators),
      reachEstimate: Number(form.reachEstimate),
      status: 'draft',
    })
    setForm({
      name: '', description: '', platform: 'instagram', priority: 'medium',
      launchDate: '', endDate: '', suggestedCaption: '', suggestedHashtags: '',
      tags: '', wave: 'Wave 1', targetCreators: 5, reachEstimate: 500000,
    })
    closeModal()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalOverlay}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center md:p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <motion.div
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            className="glass-card w-full md:max-w-lg rounded-t-2xl md:rounded-2xl overflow-y-auto" style={{ maxHeight: 'calc(92vh - env(safe-area-inset-top))' }}
          >
            {/* Mobile drag handle */}
            <div className="md:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                  <Megaphone size={17} className="text-purple-400" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-base">New Campaign</h2>
                  <p className="text-white/30 text-xs">Set up a collaboration campaign</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-white/50 text-xs font-medium mb-2">Campaign Name *</label>
                <input
                  className="input-field"
                  placeholder="e.g. Spring Collection Launch"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-white/50 text-xs font-medium mb-2">Description</label>
                <textarea
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Briefly describe the campaign goal..."
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">Platform</label>
                  <div className="relative">
                    <select
                      className="input-field appearance-none pr-9 capitalize"
                      value={form.platform}
                      onChange={(e) => set('platform', e.target.value)}
                    >
                      {platforms.map((p) => (
                        <option key={p} value={p} className="bg-[#1A1A1A] capitalize">{p}</option>
                      ))}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">Priority</label>
                  <div className="relative">
                    <select
                      className="input-field appearance-none pr-9 capitalize"
                      value={form.priority}
                      onChange={(e) => set('priority', e.target.value)}
                    >
                      {priorities.map((p) => (
                        <option key={p} value={p} className="bg-[#1A1A1A] capitalize">{p}</option>
                      ))}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">
                    <Calendar size={11} className="inline mr-1" />Launch Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={form.launchDate}
                    onChange={(e) => set('launchDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">
                    <Calendar size={11} className="inline mr-1" />End Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={form.endDate}
                    onChange={(e) => set('endDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">
                    <Users size={11} className="inline mr-1" />Target Creators
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    min={1}
                    value={form.targetCreators}
                    onChange={(e) => set('targetCreators', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2">Wave</label>
                  <input
                    className="input-field"
                    placeholder="Wave 1"
                    value={form.wave}
                    onChange={(e) => set('wave', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-xs font-medium mb-2">Suggested Caption</label>
                <textarea
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Draft a suggested caption for creators to use or adapt..."
                  value={form.suggestedCaption}
                  onChange={(e) => set('suggestedCaption', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-white/50 text-xs font-medium mb-2">Suggested Hashtags</label>
                <input
                  className="input-field"
                  placeholder="#Hashtag1 #Hashtag2 #Hashtag3"
                  value={form.suggestedHashtags}
                  onChange={(e) => set('suggestedHashtags', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-white/50 text-xs font-medium mb-2">
                  <Tag size={11} className="inline mr-1" />Tags (comma-separated)
                </label>
                <input
                  className="input-field"
                  placeholder="fashion, lifestyle, spring"
                  value={form.tags}
                  onChange={(e) => set('tags', e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 justify-center">
                  Create Campaign
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
