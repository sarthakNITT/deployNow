'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
}

export function SmallButton({ 
  children, 
  variant = 'primary', 
  loading = false, 
  className,
  disabled,
  ...props 
}: Props) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={clsx(
        'btn-sm inline-flex items-center justify-center py-3',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-ghost': variant === 'ghost',
        },
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
      {children}
    </motion.button>
  )
}