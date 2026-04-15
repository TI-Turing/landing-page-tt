import { useState, useEffect, useRef } from 'react'

export function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const elRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    const el = elRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, elRef }
}
