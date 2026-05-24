import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { SiLeetcode } from 'react-icons/si'

const roles = [
  'Full Stack Developer',
  'AI/ML Enthusiast',
  'ECE Student @ NSUT',
  'Hackathon Builder',
]

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(charIndex + 1) }, 70)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(charIndex - 1) }, 35)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  return (
    <span className="gradient-text font-display">
      {displayed}
      <span className="cursor" />
    </span>
  )
}

const socialLinks = [
  { icon: Github,     href: 'https://github.com/Vanishar9880',                    label: 'GitHub',   iconType: 'lucide' },
  { icon: Linkedin,   href: 'https://www.linkedin.com/in/vanisha-rathore-085359289/',               label: 'LinkedIn', iconType: 'lucide' },
  { icon: SiLeetcode, href: 'https://leetcode.com/u/vanisha_rathore_30/',      label: 'LeetCode', iconType: 'si' },
  { icon: Mail,       href: 'mailto:vanisha.rathore.ug23@nsut.ac.in', label: 'Email',    iconType: 'lucide' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <Particles />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-soft tracking-widest uppercase">Open to Internships & Collabs</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-800 text-white mb-4 leading-none tracking-tight"
        >
          Vanisha<br />
          <span className="gradient-text">Rathore</span>
        </motion.h1>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-xl md:text-2xl font-display font-500 mb-6 h-9"
        >
          <TypingText />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-soft text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Building impactful tech with{' '}
          <span className="text-violet-300">Web Development</span>,{' '}
          <span className="text-cyan-300">AI/ML</span>, and{' '}
          <span className="text-amber-300">Electronics</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <a href="#projects" className="glow-btn px-7 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-display font-600 text-sm tracking-wide hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5">
            View Projects
          </a>
          <a href="#contact" className="glow-btn px-7 py-3 rounded-full border border-white/10 text-soft hover:text-white hover:border-violet-500/40 font-display font-500 text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5">
            Contact Me
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center gap-3 flex-wrap"
        >
          {socialLinks.map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 + i * 0.07 }}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full glass border border-white/8 flex items-center justify-center text-soft hover:text-violet-400 hover:border-violet-500/40 transition-all duration-200"
              title={label}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted hover:text-violet-400 transition-colors"
      >
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  )
}

function Particles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
