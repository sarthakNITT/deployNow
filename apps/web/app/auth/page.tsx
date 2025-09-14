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

  const handleLogin = async (type: 'github' | 'email') => {
    setLoading(true)
    
    // Simulate auth - in real app this would call your backend auth endpoints
    // POST ${NEXT_PUBLIC_API_BASE}/auth/login or /auth/github
    try {
      // Mock successful login after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store mock auth token
      localStorage.setItem('auth_token', 'mock-jwt-token')
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        email: 'user@example.com',
        name: 'Test User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }))
      
      setShowToast({ type: 'success', message: 'Successfully logged in!' })
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
      
    } catch (error) {
      setShowToast({ type: 'error', message: 'Login failed. Please try again.' })
    } finally {
      setLoading(false)
    }
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
              onClick={() => handleLogin('github')}
              loading={loading}
              className="w-full btn-primary"
            >
              <Github className="w-3 h-3 mr-1" />
              Continue with GitHub
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
              onClick={() => handleLogin('email')}
              loading={loading}
              variant="secondary"
              className="w-full"
            >
              <Mail className="w-3 h-3 mr-1" />
              Continue with Email
            </SmallButton>
          </div>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <Link 
              href="/"
              className="inline-flex items-center text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
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