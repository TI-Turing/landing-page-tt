import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { useTextScramble } from '@/hooks/useTextReveal'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useTranslation } from 'react-i18next'

const FLOATING_SNIPPETS = [
  { code: 'const app = new TiTuring()',       top: '15%', left: '4%',   delay: 0    },
  { code: 'git push origin main',             top: '70%', left: '2%',   delay: 1.5  },
  { code: 'docker build -t tt-api .',         top: '28%', right: '3%',  delay: 0.8  },
  { code: 'npm run deploy --prod',            top: '78%', right: '5%',  delay: 2.0  },
  { code: 'snippetProjects',                  top: '12%', right: '8%',  delay: 2.5, isTranslated: true },
  { code: 'ssh root@server.tituring.com',     top: '55%', left: '1%',   delay: 0.5  },
  { code: 'kubectl apply -f deploy.yaml',     top: '42%', right: '1%',  delay: 1.2  },
  { code: 'SELECT * FROM projects;',          top: '88%', left: '8%',   delay: 3.0  },
]

// Interactive particle system
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Particles
    const count = Math.min(100, Math.floor(window.innerWidth / 15))
    const particles = Array.from({ length: count }, () => ({
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      vx:     (Math.random() - 0.5) * 0.4,
      vy:     (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha:  Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.vx += (dx / dist) * force * 0.3
          p.vy += (dy / dist) * force * 0.3
        }

        // Apply velocity with damping
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around edges
        if (p.x < 0)              p.x = canvas.width
        if (p.x > canvas.width)   p.x = 0
        if (p.y < 0)              p.y = canvas.height
        if (p.y > canvas.height)  p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`
        ctx.fill()

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const cdx = p.x - other.x
          const cdy = p.y - other.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
          if (cdist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - cdist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

// Matrix rain - enhanced version
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const chars  = '01TiTURING{}[]<>/|\\@#$%アイウエオカキクケコ'
    const fontSize = 12
    const cols   = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 14, 36, 0.07)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const bright = Math.random() > 0.95
        ctx.fillStyle = bright ? '#06b6d4' : '#1c348040'
        ctx.font = `${fontSize}px "Space Mono", monospace`
        ctx.fillText(char, i * fontSize, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.98) drops[i] = 0
        drops[i]++
      })
    }

    const interval = setInterval(draw, 60)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-15 pointer-events-none" />
}

function MagneticButton({
  children,
  href,
  variant,
}: {
  children: React.ReactNode
  href: string
  variant: 'primary' | 'outline'
}) {
  const { ref, springX, springY } = useMagnetic(0.25)

  const baseClass =
    variant === 'primary'
      ? 'bg-tt-navy hover:bg-tt-blue border border-tt-blue/40 text-white hover:shadow-[0_0_40px_#3b82f650]'
      : 'bg-transparent hover:bg-tt-cyan/10 border border-tt-cyan/60 text-tt-cyan hover:shadow-[0_0_40px_#06b6d440]'

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }}>
      <a
        href={href}
        className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg
                   font-heading text-lg tracking-wider
                   transition-all duration-300 ${baseClass}`}
      >
        {children}
      </a>
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const [ready, setReady]     = useState(false)
  const containerRef          = useRef<HTMLDivElement>(null)
  const { scrollYProgress }   = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY                   = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textOpacity           = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY                 = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%'])

  const scrambled  = useTextScramble('TI TURING', ready, 25)
  const typingPhrases = t('hero.typingPhrases', { returnObjects: true }) as string[]
  const typed      = useTypingEffect(typingPhrases)

  // Trigger scramble after mount
  const onReady = useCallback(() => setReady(true), [])
  useEffect(() => {
    const t = setTimeout(onReady, 400)
    return () => clearTimeout(t)
  }, [onReady])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-tt-bg"
    >
      {/* Parallax background layer */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <MatrixRain />
        <ParticleField />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_45%,_#1c348018_0%,_#080e24_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-tt-bg to-transparent pointer-events-none" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-tt-navy/20 blur-[120px] pointer-events-none"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ top: '20%', left: '15%' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-tt-cyan/8 blur-[100px] pointer-events-none"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ bottom: '20%', right: '10%' }}
      />

      {/* Floating code snippets - enhanced */}
      {FLOATING_SNIPPETS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute hidden xl:block font-mono text-[11px] text-tt-cyan/30
                     bg-tt-navy/10 border border-tt-cyan/10 px-3 py-1.5 rounded
                     backdrop-blur-[2px] whitespace-nowrap select-none"
          style={{
            top:   s.top,
            left:  'left'  in s ? (s as { left: string }).left   : undefined,
            right: 'right' in s ? (s as { right: string }).right : undefined,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            y: [10, -8, -8, -20],
            scale: [0.8, 1, 1, 0.95],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
            times: [0, 0.1, 0.85, 1],
          }}
        >
          <span className="text-tt-green/50">$ </span>{'isTranslated' in s && s.isTranslated ? t(`hero.${s.code}`) : s.code}
        </motion.div>
      ))}

      {/* Main content - with parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Logo with glow ring */}
        <motion.div
          className="relative inline-block mb-10"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/assets/tt/1.png"
            alt="Ti Turing"
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl relative z-10
                       shadow-[0_0_60px_#1c348080]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-4 rounded-3xl border border-tt-cyan/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-8 rounded-[2rem] border border-tt-blue/10"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </motion.div>

        {/* Eyebrow with decorative lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-tt-cyan/50" />
          <p className="font-mono text-tt-cyan text-xs uppercase tracking-[0.4em]">
            {t('hero.eyebrow')}
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-tt-cyan/50" />
        </motion.div>

        {/* Headline - scramble reveal */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-heading text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black
                     uppercase leading-[0.85] tracking-tighter text-white mb-6"
        >
          <span className="inline-block">
            {scrambled.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + i * 0.04,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${
                  i > 2 ? 'text-gradient' : ''
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle - typing with terminal aesthetic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-3 bg-tt-dark/50 border border-tt-navy/50
                          rounded-lg px-5 py-3 backdrop-blur-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tt-green animate-pulse" />
              <span className="font-mono text-tt-green/70 text-xs">~</span>
            </span>
            <span className="font-mono text-base md:text-lg text-white/60">
              {typed}
            </span>
            <span className="animate-blink text-tt-cyan font-mono">▋</span>
          </div>
        </motion.div>

        {/* CTA Buttons - magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <MagneticButton href="#services" variant="primary">
            <span className="relative z-10">{t('hero.viewServices')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#contact" variant="outline">
            {t('hero.contactUs')}
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - enhanced */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">
            {t('hero.scroll')}
          </span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-tt-cyan/50 rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
