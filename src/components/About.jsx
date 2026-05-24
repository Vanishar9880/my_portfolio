import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Code2, Cpu, Lightbulb } from 'lucide-react'

const highlights = [
  { icon: GraduationCap, label: 'NSUT Delhi', sub: 'B.Tech ECE' },
  { icon: Code2, label: 'Full Stack', sub: 'React · Node · MongoDB' },
  { icon: Cpu, label: 'AI/ML', sub: 'ML · Vision · NLP' },
  { icon: Lightbulb, label: 'Builder', sub: 'Hackathons & Projects' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">// 01 — who i am</p>
          <h2 className="font-display text-4xl md:text-5xl font-700 text-white">
            About <span className="gradient-text-2">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="glass-card rounded-2xl p-8 space-y-5">
              <p className="text-soft leading-relaxed text-base">
                I'm a{' '}
                <span className="text-violet-300 font-500">
                  B.Tech Electronics and Communication Engineering student at NSUT Delhi
                </span>{' '}
                with a deep interest in full stack development, AI/ML, and building
                practical tech solutions.
              </p>
              <p className="text-soft leading-relaxed text-base">
                I enjoy creating projects that solve real-world problems and combine
                software with electronics — from smart farming platforms to AI-powered
                healthcare tools.
              </p>
              <p className="text-soft leading-relaxed text-base">
                Beyond code, I'm drawn to anchoring, event management, and
                tech presentations. I believe the best engineers can both
                build <em>and</em> communicate their ideas.
              </p>

              {/* Stats row */}
              <div className="flex gap-6 pt-2">
                {[
                  { val: '10+', label: 'Projects' },
                  { val: '2+', label: 'Hackathons' },
                  { val: '∞', label: 'Curiosity' },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="font-display text-2xl font-700 gradient-text">{val}</div>
                    <div className="text-xs text-muted font-mono mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card card-shine rounded-xl p-5 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-violet-400" />
                </div>
                <p className="font-display font-600 text-white text-sm">{label}</p>
                <p className="text-xs text-muted mt-1 font-mono">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
