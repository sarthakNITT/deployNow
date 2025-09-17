"use client"

import { PlusIcon } from "@/lib/utils"

export default function DashboardHeader () {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-xl font-bold mb-1">Dashboard</h1>
                <p className="text-gray-400 text-xs">Manage your deployments</p>
            </div>
            <button
                onClick={() => setShowUpload(true)}
                className="btn-sm py-2 px-6 btn-primary inline-flex items-center gap-1"
            >
                <PlusIcon className="w-3 h-3" />
                New Project
            </button>
        </div>
    )
}