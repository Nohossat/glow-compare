import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
