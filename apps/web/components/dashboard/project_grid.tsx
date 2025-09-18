"use client";
import type { Deployment } from '@/lib/types'
import { ProjectCard } from '../ProjectCard'
import { useUploadStore } from '@/store/upload';
import getProjects from '@/lib/helperFunctions/getprojects';

let hasFetchedProjects = false;

export default function ProjectGrid () {

  const {
    loading,
    deployments,
    setDeployments,
    setLoading,
    setShowUpload,
    setDeployingProject
  } = useUploadStore();

  if (!hasFetchedProjects) {
    hasFetchedProjects = true;
    setLoading(true);
    const response = getProjects();
    response.then((data) => {
      console.log(data);
      setDeployments(data);
      setLoading(false);
    })
  }

    const handleDeploy = (projectId: string) => {
      setDeployingProject(projectId)
    }
    
    return (
      <div className="lg:col-span-2">
        <h2 className="text-sm font-semibold mb-3">Projects</h2>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="card animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-4 w-32 bg-gray-700 rounded"></div>
                      <div className="h-3 w-16 bg-gray-700 rounded"></div>
                      <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-700 rounded-full" />
                        <div className="h-3 w-10 bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-3 w-40 bg-gray-700 rounded"></div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-20 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-7 w-7 bg-gray-700 rounded"></div>
                    <div className="h-7 w-16 bg-gray-700 rounded"></div>
                    <div className="h-7 w-7 bg-gray-700 rounded"></div>
                    <div className="h-7 w-7 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : deployments.length === 0 ? (
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