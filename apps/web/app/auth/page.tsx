'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SmallButton } from '@/components/SmallButton'
import { Toast } from '@/components/Toast'

export default function AuthPage() {
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const router = useRouter()
  const MailIcon = Mail as any
  const GithubIcon = Github as any
  const ArrowLeftIcon = ArrowLeft as any

  const handleGoogleAuth = async () => {
    setLoading(true)
    router.push('/dashboard')
  }

  const handleGithubAuth = async () => {
    setLoading(true)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <div className="text-center mb-8">
            <h1 className="text-lg font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-xs">Sign in to your account</p>
          </div>

          <div className="space-y-3">
            <SmallButton
              onClick={handleGoogleAuth}
              loading={loading}
              className="w-full btn-primary"
            >
              <MailIcon className="w-3 h-3 mr-1" />
              Continue with Google
            </SmallButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface px-2 text-gray-400">Or</span>
              </div>
            </div>

            <SmallButton
              onClick={handleGithubAuth}
              loading={loading}
              variant="secondary"
              className="w-full"
            >
              <GithubIcon className="w-3 h-3 mr-1" />
              Continue with GitHub
            </SmallButton>
          </div>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <Link 
              href="/"
              className="inline-flex items-center text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-3 h-3 mr-1" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>

      {showToast && (
        <Toast
          type={showToast.type}
          message={showToast.message}
          onClose={() => setShowToast(null)}
        />
      )}
    </div>
  )
}