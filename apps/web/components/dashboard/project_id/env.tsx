import { getProjectId } from "@/lib/utils";

export default function EnvironmentVariables () {

  const project = getProjectId();

    return (
      <section>
        <h3 className="text-lg font-semibold mb-4">Environment</h3>
        <div className="card space-y-2">
          {project.environmentVariables.map((env, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="font-mono text-gray-300">{env.key}</span>
              <span className="text-gray-500 font-mono">•••••</span>
            </div>
          ))}
        </div>
      </section>
    )
}