import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bhavesh Meghwal - Aerial Robotics Engineer | PX4 Developer</title>
      </Head>

      {/* Particle Background - Fixed position */}
      <ParticleBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navbar is now wrapped by ThemeProvider in _app.tsx */}
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}
