'use client'

import { DashboardScreenshot } from './DashboardScreenshot'
import { MotionDiv, steps } from '@/lib/utils'

export function StepShowcase() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <MotionDiv
        className="flex gap-8"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear'
        }}
      >
        {[...steps, ...steps].map((step, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 flex flex-col items-center text-center"
          >
            <div className="w-full bg-surface/50 rounded-lg border border-border overflow-hidden mb-4">
              <DashboardScreenshot type={step.screenshot as 'upload' | 'success' | 'deploy'} />
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/20 rounded mb-3">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </MotionDiv>
    </div>
  )
}
