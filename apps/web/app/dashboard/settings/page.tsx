'use client'

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
import { useUploadStore } from '@/store/upload'

export default function SettingsPage() {

  const {
    activeTab, 
    toast, 
    setToast
  } = useUploadStore();

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