import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted text-sm font-body flex items-center gap-1.5"
        >
          Designed & built by{' '}
          <span className="text-violet-400 font-500">Vanisha Rathore</span>
          {' '}with{' '}
          <Heart size={12} className="text-rose-400 fill-rose-400" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted text-xs font-mono"
        >
          © {new Date().getFullYear()} · NSUT Delhi
        </motion.p>
      </div>
    </footer>
  )
}
