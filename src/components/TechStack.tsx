import { motion } from 'framer-motion'
import {
  SiReact, SiAngular, SiVuedotjs, SiNodedotjs, SiPython,
  SiDocker, SiPostgresql, SiMongodb, SiFlutter,
  SiTypescript, SiKubernetes, SiFirebase, SiDjango,
  SiNestjs, SiGithubactions,
} from 'react-icons/si'
import { FiCloud } from 'react-icons/fi'

type Tech = {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>
  name: string
  color: string
}

const TECHS: Tech[] = [
  { icon: SiReact,              name: 'React',        color: '#61dafb' },
  { icon: SiAngular,            name: 'Angular',      color: '#dd0031' },
  { icon: SiVuedotjs,           name: 'Vue.js',       color: '#42b883' },
  { icon: SiNodedotjs,          name: 'Node.js',      color: '#339933' },
  { icon: SiPython,             name: 'Python',       color: '#3776ab' },
  { icon: SiTypescript,         name: 'TypeScript',   color: '#3178c6' },
  { icon: SiDocker,             name: 'Docker',       color: '#2496ed' },
  { icon: SiKubernetes,         name: 'Kubernetes',   color: '#326ce5' },
  { icon: FiCloud,              name: 'AWS',          color: '#ff9900' },
  { icon: SiPostgresql,         name: 'PostgreSQL',   color: '#336791' },
  { icon: SiMongodb,            name: 'MongoDB',      color: '#47a248' },
  { icon: SiFlutter,            name: 'Flutter',      color: '#54c5f8' },
  { icon: SiFirebase,           name: 'Firebase',     color: '#ffca28' },
  { icon: SiDjango,             name: 'Django',       color: '#44b78b' },
  { icon: SiNestjs,             name: 'NestJS',       color: '#e0234e' },
  { icon: SiGithubactions,      name: 'CI/CD',        color: '#2088ff' },
]

// Duplicate for seamless infinite marquee
const ROW1 = [...TECHS, ...TECHS]
const ROW2 = [...TECHS].reverse().concat([...TECHS].reverse())

function TechPill({ tech }: { tech: Tech }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-3 rounded-full flex-shrink-0
                 bg-tt-navy/25 border border-tt-navy/50
                 hover:border-tt-blue/40 hover:bg-tt-navy/50
                 transition-all duration-200 cursor-default group"
    >
      <tech.icon
        size={20}
        style={{ color: tech.color }}
        className="group-hover:scale-110 transition-transform duration-200"
      />
      <span className="font-heading text-sm tracking-wider text-white/60
                       group-hover:text-white transition-colors duration-200">
        {tech.name}
      </span>
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="tech" className="py-24 bg-tt-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-tt-green text-sm tracking-widest mb-3">
            {'// tecnologías'}
          </p>
          <h2 className="font-heading text-5xl md:text-7xl text-white leading-none">
            NUESTRO{' '}
            <span className="text-tt-green">STACK</span>
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — left to right */}
      <div className="flex overflow-hidden mb-5">
        <div className="flex gap-4 animate-marquee">
          {ROW1.map((tech, i) => (
            <TechPill key={`r1-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="flex overflow-hidden">
        <div className="flex gap-4 animate-marquee-rev">
          {ROW2.map((tech, i) => (
            <TechPill key={`r2-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  )
}
