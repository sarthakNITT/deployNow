import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

export default function AuthServer () {
    return (
        <>
        <SignedOut>
          <SignInButton>
            <Link 
              href="/auth"
              className="btn-sm btn-ghost hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium"
            >
              Login
            </Link>
          </SignInButton>
          <SignUpButton>
            <Link 
              href="/auth"
              className="btn-sm btn-primary hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 font-medium"
            >
              Sign Up
            </Link>
          </SignUpButton>
        </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </>
    )
}