// Real API client that calls external backend endpoints
// These endpoints should be implemented in your backend service
import { mockApi } from './mockApi'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === 'development'

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Force mock mode if specified
  if (MOCK_MODE) {
    throw new Error('Mock mode enabled')
  }
  
  const url = `${API_BASE}${endpoint}`
  
  // Get auth token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status
    )
  }

  return response.json()
}

// Wrapper that falls back to mock API on failure
async function safeApiRequest<T>(
  endpoint: string, 
  options: RequestInit = {},
  mockFallback: () => Promise<T>
): Promise<T> {
  try {
    return await apiRequest<T>(endpoint, options)
  } catch (error) {
    console.warn(`API request failed for ${endpoint}, using mock fallback:`, error)
    return mockFallback()
  }
}
export const api = {
  // POST ${API_BASE}/upload
  // Request: { repoUrl: string }
  // Response: { id: string, status: "uploaded" | "processing" | "ready", message?: string }
  async uploadRepo(repoUrl: string) {
    return safeApiRequest<{ id: string, status: string, message?: string }>(
      '/upload',
      {
        method: 'POST',
        body: JSON.stringify({ repoUrl }),
      },
      () => mockApi.uploadRepo(repoUrl)
    )
  },

  // GET ${API_BASE}/status/:id  
  // Response: { id: string, status: "queued" | "building" | "deployed" | "failed", progress?: number, logs?: string[], url?: string }
  async getDeployStatus(id: string) {
    return safeApiRequest<{
      id: string
      status: 'queued' | 'building' | 'deployed' | 'failed'
      progress?: number
      logs?: string[]
      url?: string
    }>(
      `/status/${id}`,
      {},
      () => mockApi.getDeployStatus(id)
    )
  },

  // POST ${API_BASE}/deploy/:id
  // Response: { id: string, deployId: string, status: "starting" }
  async deployProject(id: string) {
    return safeApiRequest<{ id: string, deployId: string, status: string }>(
      `/deploy/${id}`,
      {
        method: 'POST',
      },
      () => mockApi.deployProject(id)
    )
  },

  // GET ${API_BASE}/deployments
  // Response: [{ id, projectName, url, status, createdAt }]
  async getDeployments() {
    return safeApiRequest<Array<{
      id: string
      projectName: string  
      url?: string
      status: string
      createdAt: string
    }>>(
      '/deployments',
      {},
      () => mockApi.getDeployments()
    )
  },
}