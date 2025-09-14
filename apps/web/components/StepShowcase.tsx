'use client'

import { motion } from 'framer-motion'
import { Upload, CheckCircle, Globe, ArrowDown } from 'lucide-react'
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
    <div className="space-y-16">
        {steps.map((step, index) => (
          <div key={step.title}>
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Step info */}
              <div className={`flex-1 text-center lg:text-left ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/20 rounded mb-3">
                  <step.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto lg:mx-0">{step.description}</p>
              </div>
              
              {/* Screenshot */}
              <div className={`flex-1 max-w-md ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="bg-surface/50 rounded-lg border border-border overflow-hidden">
                  <DashboardScreenshot type={step.screenshot as 'upload' | 'success' | 'deploy'} />
                </div>
              </div>
            </motion.div>
            
            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <motion.div 
                className="flex justify-center my-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <ArrowDown className="w-4 h-4 text-gray-600" />
              </motion.div>
            )}
          </div>
        ))}
    </div>
  )
}