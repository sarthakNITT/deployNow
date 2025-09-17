export default function ProjectsTab () {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Project Settings</h2>
            <div className="space-y-4">
            <div>
                <label className="block text-xs font-medium mb-1">Build Command</label>
                <input
                type="text"
                value={projectSettings.buildCommand}
                onChange={(e) => setProjectSettings({ ...projectSettings, buildCommand: e.target.value })}
                className="input-sm w-full font-mono"
                />
            </div>
            <div>
                <label className="block text-xs font-medium mb-1">Output Directory</label>
                <input
                type="text"
                value={projectSettings.outputDirectory}
                onChange={(e) => setProjectSettings({ ...projectSettings, outputDirectory: e.target.value })}
                className="input-sm w-full font-mono"
                />
            </div>
            <div>
                <label className="block text-xs font-medium mb-1">Node.js Version</label>
                <select
                value={projectSettings.nodeVersion}
                onChange={(e) => setProjectSettings({ ...projectSettings, nodeVersion: e.target.value })}
                className="input-sm w-full border border-border bg-input text-sm text-white rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                <option value="18.x">18.x</option>
                <option value="16.x">16.x</option>
                <option value="14.x">14.x</option>
                </select>
            </div>
            </div>
        </div>
    )
}