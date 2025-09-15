import Link from 'next/link'

export default function AuthServer () {
    return (
        <>
          <Link 
            href="/dashboard"
            className="btn-sm btn-ghost hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium"
          >
            Dashboard
          </Link>
          <Link 
            href="/dashboard/settings"
            className="btn-sm btn-primary hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 font-medium"
          >
            Settings
          </Link>
        </>
    )
}