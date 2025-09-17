import { deployments, MotionDiv } from "@/lib/utils";

export default function DeployHistory () {
    return (
        <section>
            <h2 className="text-lg font-semibold mb-4">
                Recent Deployments
            </h2>
            <div className="space-y-3">
            {deployments.map((deployment) => (
                <MotionDiv
                key={deployment.id}
                className="card flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                >
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <div>
                    <div className="text-sm font-medium">{deployment.commit}</div>
                    <div className="text-xs text-gray-400">{deployment.message}</div>
                    </div>
                </div>
                
                <div className="text-right">
                    <div className="text-sm">{deployment.duration}</div>
                    <div className="text-xs text-gray-400">
                    {new Date(deployment.createdAt).toLocaleDateString()}
                    </div>
                </div>
                </MotionDiv>
            ))}
            </div>
        </section>
    )
}