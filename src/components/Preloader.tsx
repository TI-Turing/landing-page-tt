import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading')

  useEffect(() => {
    // Simulate loading with accelerating progress
    let frame: number
    let start = performance.now()
    const duration = 2200

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      // Ease: fast start, slow middle, fast end
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
      setProgress(Math.floor(eased * 100))

      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setPhase('reveal')
        setTimeout(() => {
          setPhase('done')
          onComplete()
        }, 800)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-tt-bg"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12"
          >
            <img
              src="/assets/tt/1.png"
              alt="Ti Turing"
              className="w-20 h-20 rounded-xl"
            />
            {/* Pulsing ring */}
            <motion.div
              className="absolute -inset-3 rounded-2xl border border-tt-cyan/30"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-tt-navy/40 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-tt-blue to-tt-cyan rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Counter */}
          <motion.p
            className="font-mono text-sm text-white/40 tracking-[0.4em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {String(progress).padStart(3, '0')}
          </motion.p>

          {/* Bottom text */}
          <motion.p
            className="absolute bottom-8 font-mono text-xs text-white/15 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Ti Turing — Software Factory
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
