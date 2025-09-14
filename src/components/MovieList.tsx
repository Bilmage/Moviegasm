'use client'

import React, { useState } from 'react'
import { useGetMoviesListQuery } from '@/store/api/tmdbApi'
import { MovieCard } from './MovieCard'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

interface MovieListProps {
  type?: 'popular' | 'top_rated' | 'upcoming' | 'now_playing'
  title?: string
}

export function MovieList({ 
  type = 'popular', 
  title = 'Popular Movies' 
}: MovieListProps) {
  const [page, setPage] = useState(1)
  const { data, error, isLoading, isFetching } = useGetMoviesListQuery({ 
    type, 
    page 
  })

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load movies. Please try again.</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {isFetching && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[2/3] rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          {data && data.total_pages > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1 || isFetching}
              >
                Previous
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Page {page} of {data.total_pages}
              </span>
              
              <Button
                variant="outline"
                onClick={() => setPage(prev => Math.min(data.total_pages, prev + 1))}
                disabled={page === data.total_pages || isFetching}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}