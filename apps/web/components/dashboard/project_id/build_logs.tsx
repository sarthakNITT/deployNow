import { logs } from "@/lib/utils";

export default function ProjectBuildLogs () {
    return (
        <section>
          <h2 className="text-lg font-semibold mb-4">Latest Build Logs</h2>
          <div className="card bg-black border border-border rounded-lg p-4 font-mono text-sm">
            {logs.map((log, index) => (
              <div key={index} className="text-gray-300 py-1">
                <span className="text-gray-500 mr-2">{(index + 1).toString().padStart(2, '0')}</span>
                {log}
              </div>
            ))}
          </div>
        </section>
    )
}