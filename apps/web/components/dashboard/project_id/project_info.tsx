import { getProjectId } from "@/lib/utils";

export default function ProjectInfo () {
    
    const project = getProjectId();

    return (
        <section>
            <h3 className="text-lg font-semibold mb-4">Project Info</h3>
            <div className="card space-y-3">
                <div>
                    <div className="text-xs text-gray-400 mb-1">Status</div>
                    <div className="status-badge status-deployed">Deployed</div>
                </div>
                
                <div>
                    <div className="text-xs text-gray-400 mb-1">Last Deploy</div>
                    <div className="text-sm">
                    {new Date(project.lastDeploy).toLocaleString()}
                    </div>
                </div>
                
                <div>
                    <div className="text-xs text-gray-400 mb-1">Build Command</div>
                    <div className="text-sm font-mono bg-black px-2 py-1 rounded">
                    {project.buildCommand}
                    </div>
                </div>
                
                <div>
                    <div className="text-xs text-gray-400 mb-1">Output Directory</div>
                    <div className="text-sm font-mono bg-black px-2 py-1 rounded">
                    {project.outputDirectory}
                    </div>
                </div>
            </div>
        </section>
    )
}