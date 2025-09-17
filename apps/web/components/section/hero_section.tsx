"use client"

import { Typewriter } from "react-simple-typewriter";
import { HeroBackground } from "../HeroBackground";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MotionDiv, MotionH1, MotionP } from "@/lib/utils";

export default function HeroSection () {
    const router = useRouter();

    async function handleGetStarted () {
        router.push("/dashboard")
    }

    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-0">
        <HeroBackground />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          
          <MotionH1 
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
          </MotionH1>

          <MotionP
            className="text-sm md:text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A fast and reliable way to ship your frontend projects.
            Zero setup, instant builds, and effortless deployments —
            so you can focus on building while we handle the rest.
          </MotionP>
          
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button 
              onClick={handleGetStarted}
              className="text-[12px] inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </MotionDiv>
        </div>
      </section>
    )
}