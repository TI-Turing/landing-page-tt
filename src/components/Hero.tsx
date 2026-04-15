import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTypingEffect } from '@/hooks/useTypingEffect'

const TYPING_PHRASES = [
  'Construimos Software.',
  'Aseguramos tu Sistema.',
  'Escalamos tu Negocio.',
  'Creamos Apps Móviles.',
  'Dominamos el Código.',
]

const FLOATING_SNIPPETS = [
  { code: 'const app = new TiTuring()',   top: '22%', left: '3%',   delay: 0   },
  { code: 'git push origin main',         top: '65%', left: '2%',   delay: 1.3 },
  { code: 'docker build -t tt-api .',     top: '38%', right: '3%',  delay: 0.8 },
  { code: 'npm run deploy',               top: '72%', right: '4%',  delay: 1.9 },
  { code: '> 200 proyectos entregados',   top: '18%', right: '6%',  delay: 2.2 },
  { code: 'ssh root@server.tituring.com', top: '50%', left: '1%',   delay: 0.4 },
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const typed     = useTypingEffect(TYPING_PHRASES)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]|/\\#@$%&01'
    const fontSize = 13
    const cols   = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 14, 36, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const bright = Math.random() > 0.92
        ctx.fillStyle = bright ? '#06b6d4' : '#1c348055'
        ctx.font = `${fontSize}px "Space Mono", monospace`
        ctx.fillText(char, i * fontSize, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    const interval = setInterval(draw, 55)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-tt-bg"
    >
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-25 pointer-events-none"
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,_#1c348015_0%,_#080e24_70%)] pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-tt-navy/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-tt-cyan/10 blur-[100px] pointer-events-none" />

      {/* Floating code snippets */}
      {FLOATING_SNIPPETS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block font-mono text-xs text-tt-cyan/50
                     bg-tt-navy/20 border border-tt-cyan/15 px-3 py-1.5 rounded
                     backdrop-blur-sm whitespace-nowrap select-none"
          style={{
            top:   s.top,
            left:  'left'  in s ? (s as { left: string }).left  : undefined,
            right: 'right' in s ? (s as { right: string }).right : undefined,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          {s.code}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Floating logo */}
        <motion.img
          src="/assets/tt/1.png"
          alt="Ti Turing"
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-2xl
                     shadow-[0_0_50px_#1c348080]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
        />

        {/* Eyebrow tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-tt-cyan text-sm uppercase tracking-[0.3em] mb-5"
        >
          {'{ Fábrica de Software }'}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-heading text-7xl md:text-9xl font-black
                     uppercase leading-none tracking-tight text-white mb-4"
        >
          TI{' '}
          <span className="text-gradient">TURING</span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="font-mono text-lg md:text-2xl text-white/65 mb-12 min-h-[2rem]"
        >
          <span className="text-tt-green">$ </span>
          <span>{typed}</span>
          <span className="animate-blink text-tt-cyan ml-0.5">▋</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            className="px-8 py-4 bg-tt-navy hover:bg-tt-blue border border-tt-blue/40
                       font-heading text-lg tracking-wider text-white rounded
                       transition-all duration-300 hover:shadow-[0_0_30px_#3b82f650]"
          >
            Ver Servicios
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent hover:bg-tt-cyan/10
                       border border-tt-cyan font-heading text-lg tracking-wider
                       text-tt-cyan rounded transition-all duration-300
                       hover:shadow-[0_0_30px_#06b6d450]"
          >
            Contáctanos
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white/25 text-2xl select-none"
        >
          ↓
        </motion.div>
      </div>
    </section>
  )
}
