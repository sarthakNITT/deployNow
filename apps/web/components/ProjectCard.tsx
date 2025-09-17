'use client'

import { motion } from 'framer-motion'
import { ExternalLink, MoreVertical, RefreshCw, Settings, Trash2, Clock } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { SmallButton } from './SmallButton'
import type { Deployment } from '@/lib/types'
import { MotionDiv } from '@/lib/utils'

interface Props {
  deployment: Deployment
  onDeploy: (id: string) => void
}

export function ProjectCard({ deployment, onDeploy }: Props) {
  const [showMenu, setShowMenu] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'status-deployed'
      case 'building': return 'status-building'
      case 'failed': return 'status-failed'
      case 'ready': return 'status-ready'
      default: return 'status-ready'
    }
  }

  return (
    <MotionDiv
      className="card hover:bg-surface/80 transition-colors"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Link 
              href={`/dashboard/project/${deployment.id}`}
              className="font-semibold text-sm hover:text-primary transition-colors"
            >
              {deployment.projectName}
            </Link>
            <span className={`status-badge ${getStatusColor(deployment.status)}`}>
              {deployment.status}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>main</span>
            </div>
            {deployment.url && (
              <>
                <a 
                  href={deployment.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors truncate max-w-xs flex items-center gap-1"
                >
                  <ExternalLink className="w-2 h-2" />
                  {deployment.url.replace('https://', '')}
                </a>
              </>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-2 h-2" />
              <span>{new Date(deployment.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {deployment.url && (
            <SmallButton
              variant="ghost"
              onClick={() => window.open(deployment.url, '_blank')}
            >
              <ExternalLink className="w-3 h-3" />
            </SmallButton>
          )}
          
          {deployment.status === 'ready' && (
            <SmallButton
              variant="primary"
              onClick={() => onDeploy(deployment.id)}
            >
              Deploy
            </SmallButton>
          )}

          {deployment.status === 'deployed' && (
            <SmallButton
              variant="secondary"
              onClick={() => onDeploy(deployment.id)}
            >
              <RefreshCw className="w-3 h-3" />
            </SmallButton>
          )}

          {/* Menu */}
          <div className="relative">
            <SmallButton
              variant="ghost"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical className="w-3 h-3" />
            </SmallButton>

            {showMenu && (
              <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-1 w-28 bg-surface border border-border rounded shadow-lg z-10"
              >
                <div className="py-1">
                  <button className="w-full text-left px-2 py-1.5 text-xs hover:bg-surface/80 flex items-center gap-1">
                    <Settings className="w-2 h-2" />
                    Settings
                  </button>
                  <button className="w-full text-left px-2 py-1.5 text-xs hover:bg-surface/80 flex items-center gap-1 text-red-400">
                    <Trash2 className="w-2 h-2" />
                    Delete
                  </button>
                </div>
              </MotionDiv>
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  )
}