import { SmallButton } from "../SmallButton";

interface Props {
    onClose: () => void
    status?: 'starting' | 'building' | 'deployed' | 'failed'
}

export default function DeployFooter ({ onClose, status = 'starting' }: Props) {
    return (
        <div className="flex justify-end gap-3 p-6 border-t border-border">
            <SmallButton 
            variant="secondary" 
            onClick={onClose}
            disabled={status === 'building'}
            >
            {status === 'building' ? 'Deploying...' : 'Close'}
            </SmallButton>
        </div>
    )
}