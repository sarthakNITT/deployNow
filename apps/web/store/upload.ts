import { activeTabType, uploadInterface } from "@/lib/utils";
import type { Deployment } from '@/lib/types';
import { create } from "zustand";

export const useUploadStore = create<uploadInterface>()((set) => ({
    showUpload: false,
    deployingProject: "5f47f0f8-ac30-4883-8097-a28826c0a527",
    toast: null,
    activeTab: 'account',
    accountData: {
        name: 'Test User',
        email: 'user@example.com',
        avatar: ''
    },
    projectSettings: {
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        nodeVersion: '18.x'
    },
    envVars: [
        { key: 'NODE_ENV', value: 'production' },
        { key: 'API_URL', value: 'https://api.example.com' }
    ],
    projectId: null,
    deployments: [],
    loading: true,

    setShowUpload: (value: boolean) => set({ showUpload: value }),
    setDeployingProject: (value: string | null) => set({ deployingProject: value }),
    setToast:  (value: { type: 'success' | 'error', message: string } | null) => set({ toast: value }),
    setActiveTab:  (value: activeTabType) => set({ activeTab: value }),
    setAccountData: (value) => set({ accountData: value }),
    setProjectSettings: (value) => set({ projectSettings: value }),
    setEnvVars: (value) => set({ envVars: value }),
    setProjectId: (value) => set({ projectId: value }),
    setDeployments: (value) => set({ deployments: value }),
    setLoading: (value) => set({ loading: value }),
    addEnvVar: () => set((state) => ({ envVars: [...state.envVars, { key: '', value: '' }] })),
    updateEnvVar: (index, field, value) => set((state) => {
        const updated = [...state.envVars];
        const current = updated[index];
        if (!current) return { envVars: updated };
        const nextItem = { key: current.key, value: current.value };
        if (field === 'key') {
            nextItem.key = value;
        } else {
            nextItem.value = value;
        }
        updated[index] = nextItem;
        return { envVars: updated };
    }),
    removeEnvVar: (index) => set((state) => ({ envVars: state.envVars.filter((_, i) => i !== index) })),
}))