'use client'

import { benefits, MotionDiv } from '@/lib/utils'

export function WhyChooseSection() {
  return (
    <section className="py-16 px-6 bg-surface/20">
      <div className="max-w-4xl mx-auto">
        <MotionDiv
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-3">
            Why Choose Deploy?
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Focus on building great products while we handle the deployment complexity
          </p>
        </MotionDiv>
        
        <div className="grid md:grid-cols-2 gap-8">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Built for Developers</h3>
            <p className="text-gray-400 text-sm mb-4">
              Deploy directly from your Git repository with zero configuration. 
              Our platform automatically detects your framework and optimizes the build process.
            </p>
            <ul className="space-y-2">
              {benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300">
                  <div className="w-1 h-1 bg-primary rounded-full mr-3" />
                  {benefit}
                </li>
              ))}
            </ul>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Enterprise Ready</h3>
            <p className="text-gray-400 text-sm mb-4">
              Scale from prototype to production with confidence. 
              Built-in security, monitoring, and performance optimization.
            </p>
            <ul className="space-y-2">
              {benefits.slice(3).map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300">
                  <div className="w-1 h-1 bg-primary rounded-full mr-3" />
                  {benefit}
                </li>
              ))}
            </ul>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}