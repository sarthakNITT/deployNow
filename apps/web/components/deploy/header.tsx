import { CheckCircle, AlertCircle, Loader2, X } from 'lucide-react'

interface Props {
  onClose: () => void
  status?: 'starting' | 'building' | 'deployed' | 'failed'
}

export default function DeployHeader({ onClose, status = 'starting' }: Props) {

  const getStatusIcon = () => {
    switch (status) {
      case 'building':
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />
      case 'deployed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'starting': return 'Starting deployment...'
      case 'building': return 'Building and deploying...'
      case 'deployed': return 'Deployment successful!'
      case 'failed': return 'Deployment failed'
      default: return 'Deploying...'
    }
  }

    return (
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <h2 className="text-lg font-semibold">{getStatusText()}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-surface/50 rounded"
            disabled={status === 'building'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
    )
}