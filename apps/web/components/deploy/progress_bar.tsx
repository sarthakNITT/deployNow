import { MotionDiv } from "@/lib/utils";

export default function ProgressBar () {
    return (
        <div className="px-6 py-4">
            <div className="bg-black rounded-full h-2">
              <MotionDiv
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">{progress}% complete</p>
        </div>
    )
}