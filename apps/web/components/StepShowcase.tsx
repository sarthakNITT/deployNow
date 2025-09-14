'use client'

import { motion } from 'framer-motion'
import { Upload, CheckCircle, Globe } from 'lucide-react'
import { DashboardScreenshot } from './DashboardScreenshot'

const steps = [
  {
    title: 'Upload Repository',
    description: 'Connect your GitHub repo with a simple URL',
    icon: Upload,
    screenshot: 'upload'
  },
  {
    title: 'Build & Process',
    description: 'We automatically build and optimize your project',
    icon: CheckCircle,
    screenshot: 'success'
  },
  {
    title: 'Deploy Live',
    description: 'Get a live URL to share your project instantly',
    icon: Globe,
    screenshot: 'deploy'
  }
]

export function StepShowcase() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Moving container */}
      <motion.div
        className="flex gap-8"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: 20,   // speed (bigger = slower)
          ease: 'linear'
        }}
      >
        {/* Duplicate steps so loop looks seamless */}
        {[...steps, ...steps].map((step, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 flex flex-col items-center text-center"
          >
            {/* Screenshot */}
            <div className="w-full bg-surface/50 rounded-lg border border-border overflow-hidden mb-4">
              <DashboardScreenshot type={step.screenshot as 'upload' | 'success' | 'deploy'} />
            </div>

            {/* Info */}
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/20 rounded mb-3">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
