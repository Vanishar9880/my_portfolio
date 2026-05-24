import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [visible, setVisible] = useState(false)
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const x = useSpring(rawX, { stiffness: 120, damping: 18 })
  const y = useSpring(rawY, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX - 160)
      rawY.set(e.clientY - 160)
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [rawX, rawY])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none z-0"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
        opacity: visible ? 1 : 0,
      }}
    />
  )
}
