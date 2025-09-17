'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import BackButton from '@/components/dashboard/project_id/back_button'
import ProjectHeader from '@/components/dashboard/project_id/header'
import DeployHistory from '@/components/deploy/deploy_history'
import ProjectBuildLogs from '@/components/dashboard/project_id/build_logs'
import ProjectInfo from '@/components/dashboard/project_id/project_info'
import EnvironmentVariables from '@/components/dashboard/project_id/env'

export default function ProjectPage() {

  const params = useParams()
  const projectId = params.id as string

  const project = {
    id: projectId,
    name: 'example-project',
    url: 'https://example-project.deploy.app',
    status: 'deployed' as const,
    createdAt: new Date().toISOString(),
    lastDeploy: new Date().toISOString(),
    branch: 'main',
    framework: 'React',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    environmentVariables: [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'API_URL', value: 'https://api.example.com' }
    ]
  }

  const deployments = [
    {
      id: '1',
      status: 'deployed' as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
      duration: '45s',
      commit: 'abc123f',
      message: 'Add new feature'
    },
    {
      id: '2', 
      status: 'deployed' as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      duration: '38s',
      commit: 'def456a',
      message: 'Fix bug in header'
    }
  ]

  const logs = [
    '> Building project...',
    '> Installing dependencies',
    '> Running build command: npm run build',
    '> Build completed successfully',
    '> Deploying to CDN...',
    '> Deployment successful!',
    '> Available at: https://example-project.deploy.app'
  ]

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