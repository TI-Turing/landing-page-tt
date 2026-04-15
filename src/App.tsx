import Navbar    from '@/components/Navbar'
import Hero      from '@/components/Hero'
import Services  from '@/components/Services'
import TechStack from '@/components/TechStack'
import About     from '@/components/About'
import Contact   from '@/components/Contact'
import Footer    from '@/components/Footer'

export default function App() {
  return (
    <main className="overflow-x-hidden bg-tt-bg">
      <Navbar />
      <Hero />
      <Services />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
