import Head from 'next/head'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import Preloader from '@/components/motion/Preloader'
import HomeHero from '@/components/sections/HomeHero'
import FlightPath from '@/components/sections/FlightPath'
import StatsBand from '@/components/sections/StatsBand'
import ProjectsHorizontal from '@/components/sections/ProjectsHorizontal'
import FocusStack from '@/components/sections/FocusStack'
import AboutScrub from '@/components/sections/AboutScrub'
import WritingPreview from '@/components/sections/WritingPreview'
import ContactSection from '@/components/sections/ContactSection'
import AltitudeHUD from '@/components/ui/AltitudeHUD'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bhavesh Meghwal | Robotics, AI, and product systems</title>
      </Head>

      <Preloader />
      <SiteNav />

      <main>
        <HomeHero />
        <FlightPath />
        <StatsBand />
        <ProjectsHorizontal />
        <FocusStack />
        <AboutScrub />
        <WritingPreview />
        <ContactSection />
      </main>

      <SiteFooter />
      <AltitudeHUD />
    </>
  )
}
