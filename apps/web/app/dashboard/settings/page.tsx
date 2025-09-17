'use client'

import { useState } from 'react'
import { User, Key, Globe } from 'lucide-react'
import { Toast } from '@/components/Toast'
import React from 'react'
import { LandingHeader } from '@/components/LandingHeader'
import BackButton from '@/components/dashboard/project_id/back_button'
import SettingsHeader from '@/components/settings/header'
import SettingsNavbar from '@/components/settings/navbar'
import { MotionDiv } from '@/lib/utils'
import Account from '@/components/settings/account'
import ProjectsTab from '@/components/settings/projects'
import EnvironmentTab from '@/components/settings/environment'
import SaveButton from '@/components/settings/save_button'

export default function SettingsPage() {
  
  const [activeTab, setActiveTab] = useState('account')
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  const [accountData, setAccountData] = useState({
    name: 'Test User',
    email: 'user@example.com',
    avatar: ''
  })
  
  const [projectSettings, setProjectSettings] = useState({
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    nodeVersion: '18.x'
  })
  
  const [envVars, setEnvVars] = useState([
    { key: 'NODE_ENV', value: 'production' },
    { key: 'API_URL', value: 'https://api.example.com' }
  ])

  const handleSave = () => {
    setToast({ type: 'success', message: 'Settings saved successfully!' })
  }

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: '', value: '' }])
  }

  const updateEnvVar = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...envVars]
    updated[index][field] = value
    setEnvVars(updated)
  }

  const removeEnvVar = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index))
  }

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'projects', label: 'Projects', icon: Globe },
    { id: 'environment', label: 'Environment', icon: Key }
  ]

  return (
    <div className="min-h-screen bg-black">
      <LandingHeader/>
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <BackButton/>
        <SettingsHeader/>

        <div className="grid lg:grid-cols-4 gap-8">
          <SettingsNavbar/>

          <div className="lg:col-span-3">
            <MotionDiv
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="card"
            >
              {activeTab === 'account' && (
                <Account/>
              )}

              {activeTab === 'projects' && (
                <ProjectsTab/>
              )}

              {activeTab === 'environment' && (
                <EnvironmentTab/>
              )}

              <SaveButton/>
            </MotionDiv>
          </div>
        </div>
      </main>

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