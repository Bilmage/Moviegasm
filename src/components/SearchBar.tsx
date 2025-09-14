'use client'

import React, { useState, useCallback } from 'react'
import { useMultiSearchQuery } from '@/store/api/tmdbApi'
import { Movie } from '@/store/interfaces/types'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, X } from 'lucide-react'
import { MovieCard } from './MovieCard'
import { Skeleton } from './ui/skeleton'
import { Badge } from './ui/badge'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const { data, error, isLoading, isFetching } = useMultiSearchQuery(
    { query: searchQuery, page },
    { skip: !searchQuery }
  )

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchQuery(query.trim())
      setPage(1)
    }
  }, [query])

  const clearSearch = () => {
    setQuery('')
    setSearchQuery('')
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for movies, TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button type="submit" disabled={!query.trim()}>
          Search
        </Button>
      </form>

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Search Results for &ldquo;{searchQuery}&rdquo;
            </h2>
            {data && (
              <Badge variant="outline">
                {data.total_results} results
              </Badge>
            )}
          </div>

          {!!error && (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to search. Please try again.</p>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="aspect-[2/3] rounded-lg" />
              ))}
            </div>
          ) : data && data.results.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {data.results
                  .filter((item) => item.poster_path) // Only show items with posters
                  .map((item) => (
                    <MovieCard key={item.id} movie={item as Movie} />
                  ))}
              </div>

              {/* Pagination */}
              {data.total_pages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(page - 1,)}
                    disabled={page === 1 || isFetching}
                  >
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {data.total_pages}
                  </span>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === data.total_pages || isFetching}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : searchQuery && !isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No results found for &ldquo;{searchQuery}&rdquo;</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
