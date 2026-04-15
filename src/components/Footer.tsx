const FOOTER_LINKS = ['Servicios', 'Nosotros', 'Contacto']

export default function Footer() {
  return (
    <footer className="bg-tt-dark border-t border-tt-navy/40 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row
                      items-center justify-between gap-6">
        {/* Logo */}
        <a href="#hero">
          <img
            src="/assets/tt/1.png"
            alt="Ti Turing"
            className="h-12 w-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity"
          />
        </a>

        {/* Copyright */}
        <p className="font-mono text-white/25 text-xs text-center">
          © {new Date().getFullYear()} Ti Turing. Todos los derechos reservados.
        </p>

        {/* Quick links */}
        <nav className="flex gap-6">
          {FOOTER_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-heading text-xs tracking-widest text-white/35
                         hover:text-tt-cyan transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom tagline */}
      <div className="text-center mt-8">
        <p className="font-mono text-white/15 text-xs tracking-widest">
          {'{ built with passion & TypeScript }'}
        </p>
      </div>
    </footer>
  )
}
