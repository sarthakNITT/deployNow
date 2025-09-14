'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, User, Key, Globe } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SmallButton } from '@/components/SmallButton'
import { Toast } from '@/components/Toast'
import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
  useAuth() // Protect route
  
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
    // Simulate save
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
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400 text-xs">Manage your account and project settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-400 hover:text-white hover:bg-surface/50'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="card"
            >
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={accountData.name}
                        onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                        className="input-sm w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                        className="input-sm w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Avatar URL</label>
                      <input
                        type="url"
                        value={accountData.avatar}
                        onChange={(e) => setAccountData({ ...accountData, avatar: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                        className="input-sm w-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Project Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Build Command</label>
                      <input
                        type="text"
                        value={projectSettings.buildCommand}
                        onChange={(e) => setProjectSettings({ ...projectSettings, buildCommand: e.target.value })}
                        className="input-sm w-full font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Output Directory</label>
                      <input
                        type="text"
                        value={projectSettings.outputDirectory}
                        onChange={(e) => setProjectSettings({ ...projectSettings, outputDirectory: e.target.value })}
                        className="input-sm w-full font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Node.js Version</label>
                      <select
                        value={projectSettings.nodeVersion}
                        onChange={(e) => setProjectSettings({ ...projectSettings, nodeVersion: e.target.value })}
                        className="input-sm w-full border border-border bg-input text-sm text-white rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      >
                        <option value="18.x">18.x</option>
                        <option value="16.x">16.x</option>
                        <option value="14.x">14.x</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'environment' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Environment Variables</h2>
                  <div className="space-y-3">
                    {envVars.map((env, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="KEY"
                          value={env.key}
                          onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                          className="input-sm flex-1 font-mono"
                        />
                        <input
                          type="text"
                          placeholder="value"
                          value={env.value}
                          onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                          className="input-sm flex-1 font-mono"
                        />
                        <SmallButton
                          variant="ghost"
                          onClick={() => removeEnvVar(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </SmallButton>
                      </div>
                    ))}
                    <SmallButton
                      variant="secondary"
                      onClick={addEnvVar}
                      className="w-full"
                    >
                      Add Variable
                    </SmallButton>
                  </div>
                </div>
              )}

              {/* Save button */}
              <div className="flex justify-end pt-6 border-t border-border mt-6">
                <SmallButton
                  variant="primary"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  Save Changes
                </SmallButton>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Toast */}
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