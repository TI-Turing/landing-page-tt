import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { useSplitTextReveal } from '@/hooks/useTextReveal'

type Stat = {
  value: number
  suffix: string
  label: string
  icon: string
}

const STATS: Stat[] = [
  { value: 200, suffix: '+', label: 'Proyectos\nentregados', icon: '{}' },
  { value: 5,   suffix: '+', label: 'Años de\nexperiencia',  icon: '>_' },
  { value: 50,  suffix: '+', label: 'Clientes\nsatisfechos', icon: '<>' },
  { value: 16,  suffix: '+', label: 'Tecnologías\ndominadas', icon: '//' },
]

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { count, elRef } = useCountUp(stat.value, 2500)

  return (
    <motion.div
      ref={elRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8
                 hover:border-white/[0.12] hover:bg-white/[0.04]
                 transition-all duration-500 group overflow-hidden"
    >
      {/* Background code icon */}
      <span className="absolute top-3 right-4 font-mono text-3xl text-white/[0.03]
                       group-hover:text-white/[0.06] transition-colors duration-500">
        {stat.icon}
      </span>

      <p className="font-heading text-5xl md:text-6xl font-black text-white mb-2 relative z-10">
        {count}
        <span className="text-tt-cyan">{stat.suffix}</span>
      </p>
      <p className="font-body text-white/35 text-sm leading-snug whitespace-pre-line
                    group-hover:text-white/50 transition-colors duration-500">
        {stat.label}
      </p>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-tt-cyan/30 via-tt-blue/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const { ref: headingRef, isVisible } = useSplitTextReveal()

  return (
    <section id="about" ref={containerRef} className="py-32 bg-tt-bg relative overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-navy/30 to-transparent" />

      {/* Floating gradient orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-tt-navy/15 blur-[140px] pointer-events-none"
        style={{ y: parallaxY, top: '10%', right: '-10%' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left: story */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-tt-cyan/60 text-xs tracking-[0.4em] uppercase mb-5"
            >
              {'// nosotros'}
            </motion.p>

            <div ref={headingRef} className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: '100%' }}
                animate={isVisible ? { y: '0%' } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-[0.9]"
              >
                UNA{' '}
                <span className="text-gradient">FÁBRICA</span>
                <br />
                DE SOFTWARE
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="font-body text-white/45 leading-relaxed mb-5 text-base">
                Ti Turing es una empresa de desarrollo de software fundada con la misión
                de construir soluciones tecnológicas de alta calidad que impulsen el
                crecimiento de empresas y emprendimientos.
              </p>
              <p className="font-body text-white/45 leading-relaxed text-base mb-10">
                Combinamos metodologías ágiles con tecnologías de vanguardia para
                entregar productos que no solo funcionan — sino que escalan, perduran
                y generan impacto real.
              </p>
            </motion.div>

            {/* Feature tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {['Metodología Ágil', 'Código Escalable', 'Seguridad First', 'Innovación', 'A tu Medida'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="font-mono text-[10px] text-white/30 border border-white/[0.08]
                             bg-white/[0.02] px-3 py-1.5 rounded-full tracking-wider
                             hover:border-tt-cyan/30 hover:text-tt-cyan/50 transition-all duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Logo wordmark */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <img
                src="/assets/tt/5.png"
                alt="Ti Turing — A IT Company"
                className="h-16 w-auto opacity-60 hover:opacity-80 transition-opacity duration-300"
              />
            </motion.div>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-4 lg:mt-16">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}

            {/* Bottom CTA card */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="col-span-2 bg-gradient-to-r from-tt-navy/30 to-tt-blue/10
                         border border-white/[0.06] rounded-2xl p-6 flex items-center
                         justify-between group hover:border-white/[0.12]
                         transition-all duration-500"
              data-cursor-hover
            >
              <div>
                <p className="font-heading text-lg text-white">Hablemos de tu proyecto</p>
                <p className="font-body text-white/30 text-sm">Estamos listos para empezar.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08]
                              flex items-center justify-center group-hover:bg-tt-blue/20
                              group-hover:border-tt-blue/30 transition-all duration-300">
                <svg className="w-4 h-4 text-white/40 group-hover:text-white transition-colors"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
