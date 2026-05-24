import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-display font-700 text-white text-sm tracking-wide">VR</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-sm font-body transition-colors duration-200 relative group ${
                      isActive ? 'text-white' : 'text-soft hover:text-white'
                    }`}
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-px bg-violet-500"
                      initial={false}
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.25 }}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/40 text-violet-300 text-sm font-body hover:bg-violet-500/10 transition-all duration-200"
          >
            Hire Me
          </a>

          {/* Mobile toggle */}
          <button className="md:hidden text-soft hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-white/5 md:hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-sm font-body block py-1 ${isActive ? 'text-violet-300' : 'text-soft hover:text-white'}`}
                    >
                      {isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 mr-2 mb-0.5" />}
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
