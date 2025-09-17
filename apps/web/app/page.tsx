'use client'

import { LandingHeader } from '@/components/LandingHeader'
import { FeaturesSection } from '@/components/section/FeaturesSection'
import { WhyChooseSection } from '@/components/section/WhyChooseSection'
import { FAQSection } from '@/components/section/FAQSection'
import { Footer } from '@/components/Footer'
import HeroSection from '@/components/section/hero_section'
import StepShowcaseSection from '@/components/section/step_showcase_section'

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
