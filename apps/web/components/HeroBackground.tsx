'use client'

import { motion } from 'framer-motion'

const FloatingShape = ({ 
  delay = 0, 
  duration = 6, 
  left = '0%',
  top = '0%'
}) => {
  const randomMoveX = Math.random() * 80 - 40;
  const randomMoveY = Math.random() * 80 - 40;
  const randomRotate = Math.random() * 720 - 360;

  const MotionDiv = motion.div as any
  
  return (
    <MotionDiv
      className="absolute rounded-full opacity-15"
      style={{
        width: '120px',
        height: '120px',
        background: 'linear-gradient(45deg, #06b6d4, transparent)',
        left,
        top,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        x: [0, randomMoveX, -randomMoveX, 0],
        y: [0, randomMoveY, -randomMoveY, 0],
        rotate: [0, randomRotate, -randomRotate, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function HeroBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="hero-bg absolute inset-0" />
      
      <FloatingShape delay={0} duration={15} left="15%" top="20%" />
      <FloatingShape delay={2} duration={18} left="85%" top="15%" />
      <FloatingShape delay={4} duration={12} left="20%" top="80%" />
      <FloatingShape delay={6} duration={20} left="80%" top="85%" />
      <FloatingShape delay={8} duration={16} left="50%" top="50%" />
      <FloatingShape delay={1} duration={14} left="35%" top="25%" />
      <FloatingShape delay={3} duration={19} left="75%" top="35%" />
      <FloatingShape delay={5} duration={13} left="25%" top="70%" />
      <FloatingShape delay={7} duration={17} left="65%" top="75%" />
      <FloatingShape delay={9} duration={21} left="10%" top="45%" />
      <FloatingShape delay={11} duration={15} left="90%" top="55%" />
      <FloatingShape delay={13} duration={18} left="45%" top="10%" />
      <FloatingShape delay={15} duration={16} left="55%" top="90%" />
    </div>
  )
}