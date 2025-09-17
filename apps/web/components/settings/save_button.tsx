import { Save } from "lucide-react";
import { SmallButton } from "../SmallButton";
import { useUploadStore } from "@/store/upload";

export default function SaveButton () {
    const {
        setToast
    } = useUploadStore();
    
    const handleSave = () => {
        setToast({ type: 'success', message: 'Settings saved successfully!' })
    }

    return (
        <div className="flex justify-end pt-6 border-t border-border mt-6">
            <SmallButton
                variant="primary"
                onClick={handleSave}
                className="inline-flex items-center gap-1"
            >
                <Save className="w-3 h-3" />
                Save Changes
            </SmallButton>
        </div>
    )
}