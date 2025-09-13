import { apiSlice } from "./apiSlice";
import { MovieListResponse, TVListResponse } from "../interfaces/types";
import { category, movieType, tvType } from "../interfaces/constants";
import { Movie, TVShow } from "../interfaces/types";
import { VideosResponse, CreditsResponse, SearchResponse } from "../interfaces/types";

// RTK Query Endpoints
export const tmdbApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Movie Lists
    getMoviesList: builder.query<
      MovieListResponse,
      { type: keyof typeof movieType; page?: number }
    >({
      query: ({ type, page = 1 }) => ({
        url: `movie/${movieType[type]}`,
        params: { page },
      }),
      providesTags: (_result, _error, { type }) => [
        { type: "MovieList", id: type.toString() },
      ],
    }),

    // TV Lists
    getTvList: builder.query<
      TVListResponse,
      { type: keyof typeof tvType; page?: number }
    >({
      query: ({ type, page = 1 }) => ({
        url: `tv/${tvType[type]}`,
        params: { page },
      }),
      providesTags: (_result, _error, { type }) => [{ type: "TVList", id: type }],
    }),

    // Movie/TV Details
    getDetails: builder.query<
      Movie | TVShow,
      { category: keyof typeof category; id: number }
    >({
      query: ({ category: cate, id }) => ({
        url: `${category[cate]}/${id}`,
      }),
      providesTags: (_result, _error, { category, id }) => [
        { type: "Details", id: `${category}-${id}` },
      ],
    }),

    // Videos
    getVideos: builder.query<
      VideosResponse,
      { category: keyof typeof category; id: number }
    >({
      query: ({ category: cate, id }) => ({
        url: `${category[cate]}/${id}/videos`,
      }),
      providesTags: (_result, _error, { category, id }) => [
        { type: "Videos", id: `${category}-${id}` },
      ],
    }),

    // Credits
    getCredits: builder.query<
      CreditsResponse,
      { category: keyof typeof category; id: number }
    >({
      query: ({ category: cate, id }) => ({
        url: `${category[cate]}/${id}/credits`,
      }),
      providesTags: (_result, _error, { category, id }) => [
        { type: "Credits", id: `${category}-${id}` },
      ],
    }),

    // Similar Movies/TV
    getSimilar: builder.query<
      MovieListResponse | TVListResponse,
      { category: keyof typeof category; id: number; page?: number }
    >({
      query: ({ category: cate, id, page = 1 }) => ({
        url: `${category[cate]}/${id}/similar`,
        params: { page },
      }),
      providesTags: (_result, _error, { category, id }) => [
        { type: "Similar", id: `${category}-${id}` },
      ],
    }),

    // Search
    search: builder.query<
      SearchResponse,
      { category: keyof typeof category; query: string; page?: number }
    >({
      query: ({ category: cate, query, page = 1 }) => ({
        url: `search/${category[cate]}`,
        params: { query, page },
      }),
      providesTags: (_result, _error, { category, query }) => [
        { type: "Search", id: `${category}-${query}` },
      ],
    }),

    // Multi Search
    multiSearch: builder.query<
      SearchResponse,
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) => ({
        url: "search/multi",
        params: { query, page },
      }),
      providesTags: (_result, _error, { query }) => [
        { type: "MultiSearch", id: query },
      ],
    }),

    // Trending
    getTrending: builder.query<
      SearchResponse,
      {
        media_type?: "all" | "movie" | "tv";
        time_window?: "day" | "week";
        page?: number;
      }
    >({
      query: ({ media_type = "all", time_window = "day", page = 1 }) => ({
        url: `trending/${media_type}/${time_window}`,
        params: { page },
      }),
      providesTags: (_result, _error, { media_type, time_window }) => [
        { type: "Trending", id: `${media_type}-${time_window}` },
      ],
    }),

    // Discover Movies
    discoverMovies: builder.query<
      MovieListResponse,
      {
        page?: number;
        sort_by?: string;
        include_adult?: boolean;
        with_genres?: string;
        year?: number;
        primary_release_year?: number;
      }
    >({
      query: ({
        page = 1,
        sort_by = "popularity.desc",
        include_adult = false,
        with_genres,
        year,
        primary_release_year,
      }) => ({
        url: "discover/movie",
        params: {
          page,
          sort_by,
          include_adult,
          ...(with_genres && { with_genres }),
          ...(year && { year }),
          ...(primary_release_year && { primary_release_year }),
        },
      }),
      providesTags: (_result, _error, params) => [
        { type: "DiscoverMovies", id: JSON.stringify(params) },
      ],
    }),

    // Discover TV
    discoverTV: builder.query<
      TVListResponse,
      {
        page?: number;
        sort_by?: string;
        include_adult?: boolean;
        with_genres?: string;
        first_air_date_year?: number;
      }
    >({
      query: ({
        page = 1,
        sort_by = "popularity.desc",
        include_adult = false,
        with_genres,
        first_air_date_year,
      }) => ({
        url: "discover/tv",
        params: {
          page,
          sort_by,
          include_adult,
          ...(with_genres && { with_genres }),
          ...(first_air_date_year && { first_air_date_year }),
        },
      }),
      providesTags: (_result, _error, params) => [
        { type: "DiscoverTV", id: JSON.stringify(params) },
      ],
    }),

    // Genres
    getMovieGenres: builder.query<
      { genres: { id: number; name: string }[] },
      void
    >({
      query: () => ({
        url: "genre/movie/list",
      }),
      providesTags: [{ type: "Genres", id: "movie" }],
    }),

    getTVGenres: builder.query<
      { genres: { id: number; name: string }[] },
      void
    >({
      query: () => ({
        url: "genre/tv/list",
      }),
      providesTags: [{ type: "Genres", id: "tv" }],
    }),
  }),
});

export const {
  useGetMoviesListQuery,
  useGetTvListQuery,
  useGetDetailsQuery,
  useGetVideosQuery,
  useGetCreditsQuery,
  useGetSimilarQuery,
  useSearchQuery,
  useMultiSearchQuery,
  useGetTrendingQuery,
  useDiscoverMoviesQuery,
  useDiscoverTVQuery,
  useGetMovieGenresQuery,
  useGetTVGenresQuery,
} = tmdbApi;

export default tmdbApi;
