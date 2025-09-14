'use client'

import React from 'react'
import { useGetDetailsQuery, useGetCreditsQuery, useGetVideosQuery } from '@/store/api/tmdbApi'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { Star, Calendar, Clock, Users, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface MovieDetailsProps {
  movieId: number
}

export function MovieDetails({ movieId }: MovieDetailsProps) {
  const { data: movie, isLoading: movieLoading } = useGetDetailsQuery({
    category: 'movie',
    id: movieId
  })

  const { data: credits, isLoading: creditsLoading } = useGetCreditsQuery({
    category: 'movie',
    id: movieId
  })

  const { data: videos, isLoading: videosLoading } = useGetVideosQuery({
    category: 'movie',
    id: movieId
  })

  if (movieLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="w-full md:w-1/3 aspect-[2/3] rounded-lg" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Movie not found</p>
        <Link href="/">
          <Button className="mt-4">Back to Home</Button>
        </Link>
      </div>
    )
  }

  const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
    if (!path) return '/placeholder-movie.jpg'
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const trailer = videos?.results.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  )

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/">
        <Button variant="outline" className="mb-4">
          ← Back to Movies
        </Button>
      </Link>

      {/* Movie Header */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="w-full md:w-1/3">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(movie.poster_path, 'original')}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Movie Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-lg text-muted-foreground">{movie.original_title}</p>
          </div>

          {/* Rating and Meta */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
              <span className="text-muted-foreground">({movie.vote_count} votes)</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(movie.release_date)}</span>
            </div>

            {movie.runtime && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
          </div>

          {/* Trailer Button */}
          {trailer && (
            <Button asChild>
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Watch Trailer
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Cast and Crew */}
      {credits && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cast */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Cast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {credits.cast.slice(0, 10).map((person) => (
                  <div key={person.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={getImageUrl(person.profile_path, 'w500')}
                        alt={person.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      {person.character && (
                        <p className="text-sm text-muted-foreground">{person.character}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Crew */}
          <Card>
            <CardHeader>
              <CardTitle>Crew</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {credits.crew.slice(0, 10).map((person) => (
                  <div key={person.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={getImageUrl(person.profile_path, 'w500')}
                        alt={person.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      {person.job && (
                        <p className="text-sm text-muted-foreground">{person.job}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
