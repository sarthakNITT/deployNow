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


export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <HeroBackground />
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Deploy Instantly
          </motion.h1>
          
          <motion.p 
            className="text-sm md:text-base text-gray-400 mb-6 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Simple deployment platform for your frontend projects.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/auth"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Step Showcase */}
      <section className="py-16 px-6">
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