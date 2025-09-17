import { MotionDiv } from "@/lib/utils";
import { RepoUpload } from "./RepoUpload";

export default function ShowUpload () {

    const handleUploadSuccess = (project: { id: string, status: string }) => {
      setToast({ type: 'success', message: 'Repository uploaded successfully!' })
      refetchDeployments()
      setShowUpload(false)
    }

    return (
      <MotionDiv
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-8"
      >
        <RepoUpload
          onSuccess={handleUploadSuccess}
          onCancel={() => setShowUpload(false)}
        />
      </MotionDiv>
    )
}