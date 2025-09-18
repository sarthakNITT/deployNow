'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Github } from 'lucide-react'
import { SmallButton } from '../SmallButton'
import axios from 'axios'
import { MotionDiv } from '@/lib/utils'

interface Props {
  onSuccess: (project: { id: string, status: string }) => void
  onCancel: () => void
}

export function RepoUpload({ onSuccess, onCancel }: Props) {
  const [repoUrl, setRepoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!repoUrl.trim()) {
      setError('Please enter a repository URL')
      return
    }

    if (!repoUrl.includes('github.com')) {
      setError('Please enter a valid GitHub repository URL')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/upload`, {
        url: repoUrl
      });

      console.log(response);

      await axios.post(`/api/projects`, {
        url: repoUrl,
        projectId: response.data.id
      })

      // trigger polling in upload-service to update DB when deployed/failed
      try {
        void axios.get(`http://localhost:3000/api/v1/status`, {
          params: { id: response.data.id, poll: true }
        })
      } catch (e) {
        console.log('Failed to trigger polling', e)
      }
      
      onSuccess({ id: response.data.id, status: 'pending' });
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Upload Repository</h3>
        </div>
        <button 
          onClick={onCancel}
          className="p-1 hover:bg-surface/50 rounded"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="repo-url" className="block text-xs font-medium mb-1">
            GitHub Repository URL
          </label>
          <input
            id="repo-url"
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="input-sm w-full"
            disabled={loading}
          />
          {error && (
            <p className="text-red-400 text-xs mt-0.5">{error}</p>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <SmallButton 
            variant="secondary" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </SmallButton>
          <SmallButton 
            variant="primary" 
            onClick={handleUpload}
            loading={loading}
          >
            <Upload className="w-3 h-3 mr-1" />
            Upload Repository
          </SmallButton>
        </div>
      </div>
    </MotionDiv>
  )
}