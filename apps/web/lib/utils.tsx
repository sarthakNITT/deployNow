"use client"

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Zap, Shield, Globe, Code, User, Key, Upload, CheckCircle,  } from 'lucide-react'
import { api } from '@/lib/api'
import { useQuery } from "@tanstack/react-query";
import { useUploadStore } from "@/store/upload";

export const MotionDiv = motion.div as any
export const MotionHeader = motion.header as any
export const MotionP = motion.p as any
export const MotionH1 = motion.h1 as any

export function getDeployData () {
  const { data: deploymentsData = [], refetch: refetchDeployments } = useQuery({
    queryKey: ['deployments'],
    queryFn: api.getDeployments,
  })
  return { deploymentsData, refetchDeployments }
}

export const PlusIcon = Plus as any

export type UserButtonNav = "dashboard" | "settings"
export type activeTabType = 'account' | 'projects' | 'environment'

export interface AccountData {
  name: string
  email: string
  avatar: string
}

export interface ProjectSettings {
  buildCommand: string
  outputDirectory: string
  nodeVersion: string
}

export interface EnvVar {
  key: string
  value: string
}

type deploymentType = {
  id: string,
  url: string,
  projectId: string,
  status: string,
  createdAt: Date,
  updatedAt: Date,
  userId: string
}

export interface uploadInterface {
  showUpload: boolean
  deployingProject: string | null
  toast: { type: 'success' | 'error', message: string } | null
  activeTab: activeTabType
  accountData: AccountData
  projectSettings: ProjectSettings
  envVars: EnvVar[]
  projectId: string | null
  deployments: any[] | null
  loading: boolean
  
  setShowUpload: (value: boolean) => void
  setDeployingProject: (value: string | null) => void
  setToast:  (value: { type: 'success' | 'error', message: string } | null) => void
  setActiveTab:  (value: activeTabType) => void
  setAccountData: (value: AccountData) => void
  setProjectSettings: (value: ProjectSettings) => void
  setEnvVars: (value: EnvVar[]) => void
  setProjectId: (value: string | null) => void
  setLoading: (value: boolean) => void
  setDeployments: (value: any[]) => void
  addEnvVar: () => void
  updateEnvVar: (index: number, field: 'key' | 'value', value: string) => void
  removeEnvVar: (index: number) => void
}

export const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Deploy in seconds with optimized builds'
    },
    {
      icon: Shield,
      title: 'Secure by Default',
      description: 'HTTPS and security headers included'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Worldwide edge network for speed'
    },
    {
      icon: Code,
      title: 'Git Integration',
      description: 'Connect any GitHub repository'
    }
]  

export const benefits = [
  'No configuration required',
  'Automatic HTTPS certificates',
  'Real-time deployment logs',
  'Instant rollbacks',
  'Custom domains supported',
  'Zero downtime deployments'
]

export const faqs = [
  {
    question: 'How fast are deployments?',
    answer: 'Most deployments complete in under 30 seconds. Build times vary based on your project size and complexity.'
  },
  {
    question: 'What frameworks are supported?',
    answer: 'We support all major frontend frameworks including React, Vue, Angular, Svelte, and static sites.'
  },
  {
    question: 'Can I use custom domains?',
    answer: 'Yes, you can connect custom domains with automatic HTTPS certificates included at no extra cost.'
  },
  {
    question: 'Is there a free tier?',
    answer: 'Yes, our free tier includes unlimited personal projects with generous bandwidth and build minutes.'
  },
  {
    question: 'How do I rollback deployments?',
    answer: 'Every deployment is versioned. You can instantly rollback to any previous version with one click.'
  }
]

export const activities = [
  {
    id: '1',
    type: 'deploy',
    message: 'Deployed my-project to production',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
    status: 'success'
  },
  {
    id: '2',
    type: 'upload',
    message: 'Uploaded new-feature repository',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
    status: 'success'
  },
  {
    id: '3',
    type: 'deploy',
    message: 'Deployment failed for test-app',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    status: 'error'
  }
]

export const tabs = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'projects', label: 'Projects', icon: Globe },
  { id: 'environment', label: 'Environment', icon: Key }
] as const

export const deployments = [
  {
    id: '1',
    projectName: 'my-project',
    status: 'deployed' as const,
    createdAt: 17/9/2025,
    duration: '45s',
    commit: 'abc123f',
    message: 'Add new feature'
  },
  {
    id: '2',
    projectName: 'test-app', 
    status: 'deployed' as const,
    createdAt: 17/9/2025,
    duration: '38s',
    commit: 'def456a',
    message: 'Fix bug in header'
  }
]

export const logs = [
  '> Building project...',
  '> Installing dependencies',
  '> Running build command: npm run build',
  '> Build completed successfully',
  '> Deploying to CDN...',
  '> Deployment successful!',
  '> Available at: https://example-project.deploy.app'
]

export function getProjectId () {
  const {
    projectId
  } = useUploadStore();

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

  return project
}

export const steps = [
  {
    title: 'Upload Repository',
    description: 'Connect your GitHub repo with a simple URL',
    icon: Upload,
    screenshot: 'upload'
  },
  {
    title: 'Build & Process',
    description: 'We automatically build and optimize your project',
    icon: CheckCircle,
    screenshot: 'success'
  },
  {
    title: 'Deploy Live',
    description: 'Get a live URL to share your project instantly',
    icon: Globe,
    screenshot: 'deploy'
  }
]