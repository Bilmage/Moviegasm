/* eslint-disable @next/next/no-img-element */

"use client";

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { LoginForm } from "@/components/Login-form";

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (session) {
    redirect('/dashboard')
  }

  // Development bypass - remove this in production
  const handleDevLogin = () => {
    redirect('/dashboard')
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-4">
            <LoginForm />
            
            {/* Development bypass button - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-center">
                <button
                  onClick={handleDevLogin}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Skip Authentication (Dev Only)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/Moviegasm.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
