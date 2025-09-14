import { MovieDetails } from '@/components/MovieDetails'

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const movieId = parseInt(params.id)

  if (isNaN(movieId)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Invalid Movie ID</h1>
          <p className="text-muted-foreground mt-2">The movie ID provided is not valid.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MovieDetails movieId={movieId} />
    </div>
  )
}