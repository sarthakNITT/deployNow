import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton () {
    return (
        <div className="mb-6">
            <Link
                href="/dashboard"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
            </Link>
        </div>
    )
}