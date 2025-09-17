'use client'

import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { MotionDiv, MotionHeader, UserButtonNav } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Wrench } from "lucide-react"

export function LandingHeader() {
  const router = useRouter();

  function handleDropDown (nav: UserButtonNav) {
    if(nav === "dashboard"){
      router.push("/dashboard")    
    }else if(nav === "settings"){
      router.push("/dashboard/settings")
    }
  }

  return (
    <MotionHeader
      className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-primary/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          <MotionDiv
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link href="/" className="font-bold text-lg bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent hover:from-cyan-400 hover:to-primary transition-all duration-300">
              DeployNow
            </Link>
          </MotionDiv>

          <MotionDiv
            className="flex items-center gap-3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <SignedOut>
              <SignInButton>
                <button
                  className="btn-sm btn-ghost hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="btn-sm btn-primary hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 font-medium">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label='dashboard'
                    onClick={()=>handleDropDown("dashboard")}
                    labelIcon={<LayoutDashboard className='w-4 h-4 mr-1'/>}
                  />
                  <UserButton.Action
                    label='settings'
                    onClick={()=>handleDropDown("settings")}
                    labelIcon={<Wrench className='w-4 h-4 mr-1'/>}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </MotionDiv>
        </div>
      </div>
    </MotionHeader>
  )
}