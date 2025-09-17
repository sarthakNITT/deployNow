'use client'

import React from 'react'
import { DeployModal } from '@/components/DeployModal'
import { ActivityLog } from '@/components/ActivityLog'
import { Toast } from '@/components/Toast'
import { LandingHeader } from '@/components/LandingHeader'
import DashboardHeader from '@/components/dashboard/header'
import ShowUpload from '@/components/dashboard/show_upload'
import ProjectGrid from '@/components/dashboard/project_grid'
import { useUploadStore } from '@/store/upload'
import { getDeployData } from '@/lib/utils'

export default function DashboardPage() {
  
  const {
    showUpload, 
    deployingProject, 
    toast, 
    setDeployingProject, 
    setToast 
  } = useUploadStore();
  
  const refetchDeployments = getDeployData().refetchDeployments;

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