'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react'

const activities = [
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

export function ActivityLog() {
  const getIcon = (type: string, status: string) => {
    if (type === 'upload') {
      return <Upload className="w-4 h-4 text-primary" />
    }
    
    if (status === 'success') {
      return <CheckCircle className="w-4 h-4 text-green-400" />
    }
    
    return <AlertCircle className="w-4 h-4 text-red-400" />
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    return `${diffInHours}h ago`
  }

  return (
    <div className="card">
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Clock className="w-4 h-4 mx-auto mb-2" />
            <p className="text-xs">No recent activity</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start gap-2 pb-3 border-b border-border last:border-b-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mt-0.5">
                {getIcon(activity.type, activity.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white">{activity.message}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}