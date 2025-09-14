'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { MovieList } from '@/components/MovieList'
import { SearchBar } from '@/components/SearchBar'
import { SignOutButton } from '@/components/SignOutButton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session && process.env.NODE_ENV === 'production') {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">MovieGasm</h1>
              <p className="text-muted-foreground">
                Welcome back, {session?.user?.name || 'Developer'}!
              </p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Movies</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-8">
            <MovieList type="popular" title="Popular Movies" />
            <MovieList type="top_rated" title="Top Rated Movies" />
            <MovieList type="upcoming" title="Upcoming Movies" />
          </TabsContent>

          <TabsContent value="search">
            <SearchBar />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
