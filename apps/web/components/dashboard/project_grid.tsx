"use client";
import type { Deployment } from '@/lib/types'
import { ProjectCard } from '../ProjectCard'
import { useUploadStore } from '@/store/upload';
import getProjects from '@/lib/helperFunctions/getprojects';

export default function ProjectGrid () {

  const {
    loading,
    deployments,
    setDeployments,
    setLoading,
    setShowUpload,
    setDeployingProject
  } = useUploadStore();

  setLoading(true);
  const response = getProjects();
  response.then((data) => {
    console.log(data);
    setDeployments(data);
    setLoading(false);
  })

    const handleDeploy = (projectId: string) => {
      setDeployingProject(projectId)
    }
    
    return (
      <div className="lg:col-span-2">
        <h2 className="text-sm font-semibold mb-3">Projects</h2>
        
        {deployments.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-400 mb-3 text-xs">No projects yet</p>
            <button
              onClick={() => setShowUpload(true)}
              className="btn-sm py-2 px-6 btn-primary"
            >
              Deploy your first project
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(deployments as Deployment[]).map((deployment: Deployment) => (
              <ProjectCard
                key={deployment.id}
                deployment={deployment}
                onDeploy={handleDeploy}
              />
            ))}
          </div>
        )}
      </div>
    )
}