import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 200, mass: 0.5 })
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 200, mass: 0.5 })
  const isTouchDevice = useRef(false)

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice.current) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    const updateHover = () => {
      const hoverEls = document.querySelectorAll(
        'a, button, [data-cursor-hover], input, textarea, [role="button"]'
      )
      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    updateHover()
    // Re-scan for hoverable elements periodically (for dynamic content)
    const interval = setInterval(updateHover, 2000)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      clearInterval(interval)
    }
  }, [cursorX, cursorY])

  if (isTouchDevice.current) return null

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.5 : hovered ? 0 : 1,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 bg-white rounded-full"
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width:  hovered ? 60 : 36,
            height: hovered ? 60 : 36,
            opacity: hidden ? 0 : clicking ? 0.6 : 0.4,
            borderWidth: hovered ? 1 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-full border border-white"
          style={{ marginLeft: hovered ? -30 : -18, marginTop: hovered ? -30 : -18 }}
        />
      </motion.div>
    </>
  )
}
