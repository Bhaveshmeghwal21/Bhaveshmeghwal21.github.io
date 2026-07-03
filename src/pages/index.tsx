import Head from 'next/head'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import HomeHero from '@/components/sections/HomeHero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ProfileSummary from '@/components/sections/ProfileSummary'
import WritingPreview from '@/components/sections/WritingPreview'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bhavesh Meghwal | Robotics, AI, and product systems</title>
      </Head>

      <SiteNav />

      <main>
        <HomeHero />
        <FeaturedProjects />
        <ProfileSummary />
        <WritingPreview />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  )
}
