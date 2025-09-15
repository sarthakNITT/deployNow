'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, RefreshCw, Settings } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { SmallButton } from '@/components/SmallButton'
import { mockApi } from '@/lib/mockApi'
import { useUser } from '@clerk/nextjs'

export default function ProjectPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    router.push("/auth");
  }

  const params = useParams()
  const projectId = params.id as string

  // Mock project data - in real app this would call API
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
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        {/* Project Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Branch: {project.branch}</span>
              <span>•</span>
              <span>Framework: {project.framework}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <SmallButton
              variant="secondary"
              className="inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Redeploy
            </SmallButton>
            
            <SmallButton
              variant="secondary"
              className="inline-flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </SmallButton>
            
            {project.url && (
              <SmallButton
                variant="primary"
                className="inline-flex items-center gap-2"
                onClick={() => window.open(project.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Open Site
              </SmallButton>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Deployment History */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Recent Deployments</h2>
              <div className="space-y-3">
                {deployments.map((deployment) => (
                  <motion.div
                    key={deployment.id}
                    className="card flex items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <div>
                        <div className="text-sm font-medium">{deployment.commit}</div>
                        <div className="text-xs text-gray-400">{deployment.message}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm">{deployment.duration}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(deployment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Build Logs */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Latest Build Logs</h2>
              <div className="card bg-black border border-border rounded-lg p-4 font-mono text-sm">
                {logs.map((log, index) => (
                  <div key={index} className="text-gray-300 py-1">
                    <span className="text-gray-500 mr-2">{(index + 1).toString().padStart(2, '0')}</span>
                    {log}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Project Info</h3>
              <div className="card space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <div className="status-badge status-deployed">Deployed</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Last Deploy</div>
                  <div className="text-sm">
                    {new Date(project.lastDeploy).toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Build Command</div>
                  <div className="text-sm font-mono bg-black px-2 py-1 rounded">
                    {project.buildCommand}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Output Directory</div>
                  <div className="text-sm font-mono bg-black px-2 py-1 rounded">
                    {project.outputDirectory}
                  </div>
                </div>
              </div>
            </section>

            {/* Environment Variables */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Environment</h3>
              <div className="card space-y-2">
                {project.environmentVariables.map((env, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-mono text-gray-300">{env.key}</span>
                    <span className="text-gray-500 font-mono">•••••</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}