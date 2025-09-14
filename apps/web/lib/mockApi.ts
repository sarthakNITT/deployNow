// Client-side mock API implementation for fallback when real API is unavailable
// This stores data in localStorage and simulates API responses

import type { Deployment } from './types'

// Mock data storage keys
const STORAGE_KEYS = {
  projects: 'mock_projects',
  deployments: 'mock_deployments',
  logs: 'mock_logs'
}

// Helper to get from localStorage with fallback
function getStorageData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

// Helper to save to localStorage
function setStorageData(key: string, data: any) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.warn('Failed to save to localStorage:', e)
  }
}

// Generate mock project name from repo URL
function getProjectNameFromUrl(repoUrl: string): string {
  try {
    const url = new URL(repoUrl)
    const pathParts = url.pathname.split('/')
    return pathParts[pathParts.length - 1] || 'unknown-project'
  } catch {
    return 'unknown-project'
  }
}

// Simulate network delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const mockApi = {
  async uploadRepo(repoUrl: string) {
    await delay(800) // Simulate upload time
    
    const projects = getStorageData(STORAGE_KEYS.projects, [])
    const projectName = getProjectNameFromUrl(repoUrl)
    
    const newProject = {
      id: `proj_${Date.now()}`,
      repoUrl,
      projectName,
      status: 'ready',
      createdAt: new Date().toISOString(),
      message: 'Repository uploaded and processed successfully'
    }
    
    projects.push(newProject)
    setStorageData(STORAGE_KEYS.projects, projects)
    
    return {
      id: newProject.id,
      status: 'ready',
      message: newProject.message
    }
  },

  async deployProject(id: string) {
    await delay(500)
    
    const deployId = `deploy_${Date.now()}`
    const deployments = getStorageData(STORAGE_KEYS.deployments, [])
    
    // Find the project
    const projects = getStorageData(STORAGE_KEYS.projects, [])
    const project = projects.find((p: any) => p.id === id)
    
    if (!project) {
      throw new Error('Project not found')
    }
    
    const newDeployment = {
      id: deployId,
      projectId: id,
      projectName: project.projectName,
      status: 'building',
      createdAt: new Date().toISOString(),
      progress: 0,
      logs: ['Starting deployment...', 'Installing dependencies...']
    }
    
    deployments.push(newDeployment)
    setStorageData(STORAGE_KEYS.deployments, deployments)
    
    return {
      id,
      deployId,
      status: 'starting'
    }
  },

  async getDeployStatus(deployId: string) {
    const deployments = getStorageData(STORAGE_KEYS.deployments, [])
    const deployment = deployments.find((d: any) => d.id === deployId)
    
    if (!deployment) {
      throw new Error('Deployment not found')
    }

    // Simulate progress over time
    const startTime = new Date(deployment.createdAt).getTime()
    const elapsed = Date.now() - startTime
    
    let status = deployment.status
    let progress = deployment.progress || 0
    let logs = deployment.logs || []
    let url = deployment.url
    
    // Simulate deployment progression
    if (status === 'building' && elapsed > 2000) {
      progress = Math.min(100, Math.floor((elapsed - 2000) / 100))
      
      if (progress >= 30 && logs.length === 2) {
        logs.push('Building application...')
      }
      if (progress >= 60 && logs.length === 3) {
        logs.push('Optimizing assets...')
      }
      if (progress >= 90 && logs.length === 4) {
        logs.push('Deploying to CDN...')
      }
      
      if (progress >= 100) {
        status = 'deployed'
        url = `https://${deployment.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.deploy.app`
        logs.push('Deployment successful!')
        logs.push(`Available at: ${url}`)
        
        // Update stored deployment
        deployment.status = status
        deployment.progress = progress
        deployment.logs = logs
        deployment.url = url
        setStorageData(STORAGE_KEYS.deployments, deployments)
      }
    }

    await delay(200) // Simulate network delay

    return {
      id: deployId,
      status,
      progress,
      logs,
      url
    }
  },

  async getDeployments(): Promise<Deployment[]> {
    await delay(300)
    
    const deployments = getStorageData(STORAGE_KEYS.deployments, [])
    
    // Return only successfully deployed projects for the main dashboard
    return deployments
      .filter((d: any) => d.status === 'deployed')
      .map((d: any) => ({
        id: d.projectId || d.id,
        projectName: d.projectName,
        url: d.url,
        status: d.status,
        createdAt: d.createdAt
      }))
  }
}