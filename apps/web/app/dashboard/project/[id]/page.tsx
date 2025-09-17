'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import BackButton from '@/components/dashboard/project_id/back_button'
import ProjectHeader from '@/components/dashboard/project_id/header'
import DeployHistory from '@/components/deploy/deploy_history'
import ProjectBuildLogs from '@/components/dashboard/project_id/build_logs'
import ProjectInfo from '@/components/dashboard/project_id/project_info'
import EnvironmentVariables from '@/components/dashboard/project_id/env'
import { useUploadStore } from '@/store/upload'

export default function ProjectPage() {

  const {
    setProjectId
  } = useUploadStore();
  const params = useParams()
  setProjectId(params.id as string)

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <BackButton/>
        <ProjectHeader/>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DeployHistory/>
            <ProjectBuildLogs/>
          </div>

          <div className="space-y-6">
            <ProjectInfo/>
            <EnvironmentVariables/>
          </div>
        </div>
      </main>
    </div>
  )
}