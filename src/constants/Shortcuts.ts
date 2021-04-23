//TMDB Url
export const baseTMDBUrl = 'https://api.themoviedb.org/3';
export const IDMovieUrl = 'https://api.themoviedb.org/3/movie';
export const IDMovieUrlTV = 'https://api.themoviedb.org/3/tv';

export const TheMovieDBUrl = 'https://api.themoviedb.org/3/search/movie';
//API KEY
export const API_KEY = 'api_key=94ff60134af5b7bbe6cb00087e37359f';
export const API_KEY2 = 'api_key=024d69b581633d457ac58359146c43f6';
//UPC Url
export const UpcUrl = 'https://api.upcitemdb.com/prod/trial/lookup?upc=';

export const TMDBRequest = `${TheMovieDBUrl}?${API_KEY}&query=`;
export const UPCRequest = `${UpcUrl}`;

export const buildIDUrl = (getId: number): string => {
  return `${IDMovieUrl}/${getId}?${API_KEY2}${APP_TO_RESULT}${appendMovies.credits}`;
};
export const buildIDUrlforTV = (getId: number): string => {
  return `${IDMovieUrlTV}/${getId}?${API_KEY2}${APP_TO_RESULT}`;
};

const APP_TO_RESULT = `&append_to_response=`;

const appendMovies = {
  videos: 'videos',
  alternate_titles: 'alternate_titles',
  changes: 'changes',
  credits: 'credits',
  images: 'images',
  releases: 'releases',
};
const appendTV = {
  videos: 'videos',
  alternate_titles: 'alternate_titles',
  changes: 'changes',
  credits: 'credits', // CASTS HERE
  images: 'images',
  releases: 'releases',
};

const appendPeople = {
  changes: 'changes',
  content_ratings: 'content_ratings',
  credits: 'credits',
  tv_credits: 'tv_credits',
  movie_credits: 'movie_credits',
  combined_credits: 'combined_credits',
  images: 'images',
};

export const TMDBRequestById = `${TheMovieDBUrl}`;
// https://api.themoviedb.org/3/movie/765123?api_key=94ff60134af5b7bbe6cb00087e37359f
