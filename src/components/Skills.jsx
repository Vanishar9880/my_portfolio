import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal, Globe, Brain, Wrench, Radio } from 'lucide-react'

const skillGroups = [
  {
    icon: Terminal,
    label: 'Languages',
    color: 'from-violet-600 to-purple-700',
    accent: 'violet',
    skills: ['C++', 'Python', 'JavaScript'],
  },
  {
    icon: Globe,
    label: 'Web Development',
    color: 'from-cyan-600 to-blue-700',
    accent: 'cyan',
    skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Tailwind CSS'],
  },
  {
    icon: Brain,
    label: 'AI / ML',
    color: 'from-fuchsia-600 to-pink-700',
    accent: 'fuchsia',
    skills: ['Machine Learning', 'Pattern Recognition', 'Image Processing', 'Transformers basics'],
  },
  {
    icon: Wrench,
    label: 'Tools & Platforms',
    color: 'from-amber-600 to-orange-700',
    accent: 'amber',
    skills: ['Git', 'GitHub', 'Vercel', 'VS Code', 'MATLAB', 'KiCad'],
  },
  {
    icon: Radio,
    label: 'Core ECE',
    color: 'from-emerald-600 to-teal-700',
    accent: 'emerald',
    skills: ['DSP', 'Communication Systems', 'Microprocessors', 'EM Waves'],
  },
]

const accentMap = {
  violet: { bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.25)', text: '#a78bfa' },
  cyan: { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.25)', text: '#67e8f9' },
  fuchsia: { bg: 'rgba(192,38,211,0.12)', border: 'rgba(192,38,211,0.25)', text: '#e879f9' },
  amber: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: '#fcd34d' },
  emerald: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)', text: '#6ee7b7' },
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-28 relative dot-grid" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">// 02 — what i know</p>
          <h2 className="font-display text-4xl md:text-5xl font-700 text-white">
            My <span className="gradient-text-2">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => {
            const { icon: Icon, label, color, accent, skills } = group
            const colors = accentMap[accent]
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card card-shine rounded-2xl p-6"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <h3 className="font-display font-600 text-white text-sm">{label}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      className="text-xs font-mono px-3 py-1 rounded-full transition-all duration-200 cursor-default hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
