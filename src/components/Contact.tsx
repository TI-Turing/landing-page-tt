import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiInstagram, FiSend } from 'react-icons/fi'

type FormState = { name: string; email: string; message: string }

const SOCIAL_LINKS = [
  { icon: FiMail,      href: 'mailto:contacto@tituring.com', label: 'Email'     },
  { icon: FiLinkedin,  href: '#',                            label: 'LinkedIn'  },
  { icon: FiGithub,    href: '#',                            label: 'GitHub'    },
  { icon: FiInstagram, href: '#',                            label: 'Instagram' },
]

export default function Contact() {
  const [form, setForm]   = useState<FormState>({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)
  const [busy, setBusy]   = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    // Simulate async — connect to Formspree/EmailJS in production
    setTimeout(() => {
      setBusy(false)
      setSent(true)
    }, 1200)
  }

  const inputClass =
    'w-full bg-tt-dark/80 border border-tt-navy/60 rounded-lg px-4 py-3 text-white ' +
    'placeholder-white/25 font-body text-sm focus:outline-none focus:border-tt-blue/60 ' +
    'transition-colors duration-200'

  return (
    <section id="contact" className="py-24 bg-tt-bg relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[700px] h-[700px] rounded-full bg-tt-navy/20 blur-[140px]
                      pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-tt-cyan text-sm tracking-widest mb-3">
            {'// contacto'}
          </p>
          <h2 className="font-heading text-5xl md:text-6xl text-white leading-tight mb-4">
            HABLEMOS DE TU{' '}
            <span className="text-gradient">PROYECTO</span>
          </h2>
          <p className="font-body text-white/50">
            Estamos listos para construir tu próxima solución tecnológica.
          </p>
        </motion.div>

        {/* Form or success */}
        {!sent ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
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
              rows={5}
              placeholder="Cuéntanos sobre tu proyecto..."
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 py-4
                         bg-tt-navy hover:bg-tt-blue border border-tt-blue/40
                         font-heading text-lg tracking-wider text-white rounded-lg
                         transition-all duration-300 hover:shadow-[0_0_30px_#3b82f640]
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiSend size={18} />
              {busy ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-tt-dark/50 border border-tt-green/30
                       rounded-xl shadow-[0_0_40px_#22c55e15]"
          >
            <p className="font-mono text-tt-green text-4xl mb-3">✓</p>
            <p className="font-heading text-3xl text-white mb-2">Mensaje enviado</p>
            <p className="font-body text-white/50 text-sm">Te contactamos pronto.</p>
          </motion.div>
        )}

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mt-12"
        >
          {SOCIAL_LINKS.map(social => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="p-3 rounded-lg bg-tt-navy/30 border border-tt-navy/50 text-white/40
                         hover:text-tt-cyan hover:border-tt-cyan/40
                         transition-all duration-200 hover:shadow-[0_0_15px_#06b6d430]"
            >
              <social.icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
