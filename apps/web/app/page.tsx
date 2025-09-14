'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { HeroBackground } from '@/components/HeroBackground'
import { StepShowcase } from '@/components/StepShowcase'
import { FeaturesSection } from '@/components/FeaturesSection'
import { WhyChooseSection } from '@/components/WhyChooseSection'
import { FAQSection } from '@/components/FAQSection'
import { Footer } from '@/components/Footer'
import { Typewriter } from 'react-simple-typewriter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-0">
        <HeroBackground />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          
          {/* Heading with typing effect */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Deploy{" "}
            <span className="text-primary">
              <Typewriter
                words={['Instantly', 'Fast', 'On LocalServer']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </motion.h1>

          {/* Longer Subheading */}
          <motion.p 
            className="text-sm md:text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A fast and reliable way to ship your frontend projects.
            Zero setup, instant builds, and effortless deployments —
            so you can focus on building while we handle the rest.
          </motion.p>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/auth"
              className="text-[12px] inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Step Showcase */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Three Simple Steps
            </h2>
            <p className="text-gray-400 text-sm">
              From repo to deployed site in seconds
            </p>
          </motion.div>
          
          <StepShowcase />
        </div>
      </section>

      <FeaturesSection />
      <WhyChooseSection />
      <FAQSection />

      <Footer />
    </div>
  )
}
