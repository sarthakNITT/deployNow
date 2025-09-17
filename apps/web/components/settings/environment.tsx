import { SmallButton } from "../SmallButton";

export default function EnvironmentTab () {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-3">
            {envVars.map((env, index) => (
                <div key={index} className="flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="KEY"
                    value={env.key}
                    onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                    className="input-sm flex-1 font-mono"
                />
                <input
                    type="text"
                    placeholder="value"
                    value={env.value}
                    onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                    className="input-sm flex-1 font-mono"
                />
                <SmallButton
                    variant="ghost"
                    onClick={() => removeEnvVar(index)}
                    className="text-red-400 hover:text-red-300"
                >
                    ×
                </SmallButton>
                </div>
            ))}
            <SmallButton
                variant="secondary"
                onClick={addEnvVar}
                className="w-full"
            >
                Add Variable
            </SmallButton>
            </div>
        </div>
    )
}