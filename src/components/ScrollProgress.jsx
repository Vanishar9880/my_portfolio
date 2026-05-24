import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-cyan-400 to-amber-400 z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
