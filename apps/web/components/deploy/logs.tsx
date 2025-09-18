import { logs, MotionDiv } from "@/lib/utils";

export default function DeployLogs () {
    return (
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="bg-black rounded-lg p-4 font-mono text-sm">
            {logs.map((log, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-300 py-1"
              >
                <span className="text-gray-500 mr-2">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                {log}
              </MotionDiv>
            ))}
          </div>
        </div>
    )
}