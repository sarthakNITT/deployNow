'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { RepoUpload } from '@/components/RepoUpload'
import { ProjectCard } from '@/components/ProjectCard'
import { DeployModal } from '@/components/DeployModal'
import { ActivityLog } from '@/components/ActivityLog'
import { Toast } from '@/components/Toast'
import { api } from '@/lib/api'
import type { Deployment } from '@/lib/types'
import { useUser } from '@clerk/nextjs'

export default function DashboardPage() {

  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }
  
  const [showUpload, setShowUpload] = useState(false)
  const [deployingProject, setDeployingProject] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  const { data: deployments = [], refetch: refetchDeployments } = useQuery({
    queryKey: ['deployments'],
    queryFn: api.getDeployments,
  })

  const handleUploadSuccess = (project: { id: string, status: string }) => {
    setToast({ type: 'success', message: 'Repository uploaded successfully!' })
    refetchDeployments()
    setShowUpload(false)
  }

  const handleDeploy = (projectId: string) => {
    setDeployingProject(projectId)
  }

  const handleDeployComplete = () => {
    setDeployingProject(null)
    refetchDeployments()
    setToast({ type: 'success', message: 'Deployment completed successfully!' })
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-400 text-xs">Manage your deployments</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="btn-sm py-2 px-6 btn-primary inline-flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            New Project
          </button>
        </div>

        {/* Upload Section */}
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <RepoUpload
              onSuccess={handleUploadSuccess}
              onCancel={() => setShowUpload(false)}
            />
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold mb-3">Projects</h2>
            
            {deployments.length === 0 ? (
              <div className="card text-center py-8">
                <p className="text-gray-400 mb-3 text-xs">No projects yet</p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="btn-sm py-2 px-6 btn-primary"
                >
                  Deploy your first project
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {deployments.map((deployment: Deployment) => (
                  <ProjectCard
                    key={deployment.id}
                    deployment={deployment}
                    onDeploy={handleDeploy}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-1">
            <h2 className="text-sm font-semibold mb-3">Activity</h2>
            <ActivityLog />
          </div>
        </div>
      </main>

      {/* Deploy Modal */}
      {deployingProject && (
        <DeployModal
          projectId={deployingProject}
          onClose={() => setDeployingProject(null)}
          onComplete={handleDeployComplete}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}