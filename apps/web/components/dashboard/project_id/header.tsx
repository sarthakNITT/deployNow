import { SmallButton } from "@/components/SmallButton";
import { ExternalLink, RefreshCw, Settings } from "lucide-react";

export default function ProjectHeader () {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Branch: {project.branch}</span>
              <span>•</span>
              <span>Framework: {project.framework}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <SmallButton
              variant="secondary"
              className="inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Redeploy
            </SmallButton>
            
            <SmallButton
              variant="secondary"
              className="inline-flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </SmallButton>
            
            {project.url && (
              <SmallButton
                variant="primary"
                className="inline-flex items-center gap-2"
                onClick={() => window.open(project.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Open Site
              </SmallButton>
            )}
          </div>
        </div>
    )
}