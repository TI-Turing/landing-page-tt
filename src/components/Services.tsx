import { motion } from 'framer-motion'
import {
  FiCode, FiSmartphone, FiShield, FiCpu, FiMessageSquare, FiCheckCircle,
} from 'react-icons/fi'

type Service = {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  desc: string
  glow: string
  tag: string
}

const SERVICES: Service[] = [
  {
    icon: FiCode,
    title: 'Desarrollo Web',
    desc: 'Aplicaciones web modernas, SPAs y sistemas enterprise con React, Vue, Angular y Node.js.',
    glow: '#3b82f6',
    tag: 'frontend · backend · fullstack',
  },
  {
    icon: FiSmartphone,
    title: 'Apps Móviles',
    desc: 'Apps nativas y cross-platform para iOS y Android con React Native y Flutter.',
    glow: '#06b6d4',
    tag: 'iOS · Android · cross-platform',
  },
  {
    icon: FiShield,
    title: 'Ciberseguridad',
    desc: 'Auditorías, pentesting, hardening y protección de infraestructura crítica.',
    glow: '#06b6d4',
    tag: 'pentest · auditoría · hardening',
  },
  {
    icon: FiCpu,
    title: 'Software a Medida',
    desc: 'Sistemas ERP, CRM y plataformas SaaS diseñadas exactamente para tu negocio.',
    glow: '#22c55e',
    tag: 'ERP · CRM · SaaS',
  },
  {
    icon: FiMessageSquare,
    title: 'Consultoría Tech',
    desc: 'Arquitectura de soluciones, migración cloud, optimización y estrategia digital.',
    glow: '#3b82f6',
    tag: 'cloud · arquitectura · estrategia',
  },
  {
    icon: FiCheckCircle,
    title: 'QA & Testing',
    desc: 'Testing manual, automatizado, E2E y de performance para software confiable.',
    glow: '#22c55e',
    tag: 'E2E · automatización · performance',
  },
]

const cardVariants = {
  hidden:   { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-tt-dark relative overflow-hidden">
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#3b82f620 1px, transparent 1px), linear-gradient(90deg, #3b82f620 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="font-mono text-tt-cyan text-sm tracking-widest mb-3">
            {'// nuestros servicios'}
          </p>
          <h2 className="font-heading text-5xl md:text-7xl text-white leading-none">
            LO QUE{' '}
            <span className="text-gradient">HACEMOS</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: `0 24px 48px ${svc.glow}20, 0 0 0 1px ${svc.glow}35`,
                transition: { duration: 0.25 },
              }}
              className="bg-tt-bg/60 border border-tt-navy/50 rounded-xl p-8
                         cursor-default group transition-colors duration-300
                         hover:border-white/10 hover:bg-tt-navy/15"
            >
              {/* Icon */}
              <div className="inline-flex p-3 rounded-lg bg-tt-navy/40 mb-5
                              group-hover:bg-tt-navy/70 transition-colors duration-300">
                <svc.icon
                  size={26}
                  className="text-tt-cyan group-hover:text-white transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl text-white mb-2">{svc.title}</h3>

              {/* Tag */}
              <p className="font-mono text-xs text-tt-cyan/50 mb-4">{svc.tag}</p>

              {/* Description */}
              <p className="font-body text-white/55 text-sm leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
