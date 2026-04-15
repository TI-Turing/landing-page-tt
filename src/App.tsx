import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Preloader      from '@/components/Preloader'
import CustomCursor   from '@/components/CustomCursor'
import NoiseOverlay   from '@/components/NoiseOverlay'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar         from '@/components/Navbar'
import Hero           from '@/components/Hero'
import Services       from '@/components/Services'
import TechStack      from '@/components/TechStack'
import About          from '@/components/About'
import Contact        from '@/components/Contact'
import Footer         from '@/components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useSmoothScroll()

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />

      <main className="overflow-x-hidden bg-tt-bg cursor-none">
        <Navbar />
        <Hero />
        <Services />
        <TechStack />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
