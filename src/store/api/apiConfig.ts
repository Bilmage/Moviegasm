interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  originalImage: (imgPath: string) => string;
  w500Image: (imgPath: string) => string;
}

const apiConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.themoviedb.org/3/",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
  originalImage: (imgPath: string): string => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string): string => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;