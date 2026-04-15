import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href')!)
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -60 })
        }
      })
    })

    return () => lenis.destroy()
  }, [])
}
