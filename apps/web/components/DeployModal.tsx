'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { SmallButton } from './SmallButton'
import { usePolling } from '@/hooks/usePolling'
import { api } from '@/lib/api'

interface Props {
  projectId: string
  onClose: () => void
  onComplete: () => void
}

export function DeployModal({ projectId, onClose, onComplete }: Props) {
  const [deployId, setDeployId] = useState<string | null>(null)
  const [status, setStatus] = useState<'starting' | 'building' | 'deployed' | 'failed'>('starting')
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>(['Starting deployment...'])

  // Start deployment
  useEffect(() => {
    const startDeploy = async () => {
      try {
        // Call API endpoint: POST ${NEXT_PUBLIC_API_BASE}/deploy/:id
        const response = await api.deployProject(projectId)
        setDeployId(response.deployId)
        setStatus('building')
      } catch (error) {
        setStatus('failed')
        setLogs(['Failed to start deployment'])
      }
    }

    startDeploy()
  }, [projectId])

  // Poll deployment status
  const { data: deployStatus } = usePolling(
    () => deployId ? api.getDeployStatus(deployId) : null,
    {
      interval: 2000,
      enabled: deployId && status !== 'deployed' && status !== 'failed',
    }
  )

  // Update status from polling
  useEffect(() => {
    if (deployStatus) {
      setStatus(deployStatus.status)
      setProgress(deployStatus.progress || 0)
      if (deployStatus.logs) {
        setLogs(deployStatus.logs)
      }
      
      if (deployStatus.status === 'deployed' || deployStatus.status === 'failed') {
        setTimeout(() => {
          onComplete()
        }, 1500)
      }
    }
  }, [deployStatus, onComplete])

  const getStatusIcon = () => {
    switch (status) {
      case 'building':
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />
      case 'deployed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'starting': return 'Starting deployment...'
      case 'building': return 'Building and deploying...'
      case 'deployed': return 'Deployment successful!'
      case 'failed': return 'Deployment failed'
      default: return 'Deploying...'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface border border-border rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <h2 className="text-lg font-semibold">{getStatusText()}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-surface/50 rounded"
            disabled={status === 'building'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        {status === 'building' && (
          <div className="px-6 py-4">
            <div className="bg-black rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">{progress}% complete</p>
          </div>
        )}

        {/* Logs */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="bg-black rounded-lg p-4 font-mono text-sm">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-300 py-1"
              >
                <span className="text-gray-500 mr-2">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                {log}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <SmallButton 
            variant="secondary" 
            onClick={onClose}
            disabled={status === 'building'}
          >
            {status === 'building' ? 'Deploying...' : 'Close'}
          </SmallButton>
        </div>
      </motion.div>
    </div>
  )
}