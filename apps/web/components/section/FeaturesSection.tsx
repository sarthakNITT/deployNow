'use client'

import { features, MotionDiv } from '@/lib/utils'

export function FeaturesSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <MotionDiv
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-3">
            Everything You Need
          </h2>
          <p className="text-gray-400 text-sm">
            Simple deployment with powerful features
          </p>
        </MotionDiv>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <MotionDiv
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/20 rounded mb-3">
                <feature.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-xs">{feature.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}