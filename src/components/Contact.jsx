import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, Send, MapPin } from 'lucide-react'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'vanisha.rathore.ug23@nsut.ac.in',
    href: 'mailto:vanisha.rathore.ug23@nsut.ac.in',
    color: 'from-violet-600 to-purple-700',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/vanisha-rathore',
    href: 'https://github.com/Vanishar9880',
    color: 'from-slate-600 to-gray-700',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vanisha-rathore',
    href: 'https://www.linkedin.com/in/vanisha-rathore-085359289/',
    color: 'from-cyan-600 to-blue-700',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">// 05 — say hello</p>
          <h2 className="font-display text-4xl md:text-5xl font-700 text-white">
            Get In <span className="gradient-text-2">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="text-soft leading-relaxed">
              I'm always open to interesting conversations, collaboration opportunities,
              or internship offers. Whether it's a project idea, a hackathon team, or just a
              chat about tech — reach out!
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted text-sm font-mono">
              <MapPin size={14} className="text-violet-400" />
              New Delhi, India
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, label, value, href, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 glass-card rounded-xl p-4 hover:border-violet-500/30 transition-all duration-200"
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-mono">{label}</p>
                    <p className="text-sm text-soft hover:text-white transition-colors">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-7 space-y-5">
              <div>
                <label className="block text-xs font-mono text-muted mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Priya Sharma"
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-violet-500/50 transition-colors font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="priya@example.com"
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-violet-500/50 transition-colors font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Hey Vanisha, I'd love to collaborate on..."
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-violet-500/50 transition-colors resize-none font-body"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-display font-600 text-sm tracking-wide hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
              >
                {sent ? (
                  '✓ Message Sent!'
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
