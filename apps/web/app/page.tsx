'use client'

import { LandingHeader } from '@/components/LandingHeader'
import { FeaturesSection } from '@/components/FeaturesSection'
import { WhyChooseSection } from '@/components/WhyChooseSection'
import { FAQSection } from '@/components/FAQSection'
import { Footer } from '@/components/Footer'
import HeroSection from '@/components/section/hero_section'
import StepShowcaseSection from '@/components/step_showcase_section'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative">
      <LandingHeader />
      
      <HeroSection/>
      <StepShowcaseSection/>
      <FeaturesSection />
      <WhyChooseSection />
      <FAQSection />

      <Footer />
    </div>
  )
}
