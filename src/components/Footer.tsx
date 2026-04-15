import { motion } from 'framer-motion'

const FOOTER_LINKS = [
  { label: 'Servicios', href: '#services'  },
  { label: 'Stack',     href: '#tech'      },
  { label: 'Nosotros',  href: '#about'     },
  { label: 'Contacto',  href: '#contact'   },
]

export default function Footer() {
  return (
    <footer className="bg-tt-bg relative overflow-hidden">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Big CTA banner */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-mono text-white/15 text-xs tracking-[0.3em] uppercase mb-6">
            {'// ready to build?'}
          </p>
          <h3 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white leading-none mb-8">
            CONSTRUYAMOS{' '}
            <span className="text-gradient">ALGO GRANDE</span>
          </h3>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/[0.06]
                       hover:bg-white/[0.1] border border-white/[0.08]
                       hover:border-white/[0.15] rounded-xl font-heading text-base
                       tracking-wider text-white transition-all duration-300
                       hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]"
          >
            <span className="w-2 h-2 rounded-full bg-tt-green animate-pulse" />
            Iniciar Proyecto
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row
                        items-center justify-between gap-6">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group" data-cursor-hover>
            <img
              src="/assets/tt/1.png"
              alt="Ti Turing"
              className="h-8 w-auto rounded-md opacity-60 group-hover:opacity-80 transition-opacity duration-300"
            />
            <span className="font-heading text-xs tracking-wider text-white/25
                             group-hover:text-white/40 transition-colors duration-300">
              TI TURING
            </span>
          </a>

          {/* Links */}
          <nav className="flex gap-8">
            {FOOTER_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                data-cursor-hover
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20
                           hover:text-white/50 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-mono text-white/15 text-[10px] tracking-wider">
            &copy; {new Date().getFullYear()} Ti Turing
          </p>
        </div>
      </div>
    </footer>
  )
}
