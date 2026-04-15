import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

type Stat = {
  value: number
  suffix: string
  label: string
  color: string
}

const STATS: Stat[] = [
  { value: 200, suffix: '+', label: 'Proyectos entregados', color: 'text-tt-blue'  },
  { value: 5,   suffix: '+', label: 'Años de experiencia',  color: 'text-tt-cyan'  },
  { value: 50,  suffix: '+', label: 'Clientes satisfechos', color: 'text-tt-green' },
  { value: 16,  suffix: '+', label: 'Tecnologías dominadas',color: 'text-tt-blue'  },
]

function StatCard({ stat }: { stat: Stat }) {
  const { count, elRef } = useCountUp(stat.value, 2200)

  return (
    <div
      ref={elRef}
      className="bg-tt-bg/70 border border-tt-navy/50 rounded-xl p-8 text-center
                 hover:border-tt-blue/30 transition-all duration-300
                 hover:shadow-[0_0_30px_#1c348030]"
    >
      <p className={`font-heading text-5xl md:text-6xl font-black mb-2 ${stat.color}`}>
        {count}{stat.suffix}
      </p>
      <p className="font-body text-white/50 text-sm leading-snug">{stat.label}</p>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-tt-dark relative overflow-hidden">
      {/* Decorative diagonal stripe */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6 0, #3b82f6 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-tt-cyan text-sm tracking-widest mb-4">
              {'// nosotros'}
            </p>
            <h2 className="font-heading text-5xl md:text-6xl text-white uppercase leading-tight mb-6">
              UNA{' '}
              <span className="text-gradient">FÁBRICA</span>
              <br />
              DE SOFTWARE
            </h2>
            <p className="font-body text-white/60 leading-relaxed mb-4 text-lg">
              Ti Turing es una empresa de desarrollo de software fundada con la misión
              de construir soluciones tecnológicas de alta calidad que impulsen el
              crecimiento de empresas y emprendimientos.
            </p>
            <p className="font-body text-white/60 leading-relaxed text-lg mb-8">
              Combinamos metodologías ágiles con tecnologías de vanguardia para
              entregar productos que no solo funcionan — sino que escalan, perduran
              y generan impacto real.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              {['Ágil', 'Escalable', 'Seguro', 'Innovador', 'A medida'].map(tag => (
                <span
                  key={tag}
                  className="font-mono text-xs text-tt-cyan border border-tt-cyan/30
                             bg-tt-cyan/10 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Logo wordmark */}
            <img
              src="/assets/tt/5.png"
              alt="Ti Turing — A IT Company"
              className="h-20 w-auto opacity-85"
            />
          </motion.div>

          {/* Right: stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-5"
          >
            {STATS.map(stat => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
