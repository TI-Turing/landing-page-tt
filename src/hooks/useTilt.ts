import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useTilt(intensity = 15) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const brightness = useMotionValue(1)

  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 200 })
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 200 })
  const springBrightness = useSpring(brightness, { damping: 20, stiffness: 200 })

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      rotateX.set((y - 0.5) * -intensity)
      rotateY.set((x - 0.5) * intensity)
      brightness.set(1.05)
    },
    [intensity, rotateX, rotateY, brightness]
  )

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    brightness.set(1)
  }, [rotateX, rotateY, brightness])

  return {
    ref,
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      filter: springBrightness,
      transformPerspective: 800,
    },
    handleMove,
    handleLeave,
  }
}
