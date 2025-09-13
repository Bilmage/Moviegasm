// API Constants
export const category = {
    movie: "movie",
    tv: "tv",
  } as const;
  
  export const movieType = {
    upcoming: "upcoming",
    popular: "popular",
    top_rated: "top_rated",
    now_playing: "now_playing",
  } as const;
  
  export const tvType = {
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
    airing_today: "airing_today",
  } as const;