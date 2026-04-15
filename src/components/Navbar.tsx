import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const NAV_LINKS = [
  { key: 'nav.home',      href: '#hero'     },
  { key: 'nav.services',  href: '#services' },
  { key: 'nav.techStack', href: '#tech'     },
  { key: 'nav.about',     href: '#about'    },
  { key: 'nav.contact',   href: '#contact'  },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState('#hero')

  const { scrollY } = useScroll()
  const prevScroll   = useState(0)

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = prevScroll[0]
    if (latest > prev && latest > 200) {
      setHidden(true)
      setMenuOpen(false)
    } else {
      setHidden(false)
    }
    prevScroll[0] = latest
    setScrolled(latest > 60)
  })

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )

    NAV_LINKS.forEach(link => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-tt-bg/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo with hover effect */}
        <a
          href="#hero"
          className="flex-shrink-0 group"
          data-cursor-hover
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <img
              src="/assets/tt/1.png"
              alt="Ti Turing"
              className="h-9 w-auto rounded-lg transition-shadow duration-300
                         group-hover:shadow-[0_0_20px_#1c348060]"
            />
          </motion.div>
        </a>

        {/* Desktop links with active indicator */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor-hover
                className={`relative px-4 py-2 font-heading text-[13px] tracking-wider
                           transition-colors duration-200 rounded-md ${
                  active === link.href
                    ? 'text-tt-cyan'
                    : 'text-white/45 hover:text-white/80'
                }`}
              >
                {t(link.key)}
                {/* Active dot */}
                {active === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-tt-cyan"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.a
          href="#contact"
          data-cursor-hover
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg
                     bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08]
                     hover:border-white/[0.15] font-heading text-[13px] tracking-wider
                     text-white/80 hover:text-white transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-tt-green animate-pulse" />
          {t('nav.contactUs')}
        </motion.a>

        {/* Language toggle */}
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
          data-cursor-hover
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                     bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]
                     hover:border-white/[0.12] font-mono text-[11px] tracking-wider
                     text-white/50 hover:text-white/80 transition-all duration-300 uppercase"
        >
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>

        {/* Mobile hamburger - animated */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
          data-cursor-hover
        >
          <div className="flex flex-col gap-1.5">
            <motion.div
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 5 : 0,
              }}
              className="w-5 h-[1.5px] bg-white/70 origin-center"
            />
            <motion.div
              animate={{
                opacity: menuOpen ? 0 : 1,
                scaleX: menuOpen ? 0 : 1,
              }}
              className="w-3.5 h-[1.5px] bg-white/50 origin-left"
            />
            <motion.div
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -5 : 0,
              }}
              className="w-5 h-[1.5px] bg-white/70 origin-center"
            />
          </div>
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-16 bg-tt-bg/95"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 -mt-16">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className={`font-heading text-3xl tracking-wider py-3
                             transition-colors duration-200 ${
                    active === link.href ? 'text-tt-cyan' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {t(link.key)}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6 px-8 py-3 bg-tt-navy/50 border border-tt-blue/30 rounded-lg
                           font-heading text-lg tracking-wider text-tt-cyan"
              >
                {t('nav.contactUs')}
              </motion.a>

              <button
                onClick={() => { i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es'); setMenuOpen(false) }}
                className="mt-4 px-6 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg
                           font-mono text-sm tracking-wider text-white/50 hover:text-white/80
                           transition-all duration-300 uppercase"
              >
                {i18n.language === 'es' ? 'English' : 'Español'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
