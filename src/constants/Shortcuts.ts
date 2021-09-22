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
  return `${IDMovieUrl}/${getId}?${API_KEY2}${APP_TO_RESULT}${appendMovies.credits},${appendMovies.videos},${appendMovies.images}`;
};
export const buildIDUrlforTV = (getId: number): string => {
  return `${IDMovieUrlTV}/${getId}?${API_KEY2}${APP_TO_RESULT}${appendMovies.credits},${appendMovies.videos},${appendMovies.images}`;
};
// https://api.themoviedb.org/3/person/5d33b7e66a300b2f7ea6bc88?api_key=94ff60134af5b7bbe6cb00087e37359f&language=en-Us
export const buildPerson = (id: number): string => {
  return `${baseTMDBUrl}/person/${id}?${API_KEY2}&language=en-Us`;
};
export const buildPersonWithMovieReferences = (id: number): string => {
  return `${baseTMDBUrl}/person/${id}/movie_credits?${API_KEY2}&language=en-Us`;
};

export const buildCompany = (id: number): string => {
  return `${baseTMDBUrl}/company/${id}?${API_KEY2}&language=en-Us`;
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
