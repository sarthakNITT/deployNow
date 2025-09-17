'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { MotionDiv } from '@/lib/utils'

const faqs = [
  {
    question: 'How fast are deployments?',
    answer: 'Most deployments complete in under 30 seconds. Build times vary based on your project size and complexity.'
  },
  {
    question: 'What frameworks are supported?',
    answer: 'We support all major frontend frameworks including React, Vue, Angular, Svelte, and static sites.'
  },
  {
    question: 'Can I use custom domains?',
    answer: 'Yes, you can connect custom domains with automatic HTTPS certificates included at no extra cost.'
  },
  {
    question: 'Is there a free tier?',
    answer: 'Yes, our free tier includes unlimited personal projects with generous bandwidth and build minutes.'
  },
  {
    question: 'How do I rollback deployments?',
    answer: 'Every deployment is versioned. You can instantly rollback to any previous version with one click.'
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <MotionDiv
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm">
            Everything you need to know about our platform
          </p>
        </MotionDiv>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <MotionDiv
              key={index}
              className="border border-border rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-surface/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-sm font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <MotionDiv
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 text-sm text-gray-400 border-t border-border pt-3">
                      {faq.answer}
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}