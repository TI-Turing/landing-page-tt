import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Inicio',     href: '#hero'     },
  { label: 'Servicios',  href: '#services' },
  { label: 'Tech Stack', href: '#tech'     },
  { label: 'Nosotros',   href: '#about'    },
  { label: 'Contacto',   href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-tt-bg/95 backdrop-blur-md border-b border-tt-navy/40 shadow-lg shadow-tt-navy/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex-shrink-0">
          <img
            src="/assets/tt/1.png"
            alt="Ti Turing"
            className="h-10 w-auto rounded-lg"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-sm tracking-widest text-white/60
                           hover:text-tt-cyan transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2 rounded
                     bg-tt-navy hover:bg-tt-blue border border-tt-blue/30
                     font-heading text-sm tracking-wider text-white
                     transition-all duration-200 hover:shadow-[0_0_18px_#3b82f650]"
        >
          Contáctanos
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden text-white/80 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <span className="font-mono text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-tt-bg/98 backdrop-blur-md border-t border-tt-navy/40 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 font-heading text-sm tracking-widest
                             text-white/60 hover:text-tt-cyan border-b border-tt-navy/20
                             transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block mt-4 py-3 text-center bg-tt-navy hover:bg-tt-blue
                           font-heading text-sm tracking-wider text-white rounded
                           transition-colors duration-200"
              >
                Contáctanos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
