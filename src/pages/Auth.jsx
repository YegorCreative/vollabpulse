import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const features = [
  'Organize collaboration networks',
  'Coordinate post support campaigns',
  'Track engagement participation',
  'Analyze collaboration performance',
]

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAppStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    login({ name: 'Creator Studio', email, avatar: null })
    setIsLoading(false)
  }

  const handleGoogle = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    login({ name: 'Creator Studio', email: 'creator@example.com', avatar: null })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]">
      {/* Left hero panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center">
        {/* Animated gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-[#0A0A0A] to-indigo-900/30" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        {/* Ambient blobs */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-[480px] h-[480px] rounded-full bg-purple-600/15 blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] rounded-full bg-indigo-600/15 blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute top-2/3 left-1/2 w-[280px] h-[280px] rounded-full bg-violet-600/15 blur-[70px] pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 max-w-md px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-14">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-glow-purple">
                <Zap size={20} className="text-white" />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">VollabPulse</span>
            </div>

            {/* Hero */}
            <h1 className="text-[52px] font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Coordinate{' '}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Creator Growth.
              </span>
            </h1>

            <p className="text-white/45 text-lg leading-relaxed mb-10">
              Manage collaboration campaigns, creator support, and content launches from one premium workspace.
            </p>

            <div className="space-y-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.09, duration: 0.4 }}
                  className="flex items-center gap-3 text-white/55 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex-shrink-0" />
                  {feature}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right auth panel */}
      <div className="w-full lg:w-[460px] flex items-center justify-center px-8 py-12 relative border-l border-white/[0.04]">
        <div className="absolute inset-0 bg-[#0D0D0D]" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-glow-purple">
              <Zap size={17} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg">VollabPulse</span>
          </div>

          <h2 className="text-[26px] font-bold text-white mb-1 tracking-tight">Welcome back</h2>
          <p className="text-white/35 text-sm mb-8">Sign in to your creator workspace</p>

          {/* Google */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGoogle}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 text-white/75 text-sm font-medium hover:bg-white/[0.09] hover:border-white/15 transition-all duration-200 mb-6 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-white/20 text-xs">or continue with email</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/45 text-xs font-medium mb-2">Email address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/45 text-xs font-medium mb-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-white/35 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded accent-purple-500"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-xs text-purple-400/80 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center mt-1 py-3"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-white/25 text-xs text-center mt-8">
            Don't have an account?{' '}
            <button className="text-purple-400/80 hover:text-purple-300 transition-colors">
              Request access
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
