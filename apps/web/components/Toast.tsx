'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import { MotionDiv } from '@/lib/utils'

interface Props {
  type: 'success' | 'error'
  message: string
  onClose: () => void
  duration?: number
}

export function Toast({ type, message, onClose, duration = 4000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const Icon = type === 'success' ? CheckCircle : AlertCircle
  const bgColor = type === 'success' ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'
  const textColor = type === 'success' ? 'text-green-400' : 'text-red-400'

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        <MotionDiv
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className={`flex items-center gap-3 p-4 rounded-lg border ${bgColor} backdrop-blur-sm max-w-md`}
        >
          <Icon className={`w-5 h-5 ${textColor} flex-shrink-0`} />
          <p className="text-sm text-white flex-1">{message}</p>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </MotionDiv>
      </AnimatePresence>
    </div>
  )
}