'use client'

import { useState, useEffect } from 'react'
import { usePolling } from '@/hooks/usePolling'
import { api } from '@/lib/api'
import { MotionDiv } from '@/lib/utils'
import DeployHeader from './deploy/header'
import ProgressBar from './deploy/progress_bar'
import DeployLogs from './deploy/logs'
import DeployFooter from './deploy/footer'

interface Props {
  projectId: string
  onClose: () => void
  onComplete: () => void
}

export function DeployModal({ projectId, onClose, onComplete }: Props) {
  const [deployId, setDeployId] = useState<string | null>(null)
  const [status, setStatus] = useState<'starting' | 'queued' | 'building' | 'deployed' | 'failed'>('starting')
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>(['Starting deployment...'])

  useEffect(() => {
    const startDeploy = async () => {
      try {
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

  const { data: deployStatus } = usePolling(
    () => deployId ? api.getDeployStatus(deployId) : null,
    {
      interval: 2000,
      enabled: Boolean(deployId) && status !== 'deployed' && status !== 'failed',
    }
  )

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface border border-border rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden"
      >
        {(() => {
          const displayStatus: 'starting' | 'building' | 'deployed' | 'failed' = status === 'queued' ? 'starting' : status
          return <DeployHeader onClose={onClose} status={displayStatus}/>
        })()}

        {status === 'building' && (
          <ProgressBar/>
        )}

        <DeployLogs/>
        {(() => {
          const displayStatus: 'starting' | 'building' | 'deployed' | 'failed' = status === 'queued' ? 'starting' : status
          return <DeployFooter onClose={onClose} status={displayStatus}/>
        })()}
      </MotionDiv>
    </div>
  )
}