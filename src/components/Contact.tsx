import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiInstagram, FiArrowUpRight } from 'react-icons/fi'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useSplitTextReveal } from '@/hooks/useTextReveal'

type FormState = { name: string; email: string; message: string }

const SOCIAL_LINKS = [
  { icon: FiMail,      href: 'mailto:contacto@tituring.com', label: 'Email',     handle: 'contacto@tituring.com' },
  { icon: FiLinkedin,  href: '#',                            label: 'LinkedIn',  handle: '/tituring' },
  { icon: FiGithub,    href: '#',                            label: 'GitHub',    handle: '@tituring' },
  { icon: FiInstagram, href: '#',                            label: 'Instagram', handle: '@tituring' },
]

function MagneticSocialLink({ social }: { social: typeof SOCIAL_LINKS[0] }) {
  const { ref, springX, springY } = useMagnetic(0.3)

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
    >
      <a
        href={social.href}
        aria-label={social.label}
        className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02]
                   border border-white/[0.06] hover:border-white/[0.12]
                   hover:bg-white/[0.04] transition-all duration-300"
        data-cursor-hover
      >
        <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06]
                        flex items-center justify-center group-hover:border-tt-cyan/30
                        transition-all duration-300">
          <social.icon size={18} className="text-white/40 group-hover:text-tt-cyan transition-colors duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading text-sm text-white/70 group-hover:text-white transition-colors duration-300">
            {social.label}
          </p>
          <p className="font-mono text-[10px] text-white/25 truncate">{social.handle}</p>
        </div>
        <FiArrowUpRight size={14} className="text-white/15 group-hover:text-white/40
                                              group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                                              transition-all duration-300" />
      </a>
    </motion.div>
  )
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const { ref: headingRef, isVisible } = useSplitTextReveal()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setSent(true)
    }, 1200)
  }

  const inputClass =
    'w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white ' +
    'placeholder-white/20 font-body text-sm focus:outline-none focus:border-tt-blue/40 ' +
    'focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(59,130,246,0.08)] ' +
    'transition-all duration-300'

  return (
    <section id="contact" className="py-32 bg-tt-dark relative overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-navy/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[800px] rounded-full bg-tt-navy/15 blur-[150px]
                      pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-tt-cyan/60 text-xs tracking-[0.4em] uppercase mb-4"
          >
            {'// contacto'}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isVisible ? { y: '0%' } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-none"
            >
              HABLEMOS DE TU{' '}
              <span className="text-gradient">PROYECTO</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-body text-white/30 text-sm mt-5 max-w-md mx-auto"
          >
            Estamos listos para construir tu próxima solución tecnológica.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form (3 cols) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <textarea
                  required
                  name="message"
                  rows={6}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
                <motion.button
                  type="submit"
                  disabled={busy}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  data-cursor-hover
                  className="w-full flex items-center justify-center gap-3 py-4
                             bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08]
                             hover:border-white/[0.15] font-heading text-base tracking-wider
                             text-white rounded-xl transition-all duration-300
                             hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {busy ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full"
                    />
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full min-h-[300px] flex flex-col items-center justify-center
                           bg-white/[0.02] border border-tt-green/20 rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-tt-green/10 border border-tt-green/30
                             flex items-center justify-center mb-6"
                >
                  <span className="text-tt-green text-2xl">&#10003;</span>
                </motion.div>
                <p className="font-heading text-2xl text-white mb-2">Mensaje enviado</p>
                <p className="font-body text-white/40 text-sm">Te contactamos pronto.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Social links (2 cols) */}
          <motion.div
            className="lg:col-span-2 space-y-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase mb-4 pl-1">
              También puedes encontrarnos en
            </p>
            {SOCIAL_LINKS.map(social => (
              <MagneticSocialLink key={social.label} social={social} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
