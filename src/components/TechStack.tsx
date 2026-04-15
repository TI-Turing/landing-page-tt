import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiReact, SiAngular, SiVuedotjs, SiNodedotjs, SiPython,
  SiDocker, SiPostgresql, SiMongodb, SiFlutter,
  SiTypescript, SiKubernetes, SiFirebase, SiDjango,
  SiNestjs, SiGithubactions, SiTailwindcss, SiNextdotjs, SiGo,
} from 'react-icons/si'
import { FiCloud } from 'react-icons/fi'
import { useSplitTextReveal } from '@/hooks/useTextReveal'

type Tech = {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>
  name: string
  color: string
  category: 'frontend' | 'backend' | 'devops' | 'mobile'
}

const TECHS: Tech[] = [
  { icon: SiReact,          name: 'React',       color: '#61dafb', category: 'frontend' },
  { icon: SiAngular,        name: 'Angular',     color: '#dd0031', category: 'frontend' },
  { icon: SiVuedotjs,       name: 'Vue.js',      color: '#42b883', category: 'frontend' },
  { icon: SiNextdotjs,      name: 'Next.js',     color: '#ffffff', category: 'frontend' },
  { icon: SiTailwindcss,    name: 'Tailwind',    color: '#38bdf8', category: 'frontend' },
  { icon: SiTypescript,     name: 'TypeScript',  color: '#3178c6', category: 'frontend' },
  { icon: SiNodedotjs,      name: 'Node.js',     color: '#339933', category: 'backend'  },
  { icon: SiPython,         name: 'Python',      color: '#3776ab', category: 'backend'  },
  { icon: SiDjango,         name: 'Django',      color: '#44b78b', category: 'backend'  },
  { icon: SiNestjs,         name: 'NestJS',      color: '#e0234e', category: 'backend'  },
  { icon: SiGo,             name: 'Go',          color: '#00add8', category: 'backend'  },
  { icon: SiPostgresql,     name: 'PostgreSQL',  color: '#336791', category: 'backend'  },
  { icon: SiMongodb,        name: 'MongoDB',     color: '#47a248', category: 'backend'  },
  { icon: SiDocker,         name: 'Docker',      color: '#2496ed', category: 'devops'   },
  { icon: SiKubernetes,     name: 'Kubernetes',  color: '#326ce5', category: 'devops'   },
  { icon: FiCloud,          name: 'AWS',         color: '#ff9900', category: 'devops'   },
  { icon: SiGithubactions,  name: 'CI/CD',       color: '#2088ff', category: 'devops'   },
  { icon: SiFirebase,       name: 'Firebase',    color: '#ffca28', category: 'devops'   },
  { icon: SiFlutter,        name: 'Flutter',     color: '#54c5f8', category: 'mobile'   },
  { icon: SiReact,          name: 'React Native',color: '#61dafb', category: 'mobile'   },
]

const CATEGORIES = [
  { key: 'all',      label: 'Todas' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend' },
  { key: 'devops',   label: 'DevOps' },
  { key: 'mobile',   label: 'Mobile' },
]

// Marquee row
const MARQUEE_ITEMS = [...TECHS, ...TECHS]

function MarqueePill({ tech }: { tech: Tech }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-full flex-shrink-0
                 bg-white/[0.03] border border-white/[0.06]
                 hover:border-white/[0.12] hover:bg-white/[0.06]
                 transition-all duration-300 cursor-default group"
    >
      <tech.icon
        size={16}
        style={{ color: tech.color }}
        className="group-hover:scale-110 transition-transform duration-200"
      />
      <span className="font-heading text-xs tracking-wider text-white/50
                       group-hover:text-white/80 transition-colors duration-200">
        {tech.name}
      </span>
    </div>
  )
}

// Interactive grid card
function TechCard({ tech, index }: { tech: Tech; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl
                 p-5 flex flex-col items-center gap-3 hover:border-white/[0.12]
                 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
      data-cursor-hover
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 30px ${tech.color}15, inset 0 0 0 1px ${tech.color}20`,
        }}
      />

      <tech.icon
        size={28}
        style={{ color: tech.color }}
        className="group-hover:scale-110 transition-transform duration-300 relative z-10"
      />
      <span className="font-heading text-xs tracking-wider text-white/50
                       group-hover:text-white/80 transition-colors duration-300 relative z-10">
        {tech.name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  const [filter, setFilter] = useState('all')
  const { ref: headingRef, isVisible } = useSplitTextReveal()

  const filtered = filter === 'all' ? TECHS : TECHS.filter(t => t.category === filter)

  return (
    <section id="tech" className="py-32 bg-tt-dark relative overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-navy/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-tt-green/60 text-xs tracking-[0.4em] uppercase mb-4"
          >
            {'// tecnologías'}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isVisible ? { y: '0%' } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-none"
            >
              NUESTRO{' '}
              <span className="text-tt-green">STACK</span>
            </motion.h2>
          </div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              data-cursor-hover
              className={`px-5 py-2 rounded-full font-heading text-xs tracking-wider
                         transition-all duration-300 border ${
                filter === cat.key
                  ? 'bg-white/[0.08] border-white/[0.15] text-white'
                  : 'bg-transparent border-white/[0.06] text-white/35 hover:text-white/60 hover:border-white/[0.1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Interactive grid */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 mb-20"
        >
          <AnimatePresence>
            {filtered.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Infinite marquee at bottom */}
      <div className="space-y-3 opacity-40">
        <div className="flex overflow-hidden">
          <div className="flex gap-3 animate-marquee">
            {MARQUEE_ITEMS.map((tech, i) => (
              <MarqueePill key={`r1-${i}`} tech={tech} />
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex gap-3 animate-marquee-rev">
            {MARQUEE_ITEMS.reverse().map((tech, i) => (
              <MarqueePill key={`r2-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
