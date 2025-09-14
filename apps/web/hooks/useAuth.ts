'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    // Simple client-side auth check
    const token = localStorage.getItem('auth_token')
    if (!token) {
      router.push('/auth')
    }
  }, [router])
}