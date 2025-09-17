'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { DeployModal } from '@/components/DeployModal'
import { ActivityLog } from '@/components/ActivityLog'
import { Toast } from '@/components/Toast'
import { LandingHeader } from '@/components/LandingHeader'
import DashboardHeader from '@/components/dashboard/header'
import ShowUpload from '@/components/dashboard/show_upload'
import ProjectGrid from '@/components/dashboard/project_grid'

export default function DashboardPage() {
  
  const [showUpload, setShowUpload] = useState(false)
  const [deployingProject, setDeployingProject] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  

  const handleDeployComplete = () => {
    setDeployingProject(null)
    refetchDeployments()
    setToast({ type: 'success', message: 'Deployment completed successfully!' })
  }

  return (
    <div className="min-h-screen bg-black">
      <LandingHeader/>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <DashboardHeader/>

        {showUpload && (
          <ShowUpload/>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <ProjectGrid/>
          <ActivityLog/>
        </div>
      </main>

      {deployingProject && (
        <DeployModal
          projectId={deployingProject}
          onClose={() => setDeployingProject(null)}
          onComplete={handleDeployComplete}
        />
      )}

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