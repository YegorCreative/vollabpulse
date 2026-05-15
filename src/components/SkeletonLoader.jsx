import { motion } from 'framer-motion'

function Shimmer({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-white/[0.04] rounded-xl ${className}`}>
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
      />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Shimmer className="w-9 h-9 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-3.5 w-2/3" />
          <Shimmer className="h-2.5 w-1/3" />
        </div>
      </div>
      <Shimmer className="h-2.5 w-full" />
      <Shimmer className="h-2.5 w-4/5" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-start justify-between">
        <Shimmer className="w-9 h-9 rounded-xl" />
        <Shimmer className="w-10 h-5 rounded-lg" />
      </div>
      <Shimmer className="h-7 w-1/2" />
      <Shimmer className="h-2.5 w-2/3" />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.04]">
      <Shimmer className="w-8 h-8 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Shimmer className="h-3 w-1/3" />
        <Shimmer className="h-2.5 w-1/4" />
      </div>
      <Shimmer className="h-5 w-16 rounded-full" />
    </div>
  )
}

export function PageSkeleton({ cards = 4, rows = 3 }) {
  return (
    <div className="p-5 md:p-7 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Shimmer className="h-6 w-36" />
          <Shimmer className="h-3 w-48" />
        </div>
        <Shimmer className="h-9 w-28 rounded-xl" />
      </div>
      <div className={`grid grid-cols-2 xl:grid-cols-4 gap-4`}>
        {Array.from({ length: cards }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <div className="glass-card overflow-hidden">
        {Array.from({ length: rows }).map((_, i) => <TableRowSkeleton key={i} />)}
      </div>
    </div>
  )
}

export default Shimmer
