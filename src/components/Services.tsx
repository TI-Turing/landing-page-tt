import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  FiCode, FiSmartphone, FiShield, FiCpu, FiMessageSquare, FiCheckCircle,
} from 'react-icons/fi'
import { useSplitTextReveal } from '@/hooks/useTextReveal'
import { useTranslation } from 'react-i18next'

type Service = {
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  i18nKey: string
  glow: string
  number: string
}

const SERVICES: Service[] = [
  {
    icon: FiCode,
    i18nKey: 'webDev',
    glow: '#3b82f6',
    number: '01',
  },
  {
    icon: FiSmartphone,
    i18nKey: 'mobileApps',
    glow: '#06b6d4',
    number: '02',
  },
  {
    icon: FiShield,
    i18nKey: 'cybersecurity',
    glow: '#06b6d4',
    number: '03',
  },
  {
    icon: FiCpu,
    i18nKey: 'customSoftware',
    glow: '#22c55e',
    number: '04',
  },
  {
    icon: FiMessageSquare,
    i18nKey: 'techConsulting',
    glow: '#3b82f6',
    number: '05',
  },
  {
    icon: FiCheckCircle,
    i18nKey: 'qaTesting',
    glow: '#22c55e',
    number: '06',
  },
]

// 3D Tilt card component
function TiltCard({ svc, index }: { svc: Service; index: number }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareOpacity = useMotionValue(0)

  const springRX = useSpring(rotateX, { damping: 20, stiffness: 200 })
  const springRY = useSpring(rotateY, { damping: 20, stiffness: 200 })

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      rotateX.set((y - 0.5) * -12)
      rotateY.set((x - 0.5) * 12)
      glareX.set(x * 100)
      glareY.set(y * 100)
      glareOpacity.set(0.12)
    },
    [rotateX, rotateY, glareX, glareY, glareOpacity]
  )

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    glareOpacity.set(0)
  }, [rotateX, rotateY, glareOpacity])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 800,
      }}
      className="relative group cursor-default"
    >
      <div
        className="relative h-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8
                   transition-colors duration-500 hover:border-white/[0.12]
                   hover:bg-white/[0.04] overflow-hidden"
      >
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            opacity: glareOpacity,
          }}
        />

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${svc.glow}30, 0 0 30px ${svc.glow}10`,
          }}
        />

        {/* Number watermark */}
        <span className="absolute top-4 right-6 font-heading text-6xl font-black text-white/[0.03]
                         group-hover:text-white/[0.06] transition-colors duration-500">
          {svc.number}
        </span>

        {/* Icon */}
        <div
          className="inline-flex p-3.5 rounded-xl mb-6 transition-all duration-500 relative"
          style={{
            background: `${svc.glow}10`,
            boxShadow: `0 0 0 1px ${svc.glow}15`,
          }}
        >
          <svc.icon
            size={24}
            className="transition-colors duration-300"
            style={{ color: svc.glow }}
          />
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl text-white mb-1.5 tracking-wide">
          {t(`services.items.${svc.i18nKey}.title`)}
        </h3>

        {/* Tag */}
        <p className="font-mono text-[10px] text-white/25 mb-4 tracking-wider uppercase">
          {t(`services.items.${svc.i18nKey}.tag`)}
        </p>

        {/* Description */}
        <p className="font-body text-white/40 text-sm leading-relaxed group-hover:text-white/55
                      transition-colors duration-500">
          {t(`services.items.${svc.i18nKey}.desc`)}
        </p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-8 right-8 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${svc.glow}40, transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.08, duration: 0.8 }}
        />
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const { ref: headingRef, isVisible } = useSplitTextReveal()

  return (
    <section id="services" className="py-32 bg-tt-bg relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Section gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-navy/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-tt-cyan/60 text-xs tracking-[0.4em] uppercase mb-4"
          >
            {t('services.eyebrow')}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isVisible ? { y: '0%' } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-none"
            >
              {t('services.titlePart1')}{' '}
              <span className="text-gradient">{t('services.titleHighlight')}</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-body text-white/30 text-sm mt-5 max-w-md mx-auto"
          >
            {t('services.subtitle')}
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <TiltCard key={svc.i18nKey} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
