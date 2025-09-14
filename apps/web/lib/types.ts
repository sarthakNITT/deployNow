export interface Deployment {
  id: string
  projectName: string
  url?: string
  status: 'queued' | 'building' | 'deployed' | 'failed' | 'ready'
  createdAt: string
}

export interface Project {
  id: string
  repoUrl: string
  projectName: string
  status: string
  createdAt: string
  message?: string
}

export interface DeployStatus {
  id: string
  status: 'queued' | 'building' | 'deployed' | 'failed'
  progress?: number
  logs?: string[]
  url?: string
}