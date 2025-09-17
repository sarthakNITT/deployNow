"use client"

import { motion } from 'framer-motion'
import { StepShowcase } from '@/components/StepShowcase'
import { MotionDiv } from '@/lib/utils'

export default function StepShowcaseSection () {
    return (
        <section className="py-16 px-6 bg-black">
            <div className="max-w-5xl mx-auto">
            <MotionDiv
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
            </MotionDiv>
            
            <StepShowcase />
            </div>
        </section>
    )
}