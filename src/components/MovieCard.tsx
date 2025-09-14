'use client'

import React from 'react'
import { Movie, TVShow } from '@/store/interfaces/types'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Star, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/app/utils/objectUtils'

interface MovieCardProps {
  movie: Movie | TVShow
}

export function MovieCard({ movie }: MovieCardProps) {
  

  const getImageUrl = (path: string | null) => {
    if (!path) return '/placeholder-movie.jpg'
    return `https://image.tmdb.org/t/p/w500${path}`
  }

  // Helper functions to safely access properties that differ between Movie and TVShow
  const getTitle = (item: Movie | TVShow): string => {
    return 'title' in item ? item.title : item.name
  }

  const getReleaseDate = (item: Movie | TVShow): string => {
    return 'release_date' in item ? item.release_date : item.first_air_date
  }

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
          <Image
            src={getImageUrl(movie?.poster_path)}
            alt={getTitle(movie)}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {movie?.vote_average.toFixed(1)}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {getTitle(movie)}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(getReleaseDate(movie) as string)}</span>
          </div>
          
          {movie?.overview && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {movie?.overview}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}