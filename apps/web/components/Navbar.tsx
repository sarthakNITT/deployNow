'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Settings, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <nav className="border-b border-border bg-black/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/dashboard" className="font-bold text-sm">
            Deploy
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-1 btn-sm btn-ghost"
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  className="w-4 h-4 rounded-full"
                />
              ) : (
                <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-2 h-2" />
                </div>
              )}
              <span className="text-xs">{user?.name || 'User'}</span>
              <ChevronDown className="w-2 h-2" />
            </button>

            {/* Dropdown */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-1 w-36 bg-surface border border-border rounded shadow-lg z-50"
              >
                <div className="py-1">
                  <Link 
                    href="/dashboard/settings"
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-surface/80 flex items-center gap-2 block"
                    onClick={() => setShowMenu(false)}
                  >
                    <Settings className="w-3 h-3" />
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-surface/80 flex items-center gap-2 text-red-400"
                  >
                    <LogOut className="w-3 h-3" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}