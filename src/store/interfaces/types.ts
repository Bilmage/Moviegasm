// Decoded Token
export interface IDecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
export interface PaginatedResponse<T> {
  results: T[]
  page: number
  total_pages: number
  total_results: number
}

// TMDB API Types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  popularity: number;
  origin_country: string[];
}

export interface MovieListResponse extends PaginatedResponse<Movie> {
  results: Movie[];
}

export interface TVListResponse extends PaginatedResponse<TVShow> {
  results: TVShow[];
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export interface Credit {
  id: number;
  name: string;
  profile_path: string;
  character?: string;
  job?: string;
}

export interface CreditsResponse {
  id: number;
  cast: Credit[];
  crew: Credit[];
}

export interface SearchResponse extends PaginatedResponse<Movie | TVShow> {
  results: (Movie | TVShow)[];
}
