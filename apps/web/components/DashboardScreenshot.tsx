'use client'

import { Upload, CheckCircle, Globe, ExternalLink } from 'lucide-react'

interface Props {
  type: 'upload' | 'success' | 'deploy'
}

export function DashboardScreenshot({ type }: Props) {
  if (type === 'upload') {
    return (
      <div className="p-4 bg-black min-h-[200px]">
        {/* Mock navbar */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
          <div className="font-semibold text-sm">Dashboard</div>
          <div className="w-6 h-6 bg-gray-700 rounded-full" />
        </div>
        
        {/* Upload form */}
        <div className="bg-gray-900 border border-gray-700 rounded p-3">
          <h3 className="font-medium mb-2 text-sm">New Project</h3>
          <div className="space-y-2">
            <input 
              placeholder="https://github.com/username/repo"
              className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs"
              readOnly
            />
            <button className="bg-cyan-500 text-black px-2 py-1 rounded text-xs font-medium">
              <Upload className="w-3 h-3 inline mr-1" />
              Upload Repository
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'success') {
    return (
      <div className="p-4 bg-black min-h-[200px]">
        {/* Mock navbar */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
          <div className="font-semibold text-sm">Dashboard</div>
          <div className="w-6 h-6 bg-gray-700 rounded-full" />
        </div>
        
        {/* Success state */}
        <div className="bg-gray-900 border border-gray-700 rounded p-3">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <div>
              <div className="font-medium text-sm">Upload Successful</div>
              <div className="text-xs text-gray-400">Repository processed and ready</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
              View Logs
            </button>
            <button className="bg-cyan-500 text-black px-2 py-1 rounded text-xs font-medium">
              Deploy Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Deploy type
  return (
    <div className="p-4 bg-black min-h-[200px]">
      {/* Mock navbar */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
        <div className="font-semibold text-sm">Dashboard</div>
        <div className="w-6 h-6 bg-gray-700 rounded-full" />
      </div>
      
      {/* Project card */}
      <div className="bg-gray-900 border border-gray-700 rounded p-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-medium text-sm">my-awesome-project</div>
            <div className="text-xs text-gray-400">main branch</div>
          </div>
          <div className="bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full text-xs border border-green-500/30">
            Deployed
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            my-awesome-project.deploy.app
          </div>
          <button className="bg-cyan-500 text-black px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1">
            <ExternalLink className="w-2 h-2" />
            Open
          </button>
        </div>
      </div>
    </div>
  )
}