import { useRef, useState, memo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ExternalLink, X, Mic, Leaf, Package, Zap, Heart, Shield,
  BarChart2, Github, Play, Brain, FileSearch,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: 'AI Samvaad',
    icon: Mic,
    iconGradient: 'from-violet-600 to-purple-700',
    tagline: 'AI-powered interview preparation voice platform',
    description:
      'A voice-based AI platform that helps users prepare for interviews through realistic mock sessions, adaptive questioning, and real-time feedback. Combines speech recognition with NLP for personalised coaching.',
    features: ['Adaptive questioning', 'Real-time feedback', 'Voice input/output', 'NLP analysis'],
    tags: ['React', 'Node.js', 'AI/ML', 'Speech API'],
    type: 'ai',
  },
  {
    id: 2,
    title: 'GauSeva',
    icon: Leaf,
    iconGradient: 'from-emerald-600 to-teal-700',
    tagline: 'Comprehensive web platform for cattle farmers',
    description:
      'A full-featured platform for cattle farmers featuring Cowpedia (breed encyclopedia), smart breed matching, a marketplace, integrated chatbot assistance, and an intelligent vet appointment tracker.',
    features: ['Cowpedia encyclopedia', 'Breed matching', 'Marketplace', 'Vet tracker'],
    tags: ['React', 'Node.js', 'MongoDB', 'Chatbot'],
    type: 'web',
  },
  {
    id: 3,
    title: 'FarmTrace',
    icon: Package,
    iconGradient: 'from-amber-600 to-orange-700',
    tagline: 'Supply chain transparency with QR traceability',
    description:
      'A blockchain-inspired web app bringing transparency to agriculture supply chains. Supports product registration, QR code scanning for verification, and role-based dashboards for farmers, distributors, and consumers.',
    features: ['QR code scanning', 'Product registration', 'Role-based dashboards', 'Supply chain audit'],
    tags: ['React', 'Express.js', 'QR Code', 'Firebase'],
    type: 'web',
  },
  {
    id: 4,
    title: 'Twilight Light Control',
    icon: Zap,
    iconGradient: 'from-cyan-600 to-blue-700',
    tagline: 'Smart solar-powered lighting with LDR sensor',
    description:
      'A hardware project using Arduino Nano, LDR sensor, and solar charging to create an automatic light intensity control system that adapts to ambient light levels — saving energy and reducing manual intervention.',
    features: ['Arduino Nano core', 'LDR-based sensing', 'Solar charging', 'Auto dimming'],
    tags: ['Arduino', 'LDR', 'Solar', 'C++'],
    type: 'iot',
  },
  {
    id: 5,
    title: 'AI-Sehat',
    icon: Heart,
    iconGradient: 'from-rose-600 to-pink-700',
    tagline: 'AI healthcare assistant for emergency support',
    description:
      'A hackathon healthcare project combining AI-powered wound assessment from images, a real-time emergency hospital locator, and medicine stock tracking for clinics and emergency responders.',
    features: ['Wound assessment AI', 'Hospital locator', 'Medicine tracking', 'Emergency alerts'],
    tags: ['Python', 'ML', 'React', 'Maps API'],
    type: 'ai',
  },
  {
    id: 6,
    title: 'Image Misuse Protection',
    icon: Shield,
    iconGradient: 'from-slate-600 to-gray-700',
    tagline: 'Privacy-focused app to detect image misuse',
    description:
      'A privacy-first application that detects image morphing, tracks potential leak risks, and alerts users about potential misuse of their personal images across the web using AI-based similarity and manipulation detection.',
    features: ['Morphing detection', 'Leak risk scoring', 'AI similarity check', 'Privacy alerts'],
    tags: ['Python', 'OpenCV', 'ML', 'Privacy'],
    type: 'ai',
  },
  {
    id: 7,
    title: 'DSA Tracker',
    icon: BarChart2,
    iconGradient: 'from-indigo-600 to-violet-700',
    tagline: 'Smart DSA progress tracking with coding analytics',
    description:
      'A smart coding progress tracking platform that helps students monitor DSA consistency, solved problems, streaks, topic-wise progress, and coding performance analytics. Features an interactive dashboard with heatmaps and charts.',
    features: ['Daily problem tracking', 'Streak visualisation', 'Topic-wise analytics', 'Coding heatmap'],
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Chart.js'],
    type: 'web',
    featured: true,
    mockup: 'dsa',
  },
  {
    id: 8,
    title: 'Real-Time GPT Assistant',
    icon: Brain,
    iconGradient: 'from-fuchsia-600 to-pink-700',
    tagline: 'Real-time AI assistant with voice interaction',
    description:
      'A real-time AI assistant powered by GPT APIs with instant conversational responses, voice interaction, and a modern streaming chat interface. Uses WebSocket communication for ultra-low latency responses.',
    features: ['Real-time AI chat', 'Voice input/output', 'WebSocket streaming', 'Smart assistant'],
    tags: ['Python', 'WebSockets', 'OpenAI API', 'React', 'FastAPI'],
    type: 'ai',
    featured: true,
    mockup: 'gpt',
  },
  {
    id: 9,
    title: 'ResumeMatchAI',
    icon: FileSearch,
    iconGradient: 'from-teal-600 to-emerald-700',
    tagline: 'AI resume analyser with ATS scoring & skill gap detection',
    description:
      'An AI-powered resume analysis platform that compares resumes with job descriptions and provides ATS compatibility score, skill gap analysis, and actionable improvement suggestions tailored to specific roles.',
    features: ['ATS score calculation', 'Resume parsing', 'Skill gap detection', 'JD matching %'],
    tags: ['Python', 'NLP', 'React', 'Flask', 'Machine Learning'],
    type: 'ai',
    featured: true,
    mockup: 'resume',
  },
]

// ─── Colour maps ─────────────────────────────────────────────────────────────

const typeStyles = {
  ai:  { bg: 'rgba(124,58,237,0.13)', border: 'rgba(124,58,237,0.28)', text: '#a78bfa', label: 'AI / ML' },
  web: { bg: 'rgba(6,182,212,0.12)',  border: 'rgba(6,182,212,0.25)',  text: '#67e8f9', label: 'Web' },
  iot: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: '#fcd34d', label: 'IoT' },
}

// ─── Mockup previews inside the modal ────────────────────────────────────────

function DsaMockup() {
  const bars = [65, 80, 45, 90, 55, 70, 85]
  return (
    <div className="rounded-xl bg-[#0a0f1e] border border-violet-500/20 p-4 mt-4 text-xs font-mono">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="ml-2 text-muted text-[10px]">dsa-tracker.vercel.app</span>
      </div>
      <div className="flex items-end gap-1.5 h-16">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-violet-600 to-indigo-400"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
            style={{ height: `${h}%`, originY: 1 }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1 text-muted text-[9px]">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="flex gap-3 mt-3">
        {[['🔥 Streak','12d'],['✅ Solved','248'],['📊 Topics','18']].map(([k,v])=>(
          <div key={k} className="flex-1 rounded-lg bg-violet-500/10 border border-violet-500/15 p-2 text-center">
            <div className="text-violet-300 font-600 text-sm">{v}</div>
            <div className="text-muted text-[9px] mt-0.5">{k}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GptMockup() {
  const msgs = [
    { role: 'user', text: 'Explain transformers in simple terms.' },
    { role: 'ai',   text: 'Sure! Think of attention as each word asking "who should I focus on?" to build context...' },
  ]
  return (
    <div className="rounded-xl bg-[#0a0f1e] border border-fuchsia-500/20 p-4 mt-4 text-xs font-mono">
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-fuchsia-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="text-muted text-[10px]">GPT Assistant — connected</span>
      </div>
      <div className="space-y-2">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`px-3 py-2 rounded-lg text-[11px] leading-relaxed max-w-[85%] ${
              m.role === 'user'
                ? 'ml-auto bg-fuchsia-600/20 border border-fuchsia-500/20 text-fuchsia-100'
                : 'bg-white/5 border border-white/8 text-soft'
            }`}
          >
            {m.text}
          </motion.div>
        ))}
        {/* Typing indicator */}
        <div className="flex gap-1 items-center px-3 py-2 rounded-lg bg-white/5 border border-white/8 w-16">
          {[0,1,2].map(i => (
            <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"
              animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, delay: i*0.15, repeat: Infinity }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ResumeMockup() {
  return (
    <div className="rounded-xl bg-[#0a0f1e] border border-teal-500/20 p-4 mt-4 text-xs font-mono">
      <div className="flex items-center justify-between mb-3">
        <span className="text-teal-300 text-[10px]">ATS Analysis Complete</span>
        <span className="text-emerald-400 text-[10px]">✓ Parsed</span>
      </div>
      {/* Score meter */}
      <div className="mb-3">
        <div className="flex justify-between text-[10px] text-muted mb-1"><span>ATS Score</span><span className="text-teal-300">82%</span></div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
            initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
      {/* Skills matched */}
      <div className="flex flex-wrap gap-1.5">
        {['React ✓','Node.js ✓','ML ✓','SQL ✗','Docker ✗'].map(s=>(
          <span key={s} className={`px-2 py-0.5 rounded-full text-[9px] border ${
            s.includes('✓')
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
              : 'bg-red-500/10 border-red-500/20 text-red-300'
          }`}>{s}</span>
        ))}
      </div>
      <p className="text-muted text-[10px] mt-3 leading-relaxed">💡 Add Docker & SQL to improve match from 82% → 94%</p>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

const Modal = memo(function Modal({ project, onClose }) {
  if (!project) return null
  const { icon: Icon, iconGradient, title, tagline, description, features, tags, type, mockup } = project
  const ts = typeStyles[type] || typeStyles.web

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="relative glass-card rounded-2xl p-7 max-w-lg w-full z-10 max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-muted hover:text-white transition-colors z-10">
          <X size={18} />
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-display font-700 text-white text-lg">{title}</h3>
            <p className="text-xs text-muted font-body mt-0.5">{tagline}</p>
          </div>
        </div>

        <p className="text-soft text-sm leading-relaxed mb-4">{description}</p>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs font-mono text-muted mb-2">Key Features</p>
          <div className="grid grid-cols-2 gap-1.5">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-soft">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.08 }}
              style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.text }}
              className="text-xs font-mono px-2.5 py-0.5 rounded-full cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Mockup preview */}
        {mockup === 'dsa'    && <DsaMockup />}
        {mockup === 'gpt'    && <GptMockup />}
        {mockup === 'resume' && <ResumeMockup />}

        {/* Action buttons */}
        <div className="flex gap-3 mt-5">
          <a
            href="https://github.com/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 text-soft hover:text-white hover:border-white/20 text-xs font-display transition-all"
          >
            <Github size={12} /> GitHub
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-xs font-display hover:shadow-lg hover:shadow-violet-500/20 transition-all"
          >
            <Play size={12} /> Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
})

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard = memo(function ProjectCard({ project, index, inView, onOpen }) {
  const { icon: Icon, iconGradient, title, tagline, tags, type, featured } = project
  const ts = typeStyles[type] || typeStyles.web

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.07 }}
      whileHover={{ y: -7, transition: { duration: 0.22 } }}
      onClick={() => onOpen(project)}
      className={`relative glass-card card-shine rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group overflow-hidden ${
        featured ? 'border-violet-500/25' : ''
      }`}
    >
      {/* Featured glow */}
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent pointer-events-none rounded-2xl" />
      )}

      {/* Featured badge */}
      {featured && (
        <span className="absolute top-4 right-4 text-[9px] font-mono text-violet-400 border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 rounded-full">
          NEW
        </span>
      )}

      {/* Icon + title */}
      <div className="flex items-start gap-3">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-lg flex-shrink-0`}
        >
          <Icon size={18} className="text-white" />
        </motion.div>
        <div className="min-w-0">
          <h3 className="font-display font-700 text-white text-sm leading-tight truncate">{title}</h3>
          <p className="text-[11px] text-muted mt-0.5 font-body line-clamp-2">{tagline}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.text }}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
        {tags.length > 4 && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-muted bg-white/5 border border-white/8">
            +{tags.length - 4}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-auto flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-display font-500 text-violet-400 group-hover:text-violet-300 group-hover:gap-2.5 transition-all duration-200">
          <ExternalLink size={11} />
          View Details
        </span>
        <span
          style={{ background: ts.bg, color: ts.text, border: `1px solid ${ts.border}` }}
          className="text-[9px] font-mono px-2 py-0.5 rounded-full"
        >
          {ts.label}
        </span>
      </div>
    </motion.div>
  )
})

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeProject, setActiveProject] = useState(null)
  const [filter, setFilter] = useState('all')

  const filters = ['all', 'ai', 'web', 'iot']
  const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter)

  return (
    <section id="projects" className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="section-label mb-3">// 03 — what i built</p>
          <h2 className="font-display text-4xl md:text-5xl font-700 text-white">
            Selected <span className="gradient-text-2">Projects</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-2 flex-wrap mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                filter === f
                  ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/20'
                  : 'border-white/10 text-muted hover:text-white hover:border-white/20'
              }`}
            >
              {f === 'all' ? 'All Projects' : typeStyles[f]?.label || f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
                onOpen={setActiveProject}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <Modal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
