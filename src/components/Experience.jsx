import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Trophy, Mic2, Code2 } from 'lucide-react'

const timeline = [
  {
  icon: Briefcase,
  iconColor: 'from-cyan-500 to-blue-700',
  title: 'Content Developer Intern',
  org: 'MathonGo',
  period: 'May 2024 - July 2024',
  desc: 'Worked as a Content Developer Intern at MathonGo, contributing to educational content creation, problem-solving materials, and student-focused learning resources. Collaborated on creating structured and engaging academic content for competitive exam preparation.',
  tags: ['Content Development', 'Education', 'Problem Solving'],
},
  {
    icon: Trophy,
    iconColor: 'from-amber-600 to-orange-700',
    title: 'Hackathon Participant',
    org: 'Healthcare & Social Impact Tracks',
    period: '2024–2025',
    desc: 'Participated in multiple hackathons focused on healthcare innovation and social impact. Built AI-Sehat (healthcare AI) and GauSeva (cattle farming platform) under time-constrained collaborative environments.',
    tags: ['Hackathon', 'AI/ML', 'Problem Solving'],
  },
  {
    icon: Mic2,
    iconColor: 'from-rose-600 to-pink-700',
    title: 'Anchoring & Event Management',
    org: 'NSUT College Events',
    period: 'Ongoing',
    desc: 'Active in anchoring tech fests, cultural events, and student-run competitions at NSUT. Manages stage presence, scripts, and coordination for large-scale college events.',
    tags: ['Public Speaking', 'Event Mgmt', 'Communication'],
  },
  {
    icon: Code2,
    iconColor: 'from-cyan-600 to-blue-700',
    title: 'Academic & Real-World Projects',
    org: 'NSUT + Self-Initiated',
    period: '2023–Present',
    desc: 'Independently built and shipped 10+ projects spanning full stack web apps, IoT systems, and AI-powered tools. Each project combines practical impact with technical depth.',
    tags: ['React', 'Python', 'Arduino', 'AI/ML'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-28 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">// 04 — my journey</p>
          <h2 className="font-display text-4xl md:text-5xl font-700 text-white">
            Experience &{' '}
            <span className="gradient-text-2">Achievements</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/20 to-transparent" />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const { icon: Icon, iconColor, title, org, period, desc, tags } = item
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-500 border-2 border-bg shadow-lg shadow-violet-500/30 z-10" />

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass-card card-shine rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${iconColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-display font-600 text-white text-sm leading-tight">{title}</h3>
                          <p className="text-xs text-muted font-mono mt-0.5">{org} · {period}</p>
                        </div>
                      </div>

                      <p className="text-soft text-sm leading-relaxed mb-4">{desc}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span key={tag} className="skill-tag">{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
