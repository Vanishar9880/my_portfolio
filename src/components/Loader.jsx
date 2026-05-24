import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 500)
    }, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          {/* Animated rings */}
          <div className="relative flex items-center justify-center mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-violet-500/30"
                style={{ width: 60 + i * 36, height: 60 + i * 36 }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 1.6, delay: i * 0.22, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
            <motion.div
              className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <span className="text-white font-display font-700 text-lg">VR</span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="w-36 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xs font-mono text-muted tracking-widest"
          >
            loading portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
