'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

interface SignOutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showUserInfo?: boolean
}

export function SignOutButton({ 
  variant = 'outline', 
  size = 'sm', 
  className = '',
  showUserInfo = true 
}: SignOutButtonProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Button disabled variant={variant} size={size} className={className}>
        Loading...
      </Button>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = () => {
    signOut({ 
      callbackUrl: '/',
      redirect: true 
    })
  }

  if (showUserInfo) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium">
            {session.user?.name || session.user?.email}
          </span>
        </div>
        <Button
          onClick={handleSignOut}
          variant={variant}
          size={size}
          className={className}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleSignOut}
      variant={variant}
      size={size}
      className={className}
    >
      Sign Out
    </Button>
  )
}
